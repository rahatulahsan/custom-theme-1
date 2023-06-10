<?php 

get_header(); 

pageBanner(array(
  'title' => 'Past Events',
  'subtitle' => 'Recap of our past events'
));

?>


<div class="container container--narrow page-section">

  <?php  
    
    // Getting the past events with custom query
    $today = date('Ymd');
    $pastEvents = new WP_Query(array(
        'paged' => get_query_var('paged', '1'), // getting the result of the current page
        'post_type' => 'event',
        'meta_key' => 'event_date',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
        'meta_query' => array(
          array(
            'key' => 'event_date',
            'compare' => '<',
            'value' => $today,
            'type' => 'numeric'
          )
        )
    ));


    while($pastEvents->have_posts()){
      $pastEvents->the_post(); 

      get_template_part('template-parts/content-event');

    }

    //Works only with default URL like archive. So need to pass array to make it workable
    // showcaing max number of pages
    echo paginate_links(array(
        'total' => $pastEvents->max_num_pages
    ));  
  
  ?>
  
</div>

<?php get_footer();



?>