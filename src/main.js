`use strict`
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const imagesForSearch = document.querySelector(".imagesInput")
const btn = document.querySelector(".searchImages");
const photoList = document.querySelector(".listOfPhotos")
const loader = document.querySelector(".loader")

let page = 1;
let perPage = 15;
let fetchedPhotos = [];

loaderHide();

//Added backend 

function fetchPhoto() {

    return   axios.get(`https://pixabay.com/api/`, {
        params: {
        key: "42327867-17db48a54b533eea41b085f18",
        q:  imagesForSearch.value,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: perPage,
        page: page,
    }
    })
        .then((response) => {
            fetchedPhotos = fetchedPhotos.concat(response.data.hits)
            console.log(fetchedPhotos)
            return response.data;
        });
    
}





//Added elements to page

function addElements(fetchedPhotos) {


    const html = fetchedPhotos
        .map((photo) => {
            return `
            <li class ="listElement">
            <a
            class ="largePhotoLink"
            href="${photo.largeImageURL}">
            <img
            class ="photo"
            src="${photo.previewURL}">
            </a>
            <p>Likes: ${photo.likes}</p>
            <p>Views: ${photo.views}</p>
            <p>Comments: ${photo.comments}</p>
            <p>Downloads: ${photo.downloads}</p>
            </li>
            `;
        })
        .join("");
    
    photoList.insertAdjacentHTML("beforeend", html);


    const gallery = new SimpleLightbox('.listElement a', {
        docClose: false,
    });

}

function loaderShow() {
    
    loader.style.display = "block";

}

function loaderHide() {
    loader.style.display = "none";
}



//Added button usage

btn.addEventListener("click", () => {
    photoList.innerHTML = "";
    if (imagesForSearch.value.length !== 0) {
        loaderShow();
        setTimeout(() => {
            
            fetchPhoto()
                .then((photos) => {
                    if (photos.hits.length === 0) {
                        iziToast.error({
                            message: "Sorry, there are no images matching your search query. Please try again!",
                            position: "topRight",
                        })
                    } else {
                        addElements(fetchedPhotos)
                    }
                })
            
                .catch((error) => {
                    iziToast.error({
                        position: "topRight"
                    })
                })
            
                .finally(() => {
                    loaderHide();
                    page += 1;
                    btn.textContent = "Load more photos";
                })
            
            
        }, 1500);
    } else {
        iziToast.error({
            message: "Field is empty. Please type something!",
            position: "topRight"
        })
    }
});