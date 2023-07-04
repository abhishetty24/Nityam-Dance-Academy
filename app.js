const express= require("express");
const app=express();
const path= require("path");
const bodyparser = require("body-parser"); 
const port=8000;

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Defining Mongoose Schema 
const contactSchema = new mongoose.Schema({
    name1: String,
    gender:String,
    age:String,
    dance_profile:String,
    batch_timing:String,
    phone: String,
    email: String,
    address: String,
});
const Contact = mongoose.model('Contact', contactSchema);

const feedbacksSchema = new mongoose.Schema({
    feedname: String,
    batchyear:String,
    feed_age:String,
    dance_profile_feed:String,
    rating:String,
    fav_teacher:String,
    fav_teacher_reason:String,
    dislike_teacher:String,
    dislike_teacher_reason:String,
});
const feedbacks = mongoose.model('feedbacks', feedbacksSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());      // urlencoded parses incoming requests and here it is used to  display user's form input to us


// PUG SPECIFIC STUFF
app.set('view engine','pug')        // 3.2 Set the template engine for pug 
app.set('views',path.join(__dirname,'views'))   // 3.3 Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const params ={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("You are Sucessfully Registered")
    }).catch(()=>{
        res.status(400).send("An Error Occured Please Try again later")
    });
})
app.post('/feedback',(req,res)=>{
    var myData1=new feedbacks(req.body);
    myData1.save().then(()=>{
        res.send("Your Feedback has been Submitted")
    }).catch(()=>{
        res.status(400).send("An Error Occured Please Try again later")
    });
})
app.get('/courses',(req,res)=>{
    const params ={};
    res.status(200).render('courses.pug',params);
})
app.get('/aboutus',(req,res)=>{
    const params ={};
    res.status(200).render('aboutus.pug',params);
})
app.get('/feedback',(req,res)=>{
    const params ={};
    res.status(200).render('feedback.pug',params);
})

// START THE SERVER 
app.listen(port,()=>{
    console.log(`The Application successfully started at ${port}`);
})
