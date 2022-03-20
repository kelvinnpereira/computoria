const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (!token) {
    console.log('Token de sessão não existe');
    return res.redirect('/auth/login');
  }
  jwt.verify(token, process.env.TOKEN_SECRET.trim(), (err, user) => {
    if (err?.expiredAt) {
      console.log('Token de sessão expirado');
      res.clearCookie('Authorization');
      res.clearCookie('user');
      return res.redirect('/auth/login');
    } else if (err) {
      console.log('Token de sessão invalido');
      res.clearCookie('Authorization');
      res.clearCookie('user');
      return res.redirect('/auth/login');
    } else {
      console.log('Token de sessão valido');
      req.user = user.matricula;
      next();
    }
  })
}

const not_authenticated = (req, res, next) => {
    const token = cookieToDict(req.headers.cookie)?.Authorization;
    if(token) return res.redirect('/home');
    next();
  }

const generateAccessToken = (obj) => {
    return jwt.sign(obj, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

const cookieToDict = (cookie) => {
    let dict = {};
    let items = cookie?.split('; ');
    items?.forEach(item => {
        [key, value] = item.split('=');
        dict[key] = value;
    });
    return dict;
}

module.exports = {
    authenticated,
    not_authenticated,
    generateAccessToken,
    cookieToDict,
}