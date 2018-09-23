const router = require('express').Router();

const booksController = require('../../controller/books.controller');

const checkAuth = require('../../middleware/check-auth');

router.get('/listings' , booksController.getBooks);

router.post('/listings/id' , booksController.getBookItem);

router.post('/add-listing' , checkAuth ,  booksController.addBook);

router.post('/add-wishlist' , checkAuth , booksController.addToWishlist);



module.exports = router;
