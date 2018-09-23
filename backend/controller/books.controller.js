const User = require('../db').User;
const Book = require('../db').Book;
const Wishlist = require('../db').Wishlist;


// get all books
exports.getBooks = (req , res , next) => {

Book.findAll()
.then(books => {
  res.status(200).send({books: books});

})
.catch(err => {
  console.error('could not retrieve books' , err);
  res.status(500).send({message: ' some error occured could not retrieve the books!!'});
});

};

// get book item

exports.getBookItem = (req , res ) => {


  Book.findOne({
    where: {
      bookId: req.body.bookId
    } ,
    include: [{
      model: User ,
      attributes:['userName']
    }]

  })
  .then(bookItem => {
    if(bookItem) {
      res.status(200).send({item: bookItem});

    }
    else {
      res.status(201).send({message: 'the seller removed the book item'})
    }

  })
  .catch(err => {
    console.error('could not retrieve the book item' , err);
    res.satus(500).send({messge: 'some error occured could not retrieve the book item'});
  });

};

// add book item

exports.addBook = (req , res ) => {

  Book.create({
    bookName: req.body.bookName ,
    authorName: req.body.authorName ,
    bookPrice: req.body.bookPrice ,
    bookCondition: req.body.bookCondition ,
    seller: req.userData.userId ,
    bookImageUrl: req.body.bookImageUrl
  })
  .then(() => {
    res.status(200).send({message: 'book was added successfully'})

  })
  .catch(err => {
    console.error('book could not be added' , err);
    res.status(500).send({message: err.message});

  });
};

// add book item to wishlist

exports.addToWishlist = (req , res ) => {
  console.log('in wishlist' , req.body.bookId);
  Wishlist.findOrCreate({
    where: {
      userId: req.userData.userId ,
      bookId: req.body.bookId
    }
  })
  .spread((wish , created) => {
    if(created) {
      res.status(200).send({message: 'successfully added to wishlist'});
    }
    else {
      res.status(201).send({message: 'already added to wishlist'});
    }

  })
  .catch(err => {
    console.log('some error occured could not add to wishlist' , err);
    res.status(500).send({message: 'some error occured could not add to wishlist'})
  })


};





