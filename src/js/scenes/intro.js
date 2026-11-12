/* ---------- intro ---------- */
async function intro(){mode='intro';busy=true;playMusic('lullaby');updSentence();fadeEl.style.opacity=0;titleEl.style.opacity=0;
  await waitSkip(900);
  await say('narr',"Réveille-toi");
  await say('mag',"Mhh quoi ?");
  await say('narr',"Il est l'or ma seignor... une dure journée nous attend");
  await say('mag',"Arrgg... alors ce rêve de ce jeune homme qui joue aux jeux vidéos avec ses amis n'était... qu'un rêve... je fais vraiment de drôles de rêves en fait !!");
  await say('narr',"C'est exact. Maintenant on se lève parce qu'on a beaucoup de choses à faire !");
  titleEl.innerHTML=HD?'<span class="logo60">A Day<span>in the Life</span></span>':"A day in the life ...";titleEl.style.opacity=1;await waitSkip(3200);titleEl.style.opacity=0;await wait(1200);
  titleEl.innerHTML="Chapitre 1<small>Une matinée ordinaire... ou pas</small>";titleEl.style.opacity=1;await waitSkip(2800);titleEl.style.opacity=0;await wait(900);
  fadeEl.style.opacity=1;skipAll=false;mode='play';S.started=true;S.room='chambre';[P.x,P.y]=START.chambre;P.tx=P.x;P.ty=P.y;await wait(200);await fade(false);
  busy=false;save();updSentence();renderCheck();roomMusic();
  run(async()=>{await say('mag',"Bon. Par quoi je commence ?");await say('narr',"Consulte ta liste, à côté des verbes.");if(HD){await tuto()}else{await say('narr',"Clic gauche : choisis un verbe puis clique sur un objet. Sans verbe, Magali parle ou examine.");await say('narr',"Clic droit : examine directement un objet.")}});
}


/* V2 : tuto en cartes (comme Low Kanta) */
const TUTO=[['🖱️ Clic gauche','Magali fait l’action évidente : marcher, changer de pièce, parler à un personnage, examiner un objet.'],
 ['🖱️ Clic droit','Sur ce que tu vises, la roue des verbes s’ouvre :<div class="demo">'+ROUE_OBJ.concat([ROUE_PERSO[0]]).map(([v,i,l])=>'<span title="'+l+'">'+i+'</span>').join('')+'</div>Par exemple : clic droit sur la bougie, puis Examiner.'],
 ['🎒 Inventaire','Clic gauche sur un objet de l’inventaire : Magali le prend en main. Clique ensuite sur ce avec quoi l’utiliser. Clic droit : l’examiner.'],
 ['💬 Dialogues','Ils s’affichent en bas de l’écran : clique pour finir la phrase, puis pour passer. La liste, à côté des verbes, rappelle ce qu’il te reste à faire.']];
function tuto(){if(window.T)return Promise.resolve();return new Promise(res=>{let i=0;const d=$('tuto');const show=()=>{d.innerHTML='<div class="tbox"><p class="tt">'+TUTO[i][0]+'</p><p>'+TUTO[i][1]+'</p><p class="tp">'+(i+1)+'/'+TUTO.length+' · '+(i<TUTO.length-1?'Clique pour continuer':'Clique pour jouer')+'</p></div>'};
  d.style.display='flex';show();d.onpointerdown=e=>e.stopPropagation();d.onclick=e=>{e.stopPropagation();if(++i<TUTO.length)return show();d.style.display='none';d.onclick=null;res()}})}
