const express = require('express');
const {PostABook, getAllBooks, getSingleBook, UpdateBook, deleteABook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();
// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

//post a book 
router.post('/create-book',verifyAdminToken, PostABook)

//get all books
router.get("/",getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id",verifyAdminToken, UpdateBook);

//delete a book 
router.delete("/:id",verifyAdminToken, deleteABook)

  module.exports = router;