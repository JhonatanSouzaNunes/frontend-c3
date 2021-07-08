const mongoose = require('mongoose');

let srtConnection = process.env.NODE_ENV === 'development' ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`:
`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@devwebii.i6hua.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;


console.log(srtConnection);

mongoose.connect(srtConnection,{
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo:'));
db.once('open', function () {
    console.log("Banco de dados Mongo conectado")
});
  
module.exports = db;