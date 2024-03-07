import React from 'react';
import propTypes from 'prop-types';
import style from './Button.module.css';

const Button = ({ fn }) => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  return (
    <button className={style.Button} type="button" onClick={() => fn()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  fn: propTypes.func.isRequired,
};

export default Button;
