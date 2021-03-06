import axios from 'axios';

export class wpRequest {
  constructor() {

    this.ROOT_URL = `${window.location.origin}/index.php/wp-json/`;
    //this.ROOT_URL = 'http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/';
    this.ROOT_URL_FOR_GET = `${this.ROOT_URL}wp/v2/`;
    this.ROOT_URL_FOR_MEDIA = `${this.ROOT_URL}wp/v2/media/`;
  }

  /*
  *
  * GET functions
  *
  */

  getLists() {

    return this.getUrl( `${this.ROOT_URL}list_voter_rest_server/lists` );
  }

  getListItemPostsById( id ) {

    return this.getCustomPostsById( 'list_voter_list_item', id );
  }


  getListItemPosts() {

    return this.getCustomPosts( 'list_voter_list_item' );
  }


  getCustomPostsById( customPostName, id ) {

    return this.get( `${customPostName}/${id}` );
  }


  getCustomPosts( customPostName ) {

    return this.get( customPostName );
  }


  getPostById( id ) {

    return this.get(`posts/${id}`);
  }


  getAllPosts() {

    return this.get('posts');
  }


  get( endpoint ) {
    const url = `${this.ROOT_URL_FOR_GET}${endpoint}`;

    return axios.get(url);
  }


  getUrl( url ) {

    return axios.get(url);
  }


  /*
  *
  * POST functions
  *
  */

  getMediaURL( id ) {

    var headersObj = {
      id: id
    }

    return this.post('list_voter_rest_server/media-url/', headersObj);
  }

  postNewList( listName ) {

    var headersObj = {
      name: listName
    }

    return this.post('list_voter_rest_server/new-list/', headersObj);
  }

  postRemoveList( listId ) {

    var headersObj = {
      id: listId
    }

    return this.post('list_voter_rest_server/remove-list/', headersObj);
  }

  postNewListsIn( postId, newListsIn ) {

    var headersObj = {
      inlists: newListsIn,
      postid: postId
    }

    return this.post('list_voter_rest_server/in-lists/', headersObj);
  }

  postNewVotes( postId, newVotes ) {

    var headersObj = {
      votes: newVotes,
      postid: postId
    }

    return this.post('list_voter_rest_server/votes/', headersObj);
  }

  post( endpoint, headersObj ) {

    var config = {
      headers: headersObj
    }

    return axios.post(
      `${this.ROOT_URL}${endpoint}`,
      null,
      config
    )
  }


}
