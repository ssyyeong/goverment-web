//* Import interfaces
import { INavigatorProps } from '@leanoncompany/supporti-ark-office-project/src/@types/ui/global/navigator';

const navigatorConfig: INavigatorProps = {
	logoPath: '/images/logo/Suppor-T1.png',
	order: {
		xs: ['drawer', 'logo', 'alarm'],
		md: ['logo', 'spacing'],
	},
	menu: [],
};

export default navigatorConfig;
