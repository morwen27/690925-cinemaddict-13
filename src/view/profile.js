import AbstractView from '../abstract.js';

export const createProfileTemplate = (profileInfo) => {
  const {rank} = profileInfo;

  return `<section class="header__profile profile">
                <p class="profile__rating">${rank}</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            </section>`;
};

export default class Profile extends AbstractView {
  constructor(profileInfo) {
    super();
    this._profileInfo = profileInfo;
  }

  getTemplate() {
    return createProfileTemplate(this._profileInfo);
  }
}
