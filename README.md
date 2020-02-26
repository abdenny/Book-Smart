<h1>Book•Smart<h1>

<img src="images/booklogoorange.png">

<h2><u>Overview:</u><h2>
<h4>Book•Smart allows users to search for books and view both current and historical bestseller data from <em>The New York Times</em>.  This web application was designed for book lovers who want to find more information about specific titles, and their respective bestseller history (or lack thereof). Our final product allows the user to search for any book and returns an interactive gallery of titles with the ability to fetch more information about selected titles. Additional features include the ability to see current bestsellers from <em>The New York Times</em>, as well as viewing bestsellers on dates specified by the user. In the future, we would like to incorporate a backend server and database, which will allow the user to create a profile, login, and keep track of books they're interested in or have read. We would also like to implement other APIs which will allow the user to see reviews, and be recommended similar titles (i.e. Goodreads, etc.).</h4>

</br>

<h2><u>The Team:</u></h2>

<h3>Austin Denny: https://github.com/abdenny</h3>
<b>Primary team role:</b> APIs, JavaScript writer, Scrum/Agile, prototype/concepting
</br>
<b>Contributions:</b> JavaScript for all pages. Implemented our stretch goal of allowing users to search for bestseller data on specific dates and displaying those on the specificbook page. Developed JavaScript functions to efficiently obtain information from three different APIs, which often involved passing information retrieved from one API to another.

<h3>Meryem Komur: https://github.com/meryemkmr</h3>
<b>Primary team role:</b> Front-end markup and styling, prototype/concepting
</br>
<b>Contributions:</b> Main focus was HTML, CSS, JavaScript and jQuery for myPlaces and Search pages. Focused our Flickr API search after running into roadblocks. Deployed responsive design while collaborating with team as well as consistent design throughout all pages, navigation, and footers.

<h3>Jaye Jensen: https://github.com/jaye-j</h3>
<b>Primary team role:</b> Front-end formatting and styling, Graphic Designer, Scrum/Agile, prototype/concepting,
</br>
<b>Contributions:</b> HTML and CSS for all pages. Implemented JavaScript neccasary for animations on the home, current bestsellers, and find bestsellers pages. Designed logos, the color scheme, and ensured consistent design throughout the website. Executed our stretch goals of having an 'About us' and 'FAQ' page.

</br>
</br>
<h2><u>What we used:</u></h3>
<h3>Languages:</h3>
<ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript ES6</li>
</ul>

<!-- <h3>Libraries:</h3>
<ul>
    <li>jQuery</li>
</ul

<h3>Frameworks:</h3>
<ul>
    <li>Bootstrap</li>
</ul -->

<h3>APIs</h3>
<ul>
    <li>[<em>The New York Times</em> Best Sellers API](https://developer.nytimes.com/docs/books-product/1/overview)</li>
    <li>[Google Books API](https://developers.google.com/books)</li>
    <li>[Open Library Books API](https://openlibrary.org/dev/docs/api/books)</li>
</ul

<h3>Other:</h3>
<ul>
    <li>AJAX</li>
    <li>JSON</li>
</ul>

</br>

<h2><u>MVP (Minimum Viable Product):</u></h2>
<ul>
    <li>Book search gallery which returns relevant titles</li>
    <li>On-click, displays specific information about that title</li>
    <li>Display current bestseller data from <em>The New York Times</em></li>
    <li>Responsive design</li>
</ul>

</br>

<h2><u>Stretch Goals Completed</u></h2>
<ul>
    <li>Using AJAX / localstorage to save myPlaces</li>
    <li>Map with functionality: info window pop up, locating where picture was taken, marking location on map, displaying multiple markers at a time, adjusting map depending where user was searching</li>
    <li>Implementing Google Autocomplete</li>
    <li>Hiding and showing of map</li>
</ul>

<h2><u>Stretch Goals Future</u></h2>
<ul>
<li>Creating PostgreSQL database requiring user login to enable myPlaces to be available from different devices</li>
</ul>

</br>

<h2><u>Challenges & Solutions:</u><h2>
<h3>Some of the biggest challenges we faced with this project build included:</h2>

<b>Challenge:</b> Finding quality APIs that returned necessary data. Used 3-4 before we settled on the final ones.
</br>
<b>Solution:</b> Learned much more about APIs. What to look for, how to search, how to retrieve the data we wanted.

<b>Challenge:</b> Understanding Google Maps API, using their language.
</br>
<b>Solution:</b> Read user documentation.

<b>Challenge:</b> Photo tags, getting good photos from Flickr API
</br>
<b>Solution:</b> Trial and error, reading up on user documentation, tutorials.

</br>

<h2><u>Code Snippets:</u></h2>

<h4>Showcases how we worked with Flickr's API and the specificity they require when working with their database.</h4>

```javascript
// Searches Flickr API for images based on latitude and longitude from Google Search, sends pictues to createPicture function
function photoSearch(latLon) {
  // gets radius, units and tags
  var radius = getRadius();
  var units = getUnits();
  var tags = chooseTags();

  //Creates error function w/message to be returned if no pictures found
  var errorPics = errorMessage(
    'No pictures were found for this location, radius, and tags, please try your search again.'
  );

  // Adds in tags. Tags are essential in the search process,as well as radius units. These aspects will be changed later to get respnoses from the user
  var resp = $.get(
    'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
      FLICKR_API_KEY +
      '&lat=' +
      latLon['lat'] +
      '&lon=' +
      latLon['lng'] +
      '&tags=' +
      tags +
      '&tag_mode=any&radius=' +
      radius +
      '&radius_units=' +
      units +
      '&format=json&nojsoncallback=1'
  );

  resp.catch(errorPics).then(checkForPics);
}
```

<br/>

<h4>This snippet shows the simple, yet customizable, carousel featured on our home page.</h4>

```javascript
//Carousel control; rotates through jumbotron images
function carouselControl() {
  $(document).ready(function() {
    $('.carousel').slick({
      autoplay: true,
      mobileFirst: true,
      autoplaySpeed: 5000,
      arrows: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      swipeToSlide: true
    });
  });
}
```

<br />
<h4>This bit of code displays the use of jQuery's ease of animations to add hide and show features for our map and hamburger menu.</h4>

```javascript
// ******************************
// *******REACTIVE MENUS*********
// ******************************
function clickShowMap() {
  $SHOW_MAP.click(function() {
    $('[data-images-role="hide-map"]').show();
    printIt($(this));
    $(this).hide();
    $('.click-to-close').hide();
    $('.click-to-open').show();
    $('.map-banner-container').slideDown(1000);
  });
}

function clickHideMap() {
  $HIDE_MAP.click(function() {
    $('[data-images-role="show-map"]').show();
    $(this).hide();
    $('.click-to-close').show();
    $('.click-to-open').hide();
    $('.map-banner-container').slideUp(1000);
  });
}

// when hamburger menu icon is clicked, the hamburger icon hids, the exit icon shows and the menu-container shows slowly
function clickMenuShow() {
  $HAMBURGER.click(function() {
    $EXIT_ICON.show();
    $(this).hide();
    $('.myAtlas-logo').hide('slow');
    $MENU_CONTAINER.show('slow');
  });
}
// when exit icon is clicked, the exit icon hids, the hamburger menu shows, and the menu-container hids slowly
function clickExitButton() {
  $EXIT_ICON.click(function() {
    $HAMBURGER.show();
    $(this).hide();
    $('.myAtlas-logo').show('slow');
    $MENU_CONTAINER.hide('slow');
  });
}
```

<br />
<h4>Code snippit displays how listerners can be added to text inside a Google Maps marker. The code also detects whether or not the event has already been saved to myPlaces. The listener is not added if the event has been saved.</h4>

```javascript
google.maps.event.addListener(infoWindow, 'domready', function() {
  if (document.querySelector('[data-role="save"]')) {
    document
      .querySelector('[data-role="save"]')
      .addEventListener('click', function handler(e) {
        e.preventDefault();
        this.textContent = '\u2713Saved to myPlaces';
        this.setAttribute('data-role', 'saved');
        this.setAttribute('class', 'saved');
        addPlace(formatted_address, picInfo, latLon);
        e.currentTarget.removeEventListener('click', handler);
      });
  }
});
```

</br>

<h4>Demonstrates usage of localstorage and how a user's places on their myPlaces page are rendered.</h4>

```javascript
// Takes myPlaces from local storage and prints information to screen
function displayMyPlaces(myPlaces) {
  var $myPlacesContainer = $('<div></div>', {
    class: 'places-container',
    'data-role': 'places-container'
  });

  for (var key in myPlaces) {
    var id = stringMaker(key);
    var $place = $('<div></div>', {
      class: 'place',
      'data-role': 'place',
      name: key,
      id: id
    });
    appendImages(myPlaces[key]['images'], $place);
    var $address = $('<span></span>', {
      text: key
    });
    $place.append($address);
    var URI = encodeURI(key);
    var link = 'https://maps.google.com?q=' + URI;
    var $directions = $('<a></a>', {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: link,
      text: 'Directions'
    });

    $place.append($directions);
    var $delete = $('<a></a>', {
      href: '#',
      text: 'Delete',
      class: 'delete',
      'data-role': 'delete'
    });
    $place.append($delete);
    $myPlacesContainer.append($place);
  }
  $myPlacesDisplay.append($myPlacesContainer);
}
```

</br>

<h2>Live Demo</h2>
https://www.youtube.com/watch?v=LRKIs7j-9Ew
</br>

<h2>Screenshots:</h2>
<img src="resources/images/landingpage.png" alt="Landing Page with star filled night">
<h4>Highlights the landing page of myPhotoAtlas</h4>
<br />
<img src="resources/images/searchresult.png" alt="displaying search result of NYC and pictures">
<h4>Photo result after Searching New York City</h4>
<br />
<img src="resources/images/myPages.png" alt="myPages screenshot">
<h4>Displays how myPlaces is layed out</h4>
<br />
<img src="resources/images/About.png" alt="About Landing Page">
<h4>Showcases our About section and the methods we used in creating myPhotoAtlas</h4>
