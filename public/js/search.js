const countries = [
  { name: 'Mohammed V - Casablanca' },
  { name: 'Marrakech - Menara' },
  { name: 'Agadir - Al Massira' },
  { name: 'Fès - Saïss' },
  { name: 'Tanger - Ibn Batouta' },
  { name: 'international Rabat - Salé' },
  { name: 'Nador - Al Aroui' },
  { name: 'Oujda - Angad' },
  { name: 'Dakhla' },
  { name: 'Laâyoune' },
  { name: 'Ouarzazate' },
  { name: 'Essaouira' },
  { name: 'Al Hoceima' },
];

const searchInput = document.querySelector('.search-input');
const searchInput2 = document.querySelector('.search-input2');
const suggestionsPanel = document.querySelector('.suggestions');
const suggestionsPanel2 = document.querySelector('.suggestions2');

searchInput.addEventListener('keyup', () => {
  const input = searchInput.value;
  suggestionsPanel.innerHTML = '';
  const suggestions = countries.filter((country) =>
    country.name.toLowerCase().startsWith(input)
  );
  suggestions.forEach((suggested) => {
    const div = document.createElement('div');
    div.setAttribute('class', `air-d`);
    div.innerHTML = suggested.name;
    suggestionsPanel.appendChild(div);
    document.querySelectorAll('.air-d').forEach((item) => {
      item.addEventListener('click', (e) => {
        searchInput.value = e.target.innerHTML;
        suggestionsPanel.innerHTML = '';
      });
    });
  });
  if (input === '') {
    suggestionsPanel.innerHTML = '';
  }
});
searchInput2.addEventListener('keyup', () => {
  const input = searchInput2.value;
  suggestionsPanel2.innerHTML = '';
  const suggestions = countries.filter((country) =>
    country.name.toLowerCase().startsWith(input)
  );
  suggestions.forEach((suggested) => {
    const div = document.createElement('div');
    div.setAttribute('class', `air-a`);
    div.innerHTML = suggested.name;
    suggestionsPanel2.appendChild(div);
    document.querySelectorAll('.air-a').forEach((item) => {
      item.addEventListener('click', (e) => {
        searchInput2.value = e.target.innerHTML;
        suggestionsPanel2.innerHTML = '';
      });
    });
  });
  if (input === '') {
    suggestionsPanel2.innerHTML = '';
  }
});
