import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const { className, children, onClear } = props;

  const cls = 'sidebar' + (className ? ' ' + className : '');

  return (
    <div className={cls}>
      <div className="indicators">{children}</div>
      <button className="clear-btn" onClick={onClear}>× Clear</button>
    </div>
  );
}

export default Sidebar;
