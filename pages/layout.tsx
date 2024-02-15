import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Supporti',
	description:
		'스타트업 성장에 필요한 솔루션을 제공하는 B2B SaaS 서비스입니다.',
};

const layout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default layout;
