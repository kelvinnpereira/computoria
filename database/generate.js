const fs = require('fs');

fs.writeFileSync(__dirname + '/models.js', 'module.exports = {\n');
fs.readdirSync(__dirname + '/../app/models').filter(file => {
    return (file.indexOf('.') !== 0) && (!file.startsWith('index')) && (file.slice(-3) === '.js');
}).forEach(file => {
    let base = file.slice(0, -3);
    let req = '\t' + base + ': require(__dirname + \"/../app/models/' + base + '\"), \n';
    fs.appendFileSync(__dirname + '/models.js', req);
});
fs.appendFileSync(__dirname + '/models.js', '}');