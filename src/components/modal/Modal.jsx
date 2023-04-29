import { Component } from 'react';
import css from './Modal.module.css';

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
      <div className={css.Overlay} onClick={this.props.closeModal}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
