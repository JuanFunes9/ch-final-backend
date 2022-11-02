const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        title: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    date: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'Generada'
    }
});

/*
    El siguiente metodo modifica la vista del modelo para que nunca retorne los campos
    de "__v" y cambie el nombre del campo "_id" a "order_id".
*/
OrderSchema.methods.toJSON = function () {
    const { __v, _id, ...order } = this.toObject();
    order.order_id = _id;
    return order;
}

module.exports = model('Order', OrderSchema);