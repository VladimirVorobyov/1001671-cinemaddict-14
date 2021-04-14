import AbstractView from './abstract.js';

const createFilmsTemplate = () => {
  return `<section class="films">
            <section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

            <div class="films-list__container">

            </div>


          </section>

          <section class="films-list films-list--extra">
            <h2 class="films-list__title" >Top rated</h2>

            <div class="films-list__container" id="top-rated">

            </div>
          </section>

          <section class="films-list films-list--extra">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container" id="most-commented">

            </div>
          </section>
        </section>`;
};

export default class FilmsTemplate extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
