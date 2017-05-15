import React from 'react';
import './playboard.css';

const PlayBoard = (props) => {
  const { className, children } = props;

  const cls = (className || '').split(' ').concat('playboard').join(' ');

  return (
    <div className={cls}>{children}</div>
  );
}

export default PlayBoard;
