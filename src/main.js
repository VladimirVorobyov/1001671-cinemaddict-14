import {render, RenderPosition} from './utils/render.js';
import { generateMovie } from './mock/movie.js';
import { createFilter } from './mock/filter.js';
import MenuTemplateView  from './view/main-navigation.js';
import SortTemplateView  from './view/main-sort.js';
import  UserTemplateView  from './view/user.js';
import FilmsTemplateView from './view/films.js';
import NumberMoviesView  from './view/number-fims.js';
import comments from './mock/comment.js';
import FilterNavigationView from './view/filter.js';
import MovieListPresenter from './presenter/movie-list.js';

const FILMS_NUMBER = 20;
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const tasks = new Array(FILMS_NUMBER).fill().map(generateMovie);
const FilmsListPresenter = new MovieListPresenter(siteMainElement,comments);

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

FilmsListPresenter.init(tasks);
