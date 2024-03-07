import React from 'react';
import propTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';

const ImageGalleryItem = ({
  imageKey,
  imageLink,
  imageAlt,
  largeImageURL,
  modalFn,
}) => {
  return (
    <li className={style.ImageGalleryItem} key={nanoid()}>
      <img
        onClick={e => {
          modalFn(e.target.attributes[1].value);
          console.log(e);
        }}
        key={imageKey}
        src={imageLink}
        alt={imageAlt}
        data-large={largeImageURL}
        className={style.ImageGalleryItem_image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageKey: propTypes.number.isRequired,
  imageLink: propTypes.string.isRequired,
  imageAlt: propTypes.string,
  largeImageURL: propTypes.string.isRequired,
  modalFn: propTypes.func.isRequired,
};

export default ImageGalleryItem;