import { createElement } from '../util.js';

const createCardTemplate = (task) => {
  const {movieTitle, rating, productionYear, time, genre, poster, description, comments} = task;
  return `<article class="film-card">
            <h3 class="film-card__title">${movieTitle}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${productionYear}</span>
              <span class="film-card__duration">${time}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <div class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
            </div>
          </article>`;
};

export default class Card  {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._task);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
