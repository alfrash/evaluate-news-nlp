const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('dist'))

const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;

console.log(__dirname)
// Routs
// Get
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})



app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Post
app.post('/analyze', async function(req, res){
    url = req.body.url
    const endPoint = `${baseUrl}key=${apiKey}&url=${url}&lang=en`;
    console.log(url)
    console.log(endPoint);
    try {
        const serverRes = await fetch(endPoint);
        const data = await serverRes.json();
        res.send(data);
    } catch (error) {
        res.send("error = " ,error)
    }
    
    

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    
    console.log('Example app listening on port 8081!');
    console.log(`Your API key is ${apiKey}`);
})
