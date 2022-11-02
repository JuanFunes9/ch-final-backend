const validateImg = (req, res, next) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			data: `No se ha subido ninguna imagen.`
		})
	}

	const { file } = req.files;
	const fileExt = file.name.split(".")[1];
	const validExt = ["png", "jpg", "jpeg", "svg", "webp"];

	if(!validExt.includes(fileExt)){
		return res.status(400).json({
			ok: false,
			data: `El formato del archivo debe ser: 'png', 'jpg', 'jpeg', 'webp' o 'svg'.`
		})
	}

	next();
}

module.exports = validateImg;