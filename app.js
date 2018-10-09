const express = require('express');
const app = express();

app.set('PORT', process.env.PORT || 3000);

require('./launchapp/conf-app.js')(app);

module.exports = app.listen(
  app.get('PORT'),
  (req, res) => {
    console.log(`Server started at port ${ app.get('PORT') }...`);
  }
)