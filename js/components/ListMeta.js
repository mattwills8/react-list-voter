//core
import React, { Component } from 'react';

export default class ListMeta extends Component {

  render() {

    return(
      <div
        className="row text-center list-meta">
        <div
          className="col-12">
          <h4
            className="text-center">
            List Shortcode:
          </h4>
          <h5
            className="text-center">
            [shortcode]
          </h5>
        </div>
      </div>
    );
  }

}
