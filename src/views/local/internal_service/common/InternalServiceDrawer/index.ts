import dynamic from 'next/dynamic';

const InternalServiceDrawerNoSSR = dynamic(
	() => import('./InternalServiceDrawer'),
	{
		ssr: false,
	}
);

export default InternalServiceDrawerNoSSR;
