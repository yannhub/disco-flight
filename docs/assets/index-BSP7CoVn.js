(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const E of o.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&s(E)}).observe(document,{childList:!0,subtree:!0});function b(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=b(t);fetch(t.href,o)}})();const x="/disco-flight/assets/disco-music-4RV96TdM.mp3",G="/disco-flight/assets/explosion-BVY2a1Az.mp3",y=45,D=30,R=5,V=4,k=3e3,H=.05,W=-4;let c="welcome",h=!1,r=0,L=0,g=0,f=!1,u=null,C=Date.now(),T=0,_=0,O=0,l,i,p;const w=new Audio(x),$=new Audio(G),z=document.getElementById("welcome-screen"),X=document.getElementById("orientation-screen"),S=document.getElementById("game-screen"),Y=document.getElementById("gameover-screen"),q=document.getElementById("start-button"),N=document.getElementById("restart-button"),v=document.querySelector("#sky-video"),B=document.querySelector("#copilot"),K=document.getElementById("detection-bar"),A=document.createElement("div");A.id="debug-window";A.style.display="none";document.body.appendChild(A);let d;const a=document.createElement("button");a.classList.add("install-button");a.textContent="Installer l'application";a.style.display="none";document.body.appendChild(a);window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),d=e,a.style.display="block"});a.addEventListener("click",async()=>{if(d){d.prompt();const{outcome:e}=await d.userChoice;e==="accepted"&&console.log("Application installée"),d=null,a.style.display="none"}});window.addEventListener("appinstalled",()=>{console.log("Application installée avec succès"),a.style.display="none",d=null});function m(e){[z,X,S,Y].forEach(n=>{n.classList.add("hidden")}),document.getElementById(e).classList.remove("hidden")}function I(){var e;return window.innerHeight>window.innerWidth?(h=!1,c==="playing"&&(m("orientation-screen"),v.pause(),l&&i.stop()),!1):(h=!0,((e=document.getElementById("orientation-screen"))==null?void 0:e.classList.contains("hidden"))===!1&&(c==="playing"?(m("game-screen"),v.play(),l&&(i=l.createOscillator(),i.connect(p),i.type="sawtooth",i.start()),P(performance.now())):m(c==="welcome"?"welcome-screen":"gameover-screen")),!0)}function j(){const e=g/D*100;K.style.setProperty("--detection-percentage",`${e}%`)}function J(){if(f){u&&clearTimeout(u),u=window.setTimeout(()=>{F()},R*1e3);return}f=!0,S.classList.add("disco-mode"),w.currentTime=_,w.play()}function F(){f&&(f=!1,S.classList.remove("disco-mode"),_=w.currentTime,w.pause(),u&&(clearTimeout(u),u=null))}function Q(){i.frequency.value=100+r/y*50}function U(){const e=Date.now();if(e-C>k){const n=y*.7;L=Math.random()*n*2-n,C=e}r+=(L-r)*H}function Z(){const e=Math.abs(r)/y,n=V*e;let s=parseFloat(B.style.left)||50;if(r!==0){const t=r>0?1:-1;s+=t*n}if(T!==0){const t=T/y*W;s-=t}s=Math.max(10,Math.min(90,s)),B.style.left=`${s}%`,(s<=10||s>=90)&&J()}function P(e){if(c==="playing"&&h){const n=(e-O)/1e3;O=e,U(),Z(),Q(),f&&(g+=n,j(),g>=D&&(c="gameover",te())),v.style.transform=`rotate(${-r}deg)`,requestAnimationFrame(P)}}function ee(e){c==="playing"&&(T=e.beta||0)}function M(){c="playing",g=0,r=0,L=0,f=!1,O=performance.now(),l=new AudioContext,i=l.createOscillator(),p=l.createGain(),i.connect(p),p.connect(l.destination),i.type="sawtooth",p.gain.value=.1,I(),m("game-screen"),v.play(),i.start(),requestAnimationFrame(P)}function te(){c="gameover",m("gameover-screen"),F(),i.stop(),$.play(),setTimeout(()=>{N.classList.remove("hidden")},2e3)}q.addEventListener("click",M);N.addEventListener("click",M);window.addEventListener("orientationchange",()=>{setTimeout(I,100)});window.addEventListener("resize",()=>{setTimeout(I,100)});window.addEventListener("deviceorientation",ee);document.addEventListener("DOMContentLoaded",()=>{m("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&q.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&M()}catch(e){console.error("Permission denied:",e)}})});
//# sourceMappingURL=index-BSP7CoVn.js.map
