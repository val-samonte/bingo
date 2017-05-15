import React, { Component } from 'react';
import './editcard.css';

const bingo = ['B', 'I', 'N', 'G', 'O'];
const generateBlankCard = () => [
  ['','','','',''],
  ['','','','',''],
  ['','','F','',''],
  ['','','','',''],
  ['','','','','']
]

class EditCard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: generateBlankCard()
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.refresh && props.refresh) {
      this.setState({
        data: generateBlankCard()
      });
    }
  }

  onDone = (event) => {
    if (this.props.onDone && typeof this.props.onDone === 'function') {
      this.props.onDone(this.state.data);
    }
  }

  handleInputChange = (event) => {
    const ids = event.target.name.split('_');
    const newData = this.state.data.concat([]);
    const val = parseInt(event.target.value, 10);

    if (isNaN(val)) {
      newData[ids[0]][ids[1]] = '';  
    } else {
      newData[ids[0]][ids[1]] = val;
    }

    this.setState({
      data: newData
    });
  }

  handleKeyInput = (event) => {
    if (event.keyCode === 13) {
      this.onDone();      
    } else if (event.keyCode === 27 && this.props.onCancel && 
      typeof this.props.onCancel === 'function') {
      this.props.onCancel();
    }
  }

  render() {
    const { onCancel } = this.props;
    const { data } = this.state;

    return <div className="editcard">
      <div className="inputs">
        {bingo.map((letter, col) => 
          <div key={letter}>
            <div className="cell header">{letter}</div>
            {bingo.map((dummy, row) => 
              <div className="cell" key={row}>
                {(letter === 'N' && row === 2)?
                  <input className="input" type="text" name={col + '_' + row} 
                    onChange={this.handleInputChange} value={data[col][row]} readOnly /> :
                  <input className="input" type="number" name={col + '_' + row} 
                    onKeyDown={this.handleKeyInput}
                    onChange={this.handleInputChange} value={data[col][row]} />
                }
              </div>
            )}
          </div>
        )}
      </div>
      <div className="editcard-action">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn" onClick={this.onDone}>Done</button>
      </div>
    </div>;
  }
}

export default EditCard;
