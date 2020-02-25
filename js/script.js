//--------Variables
let searchButton = document.querySelector('#button1');
let object = [];
let valObject = [];
//////////Google
//Functions
function drillDownGoogle() {
  for (let index = 0; index < 12; index++) {
    let tryObject = {};
    try {
      tryObject.Title = object[0].items[index].volumeInfo.title;
    } catch {
      tryObject.Title = 'Title Unavaliable.';
    }
    try {
      tryObject.Author = object[0].items[index].volumeInfo.authors[0];
    } catch {
      tryObject.Author = 'Author unknown.';
    }
    try {
      tryObject.Published = object[0].items[index].volumeInfo.publishedDate;
    } catch {
      tryObject.Published = 'Publishing information unavaliable.';
    }
    try {
      tryObject.ISBN_10 =
        object[0].items[index].volumeInfo.industryIdentifiers[0].identifier;
    } catch {
      tryObject.ISBN_10 = 'ISBN unavaliable.';
    }
    try {
      tryObject.Image = object[0].items[index].volumeInfo.imageLinks.thumbnail;
    } catch {
      tryObject.Image = 'images/placeholder.jpg';
    }
    valObject.push(tryObject);
    console.log(valObject);
  }
}
function createBookCards(objToCreateFrom) {
  let container = document.querySelector('.cards-container');
  let output = '';
  objToCreateFrom.forEach(
    ({ Title, Image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${Image} />
                <h1 class="card--title">${Title}</h1>
                <a class="card--link" href="#">Timesify</a>
              </div>
              `)
  );
  container.innerHTML = output;
}



//Event listeners
searchButton.addEventListener('click', e => {
  e.preventDefault();
  let input = document.querySelector('#input').value;
  let userInput = input;
  let googleBookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  fetch(googleBookUrl + `${userInput}` + googleBookKey)
    .then(response => {
      return response.json();
    })
    .then(json => {
      object.push(json);
    })
    .then(() => {
      console.log(object);
      drillDownGoogle();
      // object with title and Title and image
      createBookCards(valObject);
    })
    .catch(() => {
      console.log('error');
    });
});