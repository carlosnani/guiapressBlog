const express   = require('express');
const router    = express.Router();

const adminAuth = require('../middlewares/adminAuth');
const Category  = require('../categories/Category');

const Article   = require('./Article');
const slugify   = require('slugify');

router.get('/admin/articles', adminAuth, (req, res) => {
       Article.findAll({
        include: [{model: Category}],
        order: [['id' , 'DESC'],],// puxa os dados da tabela Category por causa do relacionamento. 
       }).then(articles => {
        res.render('admin/articles/index' , {articles: articles}); 
       });      
})


router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then((category) => {
        res.render('./admin/articles/new', {category: category}); 
    })    
});

router.post('/articles/save', (req, res) => {
    let title      = req.body.title;
    let body       = req.body.body;
    let categoryId = req.body.category;

    Article.create({
        title:  title,
        slug:   slugify(title, { lower: true,}),
        body:   body,
        categoryId: categoryId,
    }).then(() => {
        res.redirect('/admin/articles');
    });
})

router.post('/articles/delete', (req, res) => {
    var id      = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            }); 
        }else{
            res.redirect('/admin/articles');
        }
    }else{
        res.redirect('/admin/articles');
    }
});


router.get('/admin/articles/edit/:id', (req, res) => {
    let id      = req.params.id;
    Article.findByPk(id).then((article) => {
        if(article !== undefined) {
            Category.findAll().then(category => {
                res.render('./admin/articles/edit', {category: category, article:article})
            })            
        } else {
            res.redirect('./admin/articles');
        }
    }).catch((err) => {
            res.redirect('./admin/articles');
    })
});

router.post('/articles/update', (req, res) => {
    let id            = req.body.id;
    let title         = req.body.title;
    let body          = req.body.body;
    let categoryId    = req.body.category;

    Article.update({
        title: title,
        body: body,
        categoryId: categoryId,
        slug: slugify(title, { lower: true,}) 
    },{
        where: {id: id},
    }).then(() => {
        res.redirect('/admin/articles');
    }).catch((err) => {
        res.redirect('/admin/articles');
    })
})

router.get('/articles/page/:num', (req, res)=>{
    let page         = req.params.num;
    let offset      = 0;

    if(isNaN(page) || page == 1){ 
        offset = 0;
    } else {
        offset = (parseInt(page) -1) * 4;
    }

    Article.findAndCountAll({ //Essa função restorna os conteúdos em uma row !!!!!!
        limit:  4,     
        offset: offset, 
        order: [['id' , 'DESC'],],
    }).then((articles) => {

        let next;
        if(offset + 4 >= articles.count){
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next : next,
            articles : articles,
        };

        Category.findAll().then((categories) => {
            res.render('./admin/articles/page', {categories: categories, result:result});
            //res.json(result);
        })        
    })
})
 
module.exports = router;