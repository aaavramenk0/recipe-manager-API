const db = require('../models');
const Author = db.author;

// POST request that creates a new author
module.exports.createAuthor = async (req, res) => {
  try {
    const name = req.body.name;

    if (!name) {
      res.status(400).send({ message: 'Author name cannot be empty!' });
      return;
    }

    const author = new Author({ name });
    const savedAuthor = await author.save();

    res.status(200).send(savedAuthor);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while creating a new author.',
    });
  }
};

// GET request that retrieves all authors
module.exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).send(authors);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while retrieving authors.',
    });
  }
};

// GET request that retrieves an author by ID
module.exports.getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).send({ message: 'Invalid author ID entered.' });
      return;
    }

    const author = await Author.findById(authorId);

    if (!author) {
      res.status(404).send({ message: 'Author not found.' });
      return;
    }

    res.status(200).send(author);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while retrieving the author.',
    });
  }
};

// PUT request that updates an author
module.exports.updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const name = req.body.name;

    if (!authorId) {
      res.status(400).send({ message: 'Invalid author ID entered.' });
      return;
    }

    if (!name) {
      res.status(400).send({ message: 'Author name cannot be empty!' });
      return;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { name },
      { new: true }
    );

    if (!updatedAuthor) {
      res.status(404).send({ message: 'Author not found.' });
      return;
    }

    res.status(200).send(updatedAuthor);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while updating the author.',
    });
  }
};

// DELETE request that deletes an author
module.exports.deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).send({ message: 'Invalid author ID entered.' });
      return;
    }

    const deletedAuthor = await Author.findByIdAndDelete(authorId);

    if (!deletedAuthor) {
      res.status(404).send({ message: 'Author not found.' });
      return;
    }

    res.status(200).send(deletedAuthor);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while deleting the author.',
    });
  }
};