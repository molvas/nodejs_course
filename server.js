const express = require('express');

const app = express();
const PORT = 3000;
const middleware = {
  requireAuthentication: (req, res, next) => {
    console.log('Private route hit!');
    next();
  },
  logger: (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${new Date()}`);
    next();
  }
};
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication,  (req, res) => {
  res.send('about us');
});

app.use(express.static(`${__dirname}/public`));
// console.log(__dir);

app.listen(PORT, () => {
  console.log('Express server started!');
});