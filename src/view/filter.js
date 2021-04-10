export const createFilterNavigation = (filter) => {
  const { desc, count } = filter;
  return  `<a href="#${desc.toLowerCase()}" class="main-navigation__item">${desc}<span class="main-navigation__item-count">${count}</span></a>`;
};
