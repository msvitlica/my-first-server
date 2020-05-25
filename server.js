const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const uuid = require('uuid');
const port = 3000;
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let newsList = [];

app.get('/', (req, res) => {
    res.json(newsList);
    res.send(newsList);
});

app.post('/', (req, res) => {
    const news = req.body;
    news.id = uuid.v4();
    newsList.push(news);

    res.json(newsList);
    console.log(news);

});
app.delete('/:id', (req, res) => {
    const newsId = req.params.id;
    newsList=newsList.filter(el => el.id !== newsId);
    res.send(newsList);
    console.log("news deleted.");
});

app.get('/:id', (req,res)=>{
    const newsId= req.params.id;
    newsList= newsList.filter(el=> el.id=== newsId)[0];
    res.send(newsList);
})
app.put('/:id',(req,res)=>{
    const newsBody= req.body;
newsList = newsList.forEach(el=>{
        if( el.id=== req.params.id){
            el.title= newsBody.title;
            el.content= newsBody.content;
        }
    });
    res.json(newsList);
})


app.listen(port, () => {

    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({
        id: uuid.v4(),
        title: 'Kovid 19',
        content: 'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih'
    });

});


