const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (!token) {
    console.log('Token de sessão não existe');
    return res.redirect('/auth/login');
  }
  jwt.verify(token, process.env.TOKEN_SECRET.trim(), (err, usuario) => {
    if (err) {
      console.log('Token de sessão invalido ou expirado');
      res.clearCookie('Authorization');
      res.clearCookie('matricula');
      res.clearCookie('cargo');
      return res.redirect('/auth/login');
    } else {
      console.log('Token de sessão valido');
      req.matricula = usuario.matricula;
      next();
    }
  })
}

const not_authenticated = (req, res, next) => {
  const token = cookieToDict(req.headers.cookie)?.Authorization;
  if (token) return res.redirect('/home');
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
  generateAccessToken,
  cookieToDict,
}