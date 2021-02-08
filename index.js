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
    Articles.findAll({
        include: [{model: Category}],
        order: [['id' , 'DESC'],]
    }).then((articles)=>{
        res.render('index', {articles: articles});
    });
});

app.get('/:slug' , (req ,res)=>{
    let slug = req.params.slug;
    Articles.findAll({
        where: {
            slug: slug,
        }
    }).then((articles)=>{
        if(articles !== undefined){
            res.render('./admin/articles/article.ejs' , { articles: articles });
        } else {
            res.redirect('/');
        }
    }).catch((err)=>{
        res.redirect('/');
    })
})


app.listen(port, ()=>{
    console.log('Serviidor Rodando');
});