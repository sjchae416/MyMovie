const rootStyles = window.getComputedStyle(document.documentElement);

if (
	rootStyles.getPropertyValue('--book-cover-width-large') != null &&
	rootStyles.getPropertyValue('--book-cover-width-large') != ''
) {
	ready();
} else {
	document.getElementById('main-css').addEventListener('load', ready);
}

function ready() {
	const coverAspectRatio = parseFloat(
		rootStyles.getPropertyValue('--book-cover-width-ratio')
	);
	const coverWidth = parseFloat(
		rootStyles.getPropertyValue('--book-cover-width-large')
	);
	const coverHeight = parseFloat(coverWidth / coverAspectRatio);

	FilePond.registerPlugin(
		FilePondPluginImagePreview,
		FilePondPluginImageResize,
		FilePondPluginFileEncode
	);

	FilePond.setOptions({
		stylePanelAspectRatio: coverAspectRatio,
		imageResizeTargetWidth: coverWidth,
		imageResizeTargetHeight: coverHeight,
	});

	FilePond.parse(document.body);
}
