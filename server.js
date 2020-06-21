const express = require('express');
var http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const uuid = require('uuid');
const port = 3000;


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let newsList = [];
// search news
app.get('/find', (req, res) => {
    const x = req.query.x;
    const result = newsList.filter(el => 
        el.title.toLowerCase().includes(x) || el.content.toLowerCase().includes(x)
        );
    res.json( result);    
});

// get all news 
app.get('/', (req, res) => {
    res.json(newsList);   
});
// add news
app.post('/', (req, res) => {
    const news = req.body;
    news.id = uuid.v4();
    newsList.push(news);

    res.json(news);
    console.log(news);

});

// delete news
app.delete('/:id', (req, res) => {
    const newsId = req.params.id;
    newsList=newsList.filter(el => el.id !== newsId);
    res.send(newsList);    
});

// update news
app.get('/:id', (req,res)=>{
    const newsId= req.params.id;
    const result = newsList.filter(el=> el.id=== newsId)[0];
    if(!result){
        res.send('element not found');
    }
    res.send(result);
    console.log(result);
})
app.put('/:id',(req,res)=>{
    console.log(req.params.id);
    const newsBody= req.body;
    console.log(newsList);

    const elementToUpdate = newsList.filter(el => el.id === req.params.id)[0];
   
    elementToUpdate.title = newsBody.title;
    elementToUpdate.content = newsBody.content;
    
    res.json(newsList);
    console.log(newsList);
})

app.listen(port, () => {

    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({
        id: uuid.v4(),
        title: 'Kovid 19',
        content: 'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih'
    });

});


