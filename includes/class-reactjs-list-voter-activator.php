<?php

/**
 * Fired during plugin activation
 *
 * @link       https://github.com/mattwills8
 * @since      1.0.0
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

		add_action( 'init', array('this','cptui_register_my_cpts_list_voter_list_item') );
	}

	public function cptui_register_my_cpts_list_voter_list_item() {

		/**
		 * Post Type: List Voter List Items.
		 */

		$labels = array(
			"name" => __( "List Voter List Items", "storefront" ),
			"singular_name" => __( "List Voter List Item", "storefront" ),
		);

		$args = array(
			"label" => __( "List Voter List Items", "storefront" ),
			"labels" => $labels,
			"description" => "",
			"public" => true,
			"publicly_queryable" => true,
			"show_ui" => true,
			"show_in_rest" => true,
			"rest_base" => "list-voter-list-item",
			"has_archive" => false,
			"show_in_menu" => true,
			"exclude_from_search" => false,
			"capability_type" => "post",
			"map_meta_cap" => true,
			"hierarchical" => false,
			"rewrite" => array( "slug" => "list_voter_list_item", "with_front" => true ),
			"query_var" => true,
			"supports" => array( "title", "editor", "thumbnail" ),
		);

		register_post_type( "list_voter_list_item", $args );
	}

}
