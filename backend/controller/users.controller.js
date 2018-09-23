const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





const User = require('../db').User;
const Book = require('../db').Book;


// user login
exports.userLogin = (req , res ) => {
  User.findOne({
    where: {userMail: req.body.userMail} ,
    attributes: ['userPassword' , 'userName' , 'userMail' , 'userId']
  })
  .then(user => {
    if(user) {
      bcrypt.compare(req.body.userPassword , user.userPassword)
      .then(result => {
        if(result) {
          let payload = {userId: user.userId , userMail: user.userMail , userName: user.userName };
          let token = jwt.sign(payload , 'secretkey' ,  {expiresIn: '1h'});
          res.status(200).send({token: token , message: 'you are successfully logged in' , expiresIn: 60})
        }
        else {
          res.status(201).send({message: 'password is incorrect'});
        }

      })
      .catch(err => {
        console.error('error occured while verifying password' , err);
        res.status(500).send({message: 'some error occured please try login again'});
      });

    }
    else {
      res.status(201).send({message: 'email you entered is not registered'})
    }

  })
  .catch(err => {
    console.error('error occured while verifying email', err);
    res.status(500).send({message: 'some error occured please try login again'});
  });


};

// user signup
exports.userSignUp = (req , res ) => {

  bcrypt.hash(req.body.userPassword , 10)
  .then (hash => {

   User.create({
     userName: req.body.userName ,
     userMail: req.body.userMail ,
     userPassword: hash
   })
   .then((user) => {
    let payload = {userId: user.userId , userMail: user.userMail , userName: user.userName };
    let token = jwt.sign(payload , 'secretkey');
    res.status(200).send({ token: token , message: 'you are successfully registered' , expiresIn: 60 });
   })
   .catch(err => {
     console.error('some error occured while creating new user' , err)
     res.status(500).send({message: err.message});
    });

 })
  .catch(err => {

    console.error('some error occured while hashing password ' , err);
    res.status(500).send({message: err.message});
  });



};

// user wishlist

 exports.userWishlist = (req , res ) => {

 User.findOne({
   where: {
     userId: req.userData.userId ,

   } ,
   include: [{
     model: Book ,
     as: 'interested' ,

   }]
 })
 .then(books => {
   res.status(200).send({books: books});

 })
 .catch(err => {
   console.log('some error occured could not fetch wishlist' , err);
   res.status(500).send({message: 'some error occured could not fetch wishlist'});
 })


};




