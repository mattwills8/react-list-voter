import axios from 'axios';

export class wpRequest {
  constructor() {

    //TODO: change this to root url for actual host
    //this.ROOT_URL = `${window.location.hostname}/index.php/wp-json/wp/v2/`;
    this.ROOT_URL = `http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/`;
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

  postNewListsIn( postId, newListsIn ) {

    var headersObj = {
      lists_in: newListsIn,
      post_id: postId
    }

    return this.post('list_voter_rest_server/lists-in/', headersObj);
  }

  postNewVotes( postId, newVotes ) {

    var headersObj = {
      votes: newVotes,
      post_id: postId
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
