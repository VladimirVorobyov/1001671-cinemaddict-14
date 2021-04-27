import {render, RenderPosition, removeComponent} from '../utils/render.js';
import {updateItem} from '../utils/util.js';
import ButtonTemplateView  from '../view/sow-more.js';
import NoFilmsTemplateView from '../view/no-films.js';
import MenuTemplateView  from '../view/main-navigation.js';
import SortTemplateView  from '../view/main-sort.js';
import  UserTemplateView  from '../view/user.js';
import FilmsTemplateView from '../view/films.js';
import NumberMoviesView  from '../view/number-fims.js';
import FilterNavigationView from '../view/filter.js';
import MoviePresenter from './movie.js';
const TASK_COUNT_PER_STEP = 5;
const FILMS_TOP = 2;

export default class  MovieList {
  constructor(boardContainer, commentsComponent, headerContainer, footerStatContainer, navigationContainer) {
    this._boardContainer = boardContainer;
    this._navigationContainer = navigationContainer;
    this._headerContainer = headerContainer;
    this._footerStatContainer = footerStatContainer;
    this._commentsComponent = commentsComponent;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._loadMoreButtonComponent = new ButtonTemplateView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._taskPresenter = {};
    this._handleMovieChange = this._handleMovieChange.bind(this);
  }

  init(boardMovie, arr ) {
    render(this._boardContainer, new MenuTemplateView(), RenderPosition.BEFOREEND);
    render(this._boardContainer, new SortTemplateView(), RenderPosition.BEFOREEND);
    render(this._boardContainer, new FilmsTemplateView(), RenderPosition.BEFOREEND);
    render(this._headerContainer, new UserTemplateView(), RenderPosition.BEFOREEND);
    render(this._footerStatContainer, new NumberMoviesView(), RenderPosition.BEFOREEND);

    const mainNavigationItems = document.querySelector('.main-navigation__items');
    for (let i = 0; i < arr.length; i++) {
      render( mainNavigationItems, new FilterNavigationView(arr[i]),RenderPosition.BEFOREEND);
    }

    this._renderBoardMovie(boardMovie);
  }

  _renderBoardMovie(boardMovie){
    this._boardMovie = boardMovie.slice();
    if (boardMovie.length) {
      const filmsListContainer = document.querySelector('.films-list__container');

      for (let i = 0; i < Math.min(boardMovie.length, TASK_COUNT_PER_STEP); i++) {

        this._renderTask(filmsListContainer, boardMovie[i]);

      }

      const topRated = document.querySelector('#top-rated');
      const mostCommented = document.querySelector('#most-commented');

      for (let i = 0; i < FILMS_TOP; i++) {
        this._renderTask(topRated, boardMovie[i]);
        this._renderTask(mostCommented, boardMovie[i]);
      }
      if (boardMovie.length > TASK_COUNT_PER_STEP) {
        this._renderLoadMoreButton(boardMovie,filmsListContainer);
      }
    } else {
      this._renderNoTasks();
    }
  }

  _renderTask(taskListElement, task) {
    const taskPresenter = new MoviePresenter(this._commentsComponent, taskListElement, task, this._handleMovieChange);
    taskPresenter.init();
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderNoTasks() {
    render(this._boardContainer, new NoFilmsTemplateView(), RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    const filmsListContainer = document.querySelector('.films-list__container');
    const loadMoreButton = document.querySelector('.films-list__show-more');
    this._boardMovie
      .slice(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => this._renderTask(filmsListContainer, task));

    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardMovie.length) {
      loadMoreButton.remove();
    }

  }

  _handleMovieChange(movie) {
    this._boardMovie = updateItem(this._boardMovie, movie);
    this._taskPresenter[movie.id].init(movie);
  }

  _renderLoadMoreButton() {
    const filmsList = document.querySelector('.films-list');
    render(filmsList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }
  _clearTaskList() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    removeComponent(this._loadMoreButtonComponent);
  }
}

