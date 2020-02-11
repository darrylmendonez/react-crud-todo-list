import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItems from './components/listItems'
import AddItem from './components/addItem'
import { addItem } from './store/actions/listActions';

class App extends Component {
  render() {
    const { list } = this.props;
    return (
      <div className="App">
        <div className="container">
          <br/>
          <div className="row">
            <div className="col-md-6 offset-md-2">
              <div className="card">
                <div className="card-header">
                  {list.title}
                </div>
                <ListItems listItems={list.listItems} editItemStatus={list.editItemStatus}/>
              </div>
            </div>
            <AddItem />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps)(App);
