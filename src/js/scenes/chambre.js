/* Chambre : décor et objets */
function drawChambre(){
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
