var TodoRow = React.createClass({
  getInitialState: function() {
    return {id: this.props.id}
  },


  editClick: function() {
    this.props.editClick(this);
  },

  updateClick: function() {
    this.props.updateClick(this);
  },

  deleteClick: function() {
    this.props.deleteClick(this);
  },

  render: function() {
    var editMode = this.props.focused;
    if (editMode) {
      return (
        <li key={this.props.id} className="TodoRowEdit">
          <input type="text" ref="txtUpdate" defaultValue={this.props.text}/>
          <div class="btn-group" role="group">
            <button type="button" ref="btnUpdate" onClick={this.updateClick} class="btn btn-default">Update</button>
            <button type="button" ref="btnCancel" onClick={this.editClick} class="btn btn-default">Cancel</button>
          </div>
        </li>
      );
    } else {
      return (
        <li key={this.props.id} className="TodoRow">
          <span>{this.props.text}</span>
          <span class="glyphicon glyphicon-pencil"></span>
          <button type="button" ref="btnEdit" onClick={this.editClick} class="btn btn-default">Edit</button>
          <button type="button" ref="btnDelete" onClick={this.deleteClick} class="btn btn-default">Delete</button>
        </li>
      );
    }
  }
});


var TodoList = React.createClass({
  getInitialState: function() {
    return {focusID: null, list: this.props.list};
  },


  editClick: function(childComponent) {
    var childID = childComponent.state.id;
    if (this.state.focudID == childID) {
      // already in edit mode: cancel
      this.setState({focusID: null});
    } else {
      // enter edit mode
      this.setState({focusID: childID});
    };
    
  },

  updateClick: function(childComponent) {
    var newText = childComponent.refs.txtUpdate.getDOMNode().value;
    var idToUpdate = childComponent.state.id;
    var list = this.state.list;
    list[idToUpdate].text = newText;
    this.setState({focusID: null, list: list})
  },

  deleteClick: function(childComponent) {
    var idToDelete = childComponent.state.id;
    var list = this.state.list;
    list.splice(idToDelete, 1);
    this.setState({list: list})
  },

  addNewItem: function() {
    var list = this.state.list;
    list.push({text: "New Item"})
    var focusOn = list.length-1;
    this.setState({list: list, focusID: focusOn})
  },


  render: function() {
    var focusID = this.state.focusID;
    var listNodes = this.props.list.map(function (todoItem, i) {
      return (
        <TodoRow
          text={todoItem.text}
          focused={i == focusID}
          id={i}
          editClick={this.editClick}
          updateClick={this.updateClick}
          deleteClick={this.deleteClick}
        />
      );
    }, this);
    return (
      <div className="TodoList">
        <h3>To do:</h3>
        <ul>
          {listNodes}
          <li key="add"><button type="button" onClick={this.addNewItem}>Add</button></li>
        </ul>

      </div>
    );
  }
});

var initialList = [
  {text: "Walk dog"},
  {text: "Do laundry"},
  {text: "Do dishes"}
];


React.render(<TodoList list={initialList} />, document.getElementById('content'));