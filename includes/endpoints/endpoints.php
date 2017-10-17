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

    $base      = 'lists-in';
    register_rest_route( $namespace, '/' . $base, array(
      array(
          'methods'         => WP_REST_Server::EDITABLE,
          'callback'        => array( $this, 'change_lists_in' ),
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

  public function change_lists_in( WP_REST_Request $request ){

    $new_lists_in = $request->get_header( 'lists_in' );
    $id = $request->get_header( 'post_id' );

    //return get_field( 'included_in_lists', $id);

    if (  update_field( 'included_in_lists', $new_lists_in, $id) ){
      return get_post( $id );
    }

    return false;


  }
}
