(function () {

  const model = {
    init() {
      var cats = [
        { id: '1', name: 'Fluffy', clicks: 0, img: 'http://lorempixel.com/400/200/cats/1' },
        { id: '2', name: 'Purr', clicks: 0, img: 'http://lorempixel.com/400/200/cats/2' },
        { id: '3', name: 'Wiskas', clicks: 0, img: 'http://lorempixel.com/400/200/cats/3' },
        { id: '4', name: 'Dragon', clicks: 0, img: 'http://lorempixel.com/400/200/cats/4' },
        { id: '5', name: 'Titan', clicks: 0, img: 'http://lorempixel.com/400/200/cats/5' },
      ];
      localStorage.cats = JSON.stringify(cats);
    },
    addCat(cat) {
      const cats = JSON.parse(localStorage.cats);
      localStorage.cats.push(cat);
      localStorage.cats = JSON.stringify(cats);
    },
    getCats() {
      return JSON.parse(localStorage.cats);
    },
    getCat(catId) {
      return model.getCats().filter(cat => cat.id === catId)[0];
    },
    updateCat(updatedCat) {
      const cats = model.getCats();
      const updatedCats = cats.map(cat => cat.id === updatedCat.id ? updatedCat : cat);
      localStorage.cats = JSON.stringify(updatedCats);
    },
  };

  const octopus = {
    selectedCatId: '',
    init() {
      model.init();
      viewCatsList.init();
      viewCatDetails.init();
      viewAdminForm.init();
    },
    getCats() {
      return model.getCats();
    },
    updateClickCount() { // handle cat click
      // Update cat click count value
      const cat = model.getCat(octopus.selectedCatId);
      const updatedCat = Object.assign({}, cat, { clicks: cat.clicks + 1 });
      model.updateCat(updatedCat);
      // Render cat view
      viewCatDetails.render(updatedCat);
    },
    updateCat(cat) {
      const updatedCat = Object.assign({}, cat, { id: octopus.selectedCatId });
      model.updateCat(updatedCat);
      console.log(cat)
      console.log(updatedCat)
      console.log(model.getCats())
      viewCatDetails.render(updatedCat);
    },
    // handle cat list change
    selectCat(catId) {
      // Get selected cat
      const cats = model.getCats();
      octopus.selectedCatId = catId;
      const selectedCat = model.getCat(octopus.selectedCatId);
      // Update cat view
      viewCatDetails.render(selectedCat);
    }
  };

  const viewCatsList = {
    init() {
      // Populate the cats list
      const cats = octopus.getCats();
      const catSelect = document.getElementById('catSelector');
      cats.forEach((cat) => {
        const catOption = document.createElement('option');
        catOption.innerText = cat.name;
        catOption.value = cat.id;
        catSelect.appendChild(catOption);
      });
      // set the event handler to handle onchange event with the octopus.
      catSelect.addEventListener('change', event =>
        octopus.selectCat(event.currentTarget.value)
      );
    }
  };

  const viewCatDetails = {
    init() {
      const kittenImg = document.getElementById('kitten');
      kittenImg.addEventListener('click', octopus.updateClickCount);
    },
    // render: show the current selected cat and its click count.
    render(cat) {
      const kittenImg = document.getElementById('kitten');
      const clickCounter = document.getElementById('counter');
      kittenImg.src = cat.img;
      clickCounter.innerText = cat.clicks;
    }
  };

  const viewAdminForm = {
    init() {
      this.adminFormVisible = false;
      this.updateFormVisibility = () => {
        this.adminForm.style.display = this.adminFormVisible ? 'initial' : 'none';
      };
      this.toggleFormVisibility = () => {
        this.adminFormVisible = !this.adminFormVisible;
        this.updateFormVisibility();
      };
      this.toggleAdminForm = document.getElementById('toggleAdminForm');
      this.toggleAdminForm.addEventListener('click', this.toggleFormVisibility);
      this.cancelBtn = document.getElementById('cancelBtn');
      this.cancelBtn.addEventListener('click', this.toggleFormVisibility);
      this.saveBtn = document.getElementById('saveBtn');
      this.saveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const cat = {
          name: document.getElementById('catName').value,
          img: document.getElementById('imgUrl').value,
          clicks: document.getElementById('clickCount').value,
        };
        octopus.updateCat(cat);
        this.toggleFormVisibility();
      });
      this.adminForm = document.getElementById('adminForm');
      this.updateFormVisibility();
    },
  };

  octopus.init();
})();
