import { createElement } from '../util.js';

export const createFilterNavigation = (filter) => {
  const { desc, count } = filter;
  return  `<a href="#${desc.toLowerCase()}" class="main-navigation__item">${desc}<span class="main-navigation__item-count">${count}</span></a>`;
};

export default class FilterNavigation {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createFilterNavigation(this._filter);
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
