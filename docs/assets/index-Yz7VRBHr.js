(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const I of i.addedNodes)I.tagName==="LINK"&&I.rel==="modulepreload"&&o(I)}).observe(document,{childList:!0,subtree:!0});function E(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=E(t);fetch(t.href,i)}})();const H="/disco-flight/assets/disco-music-CF8K-ThL.mp3",$="/disco-flight/assets/explosion-BVY2a1Az.mp3",w=30,N=25,V=5,W=3,Y=1500,D=.5,R=.1,K=-4;let r="welcome",S=!1,c=0,h=0,v=0,m=!1,d=null,_=Date.now(),g=0,x=0,f=0,G=0,T=0,a,s,y;const p=new Audio(H),M=new Audio($),X=document.getElementById("welcome-screen"),j=document.getElementById("orientation-screen"),A=document.getElementById("game-screen"),J=document.getElementById("gameover-screen"),k=document.getElementById("gameover-actions"),z=document.getElementById("start-button"),Q=document.getElementById("restart-button"),L=document.getElementById("install-button"),O=document.querySelector("#sky-video"),P=document.querySelector("#copilot"),U=document.getElementById("detection-bar"),Z=document.getElementById("time-counter"),ee=document.getElementById("final-score"),F=document.createElement("div");F.id="debug-window";F.style.display="none";document.body.appendChild(F);let l;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),l=e,L.style.display="block"});L.addEventListener("click",async()=>{if(l){l.prompt();const{outcome:e}=await l.userChoice;e==="accepted"&&console.log("Application installée"),l=null,L.style.display="none"}});window.addEventListener("appinstalled",()=>{console.log("Application installée avec succès"),L.style.display="none",l=null});function u(e){[X,j,A,J].forEach(n=>{n.classList.add("hidden")}),document.getElementById(e).classList.remove("hidden")}function q(){var e;return window.innerHeight>window.innerWidth?(S=!1,r==="playing"&&(u("orientation-screen"),b(),O.pause(),a&&s.stop()),!1):(S=!0,((e=document.getElementById("orientation-screen"))==null?void 0:e.classList.contains("hidden"))===!1&&(r==="playing"?(u("game-screen"),O.play(),a&&(s=a.createOscillator(),s.connect(y),s.type="sawtooth",s.start()),f=performance.now(),B(f)):u(r==="welcome"?"welcome-screen":"gameover-screen")),!0)}function te(){const e=v/N*100;U.style.setProperty("--detection-percentage",`${e}%`)}function ne(){if(m){d&&clearTimeout(d),d=window.setTimeout(()=>{b()},V*1e3);return}m=!0,A.classList.add("disco-mode"),p.currentTime=x,p.play()}function b(){m&&(m=!1,A.classList.remove("disco-mode"),x=p.currentTime,p.pause(),d&&(clearTimeout(d),d=null))}function oe(){s.frequency.value=100+c/w*50}function ie(){const e=Date.now();e-_>Y&&(h=Math.random()*w*2-w,_=e),c>h?c-=D:c<h&&(c+=D)}function se(){const e=Math.abs(c)/w,n=W*e;let o=parseFloat(P.style.left)||50;if(c!==0){const t=c>0?1:-1;o+=t*n}if(g!==0){const t=g/w*K;o-=t}o=Math.max(10,Math.min(90,o)),P.style.left=`${o}%`,(o<=10||o>=90)&&ne()}function B(e){if(r==="playing"&&S){const n=(e-f)/1e3;n>=1/60&&(f=e,T=(e-G)/100,Z.textContent=T.toFixed(0),ie(),se(),oe(),m&&(v+=n),te(),v>=N&&(r="gameover",ae()),O.style.transform=`rotate(${-c}deg)`),requestAnimationFrame(B)}}function ce(e){if(r==="playing"){g=e.beta||0;const n=e.beta||0,E=e.gamma||0,t=Math.atan2(Math.sin(E*Math.PI/180),Math.tan(n*Math.PI/180))*180/Math.PI;g=g*(1-R)+t*R}}function re(){const e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function C(){r="playing",v=0,c=0,h=0,m=!1,f=performance.now(),G=f,T=0,a=new AudioContext,s=a.createOscillator(),y=a.createGain(),s.connect(y),y.connect(a.destination),s.type="sawtooth",y.gain.value=.1,p.play(),p.pause(),M.play(),M.pause(),k.classList.add("hidden"),P.style.left="50%",u("game-screen"),O.play(),s.start(),re(),q(),requestAnimationFrame(B)}function ae(){r="gameover",ee.textContent=`Score: ${T.toFixed(2)}`,u("gameover-screen"),b(),s.stop(),M.play(),setTimeout(()=>{k.classList.remove("hidden")},1e3)}z.addEventListener("click",C);Q.addEventListener("click",C);window.addEventListener("orientationchange",()=>{setTimeout(q,100)});window.addEventListener("resize",()=>{setTimeout(q,100)});window.addEventListener("deviceorientation",ce);document.addEventListener("DOMContentLoaded",()=>{u("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&z.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&C()}catch(e){console.error("Permission denied:",e)}})});
//# sourceMappingURL=index-Yz7VRBHr.js.map
