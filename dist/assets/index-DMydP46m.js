(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const E of o.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&s(E)}).observe(document,{childList:!0,subtree:!0});function S(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=S(e);fetch(e.href,o)}})();const b="/disco-flight/dist/assets/disco-music-4RV96TdM.mp3",_="/disco-flight/dist/assets/explosion-BVY2a1Az.mp3",f=45,A=30,N=5,q=1,F=3e3,G=.05,R=-.8;let c="welcome",r=0,h=0,p=0,u=!1,d=null,I=Date.now(),v=0,a,i,m;const g=new Audio(b),x=new Audio(_),V=document.getElementById("welcome-screen"),H=document.getElementById("orientation-screen"),O=document.getElementById("game-screen"),W=document.getElementById("gameover-screen"),M=document.getElementById("start-button"),B=document.getElementById("restart-button"),y=document.querySelector("#sky-video"),P=document.querySelector("#copilot"),$=document.getElementById("detection-bar"),T=document.createElement("div");T.id="debug-window";T.style.display="none";document.body.appendChild(T);function l(t){[V,H,O,W].forEach(n=>{n.classList.add("hidden")}),document.getElementById(t).classList.remove("hidden")}function w(){var t;return window.innerHeight>window.innerWidth?(l("orientation-screen"),c==="playing"&&(y.pause(),a&&i.stop()),!1):(((t=document.getElementById("orientation-screen"))==null?void 0:t.classList.contains("hidden"))===!1&&(c==="playing"?(l("game-screen"),y.play(),a&&(i=a.createOscillator(),i.connect(m),i.type="sawtooth",i.start())):l(c==="welcome"?"welcome-screen":"gameover-screen")),!0)}function z(){const t=p/A*100;$.style.setProperty("--detection-percentage",`${t}%`)}function X(){u||(u=!0,O.classList.add("disco-mode"),g.currentTime=0,g.play(),d&&clearTimeout(d),d=window.setTimeout(()=>{D()},N*1e3))}function D(){u&&(u=!1,O.classList.remove("disco-mode"),g.pause(),g.currentTime=0,d&&(clearTimeout(d),d=null))}function Y(){i.frequency.value=100+r/f*50}function k(){const t=Date.now();if(t-I>F){const n=f*.7;h=Math.random()*n*2-n,I=t}r+=(h-r)*G}function K(){const t=Math.abs(r)/f,n=q*t;let s=parseFloat(P.style.left)||50;if(r!==0){const e=r>0?1:-1;s+=e*n}if(v!==0){const e=v/f*R;s-=e}s=Math.max(10,Math.min(90,s)),P.style.left=`${s}%`,(s<=10||s>=90)&&X()}function C(){w()&&c==="playing"&&(k(),K(),Y(),u&&(p+=1/60,z(),p>=A&&(c="gameover",J())),y.style.transform=`rotate(${-r}deg)`,requestAnimationFrame(C))}function j(t){c==="playing"&&(v=t.beta||0)}function L(){w()&&(c="playing",p=0,r=0,h=0,u=!1,a=new AudioContext,i=a.createOscillator(),m=a.createGain(),i.connect(m),m.connect(a.destination),i.type="sawtooth",m.gain.value=.1,l("game-screen"),y.play(),i.start(),C())}function J(){c="gameover",l("gameover-screen"),D(),i.stop(),x.play(),setTimeout(()=>{B.classList.remove("hidden")},5e3)}M.addEventListener("click",L);B.addEventListener("click",L);window.addEventListener("orientationchange",()=>{setTimeout(w,100)});window.addEventListener("resize",()=>{setTimeout(w,100)});window.addEventListener("deviceorientation",j);document.addEventListener("DOMContentLoaded",()=>{l("welcome-screen"),typeof DeviceOrientationEvent.requestPermission=="function"&&M.addEventListener("click",async()=>{try{await DeviceOrientationEvent.requestPermission()==="granted"&&L()}catch(t){console.error("Permission denied:",t)}})});
//# sourceMappingURL=index-DMydP46m.js.map
