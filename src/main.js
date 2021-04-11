import {render, RenderPosition} from './util.js';
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
import NoFilmsTemplate from './view/no-films.js';
import { createFilter } from './mock/filter.js';

const FILMS_NUMBER = 15;
const FILMS_TOP = 2;
const TASK_COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const tasks = new Array(FILMS_NUMBER).fill().map(generateMovie);

const renderTask = (taskListElement, task) => {
  const PopupComponent = new PopupTemplate(task);
  const cardFilm = new CardView(task);

  const replacePopup = () => {
    taskListElement.appendChild(PopupComponent.getElement());

    const commentsForFilm = comments.filter((comment) => {
      return task.comments.includes(comment.id);
    });

    const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');

    commentsForFilm.forEach((comment) => {
      render(filmDetailsCommentsList, new CommentView(comment).getElement(), RenderPosition.BEFOREEND);
    });

    const filmDetailsGenery = document.querySelector('#genery');

    for (let i = 0; i < task.listGeneres.length; i++) {

      render(filmDetailsGenery, new GenerePopup(task, i).getElement(), RenderPosition.BEFOREEND);

    }
    document.body.classList.add('hide-overflow');
  };

  const replaceMain = () => {
    taskListElement.removeChild(PopupComponent.getElement());
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceMain();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  cardFilm.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  cardFilm.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  cardFilm.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  PopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    replaceMain();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(taskListElement, cardFilm.getElement(), RenderPosition.BEFOREEND);
};

render(siteMainElement, new MenuTemplate().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortTemplate().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsTemplate().getElement(), RenderPosition.BEFOREEND);
render(headerElement, new UserTemplate().getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new NumberMovies().getElement(), RenderPosition.BEFOREEND);

const mainNavigationItems = document.querySelector('.main-navigation__items');
const filters = createFilter();
for (let i = 0; i < filters.length; i++) {
  render(mainNavigationItems, new FilterNavigation(filters[i]).getElement(),RenderPosition.BEFOREEND);
}

if (tasks.length) {
  const filmsListContainer = document.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {

    renderTask(filmsListContainer, tasks[i]);

  }

  const topRated = document.querySelector('#top-rated');
  const mostCommented = document.querySelector('#most-commented');

  for (let i = 0; i < FILMS_TOP; i++) {
    renderTask(topRated, tasks[i]);
    renderTask(mostCommented, tasks[i]);
  }

  const filmsList = document.querySelector('.films-list');

  if (tasks.length > TASK_COUNT_PER_STEP) {

    let renderedTaskCount = TASK_COUNT_PER_STEP;
    render(filmsList, new ButtonTemplate().getElement(), RenderPosition.BEFOREEND);
    const loadMoreButton = filmsList.querySelector('.films-list__show-more');

    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(filmsListContainer, task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreButton.remove();
      }

    });
  }
} else {
  render(siteMainElement, new NoFilmsTemplate().getElement(), RenderPosition.AFTERBEGIN);
}

