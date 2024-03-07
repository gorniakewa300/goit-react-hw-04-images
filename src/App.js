import React, { useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const API = '42701590-c13181f6f3111f0444d196ffb';

const App = () => {
  const [searchWords, setSearchWords] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  const setModalImageFn = linkImg => {
    return setModalImage(linkImg);
  };

  const openLargeImage = linkImg => {
    setModalImageFn(linkImg);
    toggleModal();
  };

  const loaderToggle = bool => {
    return setShowLoader(bool);
  };

  const getImages = (words, page) => {
    loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${API}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        console.log(page, words);
        pushImagesToState(response, words, page);
        loaderToggle(false);
        setCurrentPage(page + 1);
      });
  };

  const loadMoreFn = () => {
    loaderToggle(true);
    getImages(searchWords, currentPage);
  };

  const pushImagesToState = (response, words, page) => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    if (words !== searchWords) {
      newSearchArray = [...imagesFromResponse];
    } else {
      if (images === imagesFromResponse) {
        newSearchArray = [...images];
      } else if (page === currentPage) {
        newSearchArray = [...images, ...imagesFromResponse];
      } else {
        newSearchArray = [...images];
      }
    }
    setImages(newSearchArray);
  };

  const searchFormSubmit = event => {
    event.preventDefault();
    console.log('Wyszukano wyniki');
    setSearchWords('');
    setImages([]);
    console.log(images);
    setShowModal(false);
    setModalImage('');
    setCurrentPage(currentPage);

    const searchWordsValue = event.target[1].value;

    setSearchWords(searchWordsValue);

    const page = 1;
    getImages(searchWordsValue, page);
    event.target.reset();
  };

  return (
    <div>
      <div className="App">
        <Searchbar onSubmit={searchFormSubmit} />
        {searchWords !== '' && (
          <ImageGallery
            loader={loaderToggle}
            imagesArray={images}
            modalFn={openLargeImage}
          ></ImageGallery>
        )}
        {showLoader && (
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        )}
        {searchWords !== '' && <Button fn={loadMoreFn} />}
      </div>
      <div className="modal-root">
        {showModal && (
          <Modal
            onClose={toggleModal}
            loader={loaderToggle}
            modalImage={modalImage}
          />
        )}
      </div>
    </div>
  );
};

export default App;

 
