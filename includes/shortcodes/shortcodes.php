<?php

/**
 *
 * @link       https://github.com/mattwills8
 * @since      1.0.0
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 */

/**
 *
 * This class defines all custom post types
 *
 * @since      1.0.0
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter_Shortcodes {

	/**
	 * Register Shortcode taking list id as argument
	 */
   public function list_voter_shortcode( $args ) {

     $js_dir = REACTJS_LIST_VOTER_BUILD_DIR . 'app.bundle.js';

      $attributes = shortcode_atts( array(
          'list_id' => '0',
      ), $args );

      return '<div id="app" data-domain="'.$attributes['list_id'].'" class="container">
                <script type="text/javascript" src="'.$js_dir.'" charset="utf-8"></script>
              </div>';
    }
}
