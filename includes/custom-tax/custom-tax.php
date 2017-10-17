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
 * This class defines all custom taxonomies
 *
 * @since      1.0.0
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter_Custom_Tax {

	/**
	 * Register Post Type: List Voter List Items.
	 */
	public function add_custom_tax() {

    // create a new taxonomy
  	register_taxonomy(
  		'lists',
  		'list_voter_list_item',
  		array(
  			'label' => __( 'Lists' ),
  			'rewrite' => array( 'slug' => 'list_voter_list_item' ),
  		)
  	);

  }
}

?>
