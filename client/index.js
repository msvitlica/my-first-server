function onLoad(){
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/", false);
    xhttp.send();

    const newsList = JSON.parse(xhttp.responseText);


    document.getElementById('news').innerHTML = '';

    for (let news of newsList) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <h6>${news.content}</h6>
                    </div>
                </div>
            </div>
        `
        document.getElementById('news').innerHTML += x;
    }
        
}

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
    this.onLoad();
}

function openDialog(){
    document.getElementById('addNewsDialog').style.display = 'block';
}

function close() {   
    document.getElementById('addNewsDialog').style.display = 'none';
}

