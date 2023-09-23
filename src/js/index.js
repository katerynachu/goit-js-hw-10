import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
const selectBreed = document.querySelector(".breed-select");
const blockInfo = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");


axios.defaults.headers.common["x-api-key"] = "live_Go2uILe8jIYbCidqFvqcJot2LQOAFUGbouiaYF1578SxY0e0xMMDt2lBoaJzkQFV";


function displayError(message) {
    errorEl.style.display = "block";
     Notiflix.Notify.warning(message);
    loaderEl.style.display = "none";
    selectBreed.style.display = "none";
}



fetchBreeds()

    .then(data => {

        return data.map(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
            
        selectBreed.appendChild(option);
})
  })
  .catch(error => {
         Notiflix.Notify.warning(displayError(error));
  });




selectBreed.addEventListener('change', () => {
        loaderEl.style.display = "block";
        blockInfo.style.display = "none";
    const catId = selectBreed.value;

  fetchCatByBreed(catId)
      .then(data => {
  loaderEl.style.display = "none";
  blockInfo.style.display = "flex";
   const blockMarkup = data.map(({url,breeds}) => {
       return `<img class="cat-img" src="${url}" />
      <div class="cat-block_info">
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p>${breeds[0].temperament}</p>
      </div>`;
   }).join('');
        

    blockInfo.innerHTML = blockMarkup;
        
  
      })
       .catch(error => {
  displayError(error);
        });
})
