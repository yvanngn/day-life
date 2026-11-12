/* Salle de bain : décor et objets */
function drawBain(){
 if(HD)return drawBain2();
 r(0,0,320,104,'#bfe0e8');for(let x=0;x<320;x+=10)r(x,0,1,104,'#a8ccd6');for(let y=0;y<104;y+=10)r(0,y,320,1,'#a8ccd6');
 for(let y=104,i=0;y<144;y+=8,i++)for(let x=0,j=0;x<320;x+=8,j++)r(x,y,8,8,(i+j)%2?'#222':'#eee');
 if(HD)drawBainFondHD();
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
 if(HD)drawBainHD();
}
/* V2 : carrelage et damier brillants, puis détails par-dessus */
function drawBainFondHD(){
 for(let x=0;x<320;x+=10)for(let y=0;y<104;y+=10){rh(x+1,y+1,8.5,.5,'#d4eef4');rh(x+1,y+1,.5,8.5,'#cce8f0');rh(x+1,y+9,9,.5,'#9cc2cc');if((x*7+y*3)%60===0)rh(x+3,y+3,2,.5,'#fff')}
 rh(0,0,320,3,'rgba(0,0,0,.08)');rh(0,102,320,2,'#8ab0ba');rh(0,103.5,320,.5,'#5a7a84');
 for(let y=104,i=0;y<144;y+=8,i++)for(let x=0,j=0;x<320;x+=8,j++){const n=(i+j)%2;rh(x,y,8,.5,n?'#3a3a3a':'#fff');rh(x,y+7.5,8,.5,n?'#111':'#cfcfcf');if(!n)rh(x+1,y+1,2,.5,'#fff')}
 rh(0,104,320,6,'rgba(120,180,200,.10)');
}
function drawBainHD(){
 // baignoire : émail brillant, rebord arrondi, pieds de lion dorés, robinet chromé
 rh(22,82,114,.5,'#fff');rh(22,85.5,114,.5,'#c8c8c8');rh(26,88,60,1,'#ffffff');rh(26,90,30,.5,'#fff');rh(24,103.5,110,.5,'#bdbdbd');rh(133,86,1,24,'#d0d0d0');rh(24,86,1,24,'#fff');
 [28,124].forEach(x=>{rh(x,110,6,.5,'#f0d070');rh(x+5,110,1,4,'#9a7420');rh(x-1,113,8,1,'#a8822a')});rh(20,116,120,1.5,'rgba(0,0,0,.25)');
 rh(28,72,10,.5,'#eee');rh(30,75,1,7,'#ddd');rh(35,75,1,7,'#888');rh(31,81,4,1,'#777');
 // rideau : plis, anneaux et tringle
 rh(20,26,118,.5,'#bbb');rh(20,27.5,118,.5,'#555');for(let x=21;x<(bathing?138:30);x+=4)rh(x,25.5,2,2,'#d8d8d8');
 if(bathing)for(let x=24;x<138;x+=8){rh(x+2,28,.5,62,'#f08aa6');rh(x-.5,28,.5,62,'#a8405e')}else{rh(25,28,.5,62,'#f08aa6');rh(21,28,.5,62,'#a8405e');rh(20,89,10,1,'#c85272')}
 // toilettes : réservoir, chasse, abattant et reflets
 rh(166,62,18,.5,'#fff');rh(183,62,1,20,'#ccc');rh(167,66,1,14,'#fff');rh(178,64,4,1,'#b0b0b0');rh(178.5,63.5,3,.5,'#ddd');
 rh(160,84,30,.5,'#fff');rh(161,92.5,28,1,'#cfcfcf');rh(163,86,10,.5,'#fff');rh(167,94,1,14,'#fff');rh(182,94,1,14,'#c8c8c8');rh(164,108,22,1.5,'rgba(0,0,0,.25)');
 // miroir : cadre chromé, reflet en biais
 rh(212,20,48,.5,'#c0c0c0');rh(212,57.5,48,.5,'#555');rh(214,22,44,10,'#e8f8fc');for(let k=0;k<10;k++)rh(240+k,24+k*3,1,3,'rgba(255,255,255,.35)');rh(250,22,.5,34,'rgba(255,255,255,.25)');
 // lavabo : vasque, robinet chromé, pied
 rh(232,64,4,.5,'#ddd');rh(235,64,1,6,'#777');rh(231,68,2,2,'#999');rh(210,70,52,.5,'#fff');rh(214,73,44,.5,'#c8c8c8');rh(216,71,10,.5,'#fff');rh(230,78,1,30,'#fff');rh(241,78,1,30,'#c8c8c8');rh(226,108,20,1.5,'rgba(0,0,0,.25)');
 // porte-serviette et serviette moelleuse
 rh(268,64,16,.5,'#f0d070');rh(268,66.5,16,.5,'#8a6a20');
 if(!S.f.serviette){for(let y=70;y<90;y+=2)rh(270,y,12,.5,'#f2f2f2');rh(281,67,1,26,'#e0e0e0');rh(270,68,12,.5,'#ffc0cc');rh(270,91,12,.5,'#ffc0cc')}
}
ROOMS.bain={walk:[14,300,116,140],draw:drawBain,spots:()=>[
  {id:'porte',name:'porte',r:[290,34,26,72],w:[290,128],exit:()=>go('couloir',242,126)},
  {id:'baignoire',name:'baignoire',r:[20,26,118,90],w:[80,124],wWith:[152,126],
   examiner:()=>say('mag',"Ma belle baignoire. Mon spa personnel."),ouvrir:()=>say('mag',"Si je veux un bain, autant l'utiliser."),prendre:()=>say('mag',"Elle est un peu lourde."),
   utiliser:async()=>{if(S.f.bath)return say('mag',"J'ai déjà pris mon bain. Je vais finir toute fripée.");
     if(!S.inv.includes('robe'))return say('mag',"J'ai besoin d'avoir de quoi m'habiller après.");
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

/* ---------- V2 : salle de bain entièrement redessinée à la main ---------- */
function drawBain2(){
 // faïence : carreaux biseautés, joints, reflets
 bandes2(0,0,320,104,['#b4d8e2','#bce0e8','#c4e4ec','#bcdfe8']);
 for(let x=0;x<320;x+=10)for(let y=0;y<104;y+=10){rh(x,y,10,.5,'#94bcc8');rh(x,y,.5,10,'#94bcc8');rh(x+.5,y+.5,9,.5,'#e0f4f8');rh(x+.5,y+.5,.5,9,'#d8f0f6');rh(x+.5,y+9.5,9.5,.5,'#a4c8d2');rh(x+9.5,y+.5,.5,9.5,'#a8ccd6');
  if((x*7+y*3)%70===0){rh(x+3,y+2,2.5,.5,'#fff');rh(x+2.5,y+2.5,.5,1.5,'#fff')}}
 // frise de mosaïque
 for(let x=0;x<320;x+=5){rh(x,60,5,4,(x/5)%2?'#3a8aa8':'#5ab0c8');rh(x,60,5,.5,'#a8e0f0');rh(x,63.5,5,.5,'#1e5a70')}
 panneau2(0,100,320,4,'#e8f4f8','#ffffff','#7a9aa4');
 // sol : damier brillant avec reflets
 for(let y=104,i=0;y<144;y+=8,i++)for(let x=0,j=0;x<320;x+=8,j++){const n=(i+j)%2;rh(x,y,8,8,n?'#1e1e22':'#ececec');rh(x,y,8,.5,n?'#3a3a40':'#fff');rh(x,y+7.5,8,.5,n?'#0a0a0c':'#c8c8c8');if(!n){rh(x+1,y+1,2,.5,'#fff');rh(x+1,y+1.5,.5,1,'#fff')}else rh(x+1,y+1,1.5,.5,'#4a4a52')}
 ctx.globalAlpha=.12;bandes2(0,104,320,14,['#bfe0e8','#8ab0ba']);ctx.globalAlpha=1;
 // tringle et rideau
 rh(18,25,122,3,'#9aa0a8');rh(18,25,122,.5,'#e8eef4');rh(18,27.5,122,.5,'#5a6068');ovale2(18,26.5,1.5,1.5,'#c8ced6');ovale2(140,26.5,1.5,1.5,'#c8ced6');
 // pommeau de douche
 rh(31,30,1,40,'#b8bec6');rh(31,30,.5,40,'#eef2f6');ovale2(33,72,4,2,'#c8ced6');rh(30,72,6,.5,'#fff');for(let k=0;k<4;k++)rh(30.5+k*1.5,73.5,.5,.5,'#5a6068');
 // baignoire sur pieds
 ombre2(79,116,62);
 if(bathing){ctx.globalAlpha=.5;rh(32,75,2,9,'#7ac8ff');ctx.globalAlpha=1;for(let i=0;i<6;i++){const ph=(t/6+i*5)%30;ovale2(31+i*18,70-ph,1.2,1.2,'rgba(255,255,255,.8)');rh(30.5+i*18,69.5-ph,.5,.5,'#fff')}}
 ovale2(79,84,58,3,'#ffffff');ovale2(79,84,55,2,'#d8e0e4');
 bandes2(22,84,114,22,['#ffffff','#f6f8f8','#eceff0','#dde2e4','#cfd4d6']);
 ovale2(79,106,55,4,'#cfd4d6');rh(24,86,1,20,'#fff');rh(134,86,1,20,'#b8bec0');rh(30,89,64,1,'#fff');rh(30,91,30,.5,'#fff');
 [28,124].forEach(x=>{ovale2(x+3,110,3,1.5,'#c8a040');rh(x+1,110,4,4,'#c8a040');rh(x+1,110,1,4,'#f0d070');rh(x+4.5,110,.5,4,'#8a6418');ovale2(x+3,114,4,1,'#a8822a')});
 if(bathing){for(let k=0;k<10;k+=.5){const v=Math.sin(k*1.4+t/40);rh(20+k*11.8,28,11.8,62,v>.3?'#ec7a98':v>-.3?'#e06a8a':'#c25272')}
   for(let x=24;x<138;x+=8)ovale2(x+1,28.5,1.2,1.2,'#e8eef4')}
 else{for(let k=0;k<10;k+=.5){const v=Math.sin(k*1.8);rh(20+k,28,.5,62+Math.sin(k)*1.5,v>.3?'#ec7a98':v>-.3?'#e06a8a':'#b84a6a')}ovale2(24,28.5,1.2,1.2,'#e8eef4');ovale2(28,28.5,1.2,1.2,'#e8eef4')}
 // toilettes
 ombre2(175,108,12);
 panneau2(166,62,18,20,'#f4f4f4','#ffffff','#c8ccce');rh(166,62,18,3,'#e0e4e6');rh(166,62,18,.5,'#fff');ovale2(180,66,1.5,1,'#c8ced6');rh(179,65.5,1,.5,'#fff');
 ovale2(175,86,15,4,'#ffffff');ovale2(175,86,12,2.5,'#d8dee0');ovale2(175,86,9,1.5,'#b8d8e8');
 bandes2(167,89,16,19,['#f0f2f2','#e2e6e8','#d4d8da']);rh(167,89,.5,19,'#fff');rh(182.5,89,.5,19,'#b8bcbe');ovale2(175,108,9,1.5,'#d4d8da');
 // miroir et lavabo
 panneau2(210,18,52,42,'#8a9098','#d8dee4','#4a5058');panneau2(212,20,48,38,'#b8bec6','#eef2f6','#6a7078');
 bandes2(214,22,44,34,['#cfe8f0','#d8eef4','#e2f4f8','#d4ecf2']);
 ctx.globalAlpha=.7;for(let k=0;k<8;k++){rh(218+k,26+k*2,6,.5,'#fff')}rh(244,40,8,.5,'#fff');rh(246,42,5,.5,'#fff');ctx.globalAlpha=1;
 ombre2(236,109,10);
 rh(233,62,2,8,'#b8bec6');rh(233,62,.5,8,'#fff');rh(231,62,6,1.5,'#c8ced6');ovale2(229.5,64,1.5,1,'#e06a6a');ovale2(238.5,64,1.5,1,'#6a9ae0');
 ovale2(236,71,27,3,'#ffffff');ovale2(236,71,22,1.5,'#d8e0e4');ovale2(236,71,4,.8,'#8a9098');
 bandes2(214,72,44,6,['#f4f6f6','#e4e8ea']);ovale2(236,78,22,2,'#e4e8ea');
 bandes2(231,79,10,29,['#f0f2f2','#e0e4e6','#d0d4d6']);rh(231,79,.5,29,'#fff');rh(240.5,79,.5,29,'#b8bcbe');ovale2(236,108,7,1.5,'#d0d4d6');
 // porte-serviette
 rh(266,63.5,20,3,'#c8a040');rh(266,63.5,20,.5,'#ffe090');rh(266,66,20,.5,'#8a6418');ovale2(266,65,1.5,1.5,'#a8822a');ovale2(286,65,1.5,1.5,'#a8822a');
 if(!S.f.serviette){bandes2(270,67,12,26,['#ffffff','#f6f6f6','#ececec']);rh(270,67,.5,26,'#fff');rh(281.5,67,.5,26,'#d0d0d0');
   rh(270,69,12,2,'#f0a0b0');rh(270,69,12,.5,'#ffc8d4');rh(270,88,12,2,'#f0a0b0');rh(270,89.5,12,.5,'#c87888');for(let k=0;k<12;k+=1)rh(270+k,93,.5,1,'#e8e8e8')}
 door2(293,37);
 glow(236,40,80,'rgba(255,255,255,0.10)');
}
