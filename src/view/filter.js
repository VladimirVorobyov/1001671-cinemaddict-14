export const createFilterNavigation = (name,num) => {
  return  `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}<span class="main-navigation__item-count">${num}</span></a>`;
};
