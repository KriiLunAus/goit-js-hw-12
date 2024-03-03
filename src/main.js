`use strict`
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const photoList = document.querySelector(".listOfPhotos");
const searchForm = document.querySelector(".searchForm");
const loader = document.querySelector(".loader");
const btnMore = document.querySelector(".searchMoreImages");

loaderHide();



async function getPhoto(query, amount, page) {
    try {
        loaderShow();
        const resp = await axios.get(`https://pixabay.com/api/?key=42327867-17db48a54b533eea41b085f18&q=${query}&image_type=photo&safesearch=true&page=${page}&per_page=${amount}&orientation=horizontal`);
        loaderHide();
        return resp.data;
    } catch (error) {
        console.error('Problem with request to API:', error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch photos. Please try again later.',
        });
        return [];
    }
}


//Added elements to page

function addElements(photos) {
    
    
    const html = photos
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

let page;
let currentQuery;
let currentHits = 0;


function resetPage() {
    photoList.innerHTML = "";
}


//Added buttons usage


searchForm.addEventListener("submit", event => {
    event.preventDefault();

    
    const query = event.target.elements.query.value;
    resetPage();    
    loaderShow()
    setTimeout(() => {
        getPhoto(query, 15 )
        .then(data => {
                if (data.hits.length !== 0) {
                addElements(data.hits);
                currentQuery = query;
                page = 1;
                currentHits += data.hits.length;
                btnMore.style.display = "block";
            } else {
                iziToast.error({
                    message: "There are not any photo on your request, try type something different)",
                    position: "topRight"
                })
            }
            })
            .finally(() => {
                loaderHide();
                
            })
        },1000)
        
    })

btnMore.addEventListener("click", event => {
    loaderShow();
    setTimeout(() => {
        page++;
        getPhoto(currentQuery, 15, page)
            .then(data => {
                addElements(data.hits);
                currentHits += data.hits.length;
                if (currentHits >= data.totalHits) {
                    btnMore.style.display = "none";
                    iziToast.info({
                        color: "yellow",
                        position: "topRight",
                        message: "You reach the end of colection, try another request)"
                    })
                }
            })
            .finally(() => {
                loaderHide();

                let elementOfList = document.querySelector(".listElement");
                elementOfList = elementOfList.getBoundingClientRect().height;
                
                window.scrollBy({
                top: `${elementOfList*4}`,
                behavior: "smooth"
                }
                )

            })
    }, 1000);
    
    
})


 