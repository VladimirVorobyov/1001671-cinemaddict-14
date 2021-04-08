import { createMenuTemplate } from './view/main-navigation.js';
import { createSortTemplate } from './view/main-sort.js';
import { createUserTemplate } from './view/user.js';
import { createFilmsTemplate } from './view/films.js';
import { createCardTemplate } from './view/card.js';
import { createButtonTemplate } from './view/sow-more.js';
import { createPopupTemplate } from './view/popup.js';
import { createNumberMovies } from './view/number-fims.js';
import { generateTask } from './mock/task.js';
import { createComment } from './view/comment.js';
import { createGenerePopup } from './view/genere.js';

const FILMS_NUMBER = 15;
const FILMS_TOP = 2;
const TASK_COUNT_PER_STEP = 5;


const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');


const tasks = new Array(FILMS_NUMBER).fill().map(generateTask);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');
render(headerElement, createUserTemplate(), 'beforeend');
render(siteMainElement, createPopupTemplate(tasks[0]), 'beforeend');
render(footerStatistics, createNumberMovies(), 'beforeend');
const filmsListContainer = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {

  render(filmsListContainer, createCardTemplate(tasks[i]), 'beforeend');

}

for (let i = 0; i < FILMS_TOP; i++) {
  const topRated = document.querySelector('#top-rated');
  const mostCommented = document.querySelector('#most-commented');
  render(topRated, createCardTemplate(tasks[i]), 'beforeend');
  render(mostCommented, createCardTemplate(tasks[i]), 'beforeend');
}

for (let i = 0; i < tasks[0].numberComment; i++) {
  const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');
  render(filmDetailsCommentsList, createComment(tasks[0], i), 'beforeend');
}

for (let i = 0; i < tasks[0].listGeneres.length; i++) {
  const filmDetailsGenery = document.querySelector('#genery');
  render(filmDetailsGenery, createGenerePopup(tasks[0], i), 'beforeend');
}

const closeBtn = siteMainElement.querySelector('.film-details__close-btn');
const filmsDetails = siteMainElement.querySelector('.film-details');
const filmsList = document.querySelector('.films-list');
if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  render(filmsList, createButtonTemplate(), 'beforeend');
  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(filmsListContainer, createCardTemplate(task), 'beforeend'));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}


closeBtn.addEventListener('click', () => {
  filmsDetails.style.display = 'none';
});

