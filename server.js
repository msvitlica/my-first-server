const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});
app.get('/dobar-dan', (req, res) => {
    res.send('Dobri denj ' + req.query.name);
});
app.get('/books', (req, res) => {
    let q = req.query.q;
    let books =  [
        {name:"Na Drini Cuprija", year:1987},
     {name:"Prohujalo sa", year:1855}];     
     if(q){
    res.send(books.filter(b => b.name.startsWith(q)));
     }
     else{
         res.send(books);
     }
});
app.listen(port, () => console.log('Hello world app listening on port ${port}!'))