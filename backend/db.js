const Sequelize = require('sequelize');

const db = new Sequelize('shopdb' , 'shopper' , 'shoppass' , {

  host: 'db4free.net' ,
  dialect: 'mysql' ,
  operatorsAliases: false,

});



//Models/tables

// users

const User = db.define('users' , {

    userId: {
   type: Sequelize.INTEGER ,
   primaryKey: true ,
   unique: true ,
   allowNull: false ,
   autoIncrement: true ,

  } ,

  userName: {
    type: Sequelize.STRING ,
    allowNull: false ,
    validate: {
    notEmpty: true
    }

  } ,

  userMail: {
    type: Sequelize.STRING ,
    unique: {
      args: true ,
      msg: 'email you entered is already registered'
    } ,
    validate: {
      isEmail: {
        args: true ,
        msg: 'email you entered is invalid'
      }
    }
  } ,

  userPassword : {
    type: Sequelize.STRING(1234) ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }

  }

});

// books

const Book = db.define('books' ,  {

  bookId: {
    type: Sequelize.INTEGER ,
    primaryKey: true ,
    unique: true ,
    allowNull: false ,
    autoIncrement: true ,

   } ,

  seller: {
    type: Sequelize.INTEGER ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }

  } ,

  bookName: {
    type: Sequelize.STRING ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }

  } ,

  authorName: {
    type: Sequelize.STRING ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }

  } ,

  bookPrice: {
    type: Sequelize.DOUBLE ,
    allowNull: false  ,
    validate: {
      min: {
        args: 1 ,
        msg: 'please provide a valid price'
      }
    }
  } ,

  bookCondition: {
    type: Sequelize.ENUM ,
    values: ['New' , 'Almost New' , 'Slight Damage' , 'Worn']
  } ,

  bookImageUrl :{
    type: Sequelize.STRING(1234) ,

  }





});

// wishlists

const Wishlist = db.define('wishlists' , {

  id: {
    type: Sequelize.INTEGER ,
    primaryKey: true ,
    unique: true ,
    allowNull: false ,
    autoIncrement: true ,

   } ,

  userId: {
    type: Sequelize.INTEGER ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }


   } ,

   bookId: {
    type: Sequelize.INTEGER ,
    allowNull: false ,
    validate: {
      notEmpty: true
    }

   }





});



//Relations/associations

// 1:m association
User.hasMany(Book , {foreignKey: 'seller'});
Book.belongsTo(User , {foreignKey: 'seller'});

// m:n  associations
User.belongsToMany(Book  , {as: 'interested' , through: Wishlist , foreignKey: 'userId'});
Book.belongsToMany(User , {through: Wishlist , foreignKey: 'bookId'});




db.sync()
.then(() => console.log('database has been synced'))
.catch((err) => console.log('error creating database'));


module.exports = {
  User , Book , Wishlist , db
}
