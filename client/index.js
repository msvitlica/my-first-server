function onLoad(){
    displayNews();
};

function addNews(){
    const xhttp = new XMLHttpRequest();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    let news = {
        title: title,
        content: content,
    }

    xhttp.open('POST',"http://localhost:3000/",false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(news));  
   

    close();
    document.getElementById('title').value='';
    document.getElementById('content').value='';
    this.onLoad();
}

function openDialog(){
    document.getElementById('addNewsDialog').style.display = 'block';
}

function close() {   
    document.getElementById('addNewsDialog').style.display = 'none';
}

function deleteNews(id){
    const xhttp = new XMLHttpRequest(); 
    xhttp.open('DELETE', `http://localhost:3000/${id}`,false);
    xhttp.send();
    this.onLoad();
    
}

function editNews(){
    
}
function displayNews(){
   const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send()
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
                        <button id="deleteNews' +${news.id} +'">Obrisi</button>
                        <button id="editNews' + ${news.id}+'">Izmijeni</button>                 
                   </div>
                </div>
        ` 
        newsDiv.innerHTML = x;
        divContainer.appendChild(newsDiv);
        const deleteBtn = document.getElementById(`deleteNews' +${news.id} +'`);
        deleteBtn.addEventListener('click', function () { deleteNews(news.id) });
      // const editBtn = document.getElementById(`editNews' + ${news.id}+' `);
       // editBtn.addEventListener('click', function () { editNews(news.id) });
    });
}
