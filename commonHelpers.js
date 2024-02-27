import{i as n,S as f}from"./assets/vendor-7659544d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const l=document.querySelector(".imagesInput"),m=document.querySelector(".searchImages"),c=document.querySelector(".listOfPhotos"),u=document.querySelector(".loader");d();function p(){const s=new URLSearchParams({key:"42327867-17db48a54b533eea41b085f18",q:l.value,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${s}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}m.addEventListener("click",()=>{c.innerHTML="",l.value.length!==0?(y(),setTimeout(()=>{p().then(s=>{s.hits.length===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):h(s)}).catch(s=>{n.error({position:"topRight"})}).finally(()=>{d()})},1500)):n.error({message:"Field is empty. Please type something!",position:"topRight"})});function h(s){const r=s.hits.map(o=>`
            <li class ="listElement">
            <a
            class ="largePhotoLink"
            href="${o.largeImageURL}">
            <img
            class ="photo"
            src="${o.previewURL}">
            </a>
            <p>Likes: ${o.likes}</p>
            <p>Views: ${o.views}</p>
            <p>Comments: ${o.comments}</p>
            <p>Downloads: ${o.downloads}</p>
            </li>
            `).join("");c.insertAdjacentHTML("beforeend",r),new f(".listElement a",{docClose:!1}).refresh()}function y(){u.style.display="block"}function d(){u.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
