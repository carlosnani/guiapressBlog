const express = require('express');
const router = express.Router();
const Article = require('./Article');
 
router.get('/admin/articles/new', (req, res) => {
    res.render('./admin/articles/new') 
});

 
module.exports = router;