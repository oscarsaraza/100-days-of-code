(function () {

  const model = {
    init(cats) {
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
    }
  };

  const octopus = {
    selectedCatId: '',
    init() {
      var cats = [
        { id: '1', name: 'Fluffy', clicks: 0, img: 'http://lorempixel.com/400/200/cats/1' },
        { id: '2', name: 'Purr', clicks: 0, img: 'http://lorempixel.com/400/200/cats/2' },
        { id: '3', name: 'Wiskas', clicks: 0, img: 'http://lorempixel.com/400/200/cats/3' },
        { id: '4', name: 'Dragon', clicks: 0, img: 'http://lorempixel.com/400/200/cats/4' },
        { id: '5', name: 'Titan', clicks: 0, img: 'http://lorempixel.com/400/200/cats/5' },
      ];
      model.init(cats);
      viewCatsList.init(cats);
      viewCatDetails.init();
    },
    updateClickCount() { // handle cat click
      // Update cat click count value
      const cats = model.getCats();
      const updatedCats = cats.map((cat) => {
        cat.clicks += cat.id == octopus.selectedCatId ? 1 : 0;
        return cat;
      });
      model.init(updatedCats);
      // Render cat view
      viewCatDetails.render(model.getCat(octopus.selectedCatId));
    },

    // handle cat list change
      // Get selected cat
      // Update cat view
    selectCat(catId) {
      const cats = model.getCats();
      octopus.selectedCatId = catId;
      viewCatDetails.render(model.getCat(octopus.selectedCatId));
    }
  }

  const viewCatsList = {
    init(cats) {
      // Populate the cats list
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
  }

  octopus.init();
})();
