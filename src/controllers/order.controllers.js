const Order = require('../models/Order.model');

const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('user', 'email');

    return res.json({
        ok: true,
        data: null,
        orders
    })
}

const getOrdersByUser = async (req, res) => {
    const orders = await Order.find({user: req.uid})
    .populate('user', 'email')
    .sort({date: -1});

    return res.json({
        ok: true,
        data: null,
        orders
    })
}

module.exports = {
    getAllOrders,
    getOrdersByUser
}