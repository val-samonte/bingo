import React from 'react';
import './modal.css';

const Modal = (props) => {
  const { className, children, isOpen } = props;

  const cls = 'modal' + (className? ' ' + className : '') + (isOpen? ' open' : '');
  
  return <div className={cls}>{children}</div>;
};

export default Modal;