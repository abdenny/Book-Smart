//--------Variables
let searchButton = document.querySelector('#button1');
let object = [];
let valObject = [];
let valObject2 = [];
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
      tryObject.Subtitle = objects[0].items[index].volumeInfo.subtitle;
    } catch {
      tryObject.Subtitle = 'Subtitle N/A.';
    }
    try {
      tryObject.Description = objects[0].items[index].volumeInfo.description;
    } catch {
      tryObject.Description = 'Description unavaliable.';
    }
    try {
      tryObject.Author = object[0].items[index].volumeInfo.authors[0];
    } catch {
      tryObject.Author = 'Author unknown.';
    }
    try {
      tryObject.Pages = objects[0].items[index].volumeInfo.pageCount;
    } catch {
      tryObject.Pages = 'Page Count Unavaliable';
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
    valObject2.push(tryObject);
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
                <a class="card--link" href="#open-modal">View Info</a>
              </div>
              `)
  );
  container.innerHTML = output;
}
function populateModal(populatingItem) {
  modalContent = `
  <div id='open-modal' class='modal-window'>
    <div>
      <a href='#modal-close' title='Close' class='modal-close'>
        close &times;
      </a>
      <h1>${populatingItem.Title || 'Title not avaliable.'}</h1>
      <div>${populatingItem.Subtitle || 'Subtitle not avaliable.'}</div><br>
      <div>Description: ${populatingItem.Description ||
        'Description not avaliable.'}</div><br>
      <div>By: ${populatingItem.Author || 'Author not avaliable.'}</div><br>
      <div>Page count: ${populatingItem.Pages ||
        'Page count unknown.'}</div><br> 
      <div>Published on: ${populatingItem.Published ||
        'Publishing date unknown.'}</div><br>
      <div>ISBN: ${populatingItem.ISBN_10 || 'ISBN unknown.'}
    </div>
  </div>;`;
  cardsContainer.insertAdjacentHTML('afterend', modalContent);
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
    .then(() => {
      objects = [];
      valObject = [];
    })
    .catch(() => {
      console.log('error');
    });
});

cardsContainer.addEventListener('click', e => {
  let cardButton = document.querySelectorAll('.card--link');
  console.log(valObject2);
  if (e.target.className == 'card--link' && e.target == cardButton[0]) {
    populateModal(valObject2[0]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[1]) {
    populateModal(valObject2[1]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[2]) {
    populateModal(valObject2[2]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[3]) {
    populateModal(valObject2[3]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[4]) {
    populateModal(valObject2[4]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[5]) {
    populateModal(valObject2[5]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[6]) {
    populateModal(valObject2[6]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[7]) {
    populateModal(valObject2[7]);
  } else if (e.target.className == 'card--link' && e.target == cardButton[8]) {
    populateModal(valObject2[8]);
  }
});