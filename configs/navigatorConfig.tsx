//* Import interfaces
import { INavigatorProps } from '@qillie-corp/ark-office-project/src/@types/ui/global/navigator';

const navigatorConfig: INavigatorProps = {
	logoPath: '/images/logo/logo.svg',
	alarm: {
		modelName: 'AdminMember',
	},
	order: {
		xs: ['drawer', 'logo', 'alarm'],
		md: ['logo', 'spacing'],
	},
	menu: [],
};

export default navigatorConfig;
