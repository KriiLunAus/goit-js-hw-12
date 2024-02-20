`use strict`
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const imagesForSearch = document.querySelector(".imagesInput")
const btn = document.querySelector(".searchImages");
const photoList = document.querySelector(".listOfPhotos")
const loader = document.querySelector(".loader")

loaderHide();

//Added backend 

function fetchPhoto() {


    const options = new URLSearchParams({
    key: "42327867-17db48a54b533eea41b085f18",
    q:  imagesForSearch.value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
});
    
 return   fetch(`https://pixabay.com/api/?${options}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json() ;
    });

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
                        addElements(photos)
                    }
                })
            
                .catch((error) => {
                    iziToast.error({
                        position: "topRight"
                    })
                })
            
                .finally(() => {
                    loaderHide();
                })
            
            
        }, 1500);
    } else {
        iziToast.error({
            message: "Field is empty. Please type something!",
            position: "topRight"
        })
    }
});


//Added elements to page

function addElements(photos) {


    const html = photos.hits
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

    

    //Added simplelightbox 


    const gallery = new SimpleLightbox('.listElement a', {
        docClose: false,
    });

    gallery.refresh();
}

function loaderShow() {
    
    loader.style.display = "block";

}

function loaderHide() {
    loader.style.display = "none";
}



