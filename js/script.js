///////////Variables
let searchButton = document.querySelector('.search-button');
let initialGoogleObjects = [];
let valuableGoogleObjects = [];

//////////Google
//Functions
function drillDownGoogle() {
  for (let index = 0; index < 9; index++) {
    let tryObject = {};
    try {
      tryObject.Title = initialGoogleObjects[0].items[index].volumeInfo.title;
    } catch {
      tryObject.Title = 'Title Unavaliable.';
    }
    try {
      tryObject.Author =
        initialGoogleObjects[0].items[index].volumeInfo.authors[0];
    } catch {
      tryObject.Author = 'Author unknown.';
    }
    try {
      tryObject.Published =
        initialGoogleObjects[0].items[index].volumeInfo.publishedDate;
    } catch {
      tryObject.Published = 'Publishing information unavaliable.';
    }
    try {
      tryObject.ISBN_10 =
        initialGoogleObjects[0].items[
          index
        ].volumeInfo.industryIdentifiers[0].identifier;
    } catch {
      tryObject.ISBN_10 = 'ISBN unavaliable.';
    }
    try {
      tryObject.Image =
        initialGoogleObjects[0].items[index].volumeInfo.imageLinks.thumbnail;
    } catch {
      tryObject.Image = 'images/placeholder.png';
    }
    valuableGoogleObjects.push(tryObject);
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
                <a class="card--link" href="data.html">Timesify</a>
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
      initialGoogleObjects.push(json);
    })
    .then(() => {
      drillDownGoogle();
    })
    .then(() => {
      createBookCards(valuableGoogleObjects);
    })
    .then(() => {
      initialGoogleObjects = [];
      valuableGoogleObjects = [];
    })
    .catch(() => {
      console.log('error');
    });
});
