const express = require('express')
const Sequelize = require('sequelize')
const app = express();
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acme_react')

const Products = conn.define('products', {
  name: conn.Sequelize.STRING
})

const Categories = conn.define('categories', {
  name: conn.Sequelize.STRING
})

Products.belongsTo(Categories)
Categories.hasMany(Products)

conn.sync({force:true, logging: false})
  .then(()=>{
    Promise.all([
      Products.create({name: 'Apple'}),
      Products.create({name: 'Orange'}),
      Products.create({name: 'Banana'}),
      Products.create({name: 'Samsung'}),
      Categories.create({name: 'fruits'}),
      Categories.create({name: 'electronics'})
    ])
})

app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

app.use(express.static(__dirname));

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/views/index.html')
})

app.get('/products', (req, res, next) => {
	Products.findAll()
		.then(results => res.send(results))
    .catch(next)
})

app.get('/products/:id', (req, res, next) => {
  Products.findById(req.params.id)
    .then( products => res.send(products) )
    .catch(next)
})

app.get('/categories', (req, res, next) => {
	Categories.findAll()
		.then(results => res.send(results))
    .catch(next)
})

app.listen(3000, ()=> console.log('LISTENING'))