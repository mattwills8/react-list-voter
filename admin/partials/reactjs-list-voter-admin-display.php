<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://github.com/mattwills8
 * @since      1.0.0
 *
 * @package    Reactjs_List_Voter
 * @subpackage Reactjs_List_Voter/admin/partials
 */

?>

<div class="list-voter-admin-wrapper">
  <h2>List Voter Admin Area</h2>
  <div id="app" data-domain="admin" class="container">
    <script type="text/javascript" src="<?php echo  REACTJS_LIST_VOTER_BUILD_DIR . 'app.bundle.js'; ?>" charset="utf-8"></script>
  </div>
</div>
