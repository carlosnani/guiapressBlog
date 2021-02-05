const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database');

//port running 
const port = 8080;

//controllers
const categoriescontroller = require('./categories/CategoriesController');
const articlescontroller = require('./articles/ArticlesController');

//Models
const Articles = require('./articles/Article');
const Category = require('./categories/Category');

//View engine
app.set('view engine', 'ejs');

 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let urlencodedParser = bodyParser.urlencoded({extended: false});
// let jsonParser = bodyParser.json();

// Database
connection.authenticate()
          .then(()=>{
              console.log('Connection established');
          }).catch((error)=>{
            console.error(error);
          })

//Static
app.use(express.static('public'));

//Routers
app.use('/' , categoriescontroller);
app.use('/' , articlescontroller);

app.get('/' , (req, res )=>{
    res.render('index');
});


app.listen(port, ()=>{
    console.log('Serviidor Rodando');
});