import React, { Component } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const API = '42701590-c13181f6f3111f0444d196ffb';

class App extends Component {
  state = {
    searchWords: '',
    images: [],
    showModal: false,
    modalImage: '',
    showLoader: false,
    currentPage: 1,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };

  setModalImage = linkImg => {
    return this.setState(({ modalImage }) => ({ modalImage: linkImg }));
  };

  openLargeImage = linkImg => {
    this.setModalImage(linkImg);
    this.toggleModal();
  };

  loaderToggle = bool => {
    return this.setState(({ showLoader }) => ({ showLoader: bool }));
  };

  getImages(words, page) {
    this.loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${API}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        this.pushImagesToState(response);
        this.loaderToggle(false);
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
        }));
      });
  }

  searchFormSubmit = event => {
    event.preventDefault();
    this.setState({
      searchWords: '',
      images: [],
      showModal: false,
      modalImage: '',
      currentPage: 1,
    });
    const searchWordsValue = event.target[1].value;

    this.setState({ searchWords: searchWordsValue });
    const page = 1;
    this.getImages(searchWordsValue, page);
    event.target.reset();
  };

  loadMoreFn = () => {
    this.loaderToggle(true);
    this.getImages(this.state.searchWords, this.state.currentPage);
  };

  render() {
    return (
      <div>
        <div className="App">
          <Searchbar onSubmit={this.searchFormSubmit} />
          {this.state.searchWords !== '' && (
            <ImageGallery
              loader={this.loaderToggle}
              imagesArray={this.state.images}
              modalFn={this.openLargeImage}
            ></ImageGallery>
          )}
          {this.state.showLoader && (
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          )}
          {this.state.searchWords !== '' && <Button fn={this.loadMoreFn} />}
        </div>
        <div className="modal-root">
          {this.state.showModal && (
            <Modal closeFn={this.toggleModal} loader={this.loaderToggle}>
              <img src={this.state.modalImage} alt="modal" />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default App;
