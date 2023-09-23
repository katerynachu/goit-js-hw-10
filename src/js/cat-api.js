import axios from "axios";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


axios.defaults.headers.common["x-api-key"] = "live_Go2uILe8jIYbCidqFvqcJot2LQOAFUGbouiaYF1578SxY0e0xMMDt2lBoaJzkQFV";
const selectBreed = document.querySelector(".breed-select");

const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector(".error");

errorEl.style.display = "none";
export function fetchBreeds() {
    loaderEl.style.display = "block";
    selectBreed.style.display = "none";

   return  axios.get('https://api.thecatapi.com/v1/breeds')
       .then(resp => {
           loaderEl.style.display = "none";
    selectBreed.style.display = "block";
            if (resp.status === 200) {
                    return resp.data
            }
            throw new Error('Response is not ok')
    })
        .catch((error) => {
                errorEl.style.display = "block";
            Notiflix.Notify.warning(error.message);
            loaderEl.style.display = "none";
            selectBreed.style.display = "none";
        })
;
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
            .then(resp => {
            if (resp.status === 200) {
                    return resp.data
            }
            throw new Error('Response is not ok')
    })
        .catch((error) => {
            errorEl.style.display = "block";
              Notiflix.Notify.warning(error.message);
            loaderEl.style.display = "none";
            selectBreed.style.display = "none";
        })
}


