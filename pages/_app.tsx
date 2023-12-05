//* Import libraries
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import '../public/fonts/style.css';

//* Import configs
import { EmotionCache } from '@emotion/react';
import { themeConfig } from '../configs/themeConfig';

import navigatorConfig from '../configs/navigatorConfig';
import footerConfig from '../configs/footerConfig';
import { default as Entry } from '@qillie-corp/ark-office-project/src/base/Entry/index';
import { default as createEmotionCache } from '@qillie-corp/ark-office-project/src/base/Utils/createEmotionCache';
// import { createEmotionCache } from '@qillie-corp/ark-office-project';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import sideBarConfig from '../configs/sideBarConfig';
import Memory from '@qillie-corp/ark-office-project/src/utils/data/Memory';
import dotenv from 'dotenv';

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
	return (
		<React.Fragment>
			{/* Head */}
			<Entry
				memory={memory}
				configs={{
					sidebar: {
						...sideBarConfig,
						...{
							signIn: {
								tokenExpireHours: 1,
								signInSuccessLink: '/basic/member/admin_member',
							},
							plugin: [],
						},
					},
					head: { title: '관리자' },
					header: navigatorConfig,
					footer: footerConfig,
				}}
				cache={{
					emotion: emotionCache,
					theme: themeConfig,
				}}
				Component={Component}
				useAuthCheck={false}
				pageProps={pageProps}
				disableSideBar={true}
				router={router}
			/>
		</React.Fragment>
	);
}

export { memory };
export default App;
