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

    $base      = 'lists';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::READABLE,
          'callback'        => array( $this, 'get_lists' ),
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

  public function get_lists( WP_REST_Request $request ){


    return get_terms(array(
      'taxonomy' => 'lists',
    ));


  }
}
