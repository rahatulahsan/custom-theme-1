<?php  

require get_theme_file_path('/inc/search-route.php');
require get_theme_file_path('/inc/like-route.php');;

// customizing the REST API. Adding a new property and returning
function university_custom_rest(){
    register_rest_field('post', 'authorName', array(
        'get_callback' => function(){return get_the_author();}
    ));

    register_rest_field('note', 'userNoteCount', array(
        'get_callback' => function(){return count_user_posts(get_current_user_id(), 'note');}
    ));
}

add_action('rest_api_init', 'university_custom_rest');


// Adding dynamic pagebanner
function pageBanner($args = array()) {
    // php logic will be here
    if(empty($args)){
        if(!get_the_title()){
            $args['title'] = 'Please add page title';
        }else{
            $args['title'] = get_the_title();
        }

        if(!get_field('page_banner_subtitle')){
            $args['subtitle'] = 'Please add banner image and subtitle from page settings';
        }else{
            $args['subtitle']= get_field('page_banner_subtitle');
        }

        if(!get_field('page_banner_background_image')){
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }else{
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pagebanner'];
        }
    
        
    }else{
        if(!$args['title']){
            $args['title'] = get_the_title();
        }
        if(!$args['subtitle']){
            $args['subtitle']= get_field('page_banner_subtitle');
        }
        if(!isset($args['photo'])){
            if(get_field('page_banner_background_image')){
                $args['photo'] = get_field('page_banner_background_image')['sizes']['pagebanner'];
            }else{
                $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
            }
        }
    }
    

    ?>

    <div class="page-banner">
      <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>)"></div>
      <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
            <div class="page-banner__intro">
            <p><?php echo $args['subtitle']; ?></p>
            </div>
      </div>
    </div>


<?php }


// Adding styles and scripts
function university_files(){

    wp_enqueue_script('google-map', '//maps.googleapis.com/maps/api/js?key=AIzaSyDlyHQODJhr0NFhNxCwp-7mDsy5EAIbGu4', NULL, '1.0', true);
    //wp_enqueue_script('jquery-slim-min', 'https://code.jquery.com/jquery-3.2.1.slim.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('popper-min', 'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('bootstrap-min', 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    
    
    wp_enqueue_style( 'custom-google-font',  'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i' );
    wp_enqueue_style( 'font-awesome',  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
    wp_enqueue_style( 'bootstrap-css',  'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css' );
    
    
    wp_enqueue_style( 'university_main_styles',  get_theme_file_uri( '/build/style-index.css' ));
    wp_enqueue_style( 'university_main_styles',  get_theme_file_uri( '/build/index.css' ));
    
    

    // localizing for the API URL flexibility
    wp_localize_script('main-university-js', 'universityData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest') // create random no.

    ));
    
    
}

add_action( 'wp_enqueue_scripts', 'university_files' );

// Adding support
function university_features(){

    register_nav_menu( 'headerMenuLocation', 'Header Menu Location' );
    register_nav_menu( 'footerLocationOne', 'Footer Location One' );
    register_nav_menu( 'footerLocationTwo', 'Footer Location Two' );

    
    add_theme_support( 'title-tag' );
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true); // Making image size with cropping image TRUE. Crop from center
    add_image_size('professorPotrait', 480, 650, true);
    add_image_size('pagebanner', 1500, 350, true);

}

add_action('after_setup_theme', 'university_features');


// Adjusting Events post archive SPECIALLY, so, it won't show past events. Because, archive page nornmally query through WP functions.

function university_adjust_queries($query){

    // Manipulation Events archive
    if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()){
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
            array(
              'key' => 'event_date',
              'compare' => '>=',
              'value' => $today,
              'type' => 'numeric'
            )
        ));
    }

     // Manipulation Program archive
    if(!is_admin() AND is_post_type_archive('program') AND $query->is_main_query()){
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
        
    }

     // Manipulation Campus archive
     if(!is_admin() AND is_post_type_archive('campus') AND $query->is_main_query()){

        $query->set('posts_per_page', -1);
        
    }

    
}

add_action('pre_get_posts', 'university_adjust_queries');


// Google MAP key setup
function universityMapKey($api){

    $api['key'] = 'AIzaSyDlyHQODJhr0NFhNxCwp-7mDsy5EAIbGu4';
    return $api;
}

add_filter('acf/fields/google_map/api', 'universityMapKey');


// Redirect Subscriber accounts out of admin and onto homepage

function redirectSubsToFrontend(){
    $ourCurrentUser = wp_get_current_user();
    if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber'){
        wp_redirect(site_url('/'));
        exit;
    }
}

add_action('admin_init', 'redirectSubsToFrontend');

// Hiding Top bar
function noSubsAdminBar(){
    $ourCurrentUser = wp_get_current_user();
    if(count($ourCurrentUser->roles) == 1 AND $ourCurrentUser->roles[0] == 'subscriber'){
        show_admin_bar(false);

    }
}

add_action('wp_loaded', 'noSubsAdminBar');

// Forcing for the notes to be private. But in the MyNotes.js it's given publish. Proving Server side security
// Getting the data and checking the post type. Also with AND condition. 
function makeNotePrivate($data, $postarr){

    // Restriction NOT to add any Normal HTML
    if($data['post_type'] == 'note'){

        // Counting the notes no of current user also if it's new post or not. 
        if(count_user_posts(get_current_user_id(), 'note') > 4 AND !$postarr['ID']){
            die("You have reached your note limit");
        }

        $data['post_title'] = sanitize_text_field($data['post_title']);
        $data['post_content'] = sanitize_textarea_field($data['post_content']);


    }

    if($data['post_type'] == 'note' AND $data['post_status'] != 'trash'){
        $data['post_status'] = "private";     
    }
    return $data;
}
add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2); // 3rd parameter is priority, 4th parameter is telling attribute no. 



?>




