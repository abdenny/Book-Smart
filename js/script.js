///////Google book intial query
let googleBookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
let userInput = 'mistborn';
fetch(googleBookUrl + `${userInput}` + googleBookKey)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
  });

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
