import { createElement } from '../util.js';

const createNumberMovies = () => {
  return '<p>130 291 movies inside</p>';
};

export default class NumberMovies {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNumberMovies();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
