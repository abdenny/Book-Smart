let button = document.querySelector('#button1');
let object = [];

button.addEventListener('click',e => {
  e.preventDefault();
  let input = document.querySelector('#input').value;
  let userInput = input;
  let googleBookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

fetch(googleBookUrl + `${userInput}` + googleBookKey)
  .then(response => {
    return response.json();
  })
  .then(title => {
    console.log(title);
  });
})






//////NYTimes

// fetch(
//   'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' +
//     nyTimesKey,
//   { method: 'get' }
// )
//   .then(response => {
//     return response.json();
//   })
//   .then(json => {
//     console.log(json);
//   });
