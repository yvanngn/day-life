/* ---------- inventaire ---------- */
function addItem(id){if(!S.inv.includes(id)){S.inv.push(id);SFX.pick()}renderInv()}
function removeItem(id){S.inv=S.inv.filter(x=>x!==id);renderInv()}
const ITEMEX={kimono:"Mon kimono de taekwondo. Ceinture bien serrée.",laser:"Le laser pour chat. Pile chargée.",robe:"Ma robe bleue. Je la mettrai après mon bain.",serviette:"Une serviette toute douce.",coussin:"Un coussin du fauteuil.",telephone:"Mon téléphone. 47 notifications non lues.",clems:"Trois clémentines bien rondes. Idéales pour jongler.",fromage:"Un fromage grignoté par la souris. Il sent... fort."};
function renderInv(){invEl.innerHTML='';for(let i=0;i<6;i++){const d=document.createElement('div');d.className='slot';const id=S.inv[i];
  if(id){d.classList.add('has');d.appendChild(iconCanvas(id));d.title=ITEMS[id];if(pending===id)d.classList.add('sel');if(S.f.used[id])d.classList.add('used');
   d.onclick=()=>clickItem(id);d.oncontextmenu=e=>{e.preventDefault();if(busy||mode!=='play')return;verb='examiner';pending=null;updVerbs();clickItem(id)};d.onmouseenter=()=>{hover=ITEMS[id];updSentence()};d.onmouseleave=()=>{hover='';updSentence()}}
  invEl.appendChild(d)}}
function clickItem(id){if(busy||mode!=='play')return;
  if(S.f.used[id]&&verb!=='examiner')return run(()=>say('mag',id==='chat'?"Shaggy a fini sa mission. Il dort.":"Je n'en ai plus besoin."));
  if(pending){if(pending===id)return;run(()=>say('mag',"Je ne vois pas comment combiner ça."));return}
  if(verb==='utiliser'){pending=id;renderInv();updSentence();return}
  if(verb==='examiner')return run(()=>say('mag',id==='chat'?(S.f.catWhite?"Shaggy, tout blanc et tout propre.":"Shaggy ronronne dans mes bras. Pour l'instant."):ITEMEX[id]));
  if(verb==='prendre')return run(()=>say('mag',"Je l'ai déjà."));
  if(verb==='ouvrir')return run(()=>say('mag',id==='chat'?"On n'ouvre pas un chat !":"Ça ne s'ouvre pas."));
}

/* ---------- checklist ---------- */
function renderCheck(){const steps=TASKS.filter(([k])=>k!=='tWork');const n=steps.filter(([k])=>S.f[k]).length;$('checkBtn').textContent=`Liste (${n}/${steps.length})`;
  checkEl.innerHTML=`<div class="goal${S.f.tWork?' done':''}">Objectif : se préparer et aller au travail</div><h3>Étapes</h3>`+steps.map(([k,l])=>`<div class="${S.f[k]?'ok':''}">${S.f[k]?'[X]':'[ ]'} ${l}</div>`).join('')}
$('checkBtn').onclick=()=>{if(mode!=='play')return;renderCheck();checkEl.style.display=checkEl.style.display==='block'?'none':'block'};
checkEl.addEventListener('click',e=>{e.stopPropagation();checkEl.style.display='none'});

/* ---------- verbes & phrase ---------- */
const VL={ouvrir:'Ouvrir',examiner:'Examiner',prendre:'Prendre',utiliser:'Utiliser'};
document.querySelectorAll('#verbs button').forEach(b=>b.onclick=()=>{if(busy)return;verb=verb===b.dataset.v?null:b.dataset.v;pending=null;renderInv();updVerbs()});
function updVerbs(){document.querySelectorAll('#verbs button').forEach(b=>b.classList.toggle('on',b.dataset.v===verb));updSentence()}
function updSentence(){let s=verb?VL[verb]:'Aller vers';if(pending)s+=' '+ITEMS[pending]+' avec';if(hover)s+=' '+hover;sentEl.textContent=mode==='play'?s:' '}
function resetVerb(){verb=null;pending=null;renderInv();updVerbs()}

