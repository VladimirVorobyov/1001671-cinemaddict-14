import { createElement } from '../util.js';

const createGenerePopup = (task,num) => {
  const {listGeneres} = task;
  return  `<span class="film-details__genre">${listGeneres[num]}</span>`;
};

export default class GenerePopup {
  constructor(task,num) {
    this._task = task;
    this._num = num;
    this._element = null;
  }

  getTemplate() {
    return createGenerePopup(this._task,this._num);
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
