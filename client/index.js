
function onLoad() {
    displayNews();
};

function addNews() {
    const xhttp = new XMLHttpRequest();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
 
        news = {
            title: title,
            content: content,
        }
        xhttp.open('POST', 'http://localhost:3000/', false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(news));
    close();
    onLoad();
}
function addEditedNews(id){
    let news={};
    const xhttp= new XMLHttpRequest();
    const title = document.getElementsByClassName('_title');
    const content = document.getElementById('_content');
      news.title = title.value;
     news.content= content.value;

    xhttp.open('PUT', `http://localhost:3000/${id}`,false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(news));
    closeAndDeleteInput();
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
    const news= JSON.parse(xhttp.responseText);
    const title = document.getElementById('_title');
    const content = document.getElementById('_content');
     title.value= news.title;
     content.value= news.content;
     openEditDialog();
}

function displayNews(){
   const xhttp = new XMLHttpRequest();
   xhttp.open("GET", "http://localhost:3000/", false);
   xhttp.send();
    const newsList = JSON.parse(xhttp.responseText);
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
  function openEditDialog(){
    document.getElementById('addEditedNewsDialog').style.display = 'block';
  }
  function closeEditDialog(){
    document.getElementById('addEditedNewsDialog').style.display = 'none';
  }
function close() {                                 
    document.getElementById('addNewsDialog').style.display = 'none';
    deleteInputFields();
}
function closeAndDeleteInput(){
    document.getElementById('addEditedNewsDialog').style.display = 'none';
    deleteEditedInputFields();
}
function deleteInputFields(){
    document.getElementById('title').value='';
    document.getElementById('content').value='';
}
function deleteEditedInputFields(){
    document.getElementById('_title').value='';
    document.getElementById('_content').value='';
}
