const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const newsList = [];

app.get('/', (req, res) => {   
   
    res.json(newsList);
    
});
app.post('/', (req, res)=>
{
    const news = req.body;

    newsList.push(news);

    res.send('news added');

});

app.listen(port, () => {
    
    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({title:'Kovid 19', content:'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih'});
}
);