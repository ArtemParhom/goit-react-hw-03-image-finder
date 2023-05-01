import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }

  clickEsc = evn => {
    if (evn.code === `Escape`) {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.clickEsc);
  }

  render() {
    return (
      <div
        className={css.Overlay}
        onClick={event => {
          if (event.target === event.currentTarget) {
            this.props.closeModal();
          }
        }}
      >
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
