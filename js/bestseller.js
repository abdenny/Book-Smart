//// Animations
(function() {
  'use strict';
  var items = document.querySelectorAll('.timeline li');

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add('in-view');
      }
    }
  }

  window.addEventListener('load', callbackFunc);
  window.addEventListener('resize', callbackFunc);
  window.addEventListener('scroll', callbackFunc);
})();

//////////////////
let initialBestSellers = [];
let valuableBestSellers = [];

//functions
function callNYTimes() {
  fetch(
    'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' +
      nyTimesKey,
    { method: 'get' }
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      initialBestSellers.push(json);
    })
    .then(() => {
      drillDownNYTimes();
    });
}

function drillDownNYTimes() {
  for (let index = 0; index < 15; index++) {
    let tryObject = {};
    try {
      tryObject.Rank = initialBestSellers[0].results[index].rank;
    } catch {
      tryObject.Rank = 'Rank Unavaliable.';
    }
    try {
      tryObject.WeeksOnList =
        initialBestSellers[0].results[index].weeks_on_list;
    } catch {
      tryObject.WeeksOnList = 'Ammount of time on the list is unknown.';
    }
    try {
      tryObject.ISBN10 = initialBestSellers[0].results[index].isbns[0].isbn10;
    } catch {
      tryObject.ISBN10 = 'ISBN information unavaliable.';
    }
    try {
      tryObject.Title =
        initialBestSellers[0].results[index].book_details[0].title;
    } catch {
      tryObject.Title = 'Title unavaliable.';
    }
    try {
      tryObject.Author =
        initialBestSellers[0].results[index].book_details[0].author;
    } catch {
      tryObject.Author = 'Author information unavaliable.';
    }
    valuableBestSellers.push(tryObject);
  }
  console.log(valuableBestSellers);
}

callNYTimes();
