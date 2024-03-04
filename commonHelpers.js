import{i as d,a as b,S as L}from"./assets/vendor-b42c18af.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const m=document.querySelector(".listOfPhotos"),w=document.querySelector(".searchForm"),p=document.querySelector(".loader"),a=document.querySelector(".searchMoreImages");i();async function h(s,e,n){try{f();const r=await b.get(`https://pixabay.com/api/?key=42327867-17db48a54b533eea41b085f18&q=${s}&image_type=photo&safesearch=true&page=${n}&per_page=${e}&orientation=horizontal`);return i(),r.data}catch(r){return console.error("Problem with request to API:",r),d.error({title:"Error",message:"Failed to fetch photos. Please try again later."}),[]}}function y(s){const e=s.map(r=>`
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
        `).join("");m.insertAdjacentHTML("beforeend",e),new L(".listElement a",{docClose:!1}).refresh()}function f(){p.style.display="block"}function i(){p.style.display="none"}let c=1,g,u=0;function q(){m.innerHTML=""}w.addEventListener("submit",s=>{s.preventDefault();const e=s.target.elements.query.value;q(),f(),setTimeout(()=>{h(e,15).then(n=>{n.hits.length!==0?(y(n.hits),g=e,c=1,u+=n.hits.length,a.style.display="block"):d.error({message:"There are not any photo on your request, try type something different)",position:"topRight"})}).finally(()=>{i()})},1e3)});a.addEventListener("click",s=>{f(),setTimeout(()=>{c++,h(g,15,c).then(e=>{y(e.hits),u+=e.hits.length,u>=e.totalHits&&(a.style.display="none",d.info({color:"yellow",position:"topRight",message:"You reach the end of colection, try another request)"}))}).finally(()=>{i();let e=document.querySelector(".listElement");e=e.getBoundingClientRect().height,window.scrollBy({top:`${e*4}`,behavior:"smooth"})})},1e3)});
//# sourceMappingURL=commonHelpers.js.map
