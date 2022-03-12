const next = require('next');
const app = next({dev: false});
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
