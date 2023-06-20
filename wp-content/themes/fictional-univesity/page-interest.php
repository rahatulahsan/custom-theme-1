<?php 

if(!is_user_logged_in()){
    wp_redirect(site_url('/'));
    exit;
}

get_header();

    
// function written in functions.php
pageBanner();

?>

    <div class="container container--narrow page-section">

       

        <div class="input-group">
            <input type="text" class="form-control" placeholder="Get interest with keywords" id ="search-input">
            <div class="input-group-append">
            <button class="btn btn-secondary" type="button" id="search-term">
                <i class="fa fa-search"></i>
            </button>
            </div>
        </div>
        
        <hr>

        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Lower Bound</th>
                        <th scope="col">Upper Bound</th>
                        
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    
    </div>
    
<?php 

get_footer();

?>