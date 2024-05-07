const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_LOCAL);
        console.log('MongoDB online');
    }
    catch (error) {
        console.log(error);
        throw new Error("Coudn't connect to DB ");
    }
};

module.exports = {
    dbConnection
};
