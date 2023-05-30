<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ctheme1' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '1T&TT0@(63tgMA2-AkS/-6<K^nS+-A)TY|d?npzsk|~FmWV&wLzd(5Pee#@u!4P=' );
define( 'SECURE_AUTH_KEY',  'Z+|2a_xhYr{.[@$ XUg5cju)+-m2&?&)}Kq=48_ fkxQ5f6/8e<L3(vUdkAGwq$;' );
define( 'LOGGED_IN_KEY',    '8JLdo*p.|+cZ%!X`KF*bG:&:.XW{&^(})5qDy J fq+(<UQ*9->,z]n&P$bSPE]k' );
define( 'NONCE_KEY',        'Z,^(U;go=Yu|R&(H2ca6r:.4h4|X,oKy*{<ZyX=POL[@[R+7*+`Ngq?P1@!_(4z0' );
define( 'AUTH_SALT',        'i{N{[?(tZck*-K/](PU][)C: =_Ybm;dwC4K0q|!H9IS/#Ii:hbg?;WJ-^ha7npC' );
define( 'SECURE_AUTH_SALT', 'c&ehp7waiOg~|s#BSdtw|PE+ry2;9l^?C(#tV]&/95+!e2z[0{3AEX99bb9-GhSQ' );
define( 'LOGGED_IN_SALT',   'o]4T`+T9^9FYfl0-JpN2!c}&ka`C0:*/O.LMLHyfw{o3:n57r>0SB][WIzW>U5~B' );
define( 'NONCE_SALT',       ';-ieXF7qXA})Hy$=FeGu5]A=#/I+fpRZw1[s})AaN+1?fLv/no&()G5j98g{T~Cw' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
