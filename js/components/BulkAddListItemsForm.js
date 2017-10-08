import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';

export default class BulkAddListItemsForm extends Component {
  constructor(props){
    super(props);

    this.bulkAddItems = this.bulkAddItems.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(files) {

    Papa.parse(files[0], {
    	delimiter: "",	// auto-detect
    	newline: "",	// auto-detect
    	quoteChar: '"',
    	header: true,
    	dynamicTyping: false,
    	preview: 0,
    	encoding: "",
    	worker: false,
    	comments: false,
    	step: undefined,
    	complete: (results) => {
    		this.bulkAddItems(results);
    	},
    	error: undefined,
    	download: false,
    	skipEmptyLines: false,
    	chunk: undefined,
    	fastMode: undefined,
    	beforeFirstChunk: undefined,
    	withCredentials: undefined
    });
  }

  bulkAddItems(results) {
    this.props.bulkAddListItems(this.props.listOfLists, this.props.selectedListId, results.data);
  }

  render() {

    return (
      <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
        <button className='btn'>Upload Bulk</button>
      </ReactFileReader>
    );
  }
}
