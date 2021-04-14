import AbstractView from './abstract.js';

const createNumberMovies = () => {
  return '<p>130 291 movies inside</p>';
};

export default class NumberMovies extends AbstractView {
  getTemplate() {
    return createNumberMovies();
  }
}
