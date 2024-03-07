import React, { useEffect } from 'react';
import style from './ImageGallery.module.css';
import { nanoid } from 'nanoid';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

const ImageGallery = ({ loader, imagesArray, modalFn }) => {
  useEffect(() => {
    loader(true);
    return loader(false);
  }, [loader]);

  return (
    <>
      <ul className={style.ImageGallery}>
        {imagesArray.map((image, idx) => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              imageKey={image.id}
              modalFn={modalFn}
              imageLink={image.webformatURL}
              imagAlt={image.tag}
              largeImageURL={image.largeImageURL}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  loader: propTypes.func.isRequired,
  imagesArray: propTypes.array.isRequired,
  modalFn: propTypes.func.isRequired,
};

export default ImageGallery;





