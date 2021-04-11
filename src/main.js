import {renderElement, RenderPosition} from './util.js';
import MenuTemplate  from './view/main-navigation.js';
import SortTemplate  from './view/main-sort.js';
import  UserTemplate  from './view/user.js';
import FilmsTemplate from './view/films.js';
import CardView from './view/card.js';
import ButtonTemplate  from './view/sow-more.js';
import PopupTemplate  from './view/popup.js';
import NumberMovies  from './view/number-fims.js';
import { generateMovie } from './mock/movie.js';
import comments from './mock/comment.js';
import CommentView from './view/comment.js';
import GenerePopup from './view/genere.js';
import FilterNavigation from './view/filter.js';
import { createFilter } from './mock/filter.js';

const FILMS_NUMBER = 15;
const FILMS_TOP = 2;
const TASK_COUNT_PER_STEP = 5;


const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const tasks = new Array(FILMS_NUMBER).fill().map(generateMovie);

renderElement(siteMainElement, new MenuTemplate().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortTemplate().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsTemplate().getElement(), RenderPosition.BEFOREEND);
renderElement(headerElement, new UserTemplate().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new PopupTemplate(tasks[0]).getElement(), RenderPosition.BEFOREEND);
renderElement(footerStatistics, new NumberMovies().getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {

  renderElement(filmsListContainer, new CardView(tasks[i]).getElement(), RenderPosition.BEFOREEND);

}

const topRated = document.querySelector('#top-rated');
const mostCommented = document.querySelector('#most-commented');

for (let i = 0; i < FILMS_TOP; i++) {

  renderElement(topRated, new CardView(tasks[i]).getElement(), RenderPosition.BEFOREEND);
  renderElement(mostCommented, new CardView(tasks[i]).getElement(), RenderPosition.BEFOREEND);

}

const commentsForFilm = comments.filter((comment) => {
  return tasks[0].comments.includes(comment.id);
});

const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');

commentsForFilm.forEach((comment) => {
  renderElement(filmDetailsCommentsList, new CommentView(comment).getElement(), RenderPosition.BEFOREEND);
});

const filmDetailsGenery = document.querySelector('#genery');

for (let i = 0; i < tasks[0].listGeneres.length; i++) {

  renderElement(filmDetailsGenery, new GenerePopup(tasks[0], i).getElement(), RenderPosition.BEFOREEND);

}

const closeBtn = document.querySelector('.film-details__close-btn');
const filmsDetails = siteMainElement.querySelector('.film-details');
const filmsList = document.querySelector('.films-list');

if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;
  renderElement(filmsList, new ButtonTemplate().getElement(), RenderPosition.BEFOREEND);
  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderElement(filmsListContainer, new CardView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }

  });
}

const mainNavigationItems = document.querySelector('.main-navigation__items');
const filters = createFilter();
for (let i = 0; i < filters.length; i++) {
  renderElement(mainNavigationItems, new FilterNavigation(filters[i]).getElement(),RenderPosition.BEFOREEND);
}


closeBtn.addEventListener('click', () => {
  filmsDetails.style.display = 'none';
});

