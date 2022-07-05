const mongoose = require('mongoose');

const dbConnect = async () => {
    try
    {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } )
        console.log('Database Online')
    }
    catch(error)
    {
        console.log(error)
        throw new Error('Error while trying to initialize database')
    }
}

module.exports = {
    dbConnect
}