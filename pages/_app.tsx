//* Import libraries
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import '../public/fonts/style.css';
import CssBaseline from '@mui/material/CssBaseline';
//* Import configs
import { EmotionCache } from '@emotion/react';
import { themeConfig } from '../configs/themeConfig';

import navigatorConfig from '../configs/navigatorConfig';
import footerConfig from '../configs/footerConfig';
import { default as Entry } from '@leanoncompany/supporti-ark-office-project/src/base/Entry/index';
import { default as createEmotionCache } from '../src/createEmotionCache';
// import { createEmotionCache } from '@leanoncompany/supporti-ark-office-project';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import sideBarConfig from '../configs/sideBarConfig';
import Memory from '@leanoncompany/supporti-ark-office-project/src/utils/data/Memory';
import dotenv from 'dotenv';
import CustomHeader from '../src/views/local/common/CustomHeader/CustomHeader';
import CustomFooter from '../src/views/local/common/CustomFooter/CustomFooter';
import dynamic from 'next/dynamic';

//* .env 지정
dotenv.config({ path: '.env' });

if (process.env.REACT_APP_NODE_ENV === 'development') {
	dotenv.config({ path: '.env.dev' });
} else if (process.env.REACT_APP_NODE_ENV === 'production') {
	dotenv.config({ path: '.env.prod' });
}

const clientSideEmotionCache = createEmotionCache();

const memory = new Memory();

function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
	router,
}: AppProps & { emotionCache: EmotionCache }) {
	const CustomHeaderNoSSR = dynamic(
		() => import('../src/views/local/common/CustomHeader/CustomHeader'),
		{
			ssr: false,
		}
	);
	const CustomFooterNoSSR = dynamic(
		() => import('../src/views/local/common/CustomFooter/CustomFooter'),
		{
			ssr: false,
		}
	);

	return (
		<React.Fragment>
			{/* Head */}
			{/* <CssBaseline /> */}
			<Entry
				disableBreadCrumb={true}
				memory={memory}
				customHeader={<CustomHeaderNoSSR />}
				configs={{
					sidebar: {
						...sideBarConfig,
						...{
							signIn: {
								tokenExpireHours: 1,
								signInSuccessLink: '/login',
							},
							plugin: [],
						},
					},
					head: { title: '서포티' },
					header: navigatorConfig,
					footer: footerConfig,
					useFooter: true,
				}}
				cache={{
					emotion: emotionCache,
					theme: themeConfig,
				}}
				Component={Component}
				useAuthCheck={false}
				pageProps={pageProps}
				disableSideBar={true}
				disableGutturs={true}
				containerPaddingX={'0'}
				containerMaxWidth={'3000px !important'}
				router={router}
				anotherFooter={<CustomFooterNoSSR />}
			/>
		</React.Fragment>
	);
}

export { memory };
export default App;
