import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from '../src/createEmotionCache';
import { themeConfig } from '../configs/themeConfig';
import { useTheme } from '@mui/material';

export default class MyDocument extends Document {
	render() {
		const theme = useTheme();
		return (
			<Html lang="en">
				<Head>
					{/* PWA primary color */}
					<title>서포티</title>
					<meta
						name="theme-color"
						content={theme.palette.primary.main}
					/>
					<meta
						name="description"
						content="스타트업 성장 관리 솔루션"
					/>
					<meta
						name="keywords"
						content="서포티, 스타트업, 사업 관리"
					/>
					<meta name="robots" content="index, follow" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta charSet="utf-8" />
					<meta property="og:site_name" content="사이트 이름" />
					<meta property="og:locale" content="ko_KR" />
					<meta property="og:title" content="서포티" />
					<meta
						property="og:description"
						content="웹페이지 상세 설명"
					/>
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://supporti.biz" />
					{/* <meta
						property="og:image"
						content="https://mycodings.fly.dev/blog/2024-01-14-all-about-nextjs-seo/thumbnail.png"
					/> */}
					<meta property="og:image:alt" content="서포티" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<link rel="shortcut icon" href="/static/favicon.ico" />
					{/* <link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/> */}
					{/* Inject MUI styles first to match with the prepend: true configuration. */}
					{(this.props as any).emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const originalRenderPage = ctx.renderPage;
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
