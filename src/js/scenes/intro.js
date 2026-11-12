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
  run(async()=>{await say('mag',"Bon. Par quoi je commence ?");await say('narr',"Consulte ta liste, à côté des verbes.");if(HD){await say('narr',"Clic gauche : Magali parle à un personnage ou examine un objet.");await say('narr',"Clic droit : la roue des verbes s'ouvre. Par exemple : clic droit sur la bougie, puis « Examiner ».")}else{await say('narr',"Clic gauche : choisis un verbe puis clique sur un objet. Sans verbe, Magali parle ou examine.");await say('narr',"Clic droit : examine directement un objet.")}});
}

