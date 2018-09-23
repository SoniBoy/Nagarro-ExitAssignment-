const router = require('express').Router();

const UserController = require('../../controller/users.controller');
const checkAuth = require('../../middleware/check-auth');

router.post('/signup' , UserController.userSignUp);

router.post('/login' ,  UserController.userLogin);

router.get('/wishlist' , checkAuth , UserController.userWishlist);



module.exports = router;
