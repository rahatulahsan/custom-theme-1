/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/MobileMenu */ "./src/modules/MobileMenu.js");
/* harmony import */ var _modules_GoogleMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/GoogleMap */ "./src/modules/GoogleMap.js");
/* harmony import */ var _modules_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Search */ "./src/modules/Search.js");
/* harmony import */ var _modules_MyNotes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/MyNotes */ "./src/modules/MyNotes.js");
/* harmony import */ var _modules_Like__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/Like */ "./src/modules/Like.js");
/* harmony import */ var _modules_Facebook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/Facebook */ "./src/modules/Facebook.js");


// Our modules / classes

//import HeroSlider from "./modules/HeroSlider"






// Instantiate a new object using our modules/classes
const mobileMenu = new _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
//const heroSlider = new HeroSlider()
const googleMap = new _modules_GoogleMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
const siteSearch = new _modules_Search__WEBPACK_IMPORTED_MODULE_3__["default"]();
const myNotes = new _modules_MyNotes__WEBPACK_IMPORTED_MODULE_4__["default"]();
const like = new _modules_Like__WEBPACK_IMPORTED_MODULE_5__["default"]();
const facebook = new _modules_Facebook__WEBPACK_IMPORTED_MODULE_6__["default"]();

/***/ }),

/***/ "./src/modules/Facebook.js":
/*!*********************************!*\
  !*** ./src/modules/Facebook.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Facebook {
  constructor() {
    this.searchButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-term");
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-input");
    this.searchResult = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table-responsive');
    this.events();
  }
  events() {
    this.searchButton.on('click', this.getResults.bind(this));
    setTimeout(() => this.searchField.focus(), 301);
  }

  //methods here

  getResults(e) {
    var name = this.searchField.val();
    alert(name);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      url: 'https://graph.facebook.com/search',
      data: {
        'type': 'adinterest',
        'q': name,
        'limit': '500',
        'locale': 'en_US',
        'access_token': '562476534284148%7CRR0VTMWxhtPFVGMbPS8_GkQPmHQ'
      },
      success: response => {
        console.log('congrats');
        console.log(response);
        var links = response['data'];
        console.log(links);
        jquery__WEBPACK_IMPORTED_MODULE_0___default().each(links, function (index, item) {
          var low = item.audience_size_lower_bound;
          var high = item.audience_size_upper_bound;
          var lower_Bound = low.toLocaleString('en-US');
          var upper_Bound = high.toLocaleString('en-US');
          var el = `
                        <tr>
                          <td>${item.id}</td>
                          <td>${item.name}</td>
                          <td>${lower_Bound}</td>
                          <td>${upper_Bound}</td>
                        </tr>
                    `;
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table > tbody').append(el);
        });
      },
      error: response => {
        console.log('failed');
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Facebook);

/***/ }),

/***/ "./src/modules/GoogleMap.js":
/*!**********************************!*\
  !*** ./src/modules/GoogleMap.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class GMap {
  constructor() {
    document.querySelectorAll(".acf-map").forEach(el => {
      this.new_map(el);
    });
  }
  new_map($el) {
    var $markers = $el.querySelectorAll(".marker");
    var args = {
      zoom: 16,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($el, args);
    map.markers = [];
    var that = this;

    // add markers
    $markers.forEach(function (x) {
      that.add_marker(x, map);
    });

    // center map
    this.center_map(map);
  } // end new_map

  add_marker($marker, map) {
    var latlng = new google.maps.LatLng($marker.getAttribute("data-lat"), $marker.getAttribute("data-lng"));
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
    map.markers.push(marker);

    // if marker contains HTML, add it to an infoWindow
    if ($marker.innerHTML) {
      // create info window
      var infowindow = new google.maps.InfoWindow({
        content: $marker.innerHTML
      });

      // show info window when marker is clicked
      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    }
  } // end add_marker

  center_map(map) {
    var bounds = new google.maps.LatLngBounds();

    // loop through all markers and create bounds
    map.markers.forEach(function (marker) {
      var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(latlng);
    });

    // only 1 marker?
    if (map.markers.length == 1) {
      // set center of map
      map.setCenter(bounds.getCenter());
      map.setZoom(16);
    } else {
      // fit to bounds
      map.fitBounds(bounds);
    }
  } // end center_map
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GMap);

/***/ }),

/***/ "./src/modules/Like.js":
/*!*****************************!*\
  !*** ./src/modules/Like.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Like {
  constructor() {
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  // All methods here
  ourClickDispatcher(e) {
    // Giving the gurantee to store nearest element. User might not click on the box always
    var currentLikeBox = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest(".like-box");
    if (currentLikeBox.attr('data-exists') == 'yes') {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }
  createLike(currentLikeBox) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'POST',
      data: {
        'professorId': currentLikeBox.data('professor')
      },
      // sending data to like-route.php
      success: response => {
        currentLikeBox.attr('data-exists', 'yes');
        var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount++;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", response);
        console.log(response);
      },
      error: response => {
        console.log(response);
      }
    });
  }
  deleteLike(currentLikeBox) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'DELETE',
      data: {
        'like': currentLikeBox.attr('data-like')
      },
      success: response => {
        currentLikeBox.attr('data-exists', 'no');
        var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount--;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", '');
        console.log(response);
      },
      error: response => {
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Like);

/***/ }),

/***/ "./src/modules/MobileMenu.js":
/*!***********************************!*\
  !*** ./src/modules/MobileMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MobileMenu {
  constructor() {
    this.menu = document.querySelector(".site-header__menu");
    this.openButton = document.querySelector(".site-header__menu-trigger");
    this.events();
  }
  events() {
    this.openButton.addEventListener("click", () => this.openMenu());
  }
  openMenu() {
    this.openButton.classList.toggle("fa-bars");
    this.openButton.classList.toggle("fa-window-close");
    this.menu.classList.toggle("site-header__menu--active");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MobileMenu);

/***/ }),

/***/ "./src/modules/MyNotes.js":
/*!********************************!*\
  !*** ./src/modules/MyNotes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class MyNotes {
  constructor() {
    this.events();
  }
  events() {
    // Selecting the parent element. And adding the inside element in the 2nd parameter. 
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on("click", ".delete-note", this.deleteNote);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".submit-note").on("click", this.createNote.bind(this));
  }

  //All Methods here

  // Function to delete the data
  deleteNote(e) {
    var thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li"); // targetting the li starting from button

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'DELETE',
      success: response => {
        thisNote.slideUp(); // deleting the note from UI
        console.log("Congrats!");
        console.log(response);
        if (response.userNoteCount < 5) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".note-limit-message").removeClass("active");
        }
      },
      error: response => {
        console.log("Sorry");
        console.log(response);
      }
    });
  }

  // Function for Updating the data
  updateNote(e) {
    var thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li"); // targetting the li starting from button

    // Getting the data from the field for updating
    var ourUpdatedPost = {
      'title': thisNote.find(".note-title-field").val(),
      'content': thisNote.find(".note-body-field").val()
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'POST',
      data: ourUpdatedPost,
      success: response => {
        this.makeNoteReadOnly(thisNote); // After update, it will make the field Read Only
        console.log("Congrats!");
        console.log(response);
      },
      error: response => {
        a;
        console.log("Sorry");
        console.log(response);
      }
    });
  }

  // New Note Creation Funtion
  createNote(e) {
    // Getting the data from the field for updating
    var ourNewPost = {
      'title': jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-title").val(),
      'content': jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-body").val(),
      'status': 'publish'
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/',
      type: 'POST',
      data: ourNewPost,
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-title, .new-note-body").val(''); // Making the fields empty where user adding input
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`
                    <li data-id ="${response.id}">
                        <input readonly class="note-title-field" value ="${response.title.raw}">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                        <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                    </li>
                `).prependTo('#my-notes').hide().slideDown();
        console.log("Congrats!");
        console.log(response);
      },
      error: response => {
        if (response.responseText == "\r\n\r\n\r\n\r\n\r\nYou have reached your note limit") {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".note-limit-message").addClass("active");
        }
        console.log("Sorry");
        console.log(response);
      }
    });
  }
  editNote(e) {
    var thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li"); // capturing the parent element and that is a LIST

    // Condition checking. Based on that function will call. Either for Edit or For read Mode
    if (thisNote.data("state") == "editable") {
      //make read only
      this.makeNoteReadOnly(thisNote);
    } else {
      // make editable
      this.makeNoteEditable(thisNote);
    }
  }

  // Function that is running when a user clicking in edit
  makeNoteEditable(thisNote) {
    // After clicking in edit button making text field edit mode
    thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
    // Also Making the Save button Visible
    thisNote.find(".update-note").addClass("update-note--visible");
    // Making the edit button a Cancel button 
    thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');

    // Making the state editable. So, next time when user click, at the top function editNote the IF condition will run
    thisNote.data("state", "editable");
  }

  // Function that is running when a user clicking on Cancel Button (Opposite of Edit action will run)
  makeNoteReadOnly(thisNote) {
    // After clicking in cancel button making text field readonly mode again
    thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
    // disapperaing the Save button
    thisNote.find(".update-note").removeClass("update-note--visible");
    // Making the edit button a Cancel button 
    thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
    thisNote.data("state", "cancel");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyNotes);

/***/ }),

/***/ "./src/modules/Search.js":
/*!*******************************!*\
  !*** ./src/modules/Search.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML(); // Calling function to add serachHTML. Have to add at beginning

    this.openButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".js-search-trigger");
    this.closeButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay__close");
    this.serachOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay");
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-term");
    this.resultsDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-overlay__results");
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
    this.events();
  }

  // 2. List of all events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // 3. All methods (functions, actions..)
  openOverlay() {
    this.serachOverlay.addClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    this.searchField.val(''); // clearing the field. So after opening again, no data will show
    setTimeout(() => this.searchField.focus(), 301); // setting a time to add cursor in search field

    this.isOverlayOpen = true;
    return false; // Disable going to normal search page with JS enabled. it will open overlay
  }

  closeOverlay() {
    this.serachOverlay.removeClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
  keyPressDispatcher(e) {
    if (e.keyCode == 83 && this.isOverlayOpen == false && !jquery__WEBPACK_IMPORTED_MODULE_0___default()("input, textarea").is(':focus')) {
      this.openOverlay();
    }
    if (e.keyCode == 27 && this.isOverlayOpen == true) {
      this.closeOverlay();
    }
  }
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }
  getResults() {
    // Asynchronous style to get the data with custom REST API and showcase in the overlay
    jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), results => {
      this.resultsDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No info matches this search</p>'}
                    
                        ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''} </li>`).join('')}

                        ${results.generalInfo.length ? '</ul>' : ''} 
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match this search. <a href="${universityData.root_url}/programs">View All Programs</a></p>`}
                    
                        ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}

                        ${results.programs.length ? '</ul>' : ''}
                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match this search. </p>`}
                    
                        ${results.professors.map(item => `
                        <li class="professor-card__list-item">
                            <a class="professor-card" href="${item.permalink}">
                                <img class="professor-card__image" src="${item.image}">
                                <span class="professor-card__name">${item.title}</span>
                            </a>
                        </li>
                        
                        `).join('')}

                        ${results.professors.length ? '</ul>' : ''}

                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match this search. <a href="${universityData.root_url}/campuses">View All Campuses</a></p>`}
                    
                        ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}

                        ${results.campuses.length ? '</ul>' : ''}
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '' : `<p>No events match this search. <a href="${universityData.root_url}/events">View All Events</a></p>`}
                    
                        ${results.events.map(item => `
                        <div class="event-summary">
                            <a class="event-summary__date t-center" href="${item.permalink}">
                            <span class="event-summary__month">${item.month}</span>
                            <span class="event-summary__day">${item.day}</span>
                            </a>
                            <div class="event-summary__content">
                            <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                            <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                            </div>
                        </div>
                        
                        `).join('')}
                    </div>
                </div>
            `);
      this.isSpinnerVisible = false;
    });
  }
  addSearchHTML() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").append(`
        
        <div class="search-overlay">
            <div class="search-overlay__top">
            <div class="container">
                <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
                <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
            </div>
            <div class="container">
            <div id="search-overlay__results">
                
            </div>
            </div>
        </div>
        
        `);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkfictional_university_theme"] = globalThis["webpackChunkfictional_university_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map