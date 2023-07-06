const db = require('../models');
const Author = db.author;

// POST request that create new recipe
module.exports.createAuthor = (req, res) => { 
  try {
    const name = req.body.name;
    if (!req.body.name) {
      res.status(400).send({ message: "Author name can not be empty!" });
      return
    }
    const author = new Author(req.body);
    author.save().then((data) => {
      console.log(data);
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occured while creating new author'
      })
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET request that retrieves all authors from a database
module.exports.getAll = (req, res) => {
    try {
      Author.find({}).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving authors.'
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
}; 

module.exports.updateAuthor = (req, res) => {
  try {
    const _id = req.params.id;
    const name = req.body.name;

    if (!_id) {
      return res.status(400).send({ message: 'Invalid Author ID entered.' });
    }

    if (!name) {
      return res.status(400).send({ message: 'Author name cannot be empty!' });
    }

    Author.findByIdAndUpdate(_id, { name: name }, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Author not found.' });
        }
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while updating the author.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};



// DELETE request that delete the author from the database
module.exports.deleteAuthor = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      res.status(400).send({ message: 'Invalid Author ID Entered' });
      return;
    }
    Author.deleteOne({ _id: _id}).then( function (err, result) {
      if (!err) {
        res.status(500).json(err || 'Some error occurred while deleting the author.');
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the author.');
  }
};