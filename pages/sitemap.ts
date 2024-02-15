import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://supporti.biz/',
		},
		{
			url: 'https://supporti.biz/auth/find_in',
		},
		{
			url: 'https://supporti.biz/auth/find_pw',
		},
		{
			url: 'https://supporti.biz/auth/redirect_url',
		},
		{
			url: 'https://supporti.biz/auth/sign_in',
		},
		{
			url: 'https://supporti.biz/auth/sign_up',
		},
		{
			url: 'https://supporti.biz/billing/failed',
		},
		{
			url: 'https://supporti.biz/billing/success',
		},
		{
			url: 'https://supporti.biz/customer_service',
		},
		{
			url: 'https://supporti.biz/external_service',
		},
		{
			url: 'https://supporti.biz/internal_service',
		},
		{
			url: 'https://supporti.biz/my_page',
		},
		{
			url: 'https://supporti.biz/partners',
		},
		{
			url: 'https://supporti.biz/rate_plan',
		},
		{
			url: 'https://supporti.biz/success',
		},
		{
			url: 'https://supporti.biz/terms',
		},
		{
			url: 'https://supporti.biz/toss',
		},
	];
}
