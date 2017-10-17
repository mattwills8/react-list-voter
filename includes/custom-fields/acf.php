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

}

?>
