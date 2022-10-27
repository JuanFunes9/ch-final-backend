const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImg = async (file) => {
    const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath)
    return secure_url;
}

module.exports = uploadImg;