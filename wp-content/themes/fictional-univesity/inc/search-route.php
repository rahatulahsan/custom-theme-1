<?php 

// Registering custom REST API URL to get custom result. 
// 'university' is the namespace like 'wp'. 2nd parameter is route

function universityRegisterSearch(){
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE, // instead of 'GET'
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data){
    
    // s for search
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program' , 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    // Returning specific data that we need after query above. 
    // Taken specfic array for different post type
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array()
    );

    while($mainQuery->have_posts()){
        $mainQuery->the_post();

        // Checking the result available/ coming from which post type. Searching based on input terms
        // it searches from title, descriptions. NOT from any custom fields

        if(get_post_type() == 'post' OR get_post_type() == 'page'){
            array_push($results['generalInfo'], array(
                'postType' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'authorName' => get_the_author()
            ));
        }
        if(get_post_type() == 'professor'){
            array_push($results['professors'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'image' => get_the_post_thumbnail_url(0,'professorLandscape')

            ));
        }
        if(get_post_type() == 'program'){
            $relatedCampuses = get_field('related_campus');
            if($relatedCampuses){
                foreach($relatedCampuses as $campus){
                    array_push($results['campuses'], array(
                        'title' => get_the_title($campus),
                        'permalink' => get_the_permalink($campus)
                    ));
                }
            }
            
            array_push($results['programs'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'id' => get_the_ID()
            ));
        }
        if(get_post_type() == 'event'){

            $eventDate = new DateTime(get_field('event_date'));
            $description = NULL;
            if(has_excerpt()){
            $description = get_the_excerpt();
            }else{
            $description = wp_trim_words(get_the_content(), 18);
            }

            array_push($results['events'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'month' => $eventDate -> format('M'),
                'day' => $eventDate -> format('d'),
                'description' => $description
            ));
        }
        if(get_post_type() == 'campus'){
            array_push($results['campuses'], array(
                'title' => get_the_title(),
                'permalink' => get_the_permalink()
            ));
        }
        
    }

     // Getting professors for specfic program term search by user. So, when a customer search for biology, beside specfic program,
    // It will will show the professors related to the program as well
    // Custom query to get the results
    // If condition at the beginning because, all professors will show if there is no program.

    if($results['programs']){

        $programsMetaQuery = array('relation' => 'OR');
        // Looping through each programs so if there are multiple programs no need to write manually
        foreach($results['programs'] as $item){
            array_push($programsMetaQuery, array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => $item['id']
            ));
        }
    
        $programRelationshipQuery = new WP_Query(array(
            'post_type' => array('professor','event'),
            'meta_query' => $programsMetaQuery
        ));
    
        while($programRelationshipQuery->have_posts()){
            $programRelationshipQuery->the_post();
    
            if(get_post_type() == 'professor'){
                array_push($results['professors'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'image' => get_the_post_thumbnail_url(0,'professorLandscape')
    
                ));
            }
            if(get_post_type() == 'event'){

                $eventDate = new DateTime(get_field('event_date'));
                $description = NULL;
                if(has_excerpt()){
                $description = get_the_excerpt();
                }else{
                $description = wp_trim_words(get_the_content(), 18);
                }
    
                array_push($results['events'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'month' => $eventDate -> format('M'),
                    'day' => $eventDate -> format('d'),
                    'description' => $description
                ));
            }
    
        }
    
        // duplicating double data. Because normal searching getting from title and custom query is getting data. 
        // array_values () removing array number from data.
        $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));
        $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));
    }


    return $results;

    //return $professors->posts; // returning only posts instead of everything. But even evertyhing of POSTS
}

add_action('rest_api_init', 'universityRegisterSearch');


?>