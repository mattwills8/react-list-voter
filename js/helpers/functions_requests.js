import axios from 'axios';

export class wpRequest {
  constructor() {

    this.ROOT_URL = `http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/wp/v2/`;
    //this.ROOT_URL = `${window.location.hostname}/index.php/wp-json/wp/v2/`;
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


}
