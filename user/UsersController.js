const express = require('express');
const router = express.Router();
const Users = require('./users');


router.get('/admin/users' , (req, res) => {
    res.send('Lista de usuários');
})

router.get('/admin/users/create' , (req, res) => {
    res.render('./admin/user/create');
});

router.post('/user/create' , (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

         
});

module.exports = router;