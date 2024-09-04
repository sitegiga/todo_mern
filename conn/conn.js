const mongoose = require('mongoose')

const conn = async () => {
    try {
        await mongoose
    .connect('mongodb+srv://sitegiga5:p%40kistan123@cluster0.thuuh.mongodb.net/')
    .then(() => {
        console.log('Connected');
        
    });
    } catch (error) {
        res.status(400).json({message: 'Not Connected'})
    }
}

conn();