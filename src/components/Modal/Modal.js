import React, { Component } from 'react';
import propTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  static propTypes = { closeFn: propTypes.func, loader: propTypes.func };

  componentDidMount() {
    console.log('Modal component did Mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeFn();
    }
  };
  handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.closeFn();
    }
  };

  componentWillUnmount() {
    console.log(' Modal component Will Unmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleBackdrope}>
        <div className={style.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
export default Modal;
