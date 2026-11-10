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
