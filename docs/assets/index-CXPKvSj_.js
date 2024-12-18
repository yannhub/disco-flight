(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const T of o.addedNodes)T.tagName==="LINK"&&T.rel==="modulepreload"&&s(T)}).observe(document,{childList:!0,subtree:!0});function b(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=b(t);fetch(t.href,o)}})();const R="/disco-flight/assets/disco-music-4RV96TdM.mp3",V="/disco-flight/assets/explosion-BVY2a1Az.mp3",p=40,q=25,$=5,k=4,H=1500,W=.03,z=-3.5;let c="welcome",L=!1,r=0,O=0,y=0,m=!1,d=null,D=Date.now(),S=0,F=0,g=0,_=0,w=0,a,i,f;const E=new Audio(R),X=new Audio(V),Y=document.getElementById("welcome-screen"),K=document.getElementById("orientation-screen"),A=document.getElementById("game-screen"),j=document.getElementById("gameover-screen"),N=document.getElementById("gameover-actions"),x=document.getElementById("start-button"),J=document.getElementById("restart-button"),v=document.getElementById("install-button"),h=document.querySelector("#sky-video"),I=document.querySelector("#copilot"),Q=document.getElementById("detection-bar"),U=document.getElementById("time-counter"),Z=document.getElementById("final-score"),P=document.createElement("div");P.id="debug-window";P.style.display="none";document.body.appendChild(P);let l;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),l=e,v.style.display="block"});v.addEventListener("click",async()=>{if(l){l.prompt();const{outcome:e}=await l.userChoice;e==="accepted"&&console.log("Application installée"),l=null,v.style.display="none"}});window.addEventListener("appinstalled",()=>{console.log("Application installée avec succès"),v.style.display="none",l=null});function u(e){[Y,K,A,j].forEach(n=>{n.classList.add("hidden")}),document.getElementById(e).classList.remove("hidden")}function B(){var e;return window.innerHeight>window.innerWidth?(L=!1,c==="playing"&&(u("orientation-screen"),h.pause(),a&&i.stop()),!1):(L=!0,((e=document.getElementById("orientation-screen"))==null?void 0:e.classList.contains("hidden"))===!1&&(c==="playing"?(u("game-screen"),h.play(),a&&(i=a.createOscillator(),i.connect(f),i.type="sawtooth",i.start()),M(performance.now())):u(c==="welcome"?"welcome-screen":"gameover-screen")),!0)}function ee(){const e=y/q*100;Q.style.setProperty("--detection-percentage",`${e}%`)}function te(){if(m){d&&clearTimeout(d),d=window.setTimeout(()=>{G()},$*1e3);return}m=!0,A.classList.add("disco-mode"),E.currentTime=F,E.play()}function G(){m&&(m=!1,A.classList.remove("disco-mode"),F=E.currentTime,E.pause(),d&&(clearTimeout(d),d=null))}function ne(){i.frequency.value=100+r/p*50}function oe(){const e=Date.now();e-D>H&&(O=Math.random()*p*2-p,D=e),r+=(O-r)*W}function ie(){const e=Math.abs(r)/p,n=k*e;let s=parseFloat(I.style.left)||50;if(r!==0){const t=r>0?1:-1;s+=t*n}if(S!==0){const t=S/p*z;s-=t}s=Math.max(10,Math.min(90,s)),I.style.left=`${s}%`,(s<=10||s>=90)&&te()}function M(e){if(c==="playing"&&L){const n=(e-g)/1e3;n>=1/60&&(g=e,w=(e-_)/100,U.textContent=w.toFixed(0),oe(),ie(),ne(),m&&(y+=n),ee(),y>=q&&(c="gameover",re()),h.style.transform=`rotate(${-r}deg)`),requestAnimationFrame(M)}}function se(e){c==="playing"&&(S=e.beta||0)}function ce(){const e=document.documentElement;e.requestFullscreen&&e.requestFullscreen()}function C(){c="playing",y=0,r=0,O=0,m=!1,g=performance.now(),_=g,w=0,a=new AudioContext,i=a.createOscillator(),f=a.createGain(),i.connect(f),f.connect(a.destination),i.type="sawtooth",f.gain.value=.1,N.classList.add("hidden"),I.style.left="50%",u("game-screen"),h.play(),i.start(),ce(),B(),requestAnimationFrame(M)}function re(){c="gameover",Z.textContent=`Score: ${w.toFixed(2)}`,u("gameover-screen"),G(),i.stop(),X.play(),setTimeout(()=>{N.classList.remove("hidden")},1e3)}x.addEventListener("click",C);J.addEventListener("click",C);window.addEventListener("orientationchange",()=>{setTimeout(B,100)});window.addEventListener("resize",()=>{setTimeout(B,100)});window.addEventListener("deviceorientation",se);document.addEventListener("DOMContentLoaded",()=>{u("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&x.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&C()}catch(e){console.error("Permission denied:",e)}})});
//# sourceMappingURL=index-CXPKvSj_.js.map