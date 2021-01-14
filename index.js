const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database');


//View engine
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extends:false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
connection.authenticate()
          .then(()=>{
              console.log('Connection established');
          }).catch((error)=>{
            console.error(error);
          })

//Static
app.use(express.static('public'));

//Router
app.get('/' , (req, res )=>{
    res.render('index');
});






app.listen(8080, ()=>{
    console.log('Serviidor Rodando');
});