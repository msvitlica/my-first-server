var news={};
function onLoad() {
    displayNews();
};

function addNews() {
    const xhttp = new XMLHttpRequest();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
        if(news.id){
            news.title= title;
            news.content= content;
    
            xhttp.open('PUT', `http://localhost:3000/${id}`,false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(news));
            news={};
        }
       else{ 
           news = {
        title: title,
        content: content,
    }
    xhttp.open('POST', 'http://localhost:3000/', false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(news));
    news={};
}   
    close();
    onLoad();
}
function deleteNews(id){
    const xhttp = new XMLHttpRequest(); 
    xhttp.open('DELETE', `http://localhost:3000/${id}`,false);
    xhttp.send();
    onLoad();  
}

function editNews(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `http://localhost:3000/${id}`,false);
    xhttp.send();
    news= JSON.parse(xhttp.responseText);
    const title = document.getElementById('title');
    const content = document.getElementById('content');
     title.value= news.title;
     content.value= news.content;
     openDialog();
}
function findSearchedNews() {
    const xhttp= new XMLHttpRequest();
    const searchedNews = document.getElementById('search').value;
    xhttp.open('GET', `http://localhost:3000/find?x=${searchedNews}`,false);
    xhttp.send();
    const result =JSON.parse(xhttp.responseText);
    displayResults(result);

}

function displayNews(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send();
     let newsList = JSON.parse(xhttp.responseText);
   let divContainer=  document.getElementById('news');
    divContainer.innerHTML = '';
    
newsList.forEach(news=>{
        let newsDiv = document.createElement('div');
        newsDiv.className ='col-4';
        const x = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <h6>${news.content}</h6>
                        <button id= "deleteNews${news.id}">Obrisi</button>
                        <button id= "editNews${news.id}">Izmijeni</button>                 
                   </div>
                </div>
        ` 
        newsDiv.innerHTML = x;
        divContainer.appendChild(newsDiv);
        const deleteBtn = document.getElementById(`deleteNews${news.id}`);
        deleteBtn.addEventListener('click', function () { deleteNews(news.id) });
       const editBtn = document.getElementById(`editNews${news.id}`);
       editBtn.addEventListener('click', function () { editNews(news.id)});
    });
};
function openDialog(){
    document.getElementById('addNewsDialog').style.display = 'block';
  }
  function closeDialog(){
    document.getElementById('addNewsDialog').style.display = 'none';
  }
 
function close() {                                 
    document.getElementById('addNewsDialog').style.display = 'none';
    deleteInputFields();
}

function deleteInputFields(){
    document.getElementById('title').value='';
    document.getElementById('content').value='';
}
function displayResults(resultArray){
   let divContainer=  document.getElementById('news');
    divContainer.innerHTML = '';
    
resultArray.forEach(news=>{
        let newsDiv = document.createElement('div');
        newsDiv.className ='col-4';
        const x = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <h6>${news.content}</h6>
                        <button id= "deleteNews${news.id}">Obrisi</button>
                        <button id= "editNews${news.id}">Izmijeni</button>                 
                   </div>
                </div>
        ` 
        newsDiv.innerHTML = x;
        divContainer.appendChild(newsDiv);
        const deleteBtn = document.getElementById(`deleteNews${news.id}`);
        deleteBtn.addEventListener('click', function () { deleteNews(news.id) });
       const editBtn = document.getElementById(`editNews${news.id}`);
       editBtn.addEventListener('click', function () { editNews(news.id)});
    });
};

