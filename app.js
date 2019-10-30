const config = require('./config')
const MessageList = require('./routes/messagelist')
const FollowerList = require('./routes/followerlist')
const FetchPush = require('./routes/fetchpush')
const TwitterDataDao = require('./models/twitterDataDAO')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Todo App:
const twitterDataDao = new TwitterDataDao(config.host, config.apiEndpoint, config.functionKey)
const messageList = new MessageList(twitterDataDao)
const followerList = new FollowerList(twitterDataDao)
const fetchPush = new FetchPush(twitterDataDao)


app.get('/', function (req, res) {
  res.render('index', { title: 'Home' })
})
app.get('/messages', (req, res, next) => res.render('messages', { title: 'Messages' }).catch(next))
app.post('/messages', (req, res, next) => messageList.showMessages(req, res).catch(next))
app.get('/followers', (req, res, next) => res.render('followers', { title: 'Followers' }).catch(next))
app.post('/followers', (req, res, next) => followerList.showFollowers(req, res).catch(next))
app.get('/fetchpush', (req, res, next) => res.render('fetchpush', { title: 'Fetch & Push' }).catch(next))
app.post('/fetchpush', (req, res, next) => fetchPush.fetchAndPush(req, res).catch(next))

app.set('view engine', 'jade')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app