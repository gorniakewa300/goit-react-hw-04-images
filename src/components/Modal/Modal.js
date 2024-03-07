import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ onClose, modalImage }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleBackdrope = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleBackdrope}>
      <div className={style.Modal}>
        <img src={modalImage} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  modalImage: propTypes.element,
};

export default Modal;
