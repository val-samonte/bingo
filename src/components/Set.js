import React from 'react';
import './set.css';

import Card from './Card';

const Set = (props) => {
  const { className, selected, name, data, index, onAddCard, onRemoveCard, onRemoveSet } = props;

  const cls = 'set' + (className ? ' ' + className : '');

  return (
    <div className={cls}>
      <div className="set-header">
        <span>{name}</span>
        <button onClick={onRemoveSet} id={'removeset_' + index}>×</button>
      </div>
      <div className="set-cards">
        {data && data.map((cellData, cardIndex) => 
          <Card key={cardIndex} data={cellData} selected={selected} onRemove={onRemoveCard} id={index + '_' + cardIndex}></Card>
        )}
        <div className="add-btn" onClick={onAddCard} id={'add_' + index}><span>+</span>Add card</div>
      </div>
    </div>
  );
}

export default Set;
