import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import createEmotionCache from '../src/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		const cache = createEmotionCache();
		const { extractCriticalToChunks } = createEmotionServer(cache);
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<App {...props} emotionCache={cache} />
						),
				});

			const initialProps = await Document.getInitialProps(ctx);

			// This is important. It prevents Emotion to render invalid HTML.
			// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
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
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
}
