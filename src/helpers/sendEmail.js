const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_GMAIL_PASSWORD
    }
});

const registerEmail = (newUser) => {
    const mailOptions = {
        from: `Juan Funes - CoderHouse E-commerce <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'Nuevo Registro - CoderHouse E-commerce',
        text: `Un nuevo usuario se ha registrado en la pagina:\n\nEmail: ${newUser.email}\nNombre: ${newUser.firstName} ${newUser.lastName}\nAddress: ${newUser.address}\nTelefono: ${newUser.phone}\n\nEmail Enviado desde Node-Mailer.`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error })
        }
    })
}

const newOrderEmail = (user, products) => {
    const separadorGrande = '=========================================';
    const separadorChico = '------------------------------------------------------------------------';
    let totalPrice = 0;
    let pedidoText = `Se ha registrado un nuevo Pedido:\n${separadorGrande}\n`;

    products.forEach(prod => {
        totalPrice += prod.price;
        pedidoText += `Product_id: ${prod._id}\nTitulo: ${prod.title}\nPrecio: $${prod.price}\n${separadorChico}\n`
    });

    pedidoText += `\n${separadorGrande}\nTotal: $${totalPrice}.\n${separadorGrande}\nUsuario\n${separadorChico}\nNombre: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nAddress: ${user.address}\nTelefono: ${user.phone}.\n\nEmail Enviado desde Node-Mailer.`;

    const mailOptions = {
        from: `Juan Funes - CoderHouse E-commerce <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'Nuevo Pedido - CoderHouse E-commerce',
        text: pedidoText
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error })
        }
    })
}

module.exports = {
    registerEmail,
    newOrderEmail
}