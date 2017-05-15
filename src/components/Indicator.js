import React from 'react';
import './indicator.css';

const Indicator = (props) => {

  const { className, header, cells, selected, onCellClick } = props;

  const cls = 'indicator' + (className? ' ' + className : '');

  return (
    <div className={cls}>
      <ul>
        {header && <li className="cell header">{header}</li>}
        {cells && cells.map((cell, i) => {
          let cls = 'cell'
          if (isNaN(+cell)) {
            cls += ' free';
          }
          if((selected && selected.indexOf(+cell) !== -1)) {
            cls += ' selected'
          }
          return <li className={cls} key={i} onClick={onCellClick}>{cell}</li>;
        })}
      </ul>
    </div>
  );
}

export default Indicator;
