const validateCategorie = (req, res, next) => {
    const { categorie } = req.body;

	const categories = [
		'almacenamiento',
		'componentes-de-pc',
		'perifericos',
		'sonido-y-multimedia',
		'impresoras',
		'monitores',
		'smart-tv',
		'notebooks',
		'accesorios'
	]

	if(!categories.includes(categorie)){
        return res.status(400).json({
            ok: false,
            data: `La categoria: ${ categorie } no existe`
        })
	}

    next();
}

module.exports = validateCategorie;