import {render, RenderPosition, replace, remove, subsitute, removeComponent} from '../utils/render.js';
import CardView from '../view/card.js';
import PopupTemplateView  from '../view/popup.js';
import CommentView from '../view/comment.js';
import GenerePopupView from '../view/genere.js';

export default class  Movie {
  constructor(commentsComponent, taskListElement, task, movieChange) {
    this._taskListElement = taskListElement;
    this._task = task;
    this._popupComponent= null;
    this._cardFilm = null;
    this._commentsComponent = commentsComponent;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._movieChange = movieChange;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
  }

  init() {
    const popup = this._popupComponent;
    const card = this._cardFilm;

    this._popupComponent = new PopupTemplateView(this._task);
    this._cardFilm = new CardView(this._task);

    this._cardFilm.setClickCard( () => {
      this._addCard();
    });

    this._popupComponent.setClickPopup( () => {
      this._removeCard();
    });

    this._cardFilm.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardFilm.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardFilm.setHistoryClickHandler(this._handleHistoryClick);

    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setHistoryClickHandler(this._handleHistoryClick);


    if(popup === null || card === null){
      render(this._taskListElement, this._cardFilm, RenderPosition.BEFOREEND);
      return;
    }

    if (this._taskListElement.getElement().contains(popup.getElement())) {
      subsitute(this._popupComponent, popup);
    }
    if (this._taskListContainer.getElement().contains(card.getElement())) {
      subsitute(this._cardFilm, card);
    }

    removeComponent(popup);
    removeComponent(card);

  }

  _removeCard () {
    this._replaceMain();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _addCard () {
    this._replacePopup();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown (evt)  {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceMain();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _replaceMain ()  {
    remove(this._popupComponent,this._taskListElement);
    document.body.classList.remove('hide-overflow');
  }

  _replacePopup () {
    replace(this._popupComponent, this._taskListElement);

    const commentsForFilm = this._commentsComponent.filter((comment) => {
      return this._task.comments.includes(comment.id);
    });

    const filmDetailsCommentsList = document.querySelector('.film-details__comments-list');

    commentsForFilm.forEach((comment) => {
      render(filmDetailsCommentsList, new CommentView(comment), RenderPosition.BEFOREEND);
    });

    const filmDetailsGenery = document.querySelector('#genery');

    for (let i = 0; i < this._task.listGeneres.length; i++) {

      render(filmDetailsGenery, new GenerePopupView(this._task, i), RenderPosition.BEFOREEND);

    }
    document.body.classList.add('hide-overflow');
  }

  destroy() {
    removeComponent(this._popupComponent);
    removeComponent(this._cardFilm);
  }

  _handleFavoriteClick() {
    this._movieChange(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._movieChange(
      Object.assign(
        {},
        this._task,
        {
          isWatchlist: !this._task.isWatchlist,
        },
      ),
    );
  }

  _handleHistoryClick() {
    this._movieChange(
      Object.assign(
        {},
        this._task,
        {
          isHistory: !this._task.isHistory,
        },
      ),
    );
  }
}
