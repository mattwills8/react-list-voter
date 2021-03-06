<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://github.com/mattwills8
 * @since      1.0.0
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/includes
 * @author     Matt Wills <matt_wills8@hotmail.co.uk>
 */
class Reactjs_List_Voter {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Reactjs_List_Voter_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'REACTJS_LIST_VOTER_VERSION' ) ) {
			$this->version = REACTJS_LIST_VOTER_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'reactjs-list-voter';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->define_post_types();
		$this->define_custom_fields();
		$this->define_custom_endpoints();
		$this->define_custom_tax();
		$this->define_shortcodes();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Reactjs_List_Voter_Loader. Orchestrates the hooks of the plugin.
	 * - Reactjs_List_Voter_i18n. Defines internationalization functionality.
	 * - Reactjs_List_Voter_Admin. Defines all hooks for the admin area.
	 * - Reactjs_List_Voter_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-reactjs-list-voter-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-reactjs-list-voter-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-reactjs-list-voter-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-reactjs-list-voter-public.php';

		/**
		 * The class responsible for making sure external plugins are installed
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/tgm/tgm.php';

		/**
		 * The class responsible for adding custom post types
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/post-types/post-types.php';

		/**
		 * The class responsible for adding custom fields
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/custom-fields/acf.php';

		/**
		 * The class responsible for adding custom endpoints
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/endpoints/endpoints.php';

		/**
		 * The class responsible for adding custom taxonomies
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/custom-tax/custom-tax.php';

		/**
		 * The class responsible for adding shorcodes
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/shortcodes/shortcodes.php';


		$this->loader = new Reactjs_List_Voter_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Reactjs_List_Voter_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Reactjs_List_Voter_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Reactjs_List_Voter_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_menu', $plugin_admin, 'plugin_menu' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Reactjs_List_Voter_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
	}

	private function define_post_types() {

		$post_types = new Reactjs_List_Voter_Post_Types();

		$this->loader->add_action( 'init' , $post_types, 'cptui_register_my_cpts_list_voter_list_item');
		$this->loader->add_action( 'init' , $post_types, 'list_voter_list_item_post_type_rest_support', 25);
	}

	private function define_custom_fields() {

		$custom_fields = new Reactjs_List_Voter_Custom_Fields();

		$this->loader->add_action( 'init' , $custom_fields, 'add_field_group', 20);
	}

	private function define_custom_endpoints() {

		$custom_endpoints = new List_Voter_REST_Server();

		$this->loader->add_action( 'rest_api_init',  $custom_endpoints, 'register_routes' );
	}

	private function define_custom_tax() {

		$custom_tax = new Reactjs_List_Voter_Custom_Tax();

		$this->loader->add_action( 'init',  $custom_tax, 'add_custom_tax' );
	}

	private function define_shortcodes() {

		$shortcodes = new Reactjs_List_Voter_Shortcodes();

		add_shortcode( 'list_voter', array( $shortcodes ,'list_voter_shortcode') );
	}
	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Reactjs_List_Voter_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
