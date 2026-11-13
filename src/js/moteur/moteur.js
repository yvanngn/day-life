/* ---------- moteur ---------- */
const wait=ms=>new Promise(res=>setTimeout(res,ms));
function waitSkip(ms){if(skipAll)return Promise.resolve();return new Promise(res=>{const tm=setTimeout(done,ms);skipFn=done;function done(){clearTimeout(tm);skipFn=null;res()}})}
let speech=null;
function say(who,text){if(who==='cat'||who==='matou'){/!!!/.test(text)?SFX.angry():/^Mrrrr\.?$/.test(text)?SFX.purr():SFX.meow()}else if(who==='tv')SFX.tv();queued=null;lastSay={who:arguments[0],text:arguments[1]};if(skipAll)return Promise.resolve();return new Promise(res=>{speech={who,text,n:0};placeSpeech();let tm=null;
  const tick=setInterval(()=>{speech.n=Math.min(text.length,speech.n+2);placeSpeech();if(speech.n>=text.length)fini()},30);
  function fini(){clearInterval(tick);speech.n=text.length;placeSpeech();tm=setTimeout(done,Math.max(1200,text.length*45))}
  skipFn=()=>{if(speech&&speech.n<text.length){fini();return 'fini'}done()};
  function done(){clearInterval(tick);clearTimeout(tm);speech=null;placeSpeech();skipFn=null;setTimeout(res,150)}})}
const echap=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
let lastSp='';
const NOMS={mag:'Magali',narr:'Narrateur',cat:'Shaggy',matou:'Le matou',tv:'Télé',tub:'Baignoire'};
/* Dialogue à choix multiples : choose([[texte,valeur],...]) → valeur. V2 : liste en bas ; V1 : même liste, style classique */
const choixEl=$('choix');choixEl.addEventListener('pointerdown',e=>e.stopPropagation());choixEl.addEventListener('click',e=>e.stopPropagation());
function choose(opts){speech=null;placeSpeech();if(typeof TEST_CHOIX!=='undefined'&&TEST_CHOIX.length){const v=TEST_CHOIX.shift();return Promise.resolve(v===undefined?opts[0][1]:v)}
  choixEl.innerHTML='';choixEl.style.display='block';
  return new Promise(r=>opts.forEach(([t,v])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{choixEl.style.display='none';r(v)};choixEl.appendChild(b)}))}
function placeSpeech(){if(!speech){speechEl.style.display='none';lastSp='';return}
  const s=speech,n=s.n??s.text.length;if(speechEl.dataset.n!=n||speechEl.dataset.t!==s.text){speechEl.dataset.n=n;speechEl.dataset.t=s.text;speechEl.innerHTML=echap(s.text.slice(0,n))+'<span style="visibility:hidden">'+echap(s.text.slice(n))+'</span>'}speechEl.style.display='block';
  const bas=HD&&mode!=='intro';speechEl.classList.toggle('bas',bas);
  if(bas){/* V2 : dialogue en bas de l'écran avec le nom du personnage (comme Sol-Rod) */const nom=NOMS[s.who]||'';const h=(nom?'<b>'+nom+'</b>':'')+echap(s.text.slice(0,n))+'<span style="visibility:hidden">'+echap(s.text.slice(n))+'</span>';if(speechEl.dataset.h!==h){speechEl.dataset.h=h;speechEl.innerHTML=h}speechEl.style.left='';speechEl.style.top='';speechEl.style.transform='';lastSp=''}
  else speechEl.dataset.h='';
  speechEl.style.color=s.who==='narr'?'var(--narr)':s.who==='cat'?'var(--cat)':s.who==='tv'?'var(--tv)':'var(--mag)';
  if(bas)return;
  let x=160,y=40,anchor='bottom';
  if(mode==='intro'){y=s.who==='narr'?40:95;anchor='middle'}
  else if(s.who==='narr'){y=4;anchor='top'}
  else if(s.who==='matou'){x=mt.x;y=mt.y-22}
  else if(s.who==='cat'){if(S.room==='salon'){x=barCat.x;y=barCat.y-22}else if(S.f.cat){x=P.x;y=P.y-62}else{x=cat.x;y=cat.y-22}}
  else if(s.who==='tub'){x=80;y=24}else if(s.who==='tv'){x=228;y=46}else{x=P.x;y=P.y-62}
  const k=s.text+'|'+(x|0)+'|'+(y|0)+'|'+stage.clientWidth;if(k===lastSp)return;lastSp=k;
  // placement en pixels, toujours entièrement dans l'écran
  speechEl.style.transform='none';speechEl.style.left='0px';speechEl.style.top='0px';
  const sw=stage.clientWidth,sh=stage.clientHeight,bw=speechEl.offsetWidth,bh=speechEl.offsetHeight,m=6;
  const px=x/W*sw,py=y/H*sh;
  let left=px-bw/2,top=anchor==='bottom'?py-bh:anchor==='middle'?py-bh/2:py;
  left=Math.max(m,Math.min(sw-bw-m,left));top=Math.max(m,Math.min(sh-bh-m,top));
  speechEl.style.left=left+'px';speechEl.style.top=top+'px'}

function walkTo(x,y){const R=ROOMS[S.room].walk;P.tx=Math.max(R[0],Math.min(R[1],x));P.ty=Math.max(R[2],Math.min(R[3],y));P.walk=true;
  return new Promise(res=>{if(P.res)P.res();P.res=res})}
async function run(fn){busy=true;skipAll=false;const before=JSON.stringify([S.room,S.inv,S.f]);const v=verb;try{await fn()}catch(e){console.error(e)}busy=false;skipAll=false;cat.freeze=false;
  const failed=JSON.stringify([S.room,S.inv,S.f])===before;resetVerb();if(failed&&v&&mode==='play'){verb=v;updVerbs()}if(nextVerb&&mode==='play'){verb=nextVerb;pending=null;renderInv();updVerbs()}nextVerb=null;save();setTimeout(replayQueued,0)}
async function fade(on){fadeEl.style.opacity=on?1:0;await wait(380)}
async function go(room,x,y){SFX.door();await fade(true);if(S.room==='bain')S.f.scratch=false;S.room=room;roomMusic();P.x=P.tx=x;P.y=P.ty=y;P.walk=false;if(room==='couloir'){cat.x=150;cat.mode='walk'}save();await fade(false)}

function spotsNow(){return ROOMS[S.room].spots().filter(h=>!h.vis||h.vis())}
function hitSpot(px,py){const sp=spotsNow();for(let i=sp.length-1;i>=0;i--){const [x,y,w,h]=sp[i].r;if(px>=x&&px<x+w&&py>=y&&py<y+h)return sp[i]}return null}
function toScene(e){const b=cv.getBoundingClientRect();return[(e.clientX-b.left)/b.width*W,(e.clientY-b.top)/b.height*H]}

let queued=null,lastSay=null;
function replayQueued(){if(!queued||busy||mode!=='play')return;const q=queued;queued=null;if(performance.now()-q.t<1500)(q.right?onRight:onLeft)(q)}
stage.addEventListener('click',e=>onLeft(e));
function onLeft(e){
  if(skipFn){if(skipFn()==='fini')return;queued={clientX:e.clientX,clientY:e.clientY,right:false,t:performance.now()};return}
  if(busy||mode!=='play')return;
  checkEl.style.display='none';
  const [px,py]=toScene(e);const h=hitSpot(px,py);
  if(!h){walkTo(px,py);return}
  if(h.isCat)cat.freeze=true;
  const wt=(pending&&h.wWith)?h.wWith:h.w;run(async()=>{await walkTo(...wt);await act(h)});
}
const curEl=$('cur');let curItem=null;
function updCursor(e,h){const b=stage.getBoundingClientRect();curEl.style.display='block';curEl.style.left=(e.clientX-b.left)+'px';curEl.style.top=(e.clientY-b.top)+'px';
  curEl.classList.toggle('hot',!!h);curEl.classList.toggle('exit',!!(h&&h.exit&&!pending&&!verb));
  const it=mode==='play'?pending:null;if(it!==curItem){curItem=it;const c=curEl.querySelector('canvas');if(c)c.remove();if(it)curEl.appendChild(iconCanvas(it))}}
stage.addEventListener('mousemove',e=>{const [px,py]=toScene(e);const h=mode==='play'?hitSpot(px,py):null;updCursor(e,h)});
stage.addEventListener('mouseleave',()=>{curEl.style.display='none'});
cv.addEventListener('mousemove',e=>{if(mode!=='play')return;const [px,py]=toScene(e);const h=hitSpot(px,py);const n=h?h.name:'';if(n!==hover){hover=n;updSentence()}});
cv.addEventListener('mouseleave',()=>{hover='';updSentence()});
stage.addEventListener('contextmenu',e=>{e.preventDefault();onRight(e)});
function onRight(e){if(skipFn){if(skipFn()==='fini')return;queued={clientX:e.clientX,clientY:e.clientY,right:true,t:performance.now()};return}if(busy||mode!=='play')return;const [px,py]=toScene(e);const h=hitSpot(px,py);if(!h)return;
  if(!HD)return choisirRoue(h,'examiner'); // V1 : clic droit classique = examiner
  ouvrirRoue(h,e.clientX,e.clientY)}
/* Roue des actions V2 (comme Low Kanta) : clic gauche = action évidente, clic droit (ou appui long) = roue, toutes les actions sur toute cible */
const PERSOS=['shaggy','matou','shaggyBar'];
const ROUE=[['ouvrir','🚪','Ouvrir'],['examiner','👁️','Examiner'],['prendre','✋','Prendre'],['utiliser','⚙️','Utiliser'],['parler','💬','Parler']];
const ROUE_OBJ=ROUE,ROUE_PERSO=ROUE; // tuto
const roueEl=$('roue');let roueFermee=0;
roueEl.addEventListener('pointerdown',e=>e.stopPropagation());roueEl.addEventListener('click',e=>e.stopPropagation());roueEl.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation()});
function roueOuverte(){return roueEl.style.display==='block'}
function fermerRoue(){roueEl.style.display='none';roueEl.innerHTML=''}
function ouvrirRoue(h,cx,cy){const g=stage.getBoundingClientRect(),R=Math.max(40,Math.min(70,g.width*.075)),m=R+26;
  const x=Math.max(m,Math.min(g.width-m,cx-g.left)),y=Math.max(Math.min(m,g.height/2),Math.min(g.height-Math.min(m,g.height/2),cy-g.top));
  roueEl.style.left=x+'px';roueEl.style.top=y+'px';roueEl.innerHTML='<div class="rc"></div>';roueEl.firstChild.textContent=h.name;
  ROUE.forEach(([a,ic,lib],k)=>{const ang=-Math.PI/2+k*2*Math.PI/ROUE.length,b=document.createElement('button');
    b.dataset.a=a;b.innerHTML='<span>'+ic+'</span>'+lib;b.style.animationDelay=(k*20)+'ms';
    b.style.left=Math.round(Math.cos(ang)*R)+'px';b.style.top=Math.round(Math.sin(ang)*R)+'px';
    b.addEventListener('click',e=>{e.stopPropagation();fermerRoue();choisirRoue(h,a)});roueEl.appendChild(b)});
  roueEl.style.display='block'}
/* appui long sur écran tactile = clic droit */
let appui=null,appuiFait=0;
stage.addEventListener('pointerdown',e=>{clearTimeout(appui);if(e.pointerType==='mouse'||!HD)return;const ev={clientX:e.clientX,clientY:e.clientY};appui=setTimeout(()=>{if(busy||mode!=='play')return;const [px,py]=toScene(ev),h=hitSpot(px,py);if(h){ouvrirRoue(h,ev.clientX,ev.clientY);appuiFait=performance.now()}},450)});
['pointerup','pointercancel','pointerleave'].forEach(n=>stage.addEventListener(n,()=>clearTimeout(appui)));
stage.addEventListener('click',e=>{if(appuiFait&&performance.now()-appuiFait<800){appuiFait=0;e.stopImmediatePropagation()}},true);
function choisirRoue(h,a){if(busy||mode!=='play')return;verb=a;pending=null;renderInv();updVerbs();if(h.isCat)cat.freeze=true;run(async()=>{await walkTo(...h.w);await act(h,true)})}
document.addEventListener('pointerdown',e=>{if(roueOuverte()&&!e.target.closest('#roue')){fermerRoue();e.stopPropagation();roueFermee=performance.now()}},true);
stage.addEventListener('click',e=>{if(performance.now()-roueFermee<400)e.stopImmediatePropagation()},true);
invEl.addEventListener('contextmenu',e=>e.preventDefault());
// pas de menu du navigateur au clic droit, nulle part dans le jeu, sauf dans les champs de saisie (skill interface-jeu)
document.getElementById('app').addEventListener('contextmenu',e=>{ if(!e.target.closest('input,textarea')) e.preventDefault(); });

async function act(h,right){
  const dark=S.room==='chambre'&&S.f.dark&&!['bougie','porte'].includes(h.id);
  if(pending){if(dark)return say('mag',"Je n'y vois rien !");const f=h.with&&h.with[pending];
    if(f)return f();
    if(pending==='chat'&&S.room==='salon')return say('mag',S.f.catWhite?"Je devrais le poser près de la souris.":"Il est bien trop sale pour le poser ici !");
    return say('mag',"Ça ne marche pas.")}
  if(h.exit&&!right)return h.exit();
  if(!verb){if(h.click)return h.click();verb=PERSOS.includes(h.id)?'parler':'examiner'}
  if(dark)return say('mag',"Je n'y vois rien ! Il faudrait rallumer la bougie.");
  if(h[verb])return h[verb]();
  if(verb==='parler'&&h.id==='shaggy'&&HD){ // V2 : petit dialogue à choix
    const c=await choose([["Tu as faim ?",1],["Tu as encore dormi sur mon pull ?",2],["Rien, laisse tomber.",0]]);
    if(c===1){await say('mag',"Tu as faim ?");return say('cat',"Miaou ! Miaou !")}
    if(c===2){await say('mag',"Tu as encore dormi sur mon pull ?");return say('cat',"Mrrrr.")}
    return say('mag',"Rien, laisse tomber.")}
  if(verb==='parler'&&!PERSOS.includes(h.id))return say('mag',"Ça ne répond pas.");
  if(verb==='parler')return h.id==='matou'?say('matou',"Grrrr..."):say('cat',"Miaou ?");
  if(verb==='examiner')return say('mag',"C'est "+(/^[aeiouéè]/i.test(h.name)?"l'":"")+h.name+".");
  return say('mag',no());
}


/* Bouton Passer : saute toute la scène en cours (dialogues, intro), comme dans Low Kanta */
const skipBtn=$('skipBtn');
function passer(e){if(e){e.stopPropagation();e.preventDefault()}if(!(busy||mode==='intro'))return;skipAll=true;if(skipFn)skipFn();if(skipFn)skipFn()}
skipBtn.addEventListener('pointerdown',e=>e.stopPropagation());skipBtn.addEventListener('click',passer);
setInterval(()=>{skipBtn.style.display=(mode==='intro'||(busy&&speech))?'block':'none'},150);
