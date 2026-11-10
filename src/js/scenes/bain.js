/* Salle de bain : décor et objets */
function drawBain(){
 r(0,0,320,104,'#bfe0e8');for(let x=0;x<320;x+=10)r(x,0,1,104,'#a8ccd6');for(let y=0;y<104;y+=10)r(0,y,320,1,'#a8ccd6');
 for(let y=104,i=0;y<144;y+=8,i++)for(let x=0,j=0;x<320;x+=8,j++)r(x,y,8,8,(i+j)%2?'#222':'#eee');
 r(20,26,118,2,'#888');r(30,72,6,10,'#aaa');r(28,72,10,3,'#ccc');
 r(22,82,114,4,'#ffffff');r(24,86,110,24,'#f4f4f4');r(24,104,110,6,'#d8d8d8');r(28,110,6,4,'#c8a040');r(124,110,6,4,'#c8a040');
 if(bathing){r(32,75,2,9,'#7ac8ff');for(let i=0;i<6;i++){const ph=(t/6+i*5)%30;r(30+i*18,70-ph,2,2,'rgba(255,255,255,.75)')}
   r(20,28,118,62,'#e06a8a');for(let x=24;x<138;x+=8)r(x,28,2,62,'#c85272')}
 else{r(20,28,10,62,'#e06a8a');r(23,28,2,62,'#c85272')}
 r(166,62,18,20,'#f4f4f4');r(166,62,18,3,'#ddd');r(160,84,30,10,'#f4f4f4');r(162,84,26,2,'#ddd');r(167,94,16,14,'#eaeaea');
 r(212,20,48,38,'#888');r(214,22,44,34,'#dff2f8');r(218,26,8,2,'#fff');r(220,30,4,1,'#fff');
 r(232,64,4,6,'#aaa');r(210,70,52,8,'#f4f4f4');r(214,70,44,3,'#ddd');r(230,78,12,30,'#eaeaea');
 r(268,64,16,3,'#c8a040');if(!S.f.serviette){r(270,67,12,26,'#ffffff');r(270,67,12,3,'#f0a0b0');r(270,90,12,3,'#f0a0b0')}
 door(293,37);
}
ROOMS.bain={walk:[14,300,116,140],draw:drawBain,spots:()=>[
  {id:'porte',name:'porte',r:[290,34,26,72],w:[290,128],exit:()=>go('couloir',242,126)},
  {id:'baignoire',name:'baignoire',r:[20,26,118,90],w:[80,124],wWith:[152,126],
   examiner:()=>say('mag',"Ma belle baignoire. Mon spa personnel."),ouvrir:()=>say('mag',"Si je veux un bain, autant l'utiliser."),prendre:()=>say('mag',"Elle est un peu lourde."),
   utiliser:async()=>{if(S.f.bath)return say('mag',"J'ai déjà pris mon bain. Je vais finir toute fripée.");
     if(!S.inv.includes('robe'))return say('mag',"Il me faudrait de quoi m'habiller après... Ma robe bleue, dans l'armoire !");
     cv.style.filter='blur(5px)';await wait(700);bathing=true;water(true);await wait(300);cv.style.filter='none';await wait(800);
     await say('tub',"♪ Dream on ! ♪");await say('tub',"♪ Mmmmh mmh mmmh... ♪");await say('tub',"♪ DREAM OOOOOOOON !!! ♪");await say('narr',"Les voisins apprécient moyennement.");
     cv.style.filter='blur(5px)';await wait(700);bathing=false;water(false);S.f.bath=true;S.f.dressed=true;removeItem('robe');await wait(300);cv.style.filter='none';await wait(600);
     check('tHabit');await say('mag',"Ahhh, toute propre et dans ma robe bleue !")},
   with:{chat:catWith(),laser:()=>say('mag',"Pas de laser dans l'eau.")}},
  {id:'wc',name:'toilettes',r:[158,60,34,50],w:[174,126],examiner:()=>say('mag',"Les toilettes. Rien à signaler, heureusement."),utiliser:()=>say('mag',"Une lady ne va pas aux toilettes ! (par contre j'ai envie de pisser de ouf !!!!)"),ouvrir:()=>say('mag',"Je préfère ne pas regarder.")},
  {id:'serviette',name:'serviette',vis:()=>!S.f.serviette,r:[266,62,20,34],w:[272,124],examiner:()=>say('mag',"Une serviette toute douce."),prendre:async()=>{S.f.serviette=true;addItem('serviette');await say('mag',"Une serviette. Toujours utile.")}},
  {id:'evier',name:'évier',r:[208,18,56,92],w:[202,126],examiner:()=>say('mag',S.f.scratch?"Ce chat m'a défigurée...":"Un évier et un miroir. Coucou toi !"),utiliser:()=>say('mag',"Un peu d'eau fraîche sur le visage. Ça réveille !"),
   with:{chat:catWith()}}
 ]};
