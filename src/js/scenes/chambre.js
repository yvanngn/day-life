/* Chambre : décor et objets */
function drawChambre(){
 if(HD)return drawChambre2();
 r(0,0,320,100,'#3b2a40');for(let x=0;x<320;x+=16)r(x,0,1,98,'#46324c');
 r(0,98,320,3,'#22161c');r(0,101,320,43,'#4a2f22');for(let y=105;y<144;y+=7)r(0,y,320,1,'#3a2419');for(let y=101,i=0;y<144;y+=7,i++)r((i*53)%320,y,1,7,'#3a2419');
 if(HD)drawChambreFondHD();
 r(172,12,56,36,'#2a1c14');r(175,15,50,30,'#1d3358');r(199,15,2,30,'#2a1c14');r(175,29,50,2,'#2a1c14');r(180,18,3,1,'#cfd8ff');r(214,22,1,1,'#fff');
 r(15,18,62,6,'#5a3820');r(18,24,56,82,'#6b4428');
 if(!S.f.armoire){r(45,26,2,78,'#4a2c18');[[22,30],[49,30],[22,68],[49,68]].forEach(([a,b])=>r(a,b,20,32,'#7a5030'));r(41,64,2,3,'#e0c060');r(49,64,2,3,'#e0c060')}
 else{r(22,26,48,78,'#1e120a');r(22,32,48,2,'#9a9a9a');r(6,24,12,82,'#7a5030');r(74,24,12,82,'#7a5030');
  r(25,34,8,8,'#c0303c');r(24,42,10,30,'#c0303c');
  if(!S.f.robe){r(36,34,6,8,'#3a6fd8');r(35,42,8,28,'#3a6fd8');r(37,44,4,1,'#2a52a8')}
  r(43,34,7,8,'#2f8a5a');r(42,42,9,26,'#2f8a5a');
  if(!S.f.kimono){r(53,34,13,36,'#f2f2f2');r(58,34,3,10,'#d0d0d0');r(53,52,13,3,'#111')}
  r(24,90,46,10,'#3a2418')}
 r(16,106,4,4,'#3a2418');r(72,106,4,4,'#3a2418');
 r(100,66,34,3,'#5a3820');r(114,56,5,10,'#f0e6d0');r(116,54,1,2,'#222');r(104,60,6,6,'#f0e6d0');r(124,61,5,5,'#f0e6d0');
 if(!S.f.dark){flame(115,47);flame(106,53);flame(125,54)}
 r(150,60,104,32,'#5a3a2a');r(154,64,96,4,'#6e4a36');r(148,88,108,20,'#eeeae0');r(156,80,30,10,'#f8f4ec');r(214,80,30,10,'#f8f4ec');
 r(148,93,108,17,'#b24a6a');r(148,93,108,3,'#d06a88');r(150,108,4,6,'#3a2418');r(250,108,4,6,'#3a2418');
 r(262,90,30,22,'#6b4428');r(264,100,26,1,'#4a2c18');r(276,104,3,2,'#e0c060');r(264,112,3,3,'#3a2418');r(287,112,3,3,'#3a2418');
 r(265,86,13,4,'#a03030');r(265,86,13,1,'#e8e0c8');r(265,89,13,1,'#701818');
 if(!S.f.laser){r(281,87,8,2,'#9aa0a8');r(289,87,1,2,'#ff2020')}
 door(293,37);
 if(HD)drawChambreHD();
 if(!S.f.dark)glow(116,52,130,'rgba(255,170,80,0.20)');
}
/* V2 : détails haute définition par-dessus la V1 */
function drawChambreFondHD(){
 // papier peint : petits motifs losanges
 for(let x=8;x<320;x+=16)for(let y=8;y<96;y+=14){const o=((y/14|0)%2)*8;rh(x+o-.5,y,1,.5,'#55405c');rh(x+o-1,y+.5,2,.5,'#4e3a55');rh(x+o-.5,y+1,1,.5,'#55405c')}
 rh(0,97,320,1,'#5a4460');rh(0,98.5,320,.5,'#120a0e');
 // parquet : veinage et reflets
 for(let y=101,i=0;y<144;y+=7,i++){rh(0,y+.5,320,.5,'#5a3a2a');for(let x=(i*29)%40;x<320;x+=40){rh(x,y+3,9,.5,'#43291d');rh(x+14,y+4.5,5,.5,'#553626')}}
 rh(0,101,320,1.5,'rgba(0,0,0,.25)');
}
function drawChambreHD(){
 // fenêtre : ciel dégradé, étoiles, lune, rebord et rideaux
 rh(175,15,50,6,'#16284a');rh(175,21,50,6,'#1a2f52');
 [[178,20],[188,17],[207,25],[219,18],[183,38],[212,36],[192,33]].forEach(([a,b])=>rh(a,b,.5,.5,'#fff'));
 rh(216,35,5,5,'#f2ecc8');rh(215.5,36,1,3,'#f2ecc8');rh(218,35.5,2,1,'#fffbe0');rh(219,38,1,1,'#d8d0a8');
 rh(176,16,1,12,'rgba(255,255,255,.12)');rh(170,48,60,2,'#5a3820');rh(170,48,60,.5,'#8a5a34');
 rh(166,10,8,46,'#7a2a40');rh(167,10,1,46,'#9a3a56');rh(171,10,.5,46,'#5a1a2e');rh(226,10,8,46,'#7a2a40');rh(232,10,1,46,'#9a3a56');rh(228,10,.5,46,'#5a1a2e');rh(164,9,72,1.5,'#c8a050');
 // armoire : chants, moulures, ombres
 rh(15,18,62,1,'#7a5230');rh(18,104.5,56,1.5,'#3a2418');rh(73,24,1,82,'#4a2c18');rh(18,24,1,82,'#7e5432');
 if(!S.f.armoire){[[22,30],[49,30],[22,68],[49,68]].forEach(([a,b])=>{rh(a,b,20,.5,'#9a6a40');rh(a,b,.5,32,'#8e6038');rh(a,b+31.5,20,.5,'#4a2c18');rh(a+19.5,b,.5,32,'#5a3620');rh(a+3,b+3,14,26,'#73492c');rh(a+3,b+3,14,.5,'#5a3620');rh(a+3,b+28.5,14,.5,'#8a5c36')});
   rh(41.5,64.5,1,1,'#fff0a0');rh(49.5,64.5,1,1,'#fff0a0')}
 else{rh(22,26,48,2,'rgba(0,0,0,.4)');rh(22,32.5,48,.5,'#d0d0d0');
   rh(24,42,1,30,'#e05060');if(!S.f.robe){rh(35,42,1,28,'#5a8ae8');rh(38,48,2,1,'#2a52a8');rh(37,58,4,.5,'#2a52a8')}rh(42,42,1,26,'#4aaa7a');
   if(!S.f.kimono){rh(53,34,1,36,'#fff');rh(64.5,34,1.5,36,'#d8d8d8');rh(58,44,3,8,'#e6e6e6')}}
 // table de chevet et bougies : bois, cire qui coule
 rh(100,66,34,1,'#7a5230');rh(100,68.5,34,.5,'#3a2418');rh(118,58,.5,6,'#d8ccb0');rh(108,62,.5,4,'#d8ccb0');rh(127,62.5,.5,3,'#d8ccb0');rh(114.5,56,1,2,'#fff8e8');
 // lit : tête de lit sculptée, oreillers gonflés, couette matelassée
 rh(150,60,104,1,'#7a5040');rh(154,64,96,.5,'#8a5e46');for(let x=160;x<250;x+=12)rh(x,69,.5,18,'#4a2e22');
 [[156,80],[214,80]].forEach(([a,b])=>{rh(a+1,b,28,1,'#fffdf6');rh(a,b+9,30,1,'#d8d0c0');rh(a+14,b+3,2,4,'#e8e2d4')});
 for(let x=150;x<256;x+=9)for(let y=97;y<108;y+=5){rh(x,y,.5,.5,'#8a3050');rh(x+4,y+2.5,.5,.5,'#c25a7a')}
 rh(148,96,108,.5,'#ea8aa4');rh(148,109.5,108,.5,'#7a2a44');rh(148,93,1,17,'#c25a7a');
 // commode : poignées, réflexion du laser, ombre au sol
 rh(262,90,30,1,'#8a5c36');rh(262,111,30,1,'#3a2418');rh(276,104,3,.5,'#fff0a0');
 if(!S.f.laser){rh(281,87,8,.5,'#c8ced6');rh(289,87,.5,.5,'#ffb0b0')}
 rh(258,114,38,1.5,'rgba(0,0,0,.25)');rh(146,113,112,1.5,'rgba(0,0,0,.25)');rh(14,109,64,1.5,'rgba(0,0,0,.25)');
}
ROOMS.chambre={walk:[14,286,114,140],draw:drawChambre,spots:()=>[
  {id:'porte',name:'porte',r:[290,34,26,72],w:[290,128],exit:()=>go('couloir',...START.couloir),examiner:()=>say('mag',"La porte du couloir.")},
  {id:'armoire',name:'armoire',r:[6,18,80,90],w:[48,124],
   ouvrir:async()=>{if(S.f.armoire)return say('mag',"Elle est déjà ouverte.");S.f.armoire=true;await say('mag',"Et voilà.")},
   examiner:()=>S.f.armoire?say('mag',"Mes robes, quelques tenues"+(S.f.kimono?"":"... et mon kimono de taekwondo")+" !"):say('mag',"Ma grande armoire. Elle est fermée."),
   prendre:()=>say('mag',S.f.armoire?"Quoi donc ? Ma robe bleue peut-être.":"Il faudrait l'ouvrir d'abord."),
   utiliser:()=>say('mag',"Non pas devant vous voyons !")},
  {id:'robe',name:'robe bleue',vis:()=>S.f.armoire&&!S.f.robe,r:[34,32,10,40],w:[48,124],examiner:()=>say('mag',"Ma robe bleue. Elle me va trop bien."),
   prendre:async()=>{S.f.robe=true;addItem('robe');await say('mag',"Je mettrai ma robe bleue aujourd'hui.")},utiliser:()=>say('mag',"Non pas devant vous voyons !")},
  {id:'kimono',name:'kimono',vis:()=>S.f.armoire&&!S.f.kimono,r:[52,32,15,40],w:[48,124],examiner:()=>say('mag',"Mon kimono de taekwondo. Hiya !"),
   prendre:()=>say('mag',"Pas de taekwondo aujourd'hui. Il reste là."),utiliser:()=>say('mag',"Non pas devant vous voyons !")},
  {id:'lit',name:'lit',r:[148,60,108,50],w:[200,122],examiner:()=>say('mag',"Mon grand lit double. Rien que pour moi. La belle vie."),prendre:()=>say('mag',"Trop lourd. Et beaucoup trop confortable."),utiliser:()=>say('narr',"Non. On a dit qu'on se levait.")},
  {id:'table',name:'table de nuit',r:[262,90,30,24],w:[262,124],examiner:()=>say('mag',"Ma table de nuit."),ouvrir:()=>say('mag',"Des mouchoirs, des élastiques... rien d'utile.")},
  {id:'livre',name:'livre',r:[263,83,16,8],w:[248,124],examiner:async()=>{SFX.page();const i=S.f.book%4;S.f.book++;if(i===0)await say('mag',"\"Hari Prouteur à l'école des grossiers\".");await say('mag',BOOK[i])},
   prendre:()=>say('mag',"Non j'en ai besoin pour m'aider à m'endormir très vite le soir."),ouvrir:()=>say('mag',"Je l'ai déjà lu... douze fois.")},
  {id:'laser',name:'laser pour chat',vis:()=>!S.f.laser,r:[279,83,13,8],w:[250,124],examiner:()=>say('mag',"Un laser pour chat. Le sport de Shaggy."),prendre:async()=>{S.f.laser=true;addItem('laser');await say('mag',"Ça peut servir.")}},
  {id:'bougie',name:'bougie',r:[100,42,34,26],w:[116,122],
   examiner:()=>S.f.dark?say('mag',"La mèche rougeoie encore."):say('mag',"Des bougies parfumées. Ambiance tamisée."),
   prendre:()=>say('mag',"Et me brûler les doigts ? Non merci."),
   utiliser:async()=>{if(!S.f.dark){SFX.blow();S.f.dark=true;await say('mag',"Pfffff.");await say('mag',"Oups. Il fait tout noir.")}else{SFX.light();S.f.dark=false;await say('mag',"Et la lumière fut !")}}}
 ]};

/* ---------- V2 : chambre entièrement redessinée à la main ---------- */
function drawChambre2(){
 // mur : dégradé prune, papier peint à rayures et médaillons
 bandes2(0,0,320,98,['#22172e','#2a1d36','#33243f','#3b2a48','#433052','#4a3658']);
 for(let x=0;x<320;x+=16){rh(x,0,.5,98,'rgba(255,255,255,.05)');rh(x+8,0,.5,98,'rgba(0,0,0,.12)')}
 for(let x=8;x<320;x+=16)for(let y=10;y<92;y+=16){const o=((y/16|0)%2)*8;ovale2(x+o,y,1.5,2,'rgba(200,170,220,.10)');rh(x+o-.25,y-3,.5,1,'rgba(200,170,220,.08)')}
 // corniche et plinthe
 rh(0,0,320,3,'#1a1022');rh(0,3,320,.5,'#5a4468');
 bandes2(0,92,320,7,['#3a2418','#4a2e1e','#2a1810']);rh(0,92,320,.5,'#8a5e40');rh(0,98.5,320,.5,'#0e0806');
 // parquet en lames, dégradé vers le fond, reflets de la bougie et de la lune
 bandes2(0,99,320,45,['#2e1c14','#3a2419','#46301f','#523824','#5a3e28']);
 for(let y=101,i=0;y<144;y+=7,i++){rh(0,y,320,.5,'#1e120c');rh(0,y+.5,320,.5,'rgba(255,220,180,.06)');
  for(let x=(i*53)%80;x<320;x+=80){rh(x,y,.5,7,'#1e120c');rh(x+.5,y,.5,7,'rgba(255,220,180,.08)')}
  for(let x=(i*31)%37;x<320;x+=37)rh(x,y+3+(i%2),7,.5,'rgba(0,0,0,.18)')}
 ctx.globalAlpha=.10;for(let k=0;k<14;k++)rh(176+k*.8,112+k*2,54,2,'#c8d4ff');ctx.globalAlpha=1;
 // fenêtre : cadre mouluré, ciel nocturne, lune, rideaux drapés
 panneau2(170,10,60,40,'#3a2414','#7a5030','#1a0e08');
 bandes2(175,15,50,30,['#0c1430','#111c3e','#16254c','#1c2e58','#22385f']);
 [[178,20],[188,17],[207,25],[219,18],[183,38],[196,22],[192,33],[223,28]].forEach(([a,b],i)=>{rh(a,b,.5,.5,'#fff');if(i%3===0){rh(a-.5,b,.5,.5,'rgba(255,255,255,.4)');rh(a+.5,b,.5,.5,'rgba(255,255,255,.4)')}});
 ovale2(216,35,3.5,3.5,'#e8e0b8');ovale2(215.5,34.5,2.5,2.5,'#fffbe0');rh(217,36,1,.5,'#c8c098');rh(215,34,.5,.5,'#d8d0a8');
 ctx.globalAlpha=.25;ovale2(216,35,7,7,'#fff8d0');ctx.globalAlpha=1;
 rh(199,15,2,30,'#3a2414');rh(199,15,.5,30,'#7a5030');rh(175,29,50,2,'#3a2414');rh(175,29,50,.5,'#7a5030');
 rh(176,16,1,12,'rgba(255,255,255,.10)');rh(202,16,1,12,'rgba(255,255,255,.08)');
 panneau2(168,48,64,3,'#6a4426','#a87448','#2a1810');
 [[164,0],[226,1]].forEach(([cx,dr])=>{for(let k=0;k<10;k+=.5){const v=Math.sin(k*1.6);rh(cx+k,11,.5,46+(dr?k*.3:(10-k)*.3),v>.3?'#a8405a':v>-.3?'#842e46':'#5a1a2e')}
  rh(cx,30,10,1.5,'#c8a050');rh(cx,30,10,.5,'#ffe090')});
 rh(162,8.5,76,2,'#8a6a30');rh(162,8.5,76,.5,'#ffe090');ovale2(162,9.5,1.5,1.5,'#c8a050');ovale2(238,9.5,1.5,1.5,'#c8a050');
 // armoire
 ombre2(46,107,34);
 panneau2(14,16,64,9,'#5a3820','#9a6a40','#2a1810');rh(14,19,64,.5,'#3a2414');rh(16,24,60,.5,'#2a1810');
 bandes2(18,25,56,81,['#7a4e2e','#6e4628','#643e22','#5a381e']);rh(18,25,.5,81,'#9a6a40');rh(73.5,25,.5,81,'#2a1810');
 if(!S.f.armoire){rh(45,26,2,78,'#3a2414');rh(45,26,.5,78,'#1a0e08');
  [[22,30],[49,30],[22,68],[49,68]].forEach(([a,b],i)=>{panneau2(a,b,20,32,'#7a5030','#b07a4a','#3a2414');panneau2(a+3,b+3,14,26,'#6e4628','#3a2414','#a07048');veines2(a+3,b+3,14,26,'#5e3a20',i*5)});
  [[41,64],[49,64]].forEach(([a,b])=>{ovale2(a+1,b+1.5,1.2,1.5,'#c8982e');rh(a+.5,b+.5,.5,.5,'#fff0a0')})}
 else{bandes2(22,26,48,78,['#0e0806','#1a100a','#22140c']);rh(22,32,48,1,'#8a8a90');rh(22,32,48,.5,'#d8d8e0');
  panneau2(5,24,13,82,'#7a5030','#b07a4a','#3a2414');panneau2(74,24,13,82,'#7a5030','#b07a4a','#3a2414');rh(7,40,9,30,'#6e4628');rh(76,40,9,30,'#6e4628');
  const cintre=(x)=>{rh(x+3,31,.5,2,'#c8c8d0');rh(x,33,7,.5,'#b0b0b8')};
  const habit=(x,w,h,c,cl,cs)=>{cintre(x+(w-7)/2);rh(x+1,34,w-2,8,c);rh(x,42,w,h,c);rh(x,42,.5,h,cl);rh(x+w-.5,42,.5,h,cs);for(let k=2;k<w;k+=3)rh(x+k,46,.5,h-6,cs)};
  habit(24,10,30,'#c0303c','#e85868','#801820');
  if(!S.f.robe){habit(34,9,28,'#3a6fd8','#6a9af0','#22489a');rh(36,48,4,.5,'#22489a')}
  habit(42,9,26,'#2f8a5a','#5ab884','#1a5a3a');
  if(!S.f.kimono){habit(52,14,28,'#f0f0f0','#ffffff','#c8c8cc');rh(52,52,14,3,'#151515');rh(52,52,14,.5,'#444');rh(57,34,4,8,'#e0e0e4')}
  rh(24,90,46,10,'#2a1810');rh(26,92,10,6,'#3a2414');rh(40,93,12,5,'#4a2e1e')}
 rh(16,106,4,4,'#2a1810');rh(72,106,4,4,'#2a1810');
 // table de chevet et bougies
 ombre2(117,112,18);
 panneau2(100,66,34,3,'#6a4426','#a87448','#2a1810');rh(103,69,28,40,'#5a3820');bandes2(103,69,28,40,['#5a3820','#4e301a','#422814']);
 panneau2(105,74,24,12,'#6a4426','#8a5e36','#2a1810');ovale2(117,80,1.2,1.2,'#c8982e');rh(103,108,3,4,'#2a1810');rh(128,108,3,4,'#2a1810');
 const bougie=(x,y,w,h)=>{rh(x,y,w,h,'#efe4cc');rh(x,y,.5,h,'#fffaf0');rh(x+w-.5,y,.5,h,'#c8b898');rh(x+1,y,1,2.5,'#fffaf0');rh(x+w-1.5,y,.5,3.5,'#e0d4b8')};
 bougie(114,56,5,10);bougie(104,60,6,6);bougie(124,61,5,5);rh(116,54,1,2,'#222');rh(106.5,58,.5,2,'#222');rh(126,59,.5,2,'#222');
 if(!S.f.dark){flame(115,47);flame(106,53);flame(125,54)}
 // lit
 ombre2(202,114,58);
 panneau2(148,56,108,8,'#5a3a2a','#8a5e46','#2a1810');ovale2(202,58,30,5,'#5a3a2a');ovale2(202,58.5,28,4,'#6e4a36');rh(172,56,60,.5,'#8a5e46');
 bandes2(150,64,104,26,['#5a3a2a','#4e3224','#432a1e']);for(let x=160;x<250;x+=12){rh(x,67,1,20,'#3a2418');rh(x+1,67,.5,20,'#7a5040')}
 rh(148,86,108,10,'#efeae0');rh(148,86,108,.5,'#fff');
 [[156,79],[214,79]].forEach(([a,b])=>{ovale2(a+15,b+5.5,15.5,5.5,'#e8e2d4');ovale2(a+14.5,b+4.5,14,4.5,'#faf6ee');rh(a+8,b+2,8,1,'#fff');rh(a+14,b+5,2,2.5,'#ddd6c6')});
 bandes2(148,92,108,18,['#d06a88','#c25a7a','#b24a6a','#9e3e5c']);rh(148,92,108,.5,'#f09ab4');
 for(let x=152;x<256;x+=9)for(let y=96;y<108;y+=5){rh(x,y,.5,.5,'#7a2a44');rh(x+4,y+2.5,.5,.5,'#e88aa4')}
 for(let k=0;k<4;k++)rh(170+k*24,94,.5,15,'rgba(0,0,0,.15)');
 rh(148,109.5,108,.5,'#6a2038');rh(148,92,.5,18,'#7a2a44');rh(255.5,92,.5,18,'#5a1a2e');
 rh(150,108,4,6,'#2a1810');rh(250,108,4,6,'#2a1810');rh(150,108,.5,6,'#5a3a2a');
 // commode, livre et pointeur laser
 ombre2(277,114,18);
 panneau2(262,90,30,22,'#6b4428','#a07048','#2a1810');panneau2(264,92,26,8,'#5e3a22','#8a5e36','#3a2414');panneau2(264,101,26,9,'#5e3a22','#8a5e36','#3a2414');
 ovale2(277,96,1.2,1,'#c8982e');ovale2(277.5,105,1.2,1,'#c8982e');rh(264,112,3,3,'#2a1810');rh(287,112,3,3,'#2a1810');
 rh(265,86,13,4,'#a03030');rh(265,86,13,.5,'#e85050');rh(265,86.5,13,.5,'#f2ead2');rh(265,89,13,1,'#6a1414');rh(265,86,.5,4,'#701818');
 if(!S.f.laser){rh(281,87,8,2,'#8a9098');rh(281,87,8,.5,'#d0d6de');rh(289,87,1,2,'#ff2020');rh(289,87,.5,.5,'#ffb0b0')}
 door2(293,37);
 if(!S.f.dark){glow(116,52,140,'rgba(255,170,80,0.22)');glow(116,52,40,'rgba(255,210,140,0.18)')}
 glow(205,30,70,'rgba(140,170,255,0.08)');
}
