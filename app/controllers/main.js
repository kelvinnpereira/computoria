const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const User = models.user;

const index = async function (req, res) {
    if (req.session.user) {

    } else {
        res.redirect('/auth/login');
    }
};

const sobre = (req, res) => {
    const content = 'Página sobre a aplicação';
    res.render('sobre', {
        content: content
    });
};

module.exports = {
    index: index,
    sobre: sobre,
}
