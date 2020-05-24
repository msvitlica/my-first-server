let news;
function onLoad() {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send();

    const newsList = JSON.parse(xhttp.responseText);

    displayNews(newsList);
}

function displayNews(array){
    document.getElementById('news').innerHTML = '';

    array.forEach(n => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-4';
        const x = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${n.title}</h5>
                        <h6>${n.content}</h6>
                        <button id="modify${n.id}">Izmjeni</button>
                        <button id="delete${n.id}">Obriši</button>
                    </div>
                </div>
        `
        articleDiv.innerHTML = x;
        document.getElementById('news').appendChild(articleDiv);
        const deleteNewsBtn = document.getElementById(`delete${n.id}`);
        const modifyNewsBtn = document.getElementById(`modify${n.id}`);
        deleteNewsBtn.addEventListener('click', () => { onDeleteNewsClick(n.id) });
        modifyNewsBtn.addEventListener('click', () => { onEditNewsClick(n.id) });
    });
}

function addNews() {
    const xhttp = new XMLHttpRequest();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if(!news) {
        news = {
            title: title,
            content: content,
        }
    
        xhttp.open('POST', "http://localhost:3000/", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(news));
        news = null;
    }
    else {
        news.title = title;
        news.content = content;

        xhttp.open('PUT', `http://localhost:3000/${news.id}`, false);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(news));
        news = null;
    }

    close();
    onLoad();
}

function onDeleteNewsClick(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.open('DELETE', `http://localhost:3000/${id}`, false);
    xhttp.send();
    onLoad();
}

function onEditNewsClick(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/${id}`, false);
    xhttp.send();
    news = JSON.parse(xhttp.responseText);
    const newsTitle = document.getElementById('title');
    const newsContent = document.getElementById('content');
    newsTitle.value = news.title;
    newsContent.value = news.content;
    openDialog();
}
function clearModalForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}
const closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', close);

function openDialog() {
    document.getElementById('addNewsDialog').style.display = 'block';
}

function close() {
    document.getElementById('addNewsDialog').style.display = 'none';
    clearModalForm();
}

function newsSearch() {
    let queryParametar = document.getElementById('search').value;
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/search?q=${queryParametar}`, false);
    xhttp.send();

    const response = JSON.parse(xhttp.response);

    displayNews(response);
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', newsSearch);