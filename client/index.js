function onLoad() {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send();

    const newsList = JSON.parse(xhttp.responseText);


    document.getElementById('news').innerHTML = '';

    newsList.forEach((news) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-4';
        const x = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <h6>${news.content}</h6>
                        <button id="modify${news.id}">Izmjeni</button>
                        <button id="delete${news.id}">Obriši</button>
                    </div>
                </div>
        `
        articleDiv.innerHTML = x;
        document.getElementById('news').appendChild(articleDiv);
        const deleteNewsBtn = document.getElementById(`delete${news.id}`);
        deleteNewsBtn.addEventListener('click', () => { deleteNews(news.id) });
    });

}

function addNews() {
    const xhttp = new XMLHttpRequest();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    let news = {
        title: title,
        content: content,
    }

    xhttp.open('POST', "http://localhost:3000/", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(news));

    close();
    this.onLoad();
}

function deleteNews(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.open('DELETE', `http://localhost:3000/${id}`, false);
    xhttp.send();
    onLoad();
}

function openDialog() {
    document.getElementById('addNewsDialog').style.display = 'block';
}

function close() {
    document.getElementById('addNewsDialog').style.display = 'none';
}

