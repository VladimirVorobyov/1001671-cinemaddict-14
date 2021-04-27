import { generateMovie } from './mock/movie.js';
import { createFilter } from './mock/filter.js';
import comments from './mock/comment.js';
import MovieListPresenter from './presenter/movie-list.js';

const FILMS_NUMBER = 20;
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');
const filters = createFilter();

const tasks = new Array(FILMS_NUMBER).fill().map(generateMovie);
const FilmsListPresenter = new MovieListPresenter(siteMainElement,comments,headerElement,footerStatistics);

FilmsListPresenter.init(tasks,filters);
