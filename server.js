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

// Adding new article request

app.post('/', (req, res) => {
    const news = req.body;
    news.id = uuid.v4();

    newsList.push(news);

    res.send('news added');

});

// News deleting request

app.delete('/:id', (req, res) => {
    const newsId = req.params.id;

    newsList = newsList.filter(news => news.id !== newsId);
    res.json(newsList);
    console.log(`News with id of ${newsId} has been deleted!`);
});

// News search

app.get('/search', (req, res) => {
    const queryParam = req.query.q;

    let searchedContent = newsList.filter(news => {
        if(news.title.includes(queryParam) || news.content.includes(queryParam)){
            return news;
        }
    });

    res.json(searchedContent);
});

// News editing request

app.get('/:id', (req, res) => {
    const articleId = req.params.id;
    const article = newsList.filter(a => articleId === a.id)[0];
    res.send(article);
});

app.put('/:id', (req, res) => {
    const editedArticle = req.body;
    newsList.forEach(a => {
        if (a.id === req.params.id) {
            a.title = editedArticle.title;
            a.content = editedArticle.content;
        }
    });
    res.send('Article updated!');


});

app.listen(port, () => {

    console.log(`Hello world app listening on port ${port}!`)
    newsList.push({ id: uuid.v4(), title: 'Kovid 19', content: 'Prema najnovijim informacijama, u poslednja 24 sata u Srbiji testirano je 5.728 uzoraka osoba koje su zadovoljavale kriterijume slučaja, od čega je 89 pozitivnih' });
});