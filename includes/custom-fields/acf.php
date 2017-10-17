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
 * This class defines all custom fields
 *
 * @since      1.0.0
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter_Custom_Fields {

	/**
	 * Register Custom Fields
	 */
   public function add_field_group() {

     if(function_exists("register_field_group")){
    	register_field_group(array (

    		'id' => 'acf_list-item-meta',
    		'title' => 'List Item Meta',
    		'fields' => array (
    			array (
    				'key' => 'field_59e55d2d2720e',
    				'label' => 'Votes',
    				'name' => 'list_voter_votes',
    				'type' => 'number',
    				'default_value' => '',
    				'placeholder' => '',
    				'prepend' => '',
    				'append' => '',
    				'min' => '',
    				'max' => '',
    				'step' => '',
    			),
    			array (
    				'key' => 'field_59e55d5b2720f',
    				'label' => 'Included In Lists',
    				'name' => 'included_in_lists',
    				'type' => 'text',
    				'default_value' => '',
    				'placeholder' => '',
    				'prepend' => '',
    				'append' => '',
    				'formatting' => 'none',
    				'maxlength' => '',
    			),
    		),
    		'location' => array (
    			array (
    				array (
    					'param' => 'post_type',
    					'operator' => '==',
    					'value' => 'list_voter_list_item',
    					'order_no' => 0,
    					'group_no' => 0,
    				),
    			),
    		),
    		'options' => array (
    			'position' => 'normal',
    			'layout' => 'no_box',
    			'hide_on_screen' => array (
    			),
    		),
    		'menu_order' => 0,
    	));
    }

   }


  /**
   * Add the votes field to REST API responses for posts read and write
   */
  public function slug_register_list_voter_votes() {

      register_rest_field( 'list_voter_list_item',
          'list_voter_votes',
          array(
              'get_callback'    => array('this','slug_get_list_voter_meta'),
              'update_callback' => array('this','slug_update_list_voter_meta'),
              'schema'          => null,
          )
      );
  }

  /**
   * Add the in_list field to REST API responses for posts read and write
   */
  public function slug_register_included_in_list() {

      register_rest_field( 'list_voter_list_item',
          'included_in_lists',
          array(
              'get_callback'    => array('this','slug_get_list_voter_meta'),
              'update_callback' => array('this','slug_update_list_voter_meta'),
              'schema'          => null,
          )
      );
  }

  public function slug_get_list_voter_meta( $object, $field_name, $request ) {
      return get_post_meta( $object[ 'id' ], $field_name );
  }

  public function slug_update_list_voter_meta( $value, $object, $field_name ) {
      if ( ! $value || ! is_string( $value ) ) {
          return;
      }

      return update_post_meta( $object->ID, $field_name, strip_tags( $value ) );

  }



}

?>
