const Order = require('../models/Order.model');

const generateOrder = async({ _id, cart }) => {
    const order = {
        user: _id,
        products: [],
        date: new Date().toLocaleString()
    }

    cart.forEach(prod => {
        order.products.push({
            title: prod.title,
            price: prod.price
        })
    });

    await new Order(order).save();

    return order;
}

module.exports = generateOrder;