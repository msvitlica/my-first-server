const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let newsList = [];

app.get('/', (req, res) => {   
    const news = req.body;
    res.json(newsList);    
});

app.get('/', (req, res) => {   
    const news = req.body;
    res.json(newsList);    
});

app.post('/', (req, res)=>
{
    const news = req.body;
    news.id= newsList.length;
    newsList.push(news);

    res.json('news created success');
    console.log(news);

});
app.delete('/:id',(req,res)=>{   
    const newsId = req.params.id;
    console.log(newsId)
    newsList = newsList.filter((el) => {
        if (el.id !== parseInt(newsId)) {
            return el;
        }
    });    
    console.log(newsList.length);
    res.send('deleted id'+newsId);
});

app.listen(port, () => {
    
    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({
        id:0, 
        title:'Kovid 19',
        content:'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih'
    });

});


