(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const O of i.addedNodes)O.tagName==="LINK"&&O.rel==="modulepreload"&&o(O)}).observe(document,{childList:!0,subtree:!0});function w(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=w(t);fetch(t.href,i)}})();const H="/disco-flight/assets/disco-music-CF8K-ThL.mp3",$="/disco-flight/assets/explosion-BVY2a1Az.mp3",y=45,_=20,V=3,W=3,Y=1e3,K=.15,D=.01,X=-3;let s="welcome",I=!1,c=0,S=0,h=0,m=!1,l=null,R=Date.now(),g=0,N=0,f=0,x=0,v=0,d,r,E;const p=new Audio(H),M=new Audio($),Q=document.getElementById("welcome-screen"),j=document.getElementById("orientation-screen"),A=document.getElementById("game-screen"),J=document.getElementById("gameover-screen"),G=document.getElementById("gameover-actions"),k=document.getElementById("start-button"),U=document.getElementById("restart-button"),T=document.getElementById("install-button"),L=document.querySelector("#sky-video"),P=document.querySelector("#copilot"),Z=document.getElementById("detection-bar"),ee=document.getElementById("time-counter"),te=document.getElementById("final-score"),F=document.createElement("div");F.id="debug-window";F.style.display="none";document.body.appendChild(F);let a;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),a=e,T.style.display="block"});T.addEventListener("click",async()=>{if(a){a.prompt();const{outcome:e}=await a.userChoice;e==="accepted"&&console.log("Application installée"),a=null,T.style.display="none"}});window.addEventListener("appinstalled",()=>{console.log("Application installée avec succès"),T.style.display="none",a=null});function u(e){[Q,j,A,J].forEach(n=>{n.classList.add("hidden")}),document.getElementById(e).classList.remove("hidden")}function b(){var e;return window.innerHeight>window.innerWidth?(I=!1,s==="playing"&&(u("orientation-screen"),q(),L.pause(),d&&r.stop()),!1):(I=!0,((e=document.getElementById("orientation-screen"))==null?void 0:e.classList.contains("hidden"))===!1&&(s==="playing"?(u("game-screen"),L.play(),d&&(z(),r.start()),f=performance.now(),B(f)):u(s==="welcome"?"welcome-screen":"gameover-screen")),!0)}function ne(){const e=h/_*100;Z.style.setProperty("--detection-percentage",`${e}%`)}function oe(){if(navigator.vibrate(200),m){l&&clearTimeout(l),l=window.setTimeout(()=>{q()},V*1e3);return}m=!0,A.classList.add("disco-mode"),p.currentTime=N,p.play()}function q(){m&&(m=!1,A.classList.remove("disco-mode"),N=p.currentTime,p.pause(),l&&(clearTimeout(l),l=null))}function ie(){r.frequency.value=100+c/y*50}function se(e){return e<.5?2*e*e:-1+(4-2*e)*e}function ce(){const e=Date.now();e-R>Y&&(S=Math.random()*y*2-y,R=e);const n=K;c+=(S-c)*se(n)}function re(){const e=Math.abs(c)/y,n=W*e;let o=parseFloat(P.style.left)||50;if(c!==0){const t=c>0?1:-1;o+=t*n}if(g!==0){const t=g/y*X;o-=t}o=Math.max(10,Math.min(90,o)),P.style.left=`${o}%`,(o<=13||o>=87)&&oe()}function B(e){if(s==="playing"&&I){const n=(e-f)/1e3;n>=1/60&&(f=e,v=(e-x)/100,ee.textContent=v.toFixed(0),ce(),re(),ie(),m&&(h+=n),ne(),h>=_&&(s="gameover",de()),L.style.transform=`rotate(${-c}deg)`),requestAnimationFrame(B)}}function ae(e){if(s==="playing"){g=e.beta||0;const n=e.beta||0,w=e.gamma||0,t=Math.atan2(Math.sin(w*Math.PI/180),Math.tan(n*Math.PI/180))*180/Math.PI;g=g*(1-D)+t*D}}function le(){const e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function C(){s="playing",h=0,c=0,S=0,m=!1,f=performance.now(),x=f,v=0,d=new AudioContext,E=d.createGain(),E.connect(d.destination),E.gain.value=.1,z(),p.play(),p.pause(),M.play(),M.pause(),G.classList.add("hidden"),P.style.left="50%",u("game-screen"),L.play(),r.start(),le(),b(),requestAnimationFrame(B)}function z(){r=d.createOscillator(),r.connect(E),r.type="sawtooth"}function de(){s="gameover",te.textContent=`Score: ${v.toFixed(2)}`,u("gameover-screen"),q(),r.stop(),M.play(),setTimeout(()=>{G.classList.remove("hidden")},1e3)}k.addEventListener("click",C);U.addEventListener("click",C);window.addEventListener("orientationchange",()=>{setTimeout(b,100)});window.addEventListener("resize",()=>{setTimeout(b,100)});window.addEventListener("deviceorientation",ae);document.addEventListener("DOMContentLoaded",()=>{u("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&k.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&C()}catch(e){console.error("Permission denied:",e)}})});
//# sourceMappingURL=index-BmRQUUFp.js.map
