"use strict";
/* INFINIDRA — generator v1. Identifiers are exact decimal strings (never Number). */
(()=>{
const $=s=>document.querySelector(s),feed=$("#feed"),ov=$("#ov"),inp=$("#q"),err=$("#err"),sb=$("#sb");
const TAU=Math.PI*2,f=n=>+n.toFixed(1),C=Math.cos,S=Math.sin;

/* ---- exact decimal-string arithmetic (O(length)) ---- */
const inc=s=>{let i=s.length-1;while(i>=0&&s[i]==="9")i--;return i<0?"1"+"0".repeat(s.length):s.slice(0,i)+(+s[i]+1)+"0".repeat(s.length-1-i)};
const dec=s=>{let i=s.length-1;while(s[i]==="0")i--;return(s.slice(0,i)+(s[i]-1)+"9".repeat(s.length-1-i)).replace(/^0+/,"")};

/* ---- hashing the complete identifier (128-bit, cyrb128-style) + sfc32 PRNG ---- */
function hash(s){let a=1779033703,b=3144134277,c=1013904242,d=2773480762;
for(let i=0,k;i<s.length;i++){k=s.charCodeAt(i);a=b^Math.imul(a^k,597399067);b=c^Math.imul(b^k,2869860233);c=d^Math.imul(c^k,951274213);d=a^Math.imul(d^k,2716044179)}
a=Math.imul(c^a>>>18,597399067);b=Math.imul(d^b>>>22,2869860233);c=Math.imul(a^c>>>17,951274213);d=Math.imul(b^d>>>19,2716044179);
a^=b^c^d;return[a>>>0,(b^a)>>>0,(c^a)>>>0,(d^a)>>>0]}
function prng(id){let[a,b,c,d]=hash("INFINIDRA/1:"+id.length+":"+id);
const r=()=>{const t=(a+b|0)+d|0;d=d+1|0;a=b^b>>>9;b=c+(c<<3)|0;c=c<<21|c>>>11;c=c+t|0;return(t>>>0)/4294967296};
for(let i=0;i<12;i++)r();return r}

/* ---- names ---- */
const O=["v","x","z","q","k","dr","th","n","ny","ar","ob","ox","kr","sy","zer","mor","hy","ph","xen","ky","qal","as","or","vy"];
const V=["a","e","i","o","y","ae","io","u"],K=["x","r","n","th","l","s","rn","v","m","k","z"];
const E=["ian","is","iel","ant","ith","ex","yra","ion","ara","ynex","ax","eon","ys","or","ora","ixis","alith","ovant","ynth","avel"];
const FO=["crystalline","tidal","hollow","recursive","eclipsed","ember-lit","silent","fractured","luminous","veiled","orbital","dormant","folded","antique"];
const NO=["archive","signal","lattice","sentinel","cipher","mirror","relic","engine","oracle","tether","reliquary","beacon"];
const PL=["beyond the last relay","inside a dying star","between two silences","under a cold horizon","at the edge of the index","within a folded sky","below the tidal dark","past the sixth threshold"];
const AR=["Crystalline","Orbital","Branching","Veiled","Spiral","Lattice","Energy"];

/* ---- procedural visuals: 7 structurally different archetypes ---- */
const pts=a=>a.map(p=>f(p[0])+","+f(p[1])).join(" ");
const P=(r,a,x=100,y=100)=>[x+r*C(a),y+r*S(a)];
function ident(id){
const R=prng(id),ri=n=>R()*n|0,rr=(a,b)=>a+R()*(b-a),pk=l=>l[ri(l.length)];
/* name */
let nm=pk(O)+pk(V);if(R()<.5)nm+=pk(K);
if(R()<.6)nm+=pk(O)+pk(V);nm+=pk(E);nm=nm.toUpperCase();
/* palette: mostly violet, sometimes deep red */
const red=R()<.38,h=red?(352+ri(18))%360:256+ri(36),h2=red?262+ri(24):(350+ri(14))%360;
const A=`hsl(${h} ${red?60:50}% ${red?52:64}%)`,B=`hsl(${h2} 45% ${red?60:42}%)`,D=`hsl(${h} 18% 24%)`;
const k=ri(7);let s="",rot=f(rr(0,360));
if(k===0){const n=ri(5)+6,v=[];for(let i=0;i<n;i++)v.push(P(rr(46,92),(i+rr(-.3,.3))/n*TAU));
const w=v.map(p=>[100+(p[0]-100)*.42,100+(p[1]-100)*.42]);
s=`<polygon points="${pts(v)}" fill="${A}" fill-opacity=".1" stroke="${A}" stroke-width="1.3"/><polygon points="${pts(w)}" fill="${B}" fill-opacity=".2" stroke="${B}"/>`;
v.forEach((p,i)=>s+=`<path d="M${pts([p,w[i],v[(i+1)%n]])}" fill="none" stroke="${D}" stroke-width=".8"/>`)}
else if(k===1){s=`<circle cx="100" cy="100" r="${f(rr(6,16))}" fill="${A}" fill-opacity=".25" stroke="${A}"/>`;
for(let i=0,n=ri(3)+3;i<n;i++){const rx=rr(30,92),ry=rx*rr(.25,.7),t=rr(0,TAU);
s+=`<g transform="rotate(${f(rr(0,180))} 100 100)"><ellipse cx="100" cy="100" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="${B}" stroke-opacity=".8"/><circle cx="${f(100+rx*C(t))}" cy="${f(100+ry*S(t))}" r="${f(rr(2,5))}" fill="${A}"/></g>`}}
else if(k===2){let d="";const sp=rr(.3,.8),L=rr(24,32),n=ri(4)+3;
const br=(x,y,a,l,j)=>{if(j<0)return;const x2=x+l*C(a),y2=y+l*S(a);d+=`M${f(x)} ${f(y)}L${f(x2)} ${f(y2)}`;br(x2,y2,a-sp,l*.68,j-1);br(x2,y2,a+sp,l*.68,j-1)};
for(let i=0;i<n;i++)br(100,100,i/n*TAU,L,3);
s=`<path d="${d}" fill="none" stroke="${A}" stroke-width="1.4" stroke-linecap="round"/><circle cx="100" cy="100" r="${f(rr(3,9))}" fill="${B}"/>`}
else if(k===3){rot=0;const n=ri(3)+5,L=[[100,rr(12,26)]];
for(let i=1;i<n;i++)L.push([100-rr(14,70),22+i*156/n]);L.push([100,186]);
const M=L.slice(1,-1).reverse().map(p=>[200-p[0],p[1]]),y=rr(62,96),e=rr(10,26);
s=`<polygon points="${pts(L.concat(M))}" fill="${A}" fill-opacity=".1" stroke="${A}" stroke-width="1.3"/><polygon points="${pts([[100-e-14,y],[100-e,y+5],[100-6,y]])}" fill="${B}"/><polygon points="${pts([[100+e+14,y],[100+e,y+5],[100+6,y]])}" fill="${B}"/><path d="M100 ${f(L[0][1])}V186" stroke="${D}"/>`}
else if(k===4){const g=rr(2.2,2.6),m=ri(3)+2;
for(let i=1;i<=72;i++){const p=P(Math.sqrt(i/72)*90,i*g);s+=`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(.8+i/72*3.6)}" fill="${i%m?A:B}" fill-opacity="${f(.4+i/130)}"/>`}}
else if(k===5){const n=ri(6)+5,r=rr(62,90);let d="";
for(const[q,rd]of[[2+ri(Math.max(1,n/2-2|0)),r],[1+ri(2),r*.5]])for(let i=0;i<n;i++)d+=`M${pts([P(rd,i/n*TAU),P(rd,(i+q)/n*TAU)])}`;
s=`<path d="${d}" fill="none" stroke="${A}" stroke-width="1"/><circle cx="100" cy="100" r="${f(r)}" fill="none" stroke="${D}"/><circle cx="100" cy="100" r="${f(r*.5)}" fill="none" stroke="${B}" stroke-opacity=".6"/>`;
for(let i=0;i<n;i++){const p=P(r,i/n*TAU);s+=`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="2.4" fill="${B}"/>`}}
else{for(let j=0;j<3;j++){const m=ri(5)+2,ph=rr(0,TAU),a=rr(.15,.5),Rr=rr(40,66),v=[];
for(let i=0;i<120;i++){const t=i/120*TAU;v.push(P(Rr*(1+a*S(m*t+ph)+.15*S((m+j+1)*t)),t))}
s+=`<polygon points="${pts(v)}" fill="${j?"none":A}" fill-opacity=".08" stroke="${j%2?B:A}" stroke-width="1.2"/>`}}
const vis=`<svg viewBox="0 0 200 200" role="img" aria-label="${nm} visual"><circle cx="100" cy="100" r="97" fill="hsl(${h} 30% 5%)" stroke="${D}" stroke-opacity=".6"/><g transform="rotate(${rot} 100 100)">${s}</g></svg>`;
/* emblem: n-fold radial glyph inside a frame */
const n=ri(4)+3,q=[0,1,2].map(()=>[rr(5,17),rr(0,TAU/n*.95)]);let d="";
for(let i=0;i<n;i++)d+="M"+pts(q.map(p=>P(p[0],p[1]+i*TAU/n,24,24)));
const sh=ri(3),fr=sh===0?`<circle cx="24" cy="24" r="21"/>`:`<polygon points="${pts(Array.from({length:sh===1?6:4},(_,i)=>P(21,i/(sh===1?6:4)*TAU+(sh===2?TAU/8:0),24,24)))}"/>`;
const emb=`<svg class="emb" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">${fr}<path d="${d}"/><circle cx="24" cy="24" r="1.6" fill="currentColor"/></svg>`;
return{a:A,html:`<div class="vis">${vis}</div><div class="meta"><div class="num" tabindex="0" aria-label="Identity number ${id}">№ ${id}</div><div class="nm">${emb}<h2>${nm}</h2></div><p class="ds">${AR[k]} identity. A ${pk(FO)} ${pk(NO)} ${pk(PL)}.</p></div>`}}

/* ---- infinite windowed feed: fixed-height rows, trimmed on both sides ---- */
let H=0,els=[],tick=0,busy=0;
const setH=()=>{H=Math.max(520,Math.round(innerHeight*.92));document.documentElement.style.setProperty("--h",H+"px")};
const mk=id=>{const e=document.createElement("article"),p=ident(id);e.className="idn";e._id=id;e.style.setProperty("--a",p.a);e.innerHTML=p.html;return e};
function fill(){if(busy||!els.length)return;busy=1;const vh=innerHeight;
for(let g=0;g<80;g++){const n=els.length,y=scrollY,below=n*H-y-vh;
if(below<vh*2.5){const e=mk(inc(els[n-1]._id));feed.append(e);els.push(e)}
else if(y<vh*2&&els[0]._id!=="1"){const e=mk(dec(els[0]._id));feed.prepend(e);els.unshift(e);scrollBy(0,H)}
else if(y>vh*4.5){els.shift().remove();scrollBy(0,-H)}
else if(below>vh*5.5&&n>2)els.pop().remove();
else break}
busy=0}
function reset(id){els.forEach(e=>e.remove());feed.textContent="";scrollTo(0,0);const e=mk(id);els=[e];feed.append(e);fill()}
addEventListener("scroll",()=>{if(!tick){tick=1;requestAnimationFrame(()=>{tick=0;fill()})}},{passive:true});
let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{const o=H;setH();scrollTo(0,scrollY/o*H);fill()},120)});

/* ---- search / routing ---- */
const readHash=()=>{const m=/^#(\d+)$/.exec(location.hash);return m&&m[1].replace(/^0+/,"")||"1"};
const go=id=>{if(location.hash==="#"+id)reset(id);else location.hash=id};
const shut=()=>{ov.hidden=true;sb.setAttribute("aria-expanded","false");sb.focus()};
sb.onclick=()=>{if(ov.hidden){ov.hidden=false;sb.setAttribute("aria-expanded","true");err.textContent="";inp.focus()}else shut()};
ov.onclick=e=>{if(e.target===ov)shut()};
addEventListener("keydown",e=>{if(e.key==="Escape"&&!ov.hidden)shut()});
$("#sf").onsubmit=e=>{e.preventDefault();const v=inp.value.trim();
if(!v){err.textContent="Enter a positive integer.";return}
if(!/^\d+$/.test(v)){err.textContent=v[0]==="-"?"Identity numbers are positive. Remove the minus sign.":"Use digits only (0–9).";return}
const id=v.replace(/^0+/,"");if(!id){err.textContent="Identity numbers start at 1.";return}
go(id);ov.hidden=true;sb.setAttribute("aria-expanded","false");inp.value=""};
$("#home").onclick=e=>{e.preventDefault();go("1")};
addEventListener("hashchange",()=>reset(readHash()));
setH();reset(readHash());
})();
