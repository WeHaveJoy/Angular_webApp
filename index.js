const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const sequelize = require('./config/database');


const app = express();
const PORT = 3000;

require('./config/Passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);
    req.login(user, (err) => {
      if (err) return next(err);
      return res.send('Logged in');
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

app.post('/api/data', (req, res) => {
  const dataPacket = req.body;
  // Assuming you have a Data model
  // Data.create(dataPacket)
  //   .then(data => res.json(data))
  //   .catch(err => res.status(400).json('Error: ' + err));
  res.send('Data received');
});

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('Error: ' + err));
