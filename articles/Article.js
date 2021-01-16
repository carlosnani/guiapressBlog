const Sequelize = require('sequelize');
const connection = require('../database/database');
//Importar o Model com o qual se quer relacionar
const Category = require('../categories/Category');

const Article = connection.define('articles' , {
   title: {
        type: Sequelize.STRING,
        allowNull: false,
   },
   slug: {
       type: Sequelize.STRING,
       allowNull: false,
   },
   body:{
       type: Sequelize.TEXT,
       allowNull: false,
   }
})

Category.hasMany(Article); // Uma categoria tem muitos artigos (1:N)
Article.belongsTo(Category); // Artigo pertence a categoria (1:1)

// Article.sync({force:true});

module.exports = Article;