const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')

require('./config/mongoose')

const port ='3000'
const app = express()
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)


app.use(routes)



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})