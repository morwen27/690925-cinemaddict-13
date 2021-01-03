import SmartView from './smart.js';
import Comment from '../view/comment.js';

import dayjs from "dayjs";
import {generateStringFromArray} from '../utils/common.js';
import {commentsData} from '../mock/generatedDatas.js';

export const createPopupTemplate = (data, emoji) => {
  let {country, duration, release, rating, genre, poster, description, comments, title, ageRating, producers, screenwriters, actors, year, isFavorite, isInWatchList, isAlreadyWatched} = data;

  const generateMarkUpFromArray = (array, tag, tagsClass) => {
    let arrayElement = ``;
    let markUpString = ``;

    for (let i = 0; i < array.length; i++) {
      arrayElement = array[i];
      markUpString += `<` + tag + ` class="` + tagsClass + `">` + arrayElement + `</` + tag + `>`;
    }

    return markUpString;
  };

  const releaseDate = dayjs(release).format(`DD MMMM`) + ` ` + year;
  const genres = generateMarkUpFromArray(genre, `span`, `film-details__genre`);

  producers = generateStringFromArray(producers, `, `);
  screenwriters = generateStringFromArray(screenwriters, `, `);
  actors = generateStringFromArray(actors, `, `);

  const commentTitle = (comments > 1) ? `Comments` : `Comment`;

  let commentTemplate = ``;

  for (let i = 0; i < comments; i++) {
    commentTemplate += new Comment(commentsData[i]).getTemplate();
  }

  const genreTitle = (genre.length > 1) ? `Genres` : `Genre`;

  const markFavorite = isFavorite ? `checked` : ``;
  const markInWatchList = isInWatchList ? `checked` : ``;
  const markAlreadyWatched = isAlreadyWatched ? `checked` : ``;

  const newEmoji = (emoji === null) ? `` : `<img src="./images/emoji/` + emoji + `.png" width="55" height="55" alt="emoji-` + emoji + `">`;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">
            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreTitle}</td>
                <td class="film-details__cell">${genres}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${markInWatchList}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${markAlreadyWatched}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${markFavorite}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">${commentTitle} <span class="film-details__comments-count">${comments}</span></h3>

          <ul class="film-details__comments-list">
          ${commentTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${newEmoji}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._data = Popup.parseFilmToData(film);

    this._newEmoji = null;

    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._formCommentSubmitHandler = this._formCommentSubmitHandler.bind(this);
    this._chooseNewCommentEmoji = this._chooseNewCommentEmoji.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._toWatchlistClickHandler = this._toWatchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._newEmoji);
  }

  _formCommentSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formCommentSubmit(Popup.parseDataToFilm(this._data));
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(this._film);
  }

  _toWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchlistClick(this._film);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(this._film);
  }

  _chooseNewCommentEmoji(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `IMG`) {
      return;
    }

    this._newEmoji = evt.target.parentElement.htmlFor.replace(`emoji-`, ``);

    this.updateData({});
  }

  setFormCommentSubmitHandler(callback) {
    this._callback.formCommentSubmit = callback;
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`submit`, this._formCommentSubmitHandler);
  }

  setClosePopupClickHandler(callback) {
    this._callback.closePopupClick = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;

    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchlistClick = callback;

    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._toWatchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;

    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._alreadyWatchedClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign({}, film, {});
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    if (data.newCommentEmoji === null) {
      return;
    }

    delete data.newCommentEmoji;
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._chooseNewCommentEmoji);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setFormCommentSubmitHandler(this._callback.formCommentSubmit);
    this.setClosePopupClickHandler(this._callback.closePopupClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setToWatchlistClickHandler(this._callback.toWatchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
  }
}
