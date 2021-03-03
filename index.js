const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database');
const session = require('express-session');

//port running 
const port = 8080;

//controllers
const categoriescontroller = require('./categories/CategoriesController');
const articlescontroller = require('./articles/ArticlesController');
const usercontroller = require('./user/UsersController');

//Models
const Articles = require('./articles/Article');
const Category = require('./categories/Category');
const { use } = require('./user/UsersController');

//View engine
app.set('view engine', 'ejs');

//Redis

//Sessions 
app.use(session({
    secret: 'sflkewofsdlcodwsfsokd',
    cookie: {maxAge: 60000 * 60 },
    resave: false,
    saveUninitialized: true,
}));
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use('/', usercontroller);

app.get('/' , (req, res )=>{
    Articles.findAll({
        order: [['id' , 'DESC'],],
        include: [{model: Category}],
        limit: 4
    }).then((articles)=>{
        Category.findAll({}).then((categories)=>{
            res.render('./index' ,{ articles: articles , categories: categories});
        })

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
            Category.findAll({}).then((categories)=>{
                res.render('./article' , { articles: articles , categories: categories});
            })
        } else {
            res.redirect('/');
        }
    }).catch((err)=>{
        console.log(err)
        res.redirect('/');       
    })
})

app.get('/category/:slug',(req, res)=>{
    let slug = req.params.slug;
    Category.findAll({
        where: { 
            slug: slug
         },
         include: [{model: Articles}]
    }).then((articles)=>{
        if(articles !== undefined){
            Category.findAll({}).then((categories)=>{
                res.render('./categories' , { articles: articles , categories: categories});
            })
        } else {
            res.redirect('/');
        }
    }).catch((err) => {
        res.redirect('/');
    })
})

app.listen(port, ()=>{
    console.log('Serviidor Rodando');
});