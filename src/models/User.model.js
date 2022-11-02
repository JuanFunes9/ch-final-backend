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
        default: null
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    phone: {
		type: String,
		required: false
	},
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    }
})

/*
    El siguiente metodo modifica la vista del modelo para que nunca retorne los campos
    de "password", "__v" y cambie el nombre del campo "_id" a "uid".
*/
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);