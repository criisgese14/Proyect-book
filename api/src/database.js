const mongoose = require('mongoose');

(async () => {
    try {
        const db = await mongoose.connect(`mongodb://localhost/booksDb`);
        console.log('database is connected to:', db.connection.name);
    } catch (error) {
        console.log('hubo un error al conectar con la base', error);
    };
})();

module.exports = mongoose;