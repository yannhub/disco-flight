(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const I of o.addedNodes)I.tagName==="LINK"&&I.rel==="modulepreload"&&n(I)}).observe(document,{childList:!0,subtree:!0});function E(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=E(t);fetch(t.href,o)}})();const W="/disco-flight/assets/disco-music-CF8K-ThL.mp3",Y="/disco-flight/assets/explosion-BVY2a1Az.mp3",y=45,G=20,K=3,X=3,j=1e3,M=20,N=.01,J=-3;let c="welcome",P=!1,s=0,A=0,S=M,v=0,m=!1,l=null,x=Date.now(),g=0,k=0,f=0,h=0,z=0,T=0,d,r,w;const p=new Audio(W),F=new Audio(Y),Q=document.getElementById("welcome-screen"),U=document.getElementById("orientation-screen"),q=document.getElementById("game-screen"),Z=document.getElementById("gameover-screen"),H=document.getElementById("gameover-actions"),$=document.getElementById("start-button"),ee=document.getElementById("restart-button"),L=document.getElementById("install-button"),O=document.querySelector("#sky-video"),b=document.querySelector("#copilot"),te=document.getElementById("detection-bar"),ne=document.getElementById("time-counter"),oe=document.getElementById("final-score"),B=document.createElement("div");B.id="debug-window";B.style.display="none";document.body.appendChild(B);let a;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),a=e,L.style.display="block"});L.addEventListener("click",async()=>{if(a){a.prompt();const{outcome:e}=await a.userChoice;e==="accepted"&&console.log("Application installée"),a=null,L.style.display="none"}});window.addEventListener("appinstalled",()=>{console.log("Application installée avec succès"),L.style.display="none",a=null});function u(e){[Q,U,q,Z].forEach(i=>{i.classList.add("hidden")}),document.getElementById(e).classList.remove("hidden")}function C(){var e;return window.innerHeight>window.innerWidth?(P=!1,c==="playing"&&(u("orientation-screen"),D(),O.pause(),d&&r.stop()),!1):(P=!0,((e=document.getElementById("orientation-screen"))==null?void 0:e.classList.contains("hidden"))===!1&&(c==="playing"?(u("game-screen"),O.play(),d&&(V(),r.start()),f=performance.now(),_(f)):u(c==="welcome"?"welcome-screen":"gameover-screen")),!0)}function ie(){m&&(v+=h);const e=v/G*100;te.style.setProperty("--detection-percentage",`${e}%`)}function se(){if(navigator.vibrate&&navigator.vibrate(200),m){l&&clearTimeout(l),l=window.setTimeout(()=>{D()},K*1e3);return}m=!0,q.classList.add("disco-mode"),p.currentTime=k,p.play()}function D(){m&&(m=!1,q.classList.remove("disco-mode"),k=p.currentTime,p.pause(),l&&(clearTimeout(l),l=null))}function ce(){r.frequency.value=100+s/y*50}function re(){const e=Date.now();e-x>j&&(A=Math.random()*y*2-y,x=e,S=Math.random()*M+M),A>s?s+=h*S:s-=h*S,O.style.transform=`rotate(${-s}deg)`}function ae(){const e=Math.abs(s)/y,i=X*e;let n=parseFloat(b.style.left)||50;if(s!==0){const t=s>0?1:-1;n+=t*i}if(g!==0){const t=g/y*J;n-=t}n=Math.max(10,Math.min(90,n)),b.style.left=`${n}%`,(n<=13||n>=87)&&se()}function _(e){c==="playing"&&P&&(h=(e-f)/1e3,f=e,T=(e-z)/100,ne.textContent=T.toFixed(0),re(),ae(),ce(),ie(),v>=G&&(c="gameover",ue())),requestAnimationFrame(_)}function le(e){if(c==="playing"){g=e.beta||0;const i=e.beta||0,E=e.gamma||0,t=Math.atan2(Math.sin(E*Math.PI/180),Math.tan(i*Math.PI/180))*180/Math.PI;g=g*(1-N)+t*N}}function de(){const e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function R(){c="playing",v=0,s=0,A=0,m=!1,f=performance.now(),z=f,T=0,d=new AudioContext,w=d.createGain(),w.connect(d.destination),w.gain.value=.1,V(),p.play(),p.pause(),F.play(),F.pause(),H.classList.add("hidden"),b.style.left="50%",u("game-screen"),O.play(),r.start(),de(),C(),requestAnimationFrame(_)}function V(){r=d.createOscillator(),r.connect(w),r.type="sawtooth"}function ue(){c="gameover",oe.textContent=`Score: ${T.toFixed(2)}`,u("gameover-screen"),D(),r.stop(),F.play(),setTimeout(()=>{H.classList.remove("hidden")},1e3)}$.addEventListener("click",R);ee.addEventListener("click",R);window.addEventListener("orientationchange",()=>{setTimeout(C,100)});window.addEventListener("resize",()=>{setTimeout(C,100)});window.addEventListener("deviceorientation",le);document.addEventListener("DOMContentLoaded",()=>{u("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&$.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&R()}catch(e){console.error("Permission denied:",e)}})});
//# sourceMappingURL=index-Dyncx4vu.js.map