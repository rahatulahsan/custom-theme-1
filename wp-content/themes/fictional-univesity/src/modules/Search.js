import $ from 'jquery';

class Search {
    // 1. describe and create/initiate our object
    constructor() {

        this.addSearchHTML(); // Calling function to add serachHTML. Have to add at beginning

        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.serachOverlay = $(".search-overlay");
        this.searchField = $("#search-term");
        this.resultsDiv = $("#search-overlay__results");

        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
        this.events();
    }

    // 2. List of all events
    events(){

        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));

        $(document).on("keydown", this.keyPressDispatcher.bind(this));

        this.searchField.on("keyup", this.typingLogic.bind(this));

    }
 

    // 3. All methods (functions, actions..)
    openOverlay() {

        this.serachOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");

        this.searchField.val(''); // clearing the field. So after opening again, no data will show
        setTimeout(() => this.searchField.focus() , 301); // setting a time to add cursor in search field

        this.isOverlayOpen = true;
    }

    closeOverlay(){

        this.serachOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");

        this.isOverlayOpen = false;
    }

    keyPressDispatcher(e){

        if(e.keyCode == 83 && this.isOverlayOpen == false && !$("input, textarea").is(':focus')){
            this.openOverlay();
        }
        if(e.keyCode == 27 && this.isOverlayOpen == true){
            this.closeOverlay();
        }
    }


    typingLogic(){

        if(this.searchField.val() != this.previousValue){

            clearTimeout(this.typingTimer);

            if(this.searchField.val()){

                if(!this.isSpinnerVisible){
                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;
                }
                
                this.typingTimer = setTimeout(this.getResults.bind(this), 750);

            }else{
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }

        }

        this.previousValue = this.searchField.val();

    }

    getResults(){

        // Asynchronous style to get the data

        $.when(
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val()), 
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val())
            ).then((posts, pages) => {

                var combineResults = posts[0].concat(pages[0]);
                
                //Using Template Literal Style (``)
                //Ternary operator like If else logic (Example: ${posts.length ? happens : not happens})

                this.resultsDiv.html(`
                    <h2 class="search-overlay__section-title">General Information</h2>
                    
                    ${combineResults.length ? '<ul class="link-list min-list">' : '<p>No info matches this search</p>'}
                    
                        ${combineResults.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}

                    ${combineResults.length ? '</ul>' : ''}          
                `);

                this.isSpinnerVisible = false;

        }, () =>{
            this.resultsDiv.html('</p>Unexpected error. Please try again</p>');
        });
       
    }


    addSearchHTML(){
        $("body").append(`
        
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

export default Search