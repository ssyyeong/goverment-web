import React, { useEffect, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { TRenderItemCallback } from '../../../@types/callbacks';

interface IInfiniteLoadBoardProps {
	/**
	 * 데이터 외부에서 관리할 경우, 해당 데이터
	 */
	allData?: any;
	setAllData?: React.Dispatch<any>;

	/**
	 * 해당 영역에 가까이 오면, 다음 페이지 불러오기 트리거
	 */
	rootMargin?: string;

	/**
	 * 각 아이템 랜더링 함수
	 */
	renderItem?: TRenderItemCallback;

	/**
	 * 게시판을 위한 값들
	 */
	injectedParams?: { [key: string]: any };

	/**
	 * 페이지 당 보이는 컨텐츠 개수
	 */
	contentPerPage?: number;

	/**
	 * 데이터 로더 함수
	 */
	getAllCallback?: (
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) => void;

	/**
	 * 영역 감싸는 Box 의 props
	 */
	boxProps?: BoxProps;
	/**
	 * 트리거 키
	 */
	triggerKey?: string;
}

/**
 * 해당 모듈은 무한 스크롤을 지원하는 게시판을 만들기 위한 모듈입니다.
 * - 안정화가 끝난 뒤에 ark-office-project 로 옮겨서 사용해주세요. (꼭!)
 */
const InfiniteLoadBoard = (props: IInfiniteLoadBoardProps) => {
	//* Modules

	//* Constants

	//* States
	/**
	 * 무한 스크롤 로딩중 여부
	 */
	const [loading, setLoading] = useState(false);

	/**
	 * 다음 페이지 있는지 여부
	 */
	const [hasNextPage, setHasNextPage] = useState<boolean>(true);

	/**
	 * 에러 여부
	 */
	const [error, setError] = useState<Error>();

	/**
	 * 최대 페이지 수
	 */
	const [maxPage, setMaxPage] = useState<number>(undefined);

	/**
	 * 현재 선택된 페이지
	 */
	const [selectedPage, setSelectedPage] = useState<number>(1);

	/**
	 * 데이터 리스트 (내부에서 데이터 관리할 경우 사용)
	 */
	const [allData, setAllData] = useState<any>([]);

	//* Functions
	/**
	 * 최대 페이지 계산 함수
	 */
	const countMaxPage = (count: number, selectedContentPerPage: number) => {
		return count < selectedContentPerPage
			? 1
			: Math.ceil(count / selectedContentPerPage);
	};

	/**
	 * 실제로 데이터 가져오는 함수
	 */
	const callData = () => {
		if (props.getAllCallback !== undefined) {
			let params: { [key: string]: any } =
				props.injectedParams !== undefined ? props.injectedParams : {};

			params.FIND_OPTION_KEY_LIST.PAGE = selectedPage - 1;
			params.FIND_OPTION_KEY_LIST.LIMIT = props.contentPerPage || 10;

			/**
			 * 로딩 시작
			 */
			setLoading(true);

			/**
			 * 데이터 부르기
			 */
			props.getAllCallback(
				params,
				(response: any) => {
					let clonedAllData: any = [];

					// eslint-disable-next-line array-callback-return
					response.data.result.rows.map((el: any, index: any) => {
						clonedAllData.push(el);
					});
					if (
						props.setAllData !== undefined &&
						props.allData !== undefined
					) {
						props.setAllData(clonedAllData);
					} else {
						setAllData(clonedAllData);
					}

					/**
					 * 최대 페이지 계산
					 */
					if (maxPage === undefined) {
						const calculatedMaxPage = countMaxPage(
							response.data.result.count,
							props.contentPerPage || 10
						);

						setMaxPage(calculatedMaxPage);
					} else {
						if (selectedPage < maxPage) {
							setSelectedPage(selectedPage + 1);
						} else {
							setHasNextPage(false);
						}
					}

					/**
					 * 로딩 종료
					 */
					setLoading(false);
				},
				(err: any) => {
					/**
					 * 로딩 종료
					 */
					setLoading(false);

					/**
					 * 에러 트리거
					 */
					setError(err);
					// alert('실패');
				}
			);
		} else {
			throw new Error('getAllCallback is not defined');
		}
	};
	//* Hooks
	/**
	 * 필터 바뀔때 초기화시키기
	 */
	console.log(props.injectedParams.FIND_OPTION_KEY_LIST, 'trigger');
	useEffect(() => {
		callData();
	}, [
		props.injectedParams.FIND_OPTION_KEY_LIST.SORT_DIRECTION,
		props.injectedParams.FIND_OPTION_KEY_LIST.CATEGORY,
		props.injectedParams.COMPLETED,
		props.triggerKey,
	]);

	//* Refs
	/**
	 * 무한 스크롤 레퍼런스
	 */
	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: callData,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: !!error,
		rootMargin: props.rootMargin || '0px 0px 400px 0px',
	});

	return (
		<Box {...props.boxProps}>
			{/* 데이터 랜더링 영역 */}
			{(props.allData !== undefined && props.setAllData !== undefined
				? props.allData
				: allData
			).map((el: any, index: any) => {
				if (props.renderItem !== undefined) {
					return props.renderItem(el, index);
				}
			})}

			{/* 데이터 로딩 감지 영역 */}
			{(loading || hasNextPage) && <Box ref={sentryRef} />}
		</Box>
	);
};

export default InfiniteLoadBoard;
export type { IInfiniteLoadBoardProps };
