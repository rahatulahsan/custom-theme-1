<?php

function universityLikeRoutes(){
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST', 
        'callback' => 'createLike'
    ));

    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE', 
        'callback' => 'deleteLike'
    ));
}

function createLike($data){
    
    // Checking if the user is logged in
    if(is_user_logged_in()){
        
        // Receiving professor ID from like.js
        $professor = sanitize_text_field($data['professorId']);

        // Query to find the liked post by only current user
        $existQuery = new WP_Query(array(
            'post_type' => 'like',
            'author' => get_current_user_id(),
            'meta_query' => array(
                array(
                    'key' => 'liked_professor_id',
                    'compare' => '=',
                    'value' => $professor
                )
            )
        ));

        // Checking if the user already like the professor Once or not and actually the ID is from professor post type or not
        if($existQuery->found_posts == 0 AND get_post_type($professor) == 'professor'){

           //Creating a post
            return wp_insert_post( array(
                'post_type' => 'like',
                'post_status' => 'publish',
                'post_title' => 'Our 3rd PHP Test',
                'meta_input' => array(
                    'liked_professor_id' => $professor
                )
            ) );

        }else{
            die("invalid professor ID");
        }
    

    }else{
        die("Only logged in user can create a like");
    }
    
    

}

function deleteLike($data){ 
    
    $likeId = sanitize_text_field($data['like']);

    // Checking if the user is the same user of the post who created and post type is LIKE
    if(get_current_user_id() == get_post_field('post_author', $likeId) AND get_post_type($likeId) == 'like'){
        wp_delete_post($likeId, true);
        return 'Congrats! Like deleted';
    }else{
        die("You do not have permission to delete that");
    }

}


add_action('rest_api_init', 'universityLikeRoutes');