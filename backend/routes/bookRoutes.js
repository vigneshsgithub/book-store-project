import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();


//giving conditions as if the input fileds are not filled it will send a message
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.PublishYear) {
            return res.status(400).send({
                message: 'Please fill in all the fields '
            })
        }

        //creating a new book (object)
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            PublishYear: req.body.PublishYear
        };

        //adding this newBook to the database

        const book = await Book.create(newBook);


        //now that it is created now we are sending it as a response

        return res.status(201).json(book);

        //if any occurs it will send a message
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//Route for getting all books(i.e writing the code here itself using mongoose to write queries in Mongo Db);

//to get all books use - Find({});

//also dynamic routes using id use- findById;
// GET all books
router.get('/', async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(200).json({ data: books });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


// to show specific book use -
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);

        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (err) {
        console.log("this is the error", err);
        res.send({ message: err.message });
    }
});

//update a book
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).send("couldn't update the book");
        }
        return res.status(200).send({ message: "Book updated successfully" })
    } catch (err) {
        console.log({ message: err.message });
    }
})


//Delete a book

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // Ensure you are looking for the correct book in the database
    Book.findByIdAndDelete(id)
      .then((result) => {
        if (result) {
          res.status(200).send('Book deleted');
        } else {
          res.status(404).send('Book not found');
        }
      })
      .catch((err) => {
        res.status(500).send('Error deleting book');
      });
  });

export default router;

