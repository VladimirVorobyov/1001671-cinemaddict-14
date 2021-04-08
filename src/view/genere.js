export const createGenerePopup = (task,num) => {
  const {listGeneres} = task;
  return  `<span class="film-details__genre">${listGeneres[num]}</span>`;
};
