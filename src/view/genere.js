import AbstractView from './abstract.js';

const createGenerePopup = (task,num) => {
  const {listGeneres} = task;
  return  `<span class="film-details__genre">${listGeneres[num]}</span>`;
};

export default class GenerePopup extends AbstractView{
  constructor(task,num) {
    super();
    this._task = task;
    this._num = num;
  }

  getTemplate() {
    return createGenerePopup(this._task,this._num);
  }

}
