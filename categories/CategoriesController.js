const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify  = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});


router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    console.log(title);
    if(title != undefined) {
    console.log(title);   

        Category.create({
            title: title,
            slug: slugify(title , { lower: true,}) 
        }).then(() => {
                res.redirect('/admin/categories/');
            }
        );
    } else {
       res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/categories', {categories: categories} );
    })
});

router.get('/categories/delete', (req, res) => {
    let id = req.body.id;

    if(id != undefined) {

        if(!isNaN(id)){

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            }); 

        }else{
            res.redirect('/admin/categories');
        }
    }else{
        res.redirect('/admin/categories');
    }

});
 
module.exports = router;