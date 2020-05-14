const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let newsList = [];

app.get('/', (req, res) => {   
   
    res.json(newsList);
    
});
app.post('/', (req, res)=>
{
    const news = req.body;
    news.id = uuid.v4();

    newsList.push(news);

    res.send('news added');

});

app.delete('/:id', (req, res) => {
    const newsId = req.params.id;

    newsList = newsList.filter(news => news.id !== newsId);
    res.json(newsList);
    console.log(`News with id of ${newsId} has been deleted!`);
});

app.listen(port, () => {
    
    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({ id: uuid.v4(), title:'Kovid 19', content:'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih'});
}
);