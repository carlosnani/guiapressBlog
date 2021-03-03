const express   = require('express');
const router    = express.Router();
const Users     = require('./users');
const bcrypt    = require('bcryptjs');
const User      = require('./users');
const adminAuth = require('../middlewares/adminAuth');


router.get('/admin/users' , adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render('./admin/user/index' , {users: users});
    });    
});

router.get('/admin/users/create', adminAuth, (req, res) => {
    res.render('./admin/user/create');
});

router.post('/user/create', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Busca por email duplicados
    User.findOne({where:{ email: email}}).then(user => {
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
        
            User.create(
                {email: email,
                password: hash,
            }).then(() => {
                res.redirect('/admin/users');
            }).catch(err => {
                res.redirect('/admin/users');
            });    
        } else {
            res.redirect('/admin/users/create');
        }
    });   
});


router.get('/login' , (req, res) => {
    res.render('./admin/user/login');
});     

router.post('/user/authenticate' , (req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({where: {email: email}}).then((user) => {
        if(user !== undefined){
            let correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    req.session.user = {
                        id: user.id,
                        enail: user.email,
                    }
                    res.redirect('/admin/articles');
                }else{
                    res.redirect('/login');
                }
        } else {
            res.redirect('/login');
        }    
    });          
});   

router.get('/logout', adminAuth, (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;