import {render, RenderPosition} from '../utils/render.js';
import ButtonTemplateView  from '../view/sow-more.js';
import NoFilmsTemplateView from '../view/no-films.js';
import MoviePresenter from './movie.js';
const TASK_COUNT_PER_STEP = 5;
const FILMS_TOP = 2;

export default class  MovieList {
  constructor(boardContainer, commentsComponent) {
    this._boardContainer = boardContainer;
    this._commentsComponent = commentsComponent;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._loadMoreButtonComponent = new ButtonTemplateView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    if (boardTasks.length) {
      const filmsListContainer = document.querySelector('.films-list__container');

      for (let i = 0; i < Math.min(boardTasks.length, TASK_COUNT_PER_STEP); i++) {

        this._renderTask(filmsListContainer, boardTasks[i]);

      }

      const topRated = document.querySelector('#top-rated');
      const mostCommented = document.querySelector('#most-commented');

      for (let i = 0; i < FILMS_TOP; i++) {
        this._renderTask(topRated, boardTasks[i]);
        this._renderTask(mostCommented, boardTasks[i]);
      }
      if (boardTasks.length > TASK_COUNT_PER_STEP) {
        this._renderLoadMoreButton(boardTasks,filmsListContainer);
      }
    } else {
      this._renderNoTasks();
    }
  }

  _renderTask(taskListElement, task) {
    const taskPresenter = new MoviePresenter(this._commentsComponent, taskListElement, task);
    taskPresenter.init();
  }

  _renderNoTasks() {
    render(this._boardContainer, new NoFilmsTemplateView(), RenderPosition.AFTERBEGIN);
  }
  _handleLoadMoreButtonClick() {
    const filmsListContainer = document.querySelector('.films-list__container');
    const loadMoreButton = document.querySelector('.films-list__show-more');
    this._boardTasks
      .slice(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => this._renderTask(filmsListContainer, task));

    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      loadMoreButton.remove();
    }

  }
  _renderLoadMoreButton() {
    const filmsList = document.querySelector('.films-list');
    render(filmsList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

}

