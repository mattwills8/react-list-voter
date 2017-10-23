<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/mattwills8
 * @since             1.0.0
 * @package           Reactjs_List_Voter
 *
 * @wordpress-plugin
 * Plugin Name:       React.js List Voter
 * Plugin URI:        https://github.com/mattwills8/react-list-voter
 * Description:       Allows you to create and manage lists which can be included with a shortcode for users to vote list items up and down
 * Version:           1.0.0
 * Author:            Matt Wills
 * Author URI:        https://github.com/mattwills8
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       reactjs-list-voter
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'REACTJS_LIST_VOTER_VERSION', '1.0.0' );
define( 'REACTJS_LIST_VOTER_PLUGIN_ROOT', plugin_dir_path( __FILE__ ) );
define( 'REACTJS_LIST_VOTER_BUILD_DIR', plugin_dir_url( __FILE__ ) . 'build/' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-reactjs-list-voter-activator.php
 */
function activate_reactjs_list_voter() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-reactjs-list-voter-activator.php';
	Reactjs_List_Voter_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-reactjs-list-voter-deactivator.php
 */
function deactivate_reactjs_list_voter() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-reactjs-list-voter-deactivator.php';
	Reactjs_List_Voter_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_reactjs_list_voter' );
register_deactivation_hook( __FILE__, 'deactivate_reactjs_list_voter' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-reactjs-list-voter.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_reactjs_list_voter() {

	$plugin = new Reactjs_List_Voter();
	$plugin->run();

}
run_reactjs_list_voter();
