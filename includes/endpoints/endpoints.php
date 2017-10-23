<?php

class List_Voter_REST_Server extends WP_REST_Controller {

  //The namespace for the REST SERVER
  var $my_namespace = 'list_voter_rest_server';

  public function register_routes() {
    $namespace = $this->my_namespace;

    $base      = 'votes';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'change_vote' ),
        )
    ));

    $base      = 'in-lists';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'change_in_lists' ),
        )
    ));

    $base      = 'new-list';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'new_list' ),
        )
    ));

    $base      = 'remove-list';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'remove_list' ),
        )
    ));

    $base      = 'lists';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::READABLE,
          'callback'        => array( $this, 'get_lists' ),
        )
    ));

    $base      = 'media-url';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'get_media_url' ),
        )
    ));
  }

  public function change_vote( WP_REST_Request $request ){

    $new_votes = $request->get_header( 'votes' );
    $id = $request->get_header( 'post_id' );

    if (  update_field( 'list_voter_votes', $new_votes, $id) ){
      return get_post( $id );
    }

    return false;


  }

  public function change_in_lists( WP_REST_Request $request ){

    $new_in_lists = $request->get_header( 'in_lists' );
    $id = $request->get_header( 'post_id' );

    if (  update_field( 'included_in_lists', $new_in_lists, $id) ){
      return get_post( $id );
    }

    return false;


  }

  public function new_list( WP_REST_Request $request ){

    $name = $request->get_header( 'name' );

    if( wp_insert_term( $name, 'lists') ) {
      return $this->get_list_terms();;
    };

    return false;

  }

  public function remove_list( WP_REST_Request $request ){

    $term_id = $request->get_header( 'id' );

    if( wp_delete_term( $term_id, 'lists') ) {
      return $this->get_list_terms();
    };

    return false;

  }

  public function get_lists( WP_REST_Request $request ){


    return $this->get_list_terms();
  }


  public function get_media_url( WP_REST_Request $request ){

    $media_id = $request->get_header( 'id' );

    return array(
      "mediaId" => $media_id,
      "url" => wp_get_attachment_url( $media_id )
    );
  }


  public function get_list_terms() {

    $args = array(
      'taxonomy' => 'lists',
      'hide_empty' => false,
    );

    return get_terms($args);
  }
}
