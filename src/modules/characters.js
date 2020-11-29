export default class Characters {
  constructor() {
    this.page = 1;
    this.pages = 1;
    this.nextBtn = document.querySelector('#next-btn');
    this.prevBtn = document.querySelector('#prev-btn');
    this.backBtn = document.querySelector('#back-btn');
  }

  init() {
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));
    this.backBtn.addEventListener('click', this.backToList.bind(this));

    this.fetch();
  }

  async fetch() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${this.page}`,
    );
    if (response.ok) {
      const data = await response.json();
      this.pages = data.info.pages;
      this.updatePagination();
      this.drawList(data.results);
    }
  }

  drawList(characters) {
    const charactersContainer = document.querySelector('.characters');

    const frag = document.createDocumentFragment();

    characters.forEach((char) => {
      const tmp = document.createElement('div');
      tmp.dataset.id = char.id;
      tmp.classList.add('characters__item');

      tmp.innerHTML = this.generateCharacter(char);

      tmp.addEventListener('click', this.showDetails.bind(this));

      frag.appendChild(tmp);
    });

    charactersContainer.innerHTML = '';
    charactersContainer.appendChild(frag);
  }

  generateCharacter(char) {
    return `
      <figure class="characters__figure">
        <img src="${char.image}" alt="${char.name}" class="characters__image">
      </figure>
      <div class="characters__content">
        <h2 class="characters__header">${char.name}</h2>
        <h3 class="characters__status">${char.species} - ${char.status}</h3>
      </div>
    `;
  }

  updatePagination() {
    const currentPageContainer = document.querySelector('#current-page');
    currentPageContainer.innerText = this.page;

    if (this.page > 1) {
      this.prevBtn.disabled = false;
    } else {
      this.prevBtn.disabled = true;
    }

    if (this.page < this.pages) {
      this.nextBtn.disabled = false;
    } else {
      this.nextBtn.disabled = true;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.fetch();
    }
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page += 1;
      this.fetch();
    }
  }

  backToList() {
    const characterDiv = document.querySelector('.character');
    characterDiv.style.display = 'none';

    const pagination = document.querySelector('.pagination');
    pagination.style.display = '';

    const charactersList = document.querySelector('.characters');
    charactersList.style.display = '';
  }

  async showDetails(e) {
    const { id } = e.currentTarget.dataset;

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    if (response.ok) {
      const data = await response.json();
      this.showCharacter(data);
    }
  }

  showCharacter(char) {
    const charactersBox = document.querySelector('.character__box');
    charactersBox.innerHTML = `
      <figure class="character__figure">
        <img src="${char.image}" alt="${char.name}" class="character__image">
      </figure>
      <h2 class="character__header">${char.name}</h2>
      <h3 class="character__status">${char.species} - ${char.status}</h3>
      <div class="character__info">
        <p>
          <strong>Origin:</strong>
          ${char.origin.name}
        </p>
      </div>
      <div class="character__info">
        <p>
          <strong>Episodes:</strong>
          ${char.episode
            .map((epi) => epi.split('/episode/')[1])
            .map((epiNum) => epiNum)
            .join(', ')}
        </p>
      </div>
    `;

    const pagination = document.querySelector('.pagination');
    pagination.style.display = 'none';

    const charactersList = document.querySelector('.characters');
    charactersList.style.display = 'none';

    const characterDiv = document.querySelector('.character');
    characterDiv.style.display = 'block';
  }
}
