/* Couloir : décor et objets */
function drawCouloir(){
 if(HD)return drawCouloir2();
 r(0,0,320,104,'#c9b48a');for(let x=0;x<320;x+=24)r(x,0,1,68,'#bca67c');
 r(0,68,320,3,'#6a4a30');r(0,71,320,33,'#8a6a48');for(let x=6;x<320;x+=30)r(x,76,22,22,'#7c5e40');
 r(0,104,320,40,'#6a3030');r(0,110,320,28,'#9a4a40');r(0,112,320,1,'#e0b060');r(0,135,320,1,'#e0b060');for(let x=4;x<320;x+=16)r(x,122,4,2,'#e0b060');
 if(HD)drawCouloirFondHD();
 r(108,16,68,48,'#a87e28');r(110,18,64,44,'#d8b04a');r(114,22,56,36,'#284858');
 r(122,40,40,4,'#f0e8d8');r(124,44,36,6,'#e8e0d0');r(128,50,28,3,'#d0c8b8');r(124,40,36,3,'#c8843a');
 for(let i=0;i<7;i++)r(127+i*4,39,3,1,'#f6e9b0');r(130,38,2,1,'#3aa04a');r(145,38,2,1,'#3aa04a');r(152,39,2,1,'#3aa04a');r(140,38,3,1,'#e06a50');
 r(156,30,2,12,'#7a4a20');r(160,28,2,14,'#7a4a20');
 for(let k=0;k<3;k++){const off=((t/10|0)+k*3)%6;r(132+k*9+(off%2),26+off,1,3,'rgba(255,255,255,.7)')}
 r(132,64,20,3,'#a87e28');
 door(15,38);door(231,38);
 r(268,30,52,74,'#3a2a20');for(let i=0;i<6;i++)r(270+i*8,58+i*8,50-i*8,4,'#7a5a3a');r(268,30,3,74,'#5a3a20');r(272,40,48,2,'#a07a50');
 for(let i=0;i<5;i++)r(276+i*10,42,2,24+i*6,'#a07a50');
 r(70,86,12,14,'#b86a40');r(72,74,2,12,'#3a8a40');r(76,70,2,16,'#4aa050');r(80,76,2,10,'#3a8a40');
 // litière
 r(88,94,28,12,'#4a6ab0');r(90,92,24,4,'#5a7ac8');r(91,93,22,2,'#d8ccb0');
 if(!S.f.litter){r(96,91,4,3,'#6a4020');r(97,89,2,2,'#7a4a28');r(105,92,3,2,'#6a4020');if((t>>4)%2)r(98,86,1,2,'rgba(120,140,60,.6)');else r(101,85,1,2,'rgba(120,140,60,.6)')}
 if(S.f.cheeseIn&&!S.f.litter)r(108,90,5,3,'#f2c832');
 if(cMouse.on){const mx=cMouse.x,b=(t>>3)%2;if(HD)mouseHD(mx,26,b);else{r(mx-6,99-b,7,4,'#8a8a90');r(mx+1,100-b,3,3,'#9a9aa0');r(mx,98-b,2,2,'#d08a9a');r(mx+3,101-b,1,1,'#111');r(mx-10,102,4,1,'#d08a9a')}}
 // socle + buste
 r(192,74,24,4,'#d8d0c0');r(195,78,18,26,'#c8c0b0');r(192,100,24,4,'#d8d0c0');
 if(!S.f.bust){const B={g:'#6a5a40',G:'#4a3e2a',d:'#3a3020',m:'#7a6a4a',k:'#1e180e'};
   drawMap(["....mmmmmm....","...mgggggGm...","..mgggggggGm..","..ggkgggkggG..","..gggggggggG..","..ggggdddggG..","..gdgggggdgG..","...ggkkkkgG...","....gggggG....","..mgggggggggm.",".mggggggggggGm"],B,193,56.5,1.6,false);
   r(197,63,2,1,'#2a2014');r(207,71,1,2,'#2a2014');r(202,57,1,1,'#2a2014')}
 else{const top=(S.f.dressed?MAG_DRESS_TOP:MAG_TOP).slice(0,14);drawMap(top,MPAL,194,50.5,1.7,false);
   if((t>>5)%4===0){r(198,52,1,1,'#fff');r(213,60,2,2,'#fff')}}
 if(HD)drawCouloirHD();
}
/* V2 : fond (mur, lambris, tapis) puis détails par-dessus */
function drawCouloirFondHD(){
 for(let x=0;x<320;x+=24){rh(x+1,0,.5,68,'#d6c49c');for(let y=6;y<66;y+=12)rh(x+12,y,.5,.5,'#b49e74')}
 rh(0,0,320,4,'rgba(0,0,0,.12)');rh(0,68,320,.5,'#8a6a48');rh(0,70.5,320,.5,'#3a2818');
 for(let x=6;x<320;x+=30){rh(x,76,22,.5,'#a08060');rh(x,76,.5,22,'#9a7a58');rh(x,97.5,22,.5,'#5a3e28');rh(x+21.5,76,.5,22,'#634430');rh(x+3,79,16,16,'#816244')}
 rh(0,103,320,1,'#5a3e28');
 rh(0,110,320,1,'#7a3a32');rh(0,137,320,1,'#4a2020');for(let x=0;x<320;x+=8){rh(x,114,4,.5,'#b05a50');rh(x+4,132,4,.5,'#b05a50')}
 for(let x=4;x<320;x+=16){rh(x+1,121,2,.5,'#ffd890');rh(x+1,124,2,.5,'#a07a30');rh(x+8,118,1,1,'#c06050');rh(x+8,127,1,1,'#c06050')}
 rh(0,112.5,320,.5,'#fff0c0');rh(0,135.5,320,.5,'#a07a30');
}
function drawCouloirHD(){
 // tableau : cadre doré en relief, reflet sur la toile
 rh(108,16,68,1,'#e8c870');rh(108,16,1,48,'#e0bc60');rh(108,63,68,1,'#7a5a18');rh(175,16,1,48,'#7a5a18');rh(110,18,64,.5,'#f6dc8a');
 for(let x=112;x<172;x+=6){rh(x,17,1.5,.5,'#a87e28');rh(x+3,62.5,1.5,.5,'#f0d070')}
 rh(114,22,56,12,'#2a5266');rh(115,23,20,1,'rgba(255,255,255,.08)');rh(122,43.5,40,.5,'#fff');rh(124,49.5,36,.5,'#b8b0a0');
 rh(156,30,.5,12,'#9a6a3a');rh(160,28,.5,14,'#9a6a3a');rh(155.5,29.5,3,1,'#5a3410');rh(159.5,27.5,3,1,'#5a3410');rh(132,64,20,.5,'#e8c870');
 // portes : moulures, charnières, poignées brillantes
 [15,231].forEach(x=>{rh(x,38,22,.5,'#9a6a40');rh(x+3,42,16,.5,'#5a3a20');rh(x+3,72,16,.5,'#5a3a20');rh(x+3,65.5,16,.5,'#a07848');rh(x+3,97.5,16,.5,'#a07848');rh(x+21,44,1,4,'#c8a050');rh(x+21,88,1,4,'#c8a050');rh(x+3.5,71.5,1,1,'#fff0a0');rh(x-3,104,28,1.5,'rgba(0,0,0,.3)')});
 // escalier : nez de marche, ombres, main courante
 for(let i=0;i<6;i++){rh(270+i*8,58+i*8,50-i*8,.5,'#b08a60');rh(270+i*8,61.5+i*8,50-i*8,.5,'#4a3020');rh(270+i*8,62+i*8,50-i*8,4,'rgba(0,0,0,.18)')}
 rh(272,40,48,.5,'#d0a878');rh(272,41.5,48,.5,'#6a4a2a');for(let i=0;i<5;i++)rh(276+i*10,42,.5,24+i*6,'#c09a6a');rh(268,30,.5,74,'#7a5a3a');
 // plante : pot en terre cuite, feuilles nuancées
 rh(70,86,12,1,'#d0845a');rh(69,85,14,1.5,'#c87850');rh(80,87,1,13,'#9a5030');rh(70,99,12,1,'#8a4428');
 rh(72.5,74,.5,12,'#6ac070');rh(76.5,70,.5,16,'#7ad080');rh(80.5,76,.5,10,'#6ac070');rh(74,72,2,1,'#3a8a40');rh(78,74,2,1,'#4aa050');rh(70,79,2,1,'#3a8a40');rh(82,78,2,1,'#4aa050');rh(66,100,20,1.5,'rgba(0,0,0,.3)');
 // litière : plastique brillant, grain du sable
 rh(88,94,28,.5,'#7a9ae0');rh(88,105.5,28,.5,'#2a4a88');rh(90,92,24,.5,'#8aa4e8');for(let x=92;x<112;x+=3)rh(x,93.5,.5,.5,'#b8ac90');rh(86,106,32,1.5,'rgba(0,0,0,.3)');
 // socle du buste : marbre veiné
 rh(192,74,24,.5,'#f0ead8');rh(195,78,.5,26,'#e0d8c8');rh(212.5,78,.5,26,'#a8a090');rh(199,82,.5,6,'#b0a898');rh(199.5,88,3,.5,'#b0a898');rh(207,90,.5,8,'#b0a898');rh(192,100,24,.5,'#f0ead8');rh(190,104,28,1.5,'rgba(0,0,0,.3)');
}
ROOMS.couloir={walk:[14,300,116,140],draw:drawCouloir,spots:()=>[
  {id:'pch',name:'porte de la chambre',r:[12,35,28,70],w:[30,128],exit:()=>go('chambre',285,128)},
  {id:'pbain',name:'porte de la salle de bain',r:[228,35,28,70],w:[242,124],exit:()=>go('bain',...START.bain)},
  {id:'esc',name:'escalier',r:[268,30,52,74],w:[292,130],exit:()=>go('salon',...START.salon),examiner:()=>say('mag',"L'escalier qui descend au salon.")},
  {id:'buste',name:S.f.bust?'buste de Magali':'buste crasseux',r:[190,48,28,56],w:[174,124],
   examiner:()=>say('mag',S.f.bust?"Mon buste. Le plus bel objet de la maison, objectivement.":"Un buste tout crasseux. Qui ça peut bien être sous toute cette saleté ?"),
   prendre:()=>say('mag',S.f.bust?"Il est très bien sur son socle.":"Pas avec les mains, berk !"),utiliser:()=>say('mag',S.f.bust?"Il brille déjà.":"Pas avec les mains, berk !"),ouvrir:()=>say('mag',"C'est un buste, pas une boîte."),
   with:{serviette:async()=>{if(S.f.bust)return say('mag',"Il brille déjà.");await say('mag',"Allez, un petit coup de serviette...");SFX.scrub();await wait(1300);
     S.f.bust=true;S.f.used.serviette=true;renderInv();await say('mag',"Mais... c'est moi ! Waw, je suis magnifique.");await couloirCheck()},
     chat:()=>say('mag',"Shaggy ne lèche que lui-même. Malheureusement.")}},
  {id:'litiere',name:'litière de Shaggy',r:[86,84,32,24],w:[132,124],
   examiner:()=>say('mag',S.f.litter?"Une litière toute propre. Un miracle.":"La litière de Shaggy. Elle a besoin d'un coup de propre... et ça sent jusqu'ici."),
   prendre:()=>say('mag',S.f.litter?"Elle est propre, je la laisse.":"Beurk je ne touche pas à ça, je préfère déléguer cette tâche ing- RAT -e."),
   utiliser:()=>say('mag',S.f.litter?"Elle est propre, je la laisse.":"Beurk je ne touche pas à ça, je préfère déléguer cette tâche ing- RAT -e."),
   with:{fromage:async()=>{if(S.f.litter)return say('mag',"Plus besoin.");removeItem('fromage');S.f.cheeseIn=true;await say('mag',"Hop, un petit appât dans la litière...");
     cMouse.on=true;cMouse.x=-10;SFX.squeak();for(let i=0;i<55;i++){cMouse.x+=2;await wait(25)}
     for(let i=0;i<10;i++){SFX.nibble();await wait(120)}S.f.litter=true;SFX.squeak();await wait(200);
     for(let i=0;i<60;i++){cMouse.x-=2.5;await wait(20)}cMouse.on=false;
     await say('mag',"Elle a tout mangé... le fromage ET le reste. Beurk. Mais efficace !");await couloirCheck()},
     serviette:()=>say('mag',"Avec ma serviette ? Jamais de la vie !"),chat:()=>say('mag',"Shaggy ne nettoie pas, il salit.")}},
  {id:'pho',name:'portrait de pho',r:[108,16,68,52],w:[142,122],examiner:()=>say('mag',"Un magnifique portrait de pho. Il me regarde. J'ai faim."),prendre:()=>say('mag',"Non, il veille sur la maison."),utiliser:()=>say('mag',"On ne mange pas les tableaux. Même celui-là.")},
  {id:'shaggy',name:'Shaggy',vis:()=>!S.f.cat,r:[cat.x-15,cat.y-18,30,20],w:[Math.max(20,cat.x-26),Math.min(138,cat.y+2)],isCat:true,
   examiner:async()=>{await say('mag',(S.f.catWhite?CATXW:CATX)[S.f.catTalk%3]);S.f.catTalk++},
   prendre:async()=>{S.f.cat=true;addItem('chat');await say('mag',"Viens là mon gros pacha !");await say('cat',"Mrrrrr.")},
   ouvrir:()=>say('mag',"On n'ouvre pas un chat !"),utiliser:()=>say('mag',"On n'utilise pas un chat. C'est lui qui nous utilise."),
   with:{laser:async()=>{await say('mag',"Regarde Shaggy, le point rouge !");cat.freeze=false;cat.mode='chase';cat.chase=150;await wait(2600);cat.mode='lick';cat.timer=200;cat.freeze=true;await say('cat',"Mrrraow !");await say('mag',"Il a déjà abandonné. Quel sportif.")}}}
 ]};

/* ---------- V2 : couloir entièrement redessiné à la main ---------- */
function drawCouloir2(){
 // mur crème : dégradé, papier peint à rayures fines et fleurettes
 bandes2(0,0,320,68,['#b8a27a','#c4ae84','#ccb78c','#d2bd92','#d6c296']);
 for(let x=0;x<320;x+=24){rh(x,0,.5,68,'rgba(120,90,50,.18)');rh(x+.5,0,.5,68,'rgba(255,250,230,.25)');
  for(let y=8;y<64;y+=12){const o=((y/12|0)%2)*12;rh(x+o+5.5,y,1,.5,'#b28c64');rh(x+o+5,y+.5,2,.5,'#c69a72');rh(x+o+5.5,y+1,1,.5,'#b28c64');rh(x+o+6,y+1.5,.5,1,'#8a9a60')}}
 rh(0,0,320,2,'#8a7050');rh(0,2,320,.5,'#f0e2c0');
 // cimaise et lambris
 panneau2(0,67,320,4,'#6a4a30','#a07a50','#2a1a10');
 bandes2(0,71,320,33,['#7e6040','#86684a','#8a6c4c','#7a5c3e']);
 for(let x=6;x<320;x+=30){panneau2(x,76,22,22,'#7c5e40','#a8865e','#4a3220');panneau2(x+3,79,16,16,'#82644a','#5a4028','#9a7a56');veines2(x+3,79,16,16,'#6e5238',x)}
 panneau2(0,100,320,4,'#5a3e28','#8a6a48','#1e120a');
 // sol et tapis persan
 bandes2(0,104,320,40,['#4a2e1e','#55361f','#5e3e24']);
 bandes2(0,109,320,28,['#8a3a34','#9a4a40','#a4524a','#9a4a40','#8a3a34']);
 rh(0,109,320,1,'#5a2020');rh(0,136,320,1,'#3a1414');
 for(let x=0;x<320;x+=8){rh(x,113,4,.5,'#c8a050');rh(x+4,132.5,4,.5,'#c8a050');rh(x+2,114,.5,.5,'#2a4a6a');rh(x+6,131.5,.5,.5,'#2a4a6a')}
 rh(0,111.5,320,.5,'#ffe0a0');rh(0,112,320,.5,'#c8a050');rh(0,134.5,320,.5,'#c8a050');rh(0,135,320,.5,'#7a5a20');
 for(let x=4;x<320;x+=16){ovale2(x+2,123,2.5,2,'#c8a050');ovale2(x+2,123,1.5,1,'#2a4a6a');rh(x+1.5,122.5,.5,.5,'#ffe0a0');ovale2(x+10,118,1,1,'#c06050');ovale2(x+10,128,1,1,'#c06050')}
 for(let k=0;k<320;k+=2)rh(k,137,.5,1.5,'#d8c8a0');
 // tableau : cadre doré mouluré, bol de riz fumant
 ctx.globalAlpha=.25;rh(110,20,70,48,'#000');ctx.globalAlpha=1;
 panneau2(106,14,72,52,'#a87e28','#ffe090','#5a3a10');panneau2(109,17,66,46,'#d8b04a','#fff0a0','#8a6418');rh(111,19,62,42,'#b88a30');
 bandes2(114,22,56,36,['#1c3644','#22404e','#284858','#2e5262']);
 ovale2(142,46,20,5,'#e8e0d0');ovale2(142,45,18,4,'#f6f0e4');
 rh(122,40,40,4,'#c8843a');rh(122,40,40,.5,'#e8a860');ovale2(142,40,16,2,'#f6e9b0');
 for(let i=0;i<14;i++)ovale2(129+i*2,39-(i%3)*.5,1,.5,'#fffbe8');
 rh(130,38,2,1,'#3aa04a');rh(145,38,2,1,'#3aa04a');rh(152,39,2,1,'#3aa04a');rh(140,38,3,1,'#e06a50');rh(140,38,3,.5,'#ff9a80');
 rh(126,46,32,.5,'rgba(0,0,0,.15)');rh(130,50,24,3,'#d0c8b8');
 panneau2(156,28,1.5,14,'#7a4a20','#a87040','#4a2a10');panneau2(159.5,27,1.5,15,'#7a4a20','#a87040','#4a2a10');
 for(let k=0;k<3;k++){const off=((t/10|0)+k*3)%6;ctx.globalAlpha=.7-off*.1;rh(132+k*9+(off%2)*.5,26+off,.5,3,'#fff');rh(132.5+k*9-(off%2)*.5,24+off,.5,2,'#fff');ctx.globalAlpha=1}
 panneau2(132,64,20,3,'#a87e28','#ffe090','#5a3a10');rh(141,66,2,2,'#5a3a10');
 // portes
 door2(15,38);door2(231,38);
 // escalier
 ombre2(294,104,28);
 bandes2(268,30,52,74,['#2a1c14','#3a2a20','#33241a']);
 for(let i=0;i<6;i++){const y=58+i*8,x=270+i*8,w=50-i*8;panneau2(x,y,w,4,'#7a5a3a','#b08a5e','#3a2618');rh(x,y+4,w,4,'#4a3424');rh(x,y+4,w,.5,'#2a1a10')}
 panneau2(268,30,3,74,'#5a3a20','#8a6040','#2a1810');panneau2(270,39,50,2.5,'#a07a50','#e0b880','#5a3a20');
 for(let i=0;i<5;i++){const x=276+i*10,h=24+i*6;rh(x,42,2,h,'#a07a50');rh(x,42,.5,h,'#e0b880');rh(x+1.5,42,.5,h,'#5a3a20');ovale2(x+1,42+h-1,1.5,1,'#8a6440')}
 ovale2(271,39.5,2.5,2.5,'#c89a5a');rh(270,38,1,1,'#ffe0a0');
 // plante en pot
 ombre2(76,104,9);
 const feuille=(x,y,h,lean,c,c2)=>{for(let k=0;k<h;k+=.5){const xx=x+lean*k*k/h/4;rh(xx,y-k,1.5,.5,k<h*.5?c:c2);if(k%3<.5)rh(xx-1,y-k,.5,.5,c2)}};
 feuille(72,86,12,-3,'#2e7a34','#4aa050');feuille(76,86,16,1,'#3a8a40','#5ab85a');feuille(80,86,10,4,'#2e7a34','#4aa050');feuille(74,86,8,-6,'#3a8a40','#5ab85a');
 rh(70,86,12,14,'#b86a40');rh(70,86,12,2,'#d48a5a');rh(70,86,.5,14,'#e0a070');rh(81.5,88,.5,12,'#7a3a20');rh(71,99.5,10,.5,'#5a2a14');rh(71,87.5,10,.5,'#3a2010');
 // litière
 ombre2(102,106,16);
 panneau2(88,94,28,12,'#4a6ab0','#7a9ae0','#2a4a80');bandes2(90,92,24,4,['#6a8ad8','#5a7ac8']);rh(91,93,22,2,'#d8ccb0');for(let k=91;k<113;k+=2)rh(k+(k%4?0:.5),93.5,.5,.5,'#b8a888');
 rh(90,92,24,.5,'#a8c0f0');
 if(!S.f.litter){ovale2(98,92.5,2,1.5,'#6a4020');ovale2(98,90.5,1.2,1,'#7a4a28');rh(97.5,89.5,.5,.5,'#9a6a40');ovale2(106.5,93,1.5,1,'#6a4020');
  ctx.globalAlpha=.6;if((t>>4)%2){rh(98,86,.5,2,'#78963c');rh(98.5,84,.5,2,'#78963c')}else{rh(101,85,.5,2,'#78963c');rh(100.5,83,.5,2,'#78963c')}ctx.globalAlpha=1}
 if(S.f.cheeseIn&&!S.f.litter){rh(108,90,5,3,'#f2c832');rh(108,90,5,.5,'#fff080');rh(109.5,91,1,1,'#c89a10');rh(111,92,.5,.5,'#c89a10')}
 if(cMouse.on)mouseHD(cMouse.x,26,(t>>3)%2);
 // socle de marbre et buste
 ombre2(204,105,14);
 panneau2(191,73,26,4,'#e8e0d0','#ffffff','#a8a090');bandes2(195,77,18,23,['#d8d0c0','#c8c0b0','#b8b0a0']);rh(195,77,.5,23,'#f0e8d8');rh(212.5,77,.5,23,'#9a9282');
 for(let k=0;k<3;k++)rh(197+k*5,80+k*6,3,.5,'rgba(120,110,100,.4)');panneau2(191,100,26,4,'#e8e0d0','#ffffff','#a8a090');
 if(!S.f.bust){const B={g:'#6a5a40',G:'#4a3e2a',d:'#3a3020',m:'#8a7a58',k:'#1e180e'};
   drawMap(["....mmmmmm....","...mgggggGm...","..mgggggggGm..","..ggkgggkggG..","..gggggggggG..","..ggggdddggG..","..gdgggggdgG..","...ggkkkkgG...","....gggggG....","..mgggggggggm.",".mggggggggggGm"],B,193,56.5,1.6,false);
   rh(197,63,2,1,'#2a2014');rh(207,71,1,2,'#2a2014');rh(202,57,1,1,'#2a2014');rh(197,58,4,.5,'#a89a78');rh(195,72,3,.5,'#a89a78')}
 else{const top=(S.f.dressed?MAG_DRESS_TOP:MAG_TOP).slice(0,14);drawMap(top,MPAL,194,50.5,1.7,false);
   if((t>>5)%4===0){rh(198,52,1,1,'#fff');rh(213,60,2,2,'#fff')}}
 glow(142,40,90,'rgba(255,230,170,0.10)');
}
