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
import '../styles/Calendar.css';

import sideBarConfig from '../configs/sideBarConfig';
import Memory from '@leanoncompany/supporti-ark-office-project/src/utils/data/Memory';
import dotenv from 'dotenv';
import dynamic from 'next/dynamic';

import Head from 'next/head';
import Script from 'next/script';
import * as gtag from '../src/lib/gtag';

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
	//* Mui ssr 설정
	const CustomHeaderNoSSR = dynamic(
		() =>
			import(
				'../src/views/local/common/CustomHeader/CustomHeaderRenewal'
			),
		{
			ssr: false,
		}
	);
	const CustomHeaderJpNoSSR = dynamic(
		() => import('../src/views/local/common/CustomHeader/CustomHeaderJp'),
		{
			ssr: false,
		}
	);
	const CustomHeaderEnNoSSR = dynamic(
		() => import('../src/views/local/common/CustomHeader/CustomHeaderEn'),
		{
			ssr: false,
		}
	);
	const CustomHeaderRenewalNoSSR = dynamic(
		() =>
			import(
				'../src/views/local/common/CustomHeader/CustomHeaderRenewal'
			),
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

	const CustomFooterJpNoSSR = dynamic(
		() => import('../src/views/local/common/CustomFooter/CustomFooterJp'),
		{
			ssr: false,
		}
	);

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<React.Fragment>
			{/* Head */}
			{/* <CssBaseline /> */}
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '395660438718831');
fbq('track', 'PageView');
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=395660438718831&ev=PageView&noscript=1"
/></noscript>
`,
					}}
				></script>
				{/* <!-- End Meta Pixel Code --> */}
			</Head>
			{/* <!-- Meta Pixel Code --> */}

			{/* Global Site Tag (gtag.js) - Google Analytics */}
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script src="https://cpay.payple.kr/js/v1/payment.js" />

			{router.pathname.includes('/en') ? (
				<Entry
					disableBreadCrumb={true}
					memory={memory}
					customHeader={<CustomHeaderEnNoSSR />}
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
			) : router.pathname.includes('jp') ? (
				<Entry
					disableBreadCrumb={true}
					memory={memory}
					customHeader={<CustomHeaderJpNoSSR />}
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
					anotherFooter={<CustomFooterJpNoSSR />}
				/>
			) : (
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
			)}
		</React.Fragment>
	);
}

export { memory };
export default App;
