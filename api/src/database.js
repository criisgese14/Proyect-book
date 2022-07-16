const mongoose = require('mongoose');

(async () => {
    try {
        const db = await mongoose.connect(`mongodb://localhost/booksDb`);
        console.log('Database is connected to:', db.connection.name);
    } catch (error) {
        console.log('Failed to connect to database', error);
    };
})();

module.exports = mongoose;