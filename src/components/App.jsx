import css from './App.module.css';
import { Searchbar } from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import { Modal } from './modal/Modal';
import { Component } from 'react';
import Notiflix from 'notiflix';

const Pixabay_KEY = '34339532-e640da46c9754c0f99dc11386';
const Pixabay_PER_PAGE = `12`;
const Pixabay_URL = `https://pixabay.com/api/?`;

export class App extends Component {
  state = {
    inputValue: '',
    arrayImages: [],
    page: 1,
    totolPage: 1,
    modal: false,
    loading: false,
    image: ``,
  };

  handelSubmit = inputValue => {
    if (inputValue.trim() === '') {
      Notiflix.Notify.failure('схоже що ви ввели пробіли замість cлова');
      return;
    }
    this.setState({
      inputValue,
      arrayImages: [],
      page: 1,
      totolPage: 1,
      modal: false,
      loading: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getPixabayApi = (value, page) => {
    const urlParams = new URLSearchParams({
      q: value,
      page: page,
      key: Pixabay_KEY,
      image_type: `photo`,
      orientation: `horizontal`,
      per_page: Pixabay_PER_PAGE,
    });
    return fetch(`${Pixabay_URL}&${urlParams}`);
  };

  getMainFunction = (value, page) => {
    this.setState({ loading: true });
    this.getPixabayApi(value, page)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('за вашим запитом нічого не знайдено');
        }
        this.setState(prevState => ({
          page: prevState.page,
          arrayImages: [...prevState.arrayImages, ...data.hits],
          totolPage: data.total,
        }));
      })
      .catch(() => {
        Notiflix.Notify.failure('помилка при завантаженні');
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  componentDidUpdate(_, PrevState) {
    const { inputValue, page } = this.state;
    if (PrevState.inputValue !== inputValue || PrevState.page !== page) {
      this.getMainFunction(inputValue, page);
    }
  }
  //----------
  openModal = (image, alt) => {
    this.setState(({ modal }) => {
      return { modal: !modal, image: image, alt };
    });
  };

  closeModal = () => {
    this.setState(({ modal }) => {
      return { modal: !modal };
    });
  };
  //----------
  render() {
    const { arrayImages, page, totolPage, loading, image, alt } = this.state;

    return (
      <div className={css.App}>
        <Searchbar handelSubmit={this.handelSubmit} />
        <ImageGallery openModal={this.openModal} arrayImages={arrayImages} />
        {loading && (
          <div className={css.Loader}>
            <Loader />
          </div>
        )}
        {arrayImages.length > 1 && totolPage / 12 > page ? (
          <Button onClick={this.loadMore} />
        ) : (
          ''
        )}
        {this.state.modal && (
          <Modal closeModal={this.closeModal} src={image} alt={alt}></Modal>
        )}
      </div>
    );
  }
}
