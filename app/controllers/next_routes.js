const models = require('../models/index');
const MudarSenha = models.mudar_senha;

const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();

const handler = async (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    handle(req, res);
}

const restart = async (req, res) => {
    if (req.route.methods.get && req.params?.token) {
        let token = req.params.token;
        let request = await MudarSenha.findOne({
            where: {
                token: token,
            }
        });
        if (!request?.cpf || Date.now() - request.createdAt > 300000) {
            return res.redirect('/invalid');
        } else {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        }
    } else {
        res.redirect('/home');
    }
}

const logout = async (req, res) => {
    res.clearCookie('Authorization');
    res.clearCookie('user');
    handle(req, res);
}

module.exports = {
    handler,
    restart,
    logout,
}