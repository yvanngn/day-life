/* Éléments de décor partagés, textes et réactions communes */
/* ---------- décors ---------- */
function flame(x,y){const f=(t/7|0)%3;r(x,y+3,3,3,'#ff9a20');r(x+(f===1?1:0),y+(f===2?1:0),2,3,'#ffe060');r(x+1,y+4,1,1,'#fff6c0')}
function glow(x,y,rad,col){const g=ctx.createRadialGradient(x,y,1,x,y,rad);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2)}
function door(x,y){r(x-3,y-3,28,72,'#2a1c14');r(x,y,22,66,'#7a5030');r(x+3,y+4,16,24,'#86603a');r(x+3,y+34,16,26,'#86603a');r(x+3,y+33,2,2,'#e0c060')}

/* ---------- pièces & interactions ---------- */
const no=()=>pick(["Je ne peux pas faire ça.","Ça ne mène à rien.","Hmm, non.","Pourquoi je ferais ça ?"]);
function pick(a){return a[Math.random()*a.length|0]}
const BOOK=["Harry, tu es un enfoiré de sorcier.","McGonagall a la galle.","Hari et son cousin Dude laid.","De la haute littérature !"];
const CATX=["Il est roux, comme Guy.","C'est un bon pacha ce chat.","Ché le chacha à cha mémère cha."];
const CATXW=["Il était roux comme Guy... il était juste sale en fait.","C'est un bon pacha ce chat. Un pacha tout propre.","Ché le chacha à cha mémère cha."];
const TVL=["Est-ce que Jean-René va trouver l'amour dans le pré ? Oui évidemment, avec ses vaches.","Michelle rencontre Michel et c'est le coup de foudre. Et le coup de massue derrière quand il sourit.","Martin rote en ramassant le foin, cela séduit Sandrine."];

function check(k){if(!S.f[k]){S.f[k]=true;renderCheck();flashCheck()}}
function flashCheck(){const b=$('checkBtn');b.style.borderColor='#ffe14a';setTimeout(()=>b.style.borderColor='',900)}

function catWith(){return async()=>{
  if(S.f.catWhite)return say('mag',"Il est déjà tout propre. On ne va pas recommencer.");
  await say('mag',"Allez Shaggy, un petit bain !");SFX.splash();await wait(500);await say('cat',"MIAAAAOUUUU !!!");SFX.scratch();
  stage.classList.remove('shake');void stage.offsetWidth;stage.classList.add('shake');S.f.scratch=true;
  await say('mag',"AÏE !! Sale bête ! Il m'a griffé le visage...");
  S.f.catWhite=true;renderInv();check('tShaggy');
  await say('mag',"... Attends. Il est BLANC ?!");await say('mag',"Ah bah en fait il était juste sale !")}}

const ROOMS={};
/* ---------- V2 redessinée à la main (style Low Kanta) : outils au demi-pixel ---------- */
// dégradé vertical en bandes avec une ligne tramée entre deux bandes
function bandes2(x,y,w,h,cols){const n=cols.length,bh=h/n;for(let i=0;i<n;i++){const a=y+Math.round(i*bh*2)/2,b=y+Math.round((i+1)*bh*2)/2;rh(x,a,w,b-a,cols[i]);
  if(i<n-1)for(let k=x+((i&1)?.5:0);k<x+w;k+=1)rh(k,b-.5,.5,.5,cols[i+1])}}
function ovale2(cx,cy,rx,ry,c){for(let d=-ry;d<=ry;d+=.5){const w=Math.round(rx*Math.sqrt(Math.max(0,1-d*d/(ry*ry)))*2)/2;rh(cx-w,cy+d,2*w,.5,c)}}
function cadre2(x,y,w,h,c){rh(x,y,w,.5,c);rh(x,y+h-.5,w,.5,c);rh(x,y,.5,h,c);rh(x+w-.5,y,.5,h,c)}
function ombre2(cx,cy,rx){ctx.globalAlpha=.28;ovale2(cx,cy,rx,2,'#000');ctx.globalAlpha=.18;ovale2(cx,cy,rx+3,3,'#000');ctx.globalAlpha=1}
// panneau de bois en relief : lumière en haut à gauche, ombre en bas à droite
function panneau2(x,y,w,h,base,cl,cs){rh(x,y,w,h,base);rh(x,y,w,.5,cl);rh(x,y,.5,h,cl);rh(x,y+h-.5,w,.5,cs);rh(x+w-.5,y,.5,h,cs)}
function veines2(x,y,w,h,c,s){for(let k=0;k<h;k+=2.5)rh(x+((k*7+s)%(w>8?w-6:1)),y+k+.5,Math.min(6,w-1),.5,c)}
function door2(x,y){rh(x-3,y-3,28,72,'#1a100a');panneau2(x-3,y-3,28,72,'#3a2414','#6a4426','#140a06');
  bandes2(x,y,22,66,['#8a5a34','#7e5230','#74492a','#6a4226']);veines2(x,y,22,66,'#5a3820',3);
  panneau2(x+3,y+4,16,24,'#7a5030','#a87448','#4a2c18');panneau2(x+3,y+34,16,26,'#7a5030','#a87448','#4a2c18');
  rh(x+5,y+6,12,20,'#835838');rh(x+5,y+36,12,22,'#835838');ovale2(x+4,y+34,1.5,1.5,'#c8982e');rh(x+3.5,y+33,1,.5,'#fff0a0');rh(x,y+65.5,22,.5,'#000')}
