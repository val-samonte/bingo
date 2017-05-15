import React from 'react';
import './card.css';

import Indicator from './Indicator';

const bingo = ['B', 'I', 'N', 'G', 'O'];

const Card = (props) => {
  const { className, selected, data, onRemove, id } = props;

  const cls = 'card' + (className ? ' ' + className : '');

  return (
    <div className={cls}>
      {data && data.map((cells, i) => 
        <Indicator key={i} header={bingo[i]} cells={cells} selected={selected} value={i}></Indicator>
      )}
      <div className="actions-overlay">
        <div className="remove-btn" onClick={onRemove} id={'remove_' + id}><span>×</span>Remove card</div>
      </div>
    </div>
  );
}

export default Card;