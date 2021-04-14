import {render, RenderPosition, replace, remove} from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { createFilter } from './mock/filter.js';
import MenuTemplateView  from './view/main-navigation.js';
import SortTemplateView  from './view/main-sort.js';
import  UserTemplateView  from './view/user.js';
import FilmsTemplateView from './view/films.js';
import CardView from './view/card.js';
import ButtonTemplateView  from './view/sow-more.js';
import PopupTemplateView  from './view/popup.js';
import NumberMoviesView  from './view/number-fims.js';
import comments from './mock/comment.js';
import CommentView from './view/comment.js';
import GenerePopupView from './view/genere.js';
import FilterNavigationView from './view/filter.js';
import NoFilmsTemplateView from './view/no-films.js';

const FILMS_NUMBER = 20;
const FILMS_TOP = 2;
const TASK_COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const tasks = new Array(FILMS_NUMBER).fill().map(generateMovie);

const renderTask = (taskListElement, task) => {
  const PopupComponent = new PopupTemplateView(task);
  const cardFilm = new CardView(task);

  const replacePopup = () => {
    replace(PopupComponent, taskListElement);

    const commentsForFilm = comments.filter((comment) => {
      return task.comments.includes(comment.id);
    });

    const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');

    commentsForFilm.forEach((comment) => {
      render(filmDetailsCommentsList, new CommentView(comment), RenderPosition.BEFOREEND);
    });

    const filmDetailsGenery = document.querySelector('#genery');

    for (let i = 0; i < task.listGeneres.length; i++) {

      render(filmDetailsGenery, new GenerePopupView(task, i), RenderPosition.BEFOREEND);

    }
    document.body.classList.add('hide-overflow');
  };

  const replaceMain = () => {
    remove(PopupComponent,taskListElement);
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceMain();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  cardFilm.setClickCard( () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  cardFilm.setClickCard( () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  cardFilm.setClickCard( () => {
    replacePopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  PopupComponent.setClickPopup( () => {
    replaceMain();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(taskListElement, cardFilm, RenderPosition.BEFOREEND);
};

render(siteMainElement, new MenuTemplateView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortTemplateView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsTemplateView(), RenderPosition.BEFOREEND);
render(headerElement, new UserTemplateView(), RenderPosition.BEFOREEND);
render(footerStatistics, new NumberMoviesView(), RenderPosition.BEFOREEND);

const mainNavigationItems = document.querySelector('.main-navigation__items');
const filters = createFilter();
for (let i = 0; i < filters.length; i++) {
  render(mainNavigationItems, new FilterNavigationView(filters[i]),RenderPosition.BEFOREEND);
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
    const loadMoreButtonComponent = new ButtonTemplateView();
    render(filmsList, loadMoreButtonComponent, RenderPosition.BEFOREEND);
    const loadMoreButton = filmsList.querySelector('.films-list__show-more');

    loadMoreButtonComponent.setClickHandler(() => {
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
  render(siteMainElement, new NoFilmsTemplateView(), RenderPosition.AFTERBEGIN);
}
