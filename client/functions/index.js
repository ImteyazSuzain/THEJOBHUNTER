export const imageSource = (user) => {
	if (user.image) {
		return user.image.url;
	} else {
		return "/images/logo.png";
	}
};

export const imageSources = (user) => {
	if (user.image.url) {
		return user.image.url;
	} else {
		return "/images/logo.png";
	}
};
