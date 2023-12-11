import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class ImageController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super();
	}

	/** 이미지업로더 */

	public uploadImage = (
		formData: FormData,
		setImagePreviewUrl: (imageUrl: string) => void
		// callback: any
		// name: string
	) => {
		this.postData(
			formData,
			`${this.rootRoute}/common/file/upload_image`,
			(response) => {
				//* Get image url
				const imageUrl = response.data.result[0];

				//* Set preview image list
				setImagePreviewUrl(imageUrl);
				// callback(imageUrl, imageUrl);
			},
			(err) => {
				console.log(err);
			}
		);
	};
}
