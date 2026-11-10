/* Chambre : décor et objets */
function drawChambre(){
 r(0,0,320,100,'#3b2a40');for(let x=0;x<320;x+=16)r(x,0,1,98,'#46324c');
 r(0,98,320,3,'#22161c');r(0,101,320,43,'#4a2f22');for(let y=105;y<144;y+=7)r(0,y,320,1,'#3a2419');for(let y=101,i=0;y<144;y+=7,i++)r((i*53)%320,y,1,7,'#3a2419');
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
 if(!S.f.dark)glow(116,52,130,'rgba(255,170,80,0.20)');
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
