var TodoRow = React.createClass({displayName: "TodoRow",
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
        React.createElement("li", {key: this.props.id, className: "list-group-item"}, 
          React.createElement("input", {type: "text", ref: "txtUpdate", className: "", defaultValue: this.props.text}), 
            
            React.createElement("span", {ref: "btnCancel", onClick: this.editClick, className: "glyphicon glyphicon-ban-circle hover right", style: {opacity: 0.55, paddingLeft: '7px'}, title: "Cancel Edit"}), 
            React.createElement("span", {ref: "btnUpdate", onClick: this.updateClick, className: "glyphicon glyphicon-ok hover right", style: {position: 'float', align: 'right', opacity: 0.55, paddingLeft: '7px'}, title: "Update"})
        )
      );
    } else {
      return (
        React.createElement("li", {key: this.props.id, className: "list-group-item"}, 
          React.createElement("span", null, this.props.text), 
          React.createElement("span", {ref: "btnDelete", onClick: this.deleteClick, className: "glyphicon glyphicon-remove hover right", style: {opacity: 0.55, paddingLeft: '7px'}, title: "Delete"}), 
          React.createElement("span", {ref: "btnEdit", onClick: this.editClick, className: "glyphicon glyphicon-pencil hover right", style: {opacity: 0.55, paddingLeft: '7px'}, title: "Edit"})
        )
      );
    }
  }
});

var TodoList = React.createClass({displayName: "TodoList",
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
        React.createElement(TodoRow, {
          text: todoItem.text, 
          focused: i == focusID, 
          id: i, 
          editClick: this.editClick, 
          updateClick: this.updateClick, 
          deleteClick: this.deleteClick}
        )
      );
    }, this);
    return (
      React.createElement("div", {className: "TodoList"}, 
        React.createElement("h2", {className: "title"}, "To do:"), 
        React.createElement("ul", {className: "list-group large", style: {marginLeft: 'auto', marginRight: 'auto', marginBottom: '50px', width: '40%'}}, 
          listNodes, 
          React.createElement("li", {key: "add", className: "list-group-item"}, React.createElement("span", {className: "glyphicon glyphicon-plus hover", onClick: this.addNewItem, style: {opacity: 0.7}, title: "Add new item"}))
        )

      )
    );
  }
});

var initialList = [
  {text: "Walk dog"},
  {text: "Do laundry"},
  {text: "Do dishes"}
];


React.render(React.createElement(TodoList, {list: initialList}), document.getElementById('content'));