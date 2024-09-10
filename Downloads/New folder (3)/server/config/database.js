const mongoose = require('mongoose');
let mongoDb= {
    "username": "gurubilli",
    "password": "gurubilli",
    "dbUrl": "mongodb+srv://gurubilli:gurubilli@cluster0.dlpod.mongodb.net/neokred"
  }
exports.databaseConnection = async () => {
    console.log({ dbUrl: mongoDb.dbUrl });

    await mongoose.connect(mongoDb.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    const db = mongoose.connection;


    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
        console.log('MongoDB connected successfully');
    });

    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });
};

