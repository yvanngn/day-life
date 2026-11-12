/* ---------- intro ---------- */
async function intro(){mode='intro';busy=true;playMusic('lullaby');updSentence();fadeEl.style.opacity=0;titleEl.style.opacity=0;
  await waitSkip(900);
  await say('narr',"Réveille-toi");
  await say('mag',"Mhh quoi ?");
  await say('narr',"Il est l'or ma seignor... une dure journée nous attend");
  await say('mag',"Arrgg... alors ce rêve de ce jeune homme qui joue aux jeux vidéos avec ses amis n'était... qu'un rêve... je fais vraiment de drôles de rêves en fait !!");
  await say('narr',"C'est exact. Maintenant on se lève parce qu'on a beaucoup de choses à faire !");
  titleEl.innerHTML="A day in the life ...";titleEl.style.opacity=1;await waitSkip(3200);titleEl.style.opacity=0;await wait(1200);
  titleEl.innerHTML="Chapitre 1<small>Une matinée ordinaire... ou pas</small>";titleEl.style.opacity=1;await waitSkip(2800);titleEl.style.opacity=0;await wait(900);
  fadeEl.style.opacity=1;skipAll=false;mode='play';S.started=true;S.room='chambre';[P.x,P.y]=START.chambre;P.tx=P.x;P.ty=P.y;await wait(200);await fade(false);
  busy=false;save();updSentence();renderCheck();roomMusic();
  run(async()=>{await say('mag',"Bon. Par quoi je commence ?");await say('narr',"Consulte ta liste, à côté des verbes.");await say('narr',"Astuce : le clic droit examine directement un objet.")});
}

