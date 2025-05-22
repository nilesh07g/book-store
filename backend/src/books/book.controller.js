const Book = require("./book.model");

const PostABook = async (req, res) => {
    console.log(req.body)
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book created successfully",book: newBook});

        
    } catch (error) {
        console.error("Error creating book",error);
        res.status(500).send({message: "Failed to create a book"});
        
    }
    
  }

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send({message: "Books fetched successfully",books: books});
        
    } catch (error) {
        console.error("Error getting all books",error);
        res.status(500).send({message: "Failed to get all books"});
        
    }

    
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book =  await Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).send(book)
        
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
    }

}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({message: "Failed to update a book"})
    }
}

//delete a book by id 
const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
};


module.exports = {
    PostABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}