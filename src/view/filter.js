import AbstractView from './abstract.js';

export const createFilterNavigation = (filter) => {
  const { desc, count } = filter;
  return  `<a href="#${desc.toLowerCase()}" class="main-navigation__item">${desc}<span class="main-navigation__item-count">${count}</span></a>`;
};

export default class FilterNavigation extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterNavigation(this._filter);
  }

}
