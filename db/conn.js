const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected...");
}).catch((e) => {
    console.log("Database Not Connected" , e);
})