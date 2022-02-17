const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const index = async function (req, res) {
    if (req.session.user) {

    } else {
        res.redirect('/login');
    }
};

const sobre = (req, res) => {
    const content = 'Página sobre a aplicação';
    res.render('sobre', {
        content: content
    });
};

const ranking = async (req, res) => {
    if (req.session.user) {
        
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    index: index,
    sobre: sobre,
    ranking: ranking,
}
