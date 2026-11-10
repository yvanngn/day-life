/* Séquences scénarisées (café, souris, matou, télé, départ) */
async function takeCoffee(){if(!S.f.mouseGone)return say('mag',"Pas tant qu'il y a cette souris ! Beurk !");if(S.f.tCafe)return say('mag',"J'ai déjà eu mon café.");SFX.coffee();await wait(2400);check('tCafe');await say('mag',"Ahhh, le café. La vie reprend ses droits.")}
async function poseCat(){if(!S.f.catWhite)return say('mag',"Il est bien trop sale pour monter sur le bar !");
  removeItem('chat');S.f.catOnBar=true;await say('mag',"Vas-y Shaggy, au boulot !");await catHint()}
async function jongle(){removeItem('clems');P.face=-1;await say('mag',"Mesdames et messieurs... le grand numéro de jonglage !");
  juggle=true;for(let i=0;i<10;i++){tone(500+(i%3)*150,.08,{type:'sine',vol:.08});await wait(180)}
  mt.state='awake';mt.face=1;await say('matou',"Mrrrou ?");for(let i=0;i<6;i++){tone(500+(i%3)*150,.08,{type:'sine',vol:.08});await wait(180)}
  juggle=false;await say('matou',"Mrrrr.");await say('mag',"Il a l'air ravi ! Allez, le spectacle est fini, ouste !");
  mt.state='walk';mt.face=-1;while(mt.x>146){mt.x-=1.2;await wait(16)}
  vitreOpen=true;SFX.door();await wait(250);mt.state='gone';await wait(500);vitreOpen=false;SFX.door();
  check('tMatou');await say('mag',"Bon débarras ! Et la porte vitrée s'est refermée toute seule.")}
async function couloirCheck(){if(S.f.bust&&S.f.litter){check('tCouloir');await say('narr',"Le couloir est nickel.")}
  else await say('mag',S.f.bust?"Il reste la litière de Shaggy à nettoyer.":"Il reste ce buste crasseux à nettoyer.")}
async function catHint(){await say('cat',"Tiens, une souris.");await say('mag',"Il ne bouge pas... peut-être a-t-il besoin d'un stimulant.")}
async function laserBar(){await say('mag',"Regarde le point rouge, Shaggy !");laserDot=[86,73];
  SFX.jump();for(let i=0;i<20;i++){barCat.jump=Math.sin(i/20*Math.PI)*14;barCat.x=104-i*0.6;await wait(30)}barCat.jump=0;
  mouse.flee=true;SFX.squeak();S.f.mouseGone=true;for(let i=0;i<40;i++){mouse.x-=2;await wait(25)}mouse.flee=false;laserDot=null;
  await say('cat',"Mrraow !");S.f.catOnBar=false;S.f.used.laser=true;S.f.used.chat=true;addItem('chat');
  await say('mag',"Bravo mon pacha ! La souris est partie.");}
async function toggleTV(){if(S.f.tvOn){SFX.tvOff();S.f.tvOn=false;return say('mag',"Allez, on éteint.")}
  SFX.tvOn();S.f.tvOn=true;await wait(900);await say('mag',"Oh, \"L'amour est dans le pré\" !");await say('mag',"Oulah, j'ai du retard !");
  for(const l of TVL)await say('tv',l)}
async function leave(){const miss=TASKS.filter(([k])=>k!=='tWork'&&!S.f[k]).map(x=>x[1]);
  if(miss.length){await say('mag',"Je ne peux pas partir, ma liste n'est pas finie !");return say('mag',"Il reste : "+miss.join(', ').toLowerCase()+".")}
  await say('mag',"Tout est fait. Allez, au travail !");check('tWork');save();
  await fade(true);mode='end';playMusic('lullaby');updSentence();titleEl.innerHTML="À suivre...<small>Fin du chapitre 1</small>";titleEl.style.opacity=1;fadeEl.style.opacity=0}

