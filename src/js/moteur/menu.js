/* ---------- menu ---------- */
function mergeState(d){const s=Object.assign(defState(),d);s.f=Object.assign(defF(),d.f||{});s.f.used=Object.assign({},(d.f&&d.f.used)||{});return s}
function applyCode(code){const c=CODES[code];if(!c)return false;S=defState();S.started=true;S.room=c.room;S.inv=c.inv.slice();Object.assign(S.f,c.f);
  [P.x,P.y]=START[c.room];P.tx=P.x;P.ty=P.y;P.walk=false;return true}
function startPlay(){mt.state=S.f.tMatou?'gone':'sleep';mt.x=160;mode='play';roomMusic();titleEl.style.opacity=0;closeMenu();renderInv();renderCheck();updSentence();save()}
function openMenu(){const inGame=mode==='play';const sv=loadSave();
  const rows=Object.entries(CODES).map(([k,c])=>`<tr><td>${c.label}</td><td><b>${k}</b></td><td>${c.inv.length?c.inv.map(i=>ITEMS[i]).join(', '):'(rien)'}</td></tr>`).join('');
  menuBox.innerHTML=`<h1 class="logo">A Day<span>in the Life</span></h1><p class="tagline">UNE MATINÉE (PAS SI) ORDINAIRE</p>
   <div class="btns">
    ${inGame?'<button id="mRes">▶ Reprendre</button>':''}
    ${!inGame&&sv?'<button id="mCont">▶ Continuer la partie</button>':''}
    <button id="mNew">★ Nouvelle partie</button>
   </div>
   <h2>Mot de passe</h2>
   <div class="pw"><input id="pwIn" placeholder="CODE" maxlength="12"><button id="pwGo">Valider</button></div><div class="msg" id="pwMsg"></div>
   ${inGame?(()=>{const c=CODES[ROOMCODE[S.room]];return `<p>Code de la pièce actuelle : <b>${ROOMCODE[S.room]}</b><br><span class="note">Inventaire restauré : ${c.inv.length?c.inv.map(i=>ITEMS[i]).join(', '):'(rien)'}</span></p>`})():''}
   <h2>Paramètres</h2>
   <div class="btns"><button id="mHD">Graphismes : ${HD?'améliorés':'classiques'}</button></div>
   <p class="note">Version __VERSION__</p>
   <p class="note">La progression est sauvegardée automatiquement dans ce navigateur. Les codes servent de secours si la sauvegarde est effacée.</p>`;
  menuEl.style.display='flex';menuEl.scrollTop=0;
  const g=id=>document.getElementById(id);
  if(g('mRes'))g('mRes').onclick=closeMenu;
  if(g('mCont'))g('mCont').onclick=()=>{S=mergeState(sv);P.x=P.tx=S.x;P.y=P.ty=S.y;startPlay()};
  g('mHD').onclick=()=>{setHD(!HD);renderInv();g('mHD').textContent='Graphismes : '+(HD?'améliorés':'classiques')};
  g('mNew').onclick=()=>{S=defState();renderInv();closeMenu();intro()};
  const tryCode=()=>{const v=g('pwIn').value.trim().toUpperCase();if(applyCode(v)){startPlay();run(()=>say('narr',"Mot de passe accepté. Reprise : "+CODES[v].label+"."))}else g('pwMsg').textContent="Mot de passe inconnu."};
  g('pwGo').onclick=tryCode;g('pwIn').onkeydown=e=>{if(e.key==='Enter')tryCode()};
}
function closeMenu(){menuEl.style.display='none'}
$('menuBtn').onclick=()=>{if(mode==='intro')return;if(busy&&mode==='play')return;if(mode==='end')mode='menu';openMenu()};

renderInv();renderCheck();updVerbs();loop();openMenu();
