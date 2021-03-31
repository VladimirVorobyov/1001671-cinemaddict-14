import { createMenuTemplate } from './view/main-navigation.js';
import { createSortTemplate } from './view/main-sort.js';
import { createUserTemplate } from './view/user.js';
import { createFilmsTemplate } from './view/films.js';
import { createCardTemplate } from './view/card.js';
import { createButtonTemplate } from './view/sow-more.js';
import { createFilmsTopTemplate } from './view/top-rated.js';
import { createMostCommentedTemplate } from './view/most-commented.js';
const FILMS_NUMBER = 5;
const FILMS_TOP = 2;

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');
render(headerElement, createUserTemplate(), 'beforeend');

for(let i = 0; i < FILMS_NUMBER; i++){
  const filmsListContainer = document.querySelector('.films-list__container');
  render(filmsListContainer, createCardTemplate(), 'beforeend');
}

const filmsList = document.querySelector('.films-list');
render(filmsList, createButtonTemplate(), 'beforeend');

for(let i = 0; i < FILMS_TOP; i++){
  const topRated = document.querySelector('#top-rated');
  render(topRated, createFilmsTopTemplate(), 'beforeend');
}

for(let i = 0; i < FILMS_TOP; i++){
  const topRated = document.querySelector('#most-commented');
  render(topRated, createMostCommentedTemplate(), 'beforeend');
}
