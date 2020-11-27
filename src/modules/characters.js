export default class Characters {
  constructor() {
    this.page = 1;
    this.pages = 1;
    this.nextBtn = document.querySelector('#next-btn');
    this.prevBtn = document.querySelector('#prev-btn');
  }

  init() {
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));

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
      tmp.classList.add('characters__item');

      tmp.innerHTML = this.generateCharacter(char);

      frag.appendChild(tmp);
    });

    charactersContainer.innerHTML = '';
    charactersContainer.appendChild(frag);
  }

  generateCharacter(char) {
    return `
      <figure class="characters__figure">
        <img src="${char.image}" class="characters__image">
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
}
