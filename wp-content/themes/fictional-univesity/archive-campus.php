<?php 

get_header(); 

pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have several convinient located campuses'
))

?>


<div class="container container--narrow page-section">

    <div class="acf-map">

    <?php  
  
    // We did not write custom Query Here. WP gets their default queries. So we manupulated that in functions.php
    while(have_posts()){
      the_post(); 
      
        $mapLocation = get_field('map_location');

      ?>

        <div data-lat="<?php echo $mapLocation['lat']; ?>" data-lng="<?php echo $mapLocation['lng']; ?>" class="marker">
            <a href="<?php the_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
            <p><?php echo $mapLocation['address']; ?></p>
        </div>

    <?php }

    ?>

    </div>

  
</div>

<?php get_footer();



?>