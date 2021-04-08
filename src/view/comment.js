export const createComment = (task, num) => {
  const {comment:{date,emotion,author, message} } = task;
  return  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${emotion[num]}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${message[num]}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author[num]}</span>
                <span class="film-details__comment-day">${date[num]}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};
