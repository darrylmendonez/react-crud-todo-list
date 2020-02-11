import React from 'react'
import { connect } from 'react-redux';
import uuid from 'uuid';

import { launchEditor, deleteItem } from '../store/actions/listActions';

const ListItems = (props) => {
  const { listItems } = props;
  const { editItemStatus } = props;
  const { deleteItem } = props;
  const { launchEditor } = props;
  const editClicked = (id) => {
    launchEditor(id);
  }
  const deleteClicked = (id) => {
    deleteItem(id)
  }
  const items = listItems.length ? (
    listItems.map(listItem => {
    return (
      <li className="list-group-item" key={listItem.id}>
        {listItem.task}
        { editItemStatus.isUserEditing ? (
          <span></span>
        ) : (
          <span className="float-right">
            <i className="fa fa-pencil text-secondary" aria-hidden="true" onClick={ () => editClicked(listItem.id) }></i>&nbsp;
            <i className="fa fa-trash-o text-danger" aria-hidden="true" onClick={ () => deleteClicked(listItem.id) }></i>
          </span>
        )}
      </li>
    ) 
  })
  ) : (
    <li className="list-group-item">
      All tasks completed
    </li>
  )

  return (
    <ul className="list-group list-group-flush">
      { items }
    </ul>

  )
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    launchEditor: (id) => dispatch(launchEditor(id)),
    deleteItem: (id) => dispatch(deleteItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);