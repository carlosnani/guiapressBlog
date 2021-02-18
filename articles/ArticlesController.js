const express = require('express');
const router = express.Router();

const Category = require('../categories/Category');

const Article = require('./Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
       Article.findAll({
        include: [{model: Category}]// puxa os dados da tabela Category por causa do relacionamento. 
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
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title, { lower: true,}),
        body: body,
        categoryId: categoryId,
    }).then(() => {
        res.redirect('/admin/articles');
    });
})

router.post('/articles/delete', (req, res) => {
    var id = req.body.id;
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
    let id = req.params.id;
    Article.findByPk(id).then((article) => {
        if(article !== undefined) {
            Category.findAll().then(category => {
                res.render('./admin/articles/edit', {category: category, article:article})
            })            
        } else {
            res.redirect('./admin/article');
        }
    }).catch((err) => {
            res.redirect('./admin/article');
    })
});
 
 
module.exports = router;