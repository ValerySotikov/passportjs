module.exports = app => {
  const handlebars = require('express-handlebars')
                     .create({ defaultLayout: 'main' });
  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
};