import{i as a,a as h,S as g}from"./assets/vendor-b42c18af.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d=document.querySelector(".imagesInput"),c=document.querySelector(".searchImages"),u=document.querySelector(".listOfPhotos"),p=document.querySelector(".loader");let m=1,y=15,i=[];f();function L(){return h.get("https://pixabay.com/api/",{params:{key:"42327867-17db48a54b533eea41b085f18",q:d.value,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:m}}).then(o=>(i=i.concat(o.data.hits),console.log(i),o.data))}function b(o){const s=o.map(r=>`
            <li class ="listElement">
            <a
            class ="largePhotoLink"
            href="${r.largeImageURL}">
            <img
            class ="photo"
            src="${r.previewURL}">
            </a>
            <p>Likes: ${r.likes}</p>
            <p>Views: ${r.views}</p>
            <p>Comments: ${r.comments}</p>
            <p>Downloads: ${r.downloads}</p>
            </li>
            `).join("");u.insertAdjacentHTML("beforeend",s),new g(".listElement a",{docClose:!1})}function P(){p.style.display="block"}function f(){p.style.display="none"}c.addEventListener("click",()=>{u.innerHTML="",d.value.length!==0?(P(),setTimeout(()=>{L().then(o=>{o.hits.length===0?a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):b(i)}).catch(o=>{a.error({position:"topRight"})}).finally(()=>{f(),m+=1,c.textContent="Load more photos"})},1500)):a.error({message:"Field is empty. Please type something!",position:"topRight"})});
//# sourceMappingURL=commonHelpers.js.map
