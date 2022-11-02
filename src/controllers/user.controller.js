const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// =========================== Model =========================== //
const User = require('../models/User.model');

// =========================== Services =========================== //
const uploadImg = require('../helpers/uploadImg');


const getAll = async (req, res) => {
    const users = await User.find({ state: true })

    return res.json({
        ok: true,
        data: null,
        users
    })
}

const getById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, state: true });

    if (!user) {
        return res.status(400).json({
            ok: true,
            data: `No se encontro al usuario con ID: ${id}.`,
            user
        })
    }

    return res.json({
        ok: true,
        data: null,
        user
    })
}

const updateImage = async (req, res) => {
    const { file } = req.files;
	const imageUrl = await uploadImg(file)

	return res.json({
		ok: true,
		data: null,
		imageUrl
	})
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, address, image, phone } = req.body;

    const user = await User.findOne({ _id: id, state: true });
    if (!user) {
        return res.status(400).json({
            ok: true,
            data: `No se encontro al usuario con ID: ${id}.`,
            user
        })
    }

    //Limpiar IMG previas en cloudinary:
    if (user.image) {
        const arr = user.image.split("/");
        const nombre = arr[arr.length - 1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy(public_id);
    }

    //Actualizar campos que llegron en el req.body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (image) user.image = image;
    if (phone) user.phone = phone;

    await user.save();

    return res.json({
        ok: true,
        data: `El usuario ID: ${id} ha sido actualizado.`,
        user
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, state: true });
    if (!user) {
        return res.status(400).json({
            ok: true,
            data: `No se encontro al usuario con ID: ${id}.`,
            user
        })
    }

    user.state = false;
    await user.save();

    return res.json({
        ok: true,
        data: `El usuario ID: ${id} ha sido eliminado.`,
        user
    })
}

module.exports = {
    getAll,
    getById,
    updateImage,
    updateUser,
    deleteUser
}