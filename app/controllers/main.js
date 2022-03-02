const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const User = models.user;

const next = require('next');
const dev = process.env.NODE_ENV?.trim() == 'development';
const app = next({dev});
const handle = app.getRequestHandler();

const index = async function (req, res) {
    res.redirect('/home');
};

const home = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/auth/login');
    }
} 

const invalid = async (req, res) => {
    if (!req.session.user && req.route.methods.get){
        handle(req, res);
    } else {
        res.redirect('/home');
    }
}

module.exports = {
    index: index,
    home: home,
    invalid: invalid,
}
