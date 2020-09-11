const mongoose = require("mongoose");

const connectDB = async() => {
    const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindandModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB is connected to host: ${con.connection.host}`.blue.bold);
}

module.exports = connectDB;