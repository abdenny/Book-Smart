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
  let covers = [];
  
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
      })
      .then(() => {
        for (let index = 0; index < 15; index++) {
          let card = document.getElementById(`${index}`);
          let image = 'http://placecorgi.com/250';
          card.innerHTML = `
          <img id="image${index}" src=${image} /><br>
          ${valuableBestSellers[index].Rank}.<br>
          ${valuableBestSellers[index].Title}<br>
          ${initialBestSellers[0].results[index].book_details[0].author}<br>
          Weeks as a Best Seller: ${initialBestSellers[0].results[index].weeks_on_list}<br>
          <p class="hidden" id="isbn${index}">${valuableBestSellers[index].ISBN10}</p>
          `;
        }
      })
      .then(() => {
        pullCoversandReplaceFromOpenLibrary();
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
  }
  
  function pullCoversandReplaceFromOpenLibrary() {
    let openLibraryUrl = 'http://covers.openlibrary.org/b/isbn/';
    for (let index = 0; index < 15; index++) {
      let isbn = document.querySelector(`#isbn${index}`).innerHTML;
      let image = document.querySelector(`#image${index}`);
      image.src = openLibraryUrl + `${isbn}-M.jpg`;
    }
  }
  
  callNYTimes();
// // Create a lightbox
// (function() {
//     var $lightbox = $("<div class='lightbox'></div>");
//     var $img = $("<img>");
//     var $caption = $("<p class='caption'></p>");
//     var $header = $("<h2 class ='header'>Testing</h2>");

  
//     // Add image and caption to lightbox
  
//     $lightbox
//     //   .append($title) // h2
//       .append($img)
//       .append($caption)
//       .append($header)
    
  
//     // Add lighbox to document
  
//     $('body').append($lightbox);
  
//     $('.lightbox-gallery img').click(function(e) {
//       e.preventDefault();
  
//       // Get image link and description
//       var src = $(this).attr("data-image-hd");
//       var cap = $(this).attr("alt");
//       // ep's
//       let h1 = $('<h1/>').text = img.data-book-author
  
//       // Add data to lighbox
  
//       $img.attr('src', src);
//       $caption.text("This is info about a book \nDown here is the title\nher's author\nhere's isbn");
//       $title.text(title);
  
//       // Show lightbox
  
//       $lightbox.fadeIn('fast');
  
//       $lightbox.click(function() {
//         $lightbox.fadeOut('fast');
//       });
//     });
  
//   }());







// ////////variables//////////
// let initialBestSellers = [];
// let valuableBestSellers = [];
// let covers = [];





// //functions
// function callNYTimes() {
//     fetch(
//       'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' +
//         nyTimesKey,
//       { method: 'get' }
//     )
//       .then(response => {
//         return response.json();
//       })
//       .then(json => {
//         initialBestSellers.push(json);
//       })
//       .then(() => {
//         drillDownNYTimes();
//       })
//       .then(() => {
//         for (let index = 0; index < 12; index++) {
//             let anchorbox = [{
//                 Title:valuableBestSellers[index].Title,
//                 Image:"http://via.placeholder.com/100x200png"
//             }];
//             // createBookCards(anchorbox);

//         //   anchor.innerHTML = `
//         //   <img id="image${index}" src=${image} data-book-author="${book.author}"/><br> 
//         //   ${valuableBestSellers[index].Rank}<br>
//         //   ${valuableBestSellers[index].Title}<br>
//         //   ${initialBestSellers[0].results[index].book_details[0].author}<br>
//         //   Weeks as a Best Seller: ${initialBestSellers[0].results[index].weeks_on_list}<br>
//         //   <p class="hidden" id="isbn${index}">${valuableBestSellers[index].ISBN10}</p>
//         //   ` // Added data-book-author;
//         }
//       })
//       .then(() => {
//         pullCoversandReplaceFromOpenLibrary();
//       });
//   }
  
//   function drillDownNYTimes() {
//     for (let index = 0; index < 12; index++) {
//       let tryObject = {};
//       try {
//         tryObject.Rank = initialBestSellers[0].results[index].rank;
//       } catch {
//         tryObject.Rank = 'Rank Unavaliable.';
//       }
//       try {
//         tryObject.WeeksOnList =
//           initialBestSellers[0].results[index].weeks_on_list;
//       } catch {
//         tryObject.WeeksOnList = 'Ammount of time on the list is unknown.';
//       }
//       try {
//         tryObject.ISBN10 = initialBestSellers[0].results[index].isbns[0].isbn10;
//       } catch {
//         tryObject.ISBN10 = 'ISBN information unavaliable.';
//       }
//       try {
//         tryObject.Title =
//           initialBestSellers[0].results[index].book_details[0].title;
//       } catch {
//         tryObject.Title = 'Title unavaliable.';
//       }
//       try {
//         tryObject.Author =
//           initialBestSellers[0].results[index].book_details[0].author;
//       } catch {
//         tryObject.Author = 'Author information unavaliable.';
//       }
//       valuableBestSellers.push(tryObject);
//     }
//   }
  
//   function pullCoversandReplaceFromOpenLibrary() {
//     let openLibraryUrl = 'http://covers.openlibrary.org/b/isbn/';
//     for (let index = 0; index < 12; index++) {
//     //   let isbn = document.querySelector(`#bg${index+1}`).innerHTML;
//         let isbn = valuableBestSellers[index].ISBN10

//       let image = document.querySelector(`#image${index+1}`);
//       image.src = openLibraryUrl + `${isbn}-M.jpg`;
//     }

//   }
  
//   callNYTimes();