const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./utils/validators/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый роут не найден'));
});
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
