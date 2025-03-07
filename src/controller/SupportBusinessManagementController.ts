import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class SupportBusinessManagementController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('SupportBusinessManagement', role);
	}

	/**
	 * 스케줄 데이터 가져오기
	 */
	public getScheduleData(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/find_schedule_by_appmember_id_and_month`,
			successCallback,
			failCallback
		);
	}
	/**
	 * 생성하기
	 */
	public createItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/create_support_business_management`,
			successCallback,
			failCallback
		);
	}

	/**
	 * 진행중 지원사업 가져오기
	 */
	public getOnGoingSupportBusiness(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/find_sorting_date_list`,
			successCallback,
			failCallback
		);
	}

	public update(
		args: { [key: string]: any },
		args2: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.putData(
			{
				FIND_OPTION_KEY_LIST: args,
				UPDATE_OPTION_KEY_LIST: args2,
			},
			`${this.mergedPath}/update`,
			successCallback,
			failCallback
		);
	}

	public getArchive(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/archive_list`,
			successCallback,
			failCallback
		);
	}

	public getStorage(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/storage`,
			successCallback,
			failCallback
		);
	}

	public getFileListByCompany(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/file_list_by_company`,
			successCallback,
			failCallback
		);
	}

	public getFileListByProject(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/file_list_by_project`,
			successCallback,
			failCallback
		);
	}

	public createFile(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/create_file`,
			successCallback,
			failCallback
		);
	}

	public updateFile(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/update_file`,
			successCallback,
			failCallback
		);
	}

	public deleteFile(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/delete_file`,
			successCallback,
			failCallback
		);
	}

	public searchFile(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/search_file`,
			successCallback,
			failCallback
		);
	}
}
