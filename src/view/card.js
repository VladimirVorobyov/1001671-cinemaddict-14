import AbstractView from './abstract.js';

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

export default class Card extends AbstractView  {
  constructor(task) {
    super();
    this._task = task;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._task);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickCard(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
