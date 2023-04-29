import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onChangeInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  resetState = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={event => {
            event.preventDefault();
            !this.state.inputValue
              ? alert('Введіть текст')
              : this.props.handelSubmit(this.state.inputValue);
            this.resetState();
          }}
        >
          <button type="submit" className={css.SearchFormButton}></button>

          <input
            onChange={this.onChangeInput}
            className={css.SearchFormInput}
            name="inputValue"
            value={this.state.inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeolder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
