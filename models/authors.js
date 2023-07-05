module.exports = (mongoose) => {
    const authorSchema = mongoose.Schema({
        "name": {
            "type": "String"
        },
        "companyName": {
            "type": "String"
        },
        "description": {
            "type": "String"
        },
        "photo": {
            "type": "String"
        }
    })
  
    return mongoose.model('authors', authorSchema);
  };