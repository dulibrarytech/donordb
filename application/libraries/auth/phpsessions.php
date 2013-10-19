<?php if ( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

/**
 * allows easy access to native PHP sessions
 */
class Phpsessions {

    public function __construct() {

        //ini_set('session.cookie_lifetime', 60 * 60 * 24 * 7); // 7 day lifespan
        
        if(!isset($_SESSION))
        {
            session_start();
        }
    }

    public function set( $key, $value ) {
        $_SESSION[$key] = $value;
    }

    public function get( $key ) {
        return isset( $_SESSION[$key] ) ? $_SESSION[$key] : null;
    }

    public function regenerateId( $delOld = false ) {
        session_regenerate_id( $delOld );
    }

    public function delete( $key ) {
        unset( $_SESSION[$key] );
    }
}