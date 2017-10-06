//core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//action creators
import { selectList } from '../actions';

//components
import ListItemsTemplate from '../components/ListItemsTemplate';

class ListSelector extends Component {

  renderListOfLists() {
    return (
      this.props.listOfLists.map((item, i) => {
        return (
          <li
            key={`key_${item.id}`}
            onClick={() => this.props.selectList(item.id)}
            >
            {item.name}
          </li>
        );
      })
    );
  }

  render() {

    return (
      <ListItemsTemplate>
          {this.renderListOfLists()}
      </ListItemsTemplate>
    );
  }
}

function mapStateToProps(state) {

  return {
    listOfLists: state.listOfLists
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
      selectList : selectList,
    }
    , dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelector);
