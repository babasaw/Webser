const express = require('express');
let request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const app = express();
app.use(bodyParser.json());
app.use('/public', express.static('./public'));

var lat = 70;
var lon = 110;

app.set('view engine', 'ejs');

app.get('/bas', function(req, res) {
    if(req.query.lat){
        lat = parseFloat(req.query.lat);
    }

    if(req.query.lang){
        lon = parseFloat(req.query.lang);
    }

    let url=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e1494ad778b2bcf188c0bfd806adf77d`; 
axios.get(url).then(result => {
        var data = result.data;
        res.write("<h1>"+'City Name: ' + data['name'] + '<br>' + "</h1>" );
        res.write("<h2>"+'Temperature: ' + data.main['temp'] + '<br>' + "</h2>" );
        res.write("<h3>"+'Wind Speed: ' + data.wind['speed'] + '<br>' + "</h2>" );
        //res.write("<h2>"+'Sunset Time - : ' + new Date(data.sys['sunset']*1000)  + "</h2>" );
        res.write("</div></body></html>");
        res.end();
    }).catch(error => {
        console.log(error);
        res.send({
            succes: false,
            error: error
        });
    });  
})

app.get('/sab', function(req, res) {
    res.render('index');
})

app.listen(process.env.PORT || 5000, function(){
    console.log('app ready');        
})