const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dxg8ulxz5/image/upload/v1666576906/default-avatar_k1zdop.png'
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
})

/*
    Modificar la vista del modelo para que nunca retorne los campos de "password", "__v" y cambie
    el nombre del campo "_id" a "uid".
*/ 
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema);