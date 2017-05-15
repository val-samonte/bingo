import React, { Component } from 'react';
import './newsetform.css';

class NewSetForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      setName: '',
      enableAdd: false
    }
  }

  onDone = (event) => {
    if (this.props.onDone && typeof this.props.onDone === 'function') {
      this.props.onDone(this.state.setName);
      this.setState({
        setName: '',
        enableAdd: false
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      setName: event.target.value,
      enableAdd: !!event.target.value
    });
  }

  handleKeyInput = (event) => {
    if (event.keyCode === 13 && !!this.state.setName) {
      this.onDone();
    }
  }

  render() {
    return <div className="setform">
      <input type="text" value={this.state.setName} 
        onKeyUp={this.handleKeyInput}
        onChange={this.handleInputChange} placeholder="Enter set name" />
      <button type="button" disabled={!this.state.enableAdd} onClick={this.onDone}>+ Add Set</button>
    </div>
  }
}

export default NewSetForm;
