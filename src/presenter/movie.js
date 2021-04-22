import {render, RenderPosition, replace, remove} from '../utils/render.js';
import CardView from '../view/card.js';
import PopupTemplateView  from '../view/popup.js';
import CommentView from '../view/comment.js';
import GenerePopupView from '../view/genere.js';

export default class  Movie {
  constructor(commentsComponent, taskListElement, task) {
    this._taskListElement = taskListElement;
    this._task = task;
    this._popupComponent= null;
    this._cardFilm = null;
    this._commentsComponent = commentsComponent;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }
  init() {
    this._popupComponent = new PopupTemplateView(this._task);
    this._cardFilm = new CardView(this._task);
    render(this._taskListElement, this._cardFilm, RenderPosition.BEFOREEND);

    this._cardFilm.setClickCard( () => {
      this._replacePopup();
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._cardFilm.setClickCard( () => {
      this._replacePopup();
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._cardFilm.setClickCard( () => {
      this._replacePopup();
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._popupComponent.setClickPopup( () => {
      this._replaceMain();
      document.removeEventListener('keydown', this._onEscKeyDown);
    });

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
}
