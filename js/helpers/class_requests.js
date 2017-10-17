import axios from 'axios';

export class wpRequest {
  constructor() {

    //TODO: change this to root url for actual host
    this.ROOT_URL = `http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/wp/v2/`;
    //this.ROOT_URL = `${window.location.hostname}/index.php/wp-json/wp/v2/`;
  }

  listItemPostsById( id ) {

    return this.customPostsById( 'list_voter_list_item', id );
  }


  listItemPosts() {

    return this.customPosts( 'list_voter_list_item' );
  }


  customPostsById( customPostName, id ) {

    return this.get( `${customPostName}/${id}` );
  }


  customPosts( customPostName ) {

    return this.get( customPostName );
  }


  postById( id ) {

    return this.get(`posts/${id}`);
  }


  allPosts() {

    return this.get('posts');
  }


  get( endpoint ) {
    const url = `${this.ROOT_URL}${endpoint}`;

    return axios.get(url);
  }
  

  getUrl( url ) {

    return axios.get(url);
  }


}
