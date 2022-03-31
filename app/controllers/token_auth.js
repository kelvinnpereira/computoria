const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (!token) {
    console.log('Token de sessão não existe');
    return res.redirect('/auth/login');
  }
  jwt.verify(token, process.env.TOKEN_SECRET.trim(), (err, user) => {
    if (err) {
      console.log('Token de sessão invalido ou expirado');
      res.clearCookie('Authorization');
      res.clearCookie('user');
      res.clearCookie('role');
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
  if (token) return res.redirect('/home');
  next();
}

const admin_authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (!token) {
    console.log('Token de sessão não existe');
    return res.redirect('/admin/auth/login');
  }
  jwt.verify(token, process.env.TOKEN_SECRET.trim(), (err, user) => {
    if (err || user.role === 'usuario') {
      console.log('Token de sessão invalido, expirado ou de usuario');
      res.clearCookie('Authorization');
      res.clearCookie('user');
      res.clearCookie('role');
      return res.redirect('/admin/auth/login');
    } else {
      console.log('Token de sessão valido');
      req.user = user.matricula;
      req.admin = true;
      next();
    }
  })
}

const admin_not_authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (token) return res.redirect('/admin/home');
  req.admin = true;
  next();
}

const generateAccessToken = (obj) => {
  return jwt.sign(obj, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

const cookieToDict = (cookie) => {
  let dict = {};
  let items = cookie?.split('; ');
  items?.forEach(item => {
    const [key, value] = item.split('=');
    dict[key] = value;
  });
  return dict;
}

module.exports = {
  authenticated,
  not_authenticated,
  admin_authenticated,
  admin_not_authenticated,
  generateAccessToken,
  cookieToDict,
}