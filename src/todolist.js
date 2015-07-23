var TodoRow = React.createClass({
  getInitialState: function() {
    return {id: this.props.id, style: {}}
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
    var style = this.state.style;
    if (editMode) {
      // edit mode
      return (
        <li key={this.props.id} className="list-group-item">
          <input type="text" ref="txtUpdate" className="" defaultValue={this.props.text}/>
          <span ref="btnCancel" onClick={this.editClick} className="glyphicon glyphicon-ban-circle hover right" style={{opacity: 0.55, paddingLeft: '7px'}} title="Cancel Edit"></span>
          <span ref="btnUpdate" onClick={this.updateClick} className="glyphicon glyphicon-ok hover right" style={{position: 'float', align: 'right', opacity: 0.55, paddingLeft: '7px'}} title="Update"></span>
        </li>
      );
    } else {
      // default mode
      return (
        <li key={this.props.id} className="list-group-item">
          <span>{this.props.text}</span>
          <span ref="btnDelete" onClick={this.deleteClick} className="glyphicon glyphicon-remove hover right" style={{opacity: 0.55, paddingLeft: '7px'}} title="Delete"></span>
          <span ref="btnEdit" onClick={this.editClick} className="glyphicon glyphicon-pencil hover right" style={{opacity: 0.55, paddingLeft: '7px'}} title="Edit"></span>
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
    if (this.state.focusID == childID) {
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
          updateClick={this.updateClick.bind(this, i)}
          deleteClick={this.deleteClick}
        />
      );
    }, this);
    return (
      <div className="TodoList">
        <h2 className="title">To do:</h2>
        <ul className="list-group large" style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '50px', width: '40%'}}>
          {listNodes}
          <li key="add" className="list-group-item"><span className="glyphicon glyphicon-plus hover" onClick={this.addNewItem} style={{opacity: 0.7}} title="Add new item"></span></li>
        </ul>

      </div>
    );
  }
});


var initialList = [
  {text: "Finish TodoList app"},
  {text: "Rock interview"},
  {text: "Land sweet job"},
  {text: "Be awesome"}
];


React.render(<TodoList list={initialList} />, document.getElementById('content'));