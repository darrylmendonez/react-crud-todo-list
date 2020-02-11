import React, { Component } from 'react'
import { connect } from 'react-redux';

import { addItem, saveEdit } from '../store/actions/listActions';
import { render } from '@testing-library/react';
import uuid from 'uuid';

class AddItem extends Component {
  currentItem;
  handleChangeInitialized = false;
  isCurrentItemInitialized = true;
  state = {
    id: uuid(),
    task: ''
  }

  handleChange = (e) => {
    this.handleChangeInitialized = true;
    this.isCurrentItemInitialized = false;
    this.currentItem = this.state.task;
    this.setState({
      task: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.currentItem);
    if (!this.handleChangeInitialized) {
      this.props.saveEdit({
        id: this.state.id,
        task: this.currentItem
      });
    }
    else {
      this.props.saveEdit(this.state);
    }
    this.setState({
      id: uuid(),
      task: ''
    })
    this.handleChangeInitialized = false;
    this.isCurrentItemInitialized = true;
  }
  render() {
    const { list } = this.props;
    this.currentItem = list.editItemStatus.currentItem;
    return (
        <div className="col-md-3">
        { list.editItemStatus.isUserEditing ?
          <div className="card">
            <div className="card-header">
              Save Task
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" id="add-task" onChange={this.handleChange} defaultValue={this.currentItem} value={(this.isCurrentItemInitialized ? this.currentItem : this.state.task)}/>
              </div>
              <button type="submit" className="btn btn-outline-success">
                <i className="fa fa-save"></i>
              </button>
            </form>
          </div> :
          <div className="card">
            <div className="card-header">
              Add Task
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" id="add-task" onChange={this.handleChange} value={this.state.task}/>
              </div>
              <button type="submit" className="btn btn-outline-primary">
                +
              </button>
            </form>
          </div> 
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (listItem) => dispatch(addItem(listItem)),
    saveEdit: (listItem) => dispatch(saveEdit(listItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);