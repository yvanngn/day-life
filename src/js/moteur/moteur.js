/* ---------- moteur ---------- */
const wait=ms=>new Promise(res=>setTimeout(res,ms));
function waitSkip(ms){return new Promise(res=>{const tm=setTimeout(done,ms);skipFn=done;function done(){clearTimeout(tm);skipFn=null;res()}})}
let speech=null;
function say(who,text){if(who==='cat'||who==='matou'){/!!!/.test(text)?SFX.angry():/^Mrrrr\.?$/.test(text)?SFX.purr():SFX.meow()}else if(who==='tv')SFX.tv();queued=null;return new Promise(res=>{speech={who,text};placeSpeech();const tm=setTimeout(done,Math.max(1600,text.length*65));skipFn=done;
  function done(){clearTimeout(tm);speech=null;placeSpeech();skipFn=null;setTimeout(res,150)}})}
let lastSp='';
function placeSpeech(){if(!speech){speechEl.style.display='none';lastSp='';return}
  const s=speech;if(speechEl.textContent!==s.text)speechEl.textContent=s.text;speechEl.style.display='block';
  speechEl.style.color=s.who==='narr'?'var(--narr)':s.who==='cat'?'var(--cat)':s.who==='tv'?'var(--tv)':'var(--mag)';
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
async function run(fn){busy=true;const before=JSON.stringify([S.room,S.inv,S.f]);const v=verb;try{await fn()}catch(e){console.error(e)}busy=false;cat.freeze=false;
  const failed=JSON.stringify([S.room,S.inv,S.f])===before;resetVerb();if(failed&&v&&mode==='play'){verb=v;updVerbs()}save();setTimeout(replayQueued,0)}
async function fade(on){fadeEl.style.opacity=on?1:0;await wait(380)}
async function go(room,x,y){SFX.door();await fade(true);if(S.room==='bain')S.f.scratch=false;S.room=room;roomMusic();P.x=P.tx=x;P.y=P.ty=y;P.walk=false;if(room==='couloir'){cat.x=150;cat.mode='walk'}save();await fade(false)}

function spotsNow(){return ROOMS[S.room].spots().filter(h=>!h.vis||h.vis())}
function hitSpot(px,py){const sp=spotsNow();for(let i=sp.length-1;i>=0;i--){const [x,y,w,h]=sp[i].r;if(px>=x&&px<x+w&&py>=y&&py<y+h)return sp[i]}return null}
function toScene(e){const b=cv.getBoundingClientRect();return[(e.clientX-b.left)/b.width*W,(e.clientY-b.top)/b.height*H]}

let queued=null;
function replayQueued(){if(!queued||busy||mode!=='play')return;const q=queued;queued=null;if(performance.now()-q.t<1500)(q.right?onRight:onLeft)(q)}
stage.addEventListener('click',e=>onLeft(e));
function onLeft(e){
  if(skipFn){queued={clientX:e.clientX,clientY:e.clientY,right:false,t:performance.now()};skipFn();return}
  if(busy||mode!=='play')return;
  checkEl.style.display='none';
  const [px,py]=toScene(e);const h=hitSpot(px,py);
  if(!h){walkTo(px,py);return}
  if(h.isCat)cat.freeze=true;
  const wt=(pending&&h.wWith)?h.wWith:h.w;run(async()=>{await walkTo(...wt);await act(h)});
}
cv.addEventListener('mousemove',e=>{if(mode!=='play')return;const [px,py]=toScene(e);const h=hitSpot(px,py);const n=h?h.name:'';if(n!==hover){hover=n;updSentence()}});
cv.addEventListener('mouseleave',()=>{hover='';updSentence()});
stage.addEventListener('contextmenu',e=>{e.preventDefault();onRight(e)});
function onRight(e){if(skipFn){queued={clientX:e.clientX,clientY:e.clientY,right:true,t:performance.now()};skipFn();return}if(busy||mode!=='play')return;const [px,py]=toScene(e);const h=hitSpot(px,py);if(!h)return;
  verb='examiner';pending=null;renderInv();updVerbs();if(h.isCat)cat.freeze=true;run(async()=>{await walkTo(...h.w);await act(h,true)})}
invEl.addEventListener('contextmenu',e=>e.preventDefault());

async function act(h,right){
  const dark=S.room==='chambre'&&S.f.dark&&!['bougie','porte'].includes(h.id);
  if(pending){if(dark)return say('mag',"Je n'y vois rien !");const f=h.with&&h.with[pending];
    if(f)return f();
    if(pending==='chat'&&S.room==='salon')return say('mag',S.f.catWhite?"Je devrais le poser près de la souris.":"Il est bien trop sale pour le poser ici !");
    return say('mag',"Ça ne marche pas.")}
  if(h.exit&&!right)return h.exit();
  if(!verb)return h.click?h.click():undefined;
  if(dark)return say('mag',"Je n'y vois rien ! Il faudrait rallumer la bougie.");
  if(h[verb])return h[verb]();
  if(verb==='examiner')return say('mag',"C'est "+(/^[aeiouéè]/i.test(h.name)?"l'":"")+h.name+".");
  return say('mag',no());
}

