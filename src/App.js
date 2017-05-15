import React, { Component } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Indicator from './components/Indicator';
import PlayBoard from './components/PlayBoard';
import Set from './components/Set';
import Modal from './components/Modal';
import EditCard from './components/EditCard';
import NewSetForm from './components/NewSetForm';

const B = [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15];
const I = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const N = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
const G = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
const O = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = JSON.parse(localStorage.getItem('state')) || {
      sets: [],
      selected: [],
      editCard: false
    };
    this.selectedSetIndex = undefined;
    this.selectedCardIndex = undefined;
  }

  saveState = (state) => {
    this.setState(state, () => {
      localStorage.setItem('state', JSON.stringify(this.state));
    });
  }

  onCellClick = (event) => {

    const val = +event.target.innerHTML;
    const newState = {};
    const index = this.state.selected.indexOf(val);

    if (index === -1) {
      newState.selected = this.state.selected.concat(val);
    } else {
      newState.selected = this.state.selected.slice(0, index).concat(this.state.selected.slice(index+1));
    }

    this.saveState(newState);
  }

  onClear = (event) => {
    if (confirm('Are you sure you want to clear selections?')) {
      this.saveState({ selected: [] });
    }
  }

  onAddCard = (event) => {
    const id = event.target.attributes.id.value;
    this.selectedSetIndex = parseInt(id.replace('add_', ''), 10);
    this.saveState({
      editCard: true
    });
  }

  onRemoveCard = (event) => {
    const id = event.target.attributes.id.value;
    const ids = id.replace('remove_', '').split('_').map(id => parseInt(id, 10));
    this.selectedCardIndex = ids[1];

    if (confirm('Are you sure you want to remove this card?')) {
      const setCards = this.state.sets[ids[0]].cards;
      const newCards = setCards.slice(0, ids[1]).concat(setCards.slice(ids[1]+1));
      const newState = Object.assign({}, this.state);
      newState.sets[ids[0]].cards = newCards;
      this.saveState(newState);  
    }
  }

  onEditCardCancel = (event) => {
    this.saveState({
      editCard: false
    });
  }

  onEditCardConfirm = (data) => {
    
    const newState = Object.assign({}, this.state, {editCard: false});
    newState.sets[this.selectedSetIndex].cards.push(data);    

    this.saveState(newState);
  }

  onAddSet = (name) => {
    const newSets = this.state.sets.concat({
      name, cards: []
    });
    const newState = Object.assign({}, this.state, { sets: newSets });

    this.saveState(newState);
  }

  onRemoveSet = (event) => {
    const id = parseInt((event.target.attributes.id.value + '').replace('removeset_',''), 10);
    const sets = this.state.sets;
    const newSets = sets.slice(0, id).concat(sets.slice(id + 1));
    const newState = Object.assign({}, this.state, { sets: newSets });

    this.saveState(newState);
  }

  render() {
    const { selected, editCard, sets } = this.state;

    return (
      <div className="App">
        <Sidebar onClear={this.onClear}>
          <Indicator header="B" cells={B} selected={selected} onCellClick={this.onCellClick}></Indicator>
          <Indicator header="I" cells={I} selected={selected} onCellClick={this.onCellClick}></Indicator>
          <Indicator header="N" cells={N} selected={selected} onCellClick={this.onCellClick}></Indicator>
          <Indicator header="G" cells={G} selected={selected} onCellClick={this.onCellClick}></Indicator>
          <Indicator header="O" cells={O} selected={selected} onCellClick={this.onCellClick}></Indicator>
        </Sidebar>
        <PlayBoard>
          {sets && sets.map((set, i) => 
            <Set key={set.name} name={set.name} index={i}
              data={set.cards} selected={selected} 
              onAddCard={this.onAddCard} onRemoveCard={this.onRemoveCard} onRemoveSet={this.onRemoveSet}></Set>
          )}
          <NewSetForm onDone={this.onAddSet}></NewSetForm>
        </PlayBoard>
        <Modal isOpen={editCard}>
          <EditCard refresh={editCard} onCancel={this.onEditCardCancel} onDone={this.onEditCardConfirm}></EditCard>
        </Modal>
      </div>
    );
  }
}

export default App;
