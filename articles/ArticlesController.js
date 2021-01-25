const express = require('express');
const router = express.Router();

const Category = require('../categories/Category');

const Article = require('./Article');
const slugify = require('slugify');

 
router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then((category) => {
        res.render('./admin/articles/new', {category: category}); 
    })    
});

router.post('/articles/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title, { lower: true,}),
        body: body,
        categoryid: categoryid
    });
})


 
module.exports = router;