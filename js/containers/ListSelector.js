//core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//action creators
import { selectList, removeList } from '../actions';

//components
import ListItemsTemplate from '../components/ListItemsTemplate';
import RemoveButton from '../components/RemoveButton';

class ListSelector extends Component {

  renderListOfLists() {
    return (
      this.props.listOfLists.map((item, i) => {
        return (
          <div
            key={`key_${item.id}`}
            className="row">
            <li
              className="col-6"
              onClick={() => this.props.selectList(item.id)}>
              {item.name}
            </li>
            <div
              className="col-6">
              <RemoveButton
                btnContent="X"
                onClick={this.props.removeList}
                onClickArgs={[this.props.listOfLists, item.id]}/>
            </div>
          </div>
        );
      })
    );
  }

  render() {

    console.log(this.props.listOfLists);

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
      removeList : removeList
    }
    , dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelector);
