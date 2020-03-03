var path = require('path')
var logger = require('morgan')
var express = require('express')
const cors = require('cors')
var passport = require('passport')
var createError = require('http-errors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config()

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var eventsRouter = require('./routes/events')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/events', eventsRouter)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`))

app.use(passport.initialize())
require('./routes/passport/passport')(passport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(400 || 500)
  res.render('error')
})

module.exports = app
