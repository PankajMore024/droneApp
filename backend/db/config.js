const mongoose = require ('mongoose');
//using address instaed of localhost to resolve connection error - ref:stackoverflow
mongoose.connect('mongodb+srv://morepankaj024:mNyVEWxuMPht6o9g@maverick.2gdvzk6.mongodb.net/?retryWrites=true&w=majority');
