require('dotenv').config();
const express = require('express');
const { connectToMongoDB } = require('./connection');
const path = require('path')
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictToRole} = require('./middlewares/auth.middleware')

const Url = require('./models/url')

const urlRoute = require('./routes/url.router')
const staticRoute = require('./routes/static.router')
const userRoute = require('./routes/user.router');

const app = express();

//Server Side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.get('/t1/test', async (req,res)=>{
    const allUrls = await Url.find({});
    return res.render('home',{
        urls: allUrls,
    });
})

//connection
connectToMongoDB(process.env.MONGODB_URL).then(()=>console.log("Mongodb Connected"));

//middleWare
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);




//Routing
app.use('/url', restrictToRole(['NORMAL', 'ADMIN']), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);






app.listen(process.env.PORT,()=>{
    console.log(`Server is started on ${process.env.PORT}`);
} )