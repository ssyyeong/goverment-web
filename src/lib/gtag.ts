export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
	if (typeof window.gtag == 'undefined') return;

	window.gtag('config', GA_TRACKING_ID as string, {
		page_path: url,
	});
};

interface GTagEventProps {
	action: string;
	category: string;
	label: string;
	value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gTagEvent = ({
	action,
	category,
	label,
	value,
}: GTagEventProps) => {
	if (window.location.hostname.includes('localhost')) {
		console.log('로컬이얀');
		return;
	}
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value,
	});
};
