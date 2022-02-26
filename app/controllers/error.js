const next = require('next');
const dev = process.env.NODE_ENV?.trim() == 'development';
const app = next({dev});
const handle = app.getRequestHandler();

const not_found = async (req, res) => {
    handle(req, res);
}

const error = async function (req, res) {
    res.redirect('/404');
};

module.exports = {
    not_found: not_found,
    error: error
}
