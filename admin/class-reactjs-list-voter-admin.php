<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/mattwills8
 * @since      1.0.0
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/admin
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function plugin_menu() {

      add_options_page( 'List Voter', 'List Voter', 'manage_options', 'List Voter Editor', array($this,'plugin_options') );

  }

  public function plugin_options() {

      include plugin_dir_path( __FILE__ ) . 'partials/reactjs-list-voter-admin-display.php';

  }

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Reactjs_List_Voter_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Reactjs_List_Voter_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, REACTJS_LIST_VOTER_BUILD_DIR . 'main.bundle.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, REACTJS_LIST_VOTER_BUILD_DIR . 'vendor/font-awesome-4.7.0/css/font-awesome.min.css', array(), $this->version, 'all' );

	}
	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Reactjs_List_Voter_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Reactjs_List_Voter_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, REACTJS_LIST_VOTER_BUILD_DIR . 'vendor/papaparse.min.js', array( 'jquery' ), $this->version, false );

	}

}
