/* Salon / cuisine : décor et objets */
function drawSalon(){
 if(HD)return drawSalon2();
 // murs
 r(0,0,320,104,'#e8dcc8');r(0,0,124,104,'#d8e4e0');for(let x=0;x<124;x+=8)for(let y=60;y<78;y+=6)r(x,y,8,1,'#c0d0cc');
 r(0,104,320,40,'#b89a74');for(let x=0;x<320;x+=20)r(x,104,1,40,'#a08460');r(0,104,320,2,'#8a6e50');
 // escalier (gauche)
 r(0,28,26,76,'#5a4030');for(let i=0;i<6;i++)r(0,34+i*11,26-i*3,3,'#8a6a48');r(24,28,2,76,'#3a2818');
 // placards
 r(30,14,90,26,'#f4f4f0');r(74,14,1,26,'#ccc');r(70,26,2,4,'#999');r(77,26,2,4,'#999');
 // bar
 r(30,78,94,4,'#7a5a40');r(32,82,90,26,'#9a7a5a');r(32,82,90,2,'#6a4a30');
 // machine à café
 r(36,56,16,22,'#2a2a2e');r(38,60,12,6,'#555');r(41,70,6,6,'#111');r(42,72,4,4,S.f.tCafe?'#f4f4f4':'#e8e0d0');r(48,58,2,2,'#ff3030');
 // clémentines
 r(56,72,16,6,'#b07a3a');[[58,69],[63,68],[68,69],[60,66],[66,66]].forEach(([a,b])=>r(a,b,4,4,'#ff8a1a'));r(64,65,2,1,'#3a8a40');
 // fromage + souris
 if(!S.f.cheese){r(84,72,10,6,'#f2c832');r(86,74,2,2,'#d8a820');r(90,73,1,1,'#d8a820')}
 if(!S.f.mouseGone||mouse.flee){const mx=mouse.x,b=(t>>3)%2;if(HD)mouseHD(mx,0,b);else{r(mx-6,73-b,7,4,'#8a8a90');r(mx+1,74-b,3,3,'#9a9aa0');r(mx,72-b,2,2,'#d08a9a');r(mx+3,75-b,1,1,'#111');r(mx-10,76,4,1,'#d08a9a')}}
 if(S.f.catOnBar){const j=barCat.jump;drawCatRows(CAT_W,cpal(),Math.round(barCat.x-14),Math.round(barCat.y-16-j),true)}
 // porte vitrée
 r(128,26,26,78,'#3a2a20');r(131,29,20,75,'#9ad0e8');r(140,29,2,75,'#3a2a20');r(133,34,5,2,'#e8f8ff');r(144,40,4,2,'#e8f8ff');r(136,62,3,4,'#c8a040');r(144,62,3,4,'#c8a040');
 r(131,84,20,20,'#6ab04a');r(131,80,20,4,'#7ac0e0');
 // porte du bureau
 door(161,38);r(165,30,14,5,'#c8a040');
 // porte d'entrée
 r(293,30,27,74,'#2a1c14');r(296,33,24,71,'#3a5a7a');r(299,38,18,22,'#4a6a8a');r(299,66,18,30,'#4a6a8a');r(300,40,16,6,'#bfe0f0');r(298,62,3,3,'#e0c060');r(288,104,32,4,'#8a3a2a');
 ctx.save();ctx.translate(-16,0);
 // fauteuil + coussin + téléphone
 r(206,72,40,10,'#f6f4ee');r(204,80,44,22,'#ffffff');r(204,80,6,24,'#e8e6de');r(242,80,6,24,'#e8e6de');r(208,94,36,10,'#efede6');r(208,104,4,6,'#7a5a40');r(240,104,4,6,'#7a5a40');
 if(!S.f.phone)r(220,88,10,4,'#20202a'),r(221,89,8,2,'#4a6aaa');
 if(!S.f.cushion){r(211,79,30,15,'#7a3a5a');r(212,80,28,13,'#d0507a');r(213,81,26,2,'#f07a9a');r(214,84,2,2,'#9a2a50');r(236,84,2,2,'#9a2a50');r(225,87,2,2,'#9a2a50')}
 ctx.restore();ctx.save();ctx.translate(-22,0);
 // TV
 r(256,96,58,14,'#5a3a28');r(258,98,54,2,'#6a4a36');
 r(262,52,46,32,'#111');r(264,54,42,28,S.f.tvOn?'#7ac8f0':'#1a1a22');r(282,84,6,12,'#222');
 if(S.f.tvOn){r(264,68,42,14,'#4aa040');r(270,62,10,8,'#fff');r(272,64,3,2,'#222');r(276,66,3,2,'#222');r(268,70,2,4,'#fff');r(279,70,2,4,'#fff');
   const fx=290+((t>>4)%2);r(fx,60,4,4,'#f2c4a4');r(fx-1,64,6,8,'#8a5a3a');r(fx-1,58,6,2,'#c8a040');}
 // switch
 r(290,92,16,5,'#333');r(288,92,3,5,'#ff4040');r(305,92,3,5,'#3080ff');
 ctx.restore();
 drawTheme();drawInter();
 if(vitreOpen){r(131,29,20,75,'#2a4a30');r(131,84,20,20,'#4a8a3a')}
 if(!S.f.tMatou&&mt.state!=='gone'){const G={O:'#8a8a94',o:'#5a5a64',W:'#e8e8e8',k:'#1a1a1a',P:'#ff8aa0'};
   if(mt.state==='sleep'){drawCatRows(["....oOOOOo....","..OOoOOoOOOO..",".OoOOOOOOOoOOO",".OOOOOOOOOkOOk","..OOOOOOOOOOO."],G,mt.x-14,mt.y-10,false);
     const z=(t>>5)%3;ctx.fillStyle='#fff';ctx.font='6px monospace';ctx.fillText('z'.repeat(z+1),mt.x+12,mt.y-14-z*2)}
   else{let rows=CAT_W;if(mt.state==='walk'&&(t>>3)%2)rows=CAT_W.map((x,i)=>i===6?"..O.O.O..O.O.O":i===7?"..W.W.W..W.W.W":x);drawCatRows(rows,G,Math.round(mt.x-14),Math.round(mt.y-16),mt.face<0)}}
}

ROOMS.salon={walk:[14,305,116,140],draw:drawSalon,spots:()=>[
  {id:'esc',name:'escalier',r:[0,28,28,76],w:[24,130],exit:()=>go('couloir',285,130),examiner:()=>say('mag',"L'escalier qui remonte.")},
  {id:'bar',name:'bar',r:[30,76,94,32],w:[90,124],examiner:()=>say('mag',"Le bar de ma cuisine américaine. Très américaine.")},
  {id:'cafe',name:'machine à café',r:[34,54,20,26],w:[70,126],
   examiner:()=>say('mag',S.f.tCafe?"Ma machine. Elle m'a sauvé la vie.":"Ma machine à café. Mon carburant."),
   utiliser:()=>takeCoffee(),prendre:()=>takeCoffee()},
  {id:'clem',name:'clémentines',r:[54,64,20,14],w:[64,124],examiner:()=>say('mag',"Une corbeille de clémentines. Vitamine C !"),
   prendre:async()=>{if(S.inv.includes('clems')||S.f.tMatou)return say('mag',"J'en ai assez pris.");addItem('clems');await say('mag',"Trois clémentines. Parfait pour... quelque chose.")}},
  {id:'matou',name:'matou squatteur',vis:()=>!S.f.tMatou&&mt.state!=='gone',r:[mt.x-16,mt.y-16,32,18],w:[mt.x+34,130],
   examiner:()=>say('mag',"Un matou du quartier qui squatte mon salon. Il ronfle, en plus !"),prendre:()=>say('mag',"Il est énorme. Et il a l'air de mordre."),
   utiliser:()=>say('mag',"Il dort comme une souche. Il faudrait l'occuper avec quelque chose d'amusant."),ouvrir:()=>say('mag',"On n'ouvre pas un chat !"),
   with:{clems:()=>jongle(),chat:()=>say('mag',"Shaggy fait semblant de ne pas le voir. Lâche."),fromage:()=>say('mag',"Il n'en veut pas. Difficile, le monsieur.")}},
  {id:'fromage',name:'fromage',vis:()=>!S.f.cheese,r:[82,70,14,9],w:[118,128],examiner:()=>say('mag',S.f.mouseGone?"Mon fromage... grignoté.":"Une souris mange MON fromage !"),
   prendre:async()=>{if(!S.f.mouseGone)return say('mag',"Pas tant que la souris est dessus !");S.f.cheese=true;addItem('fromage');await say('mag',"Je ne vais pas le manger, mais il peut servir.")}},
  {id:'souris',name:'souris',vis:()=>!S.f.mouseGone,r:[70,68,12,10],w:[118,128],examiner:()=>say('mag',"Une souris ! Sur mon bar ! Avec mon fromage !"),prendre:()=>say('mag',"Je ne touche pas ça, merci !"),
   with:{chat:()=>poseCat(),laser:()=>say('mag',"Ça ne l'impressionne pas du tout.")}},
  {id:'shaggyBar',name:'Shaggy',vis:()=>S.f.catOnBar,r:[barCat.x-15,barCat.y-18,30,20],w:[136,124],examiner:()=>catHint(),click:()=>catHint(),utiliser:()=>catHint(),prendre:()=>say('mag',"Non, il a une mission."),
   with:{laser:()=>laserBar()}},
  {id:'vitre',name:'porte vitrée',r:[126,24,30,80],w:[141,122],exit:()=>say('mag',"C'est la porte du jardin, elle est fermée. Je sors par l'entrée."),examiner:()=>say('mag',"La porte vitrée du jardin. Fermée.")},
  {id:'entree',name:"porte d'entrée",r:[290,28,30,78],w:[300,128],exit:()=>leave(),examiner:()=>say('mag',"La porte d'entrée. Le monde du travail m'attend derrière.")},
  {id:'bureau',name:'porte du bureau',r:[158,35,28,70],w:[172,124],exit:()=>say('mag',"Mon bureau ? Pas aujourd'hui, c'est fermé."),examiner:()=>say('mag',"La porte du bureau. Fermée.")},
  {id:'fauteuil',name:'fauteuil',r:[186,70,48,40],w:[210,124],examiner:()=>say('mag',"Mon fauteuil blanc. Le chat n'a pas le droit dessus. En théorie."),utiliser:()=>say('narr',"On n'a pas le temps de s'asseoir !")},
  {id:'telephone',name:'téléphone',vis:()=>S.f.cushion&&!S.f.phone,r:[202,86,14,8],w:[178,130],examiner:()=>say('mag',"MON TÉLÉPHONE ! Il était là !"),
   prendre:async()=>{S.f.phone=true;addItem('telephone');check('tPhone');await say('mag',"Mon téléphone ! 47 notifications. Super.")}},
  {id:'coussin',name:'coussin',vis:()=>!S.f.cushion,r:[194,80,32,16],w:[178,130],examiner:()=>say('mag',"Un coussin. Il a l'air bosselé."),
   prendre:async()=>{S.f.cushion=true;addItem('coussin');await say('mag',"Tiens, il y a quelque chose dessous !")}},
  {id:'inter',name:'interrupteur magique',r:[192,40,14,18],w:[200,124],
   examiner:()=>say('mag',"Un interrupteur qui brille. Il n'allume aucune lampe... mais il change toute la déco !"),
   utiliser:()=>magicSwitch(),ouvrir:()=>magicSwitch(),click:()=>magicSwitch(),prendre:()=>say('mag',"Il est vissé au mur. Et il a l'air de tenir à sa place.")},
  {id:'switch',name:'Switch',r:[264,88,24,10],w:[268,124],examiner:()=>say('mag',"Ma Switch. Ce soir, promis."),prendre:()=>say('mag',"Non, sinon je ne vais jamais au travail."),utiliser:()=>say('narr',"Ce soir. Pas maintenant.")},
  {id:'tv',name:'télé',r:[238,50,50,36],w:[226,132],examiner:()=>S.f.tvOn?say('tv',TVL[S.f.tv++%3]):say('mag',"Ma télé. Éteinte."),
   ouvrir:()=>toggleTV(),utiliser:()=>toggleTV()}
 ]};

/* Interrupteur magique : classique → Halloween → Noël → Nouvel An → Saint-Valentin → classique */
const THEMES=['classique','Halloween','Noël','Nouvel An','Saint-Valentin'];
const THEME_TXT=["Et hop, retour à la déco classique.","Bouh ! Le salon passe en mode Halloween.","Oh, c'est Noël dans le salon !","Bonne année ! Enfin... en avance.","La Saint-Valentin... avec mon chat. Romantique."];
async function magicSwitch(){S.f.theme=((S.f.theme||0)+1)%THEMES.length;SFX.light();[880,1175,1568].forEach((f,i)=>tone(f,.12,{type:'sine',vol:.07,at:.1+i*.09}));
  await say('mag',THEME_TXT[S.f.theme])}
function drawInter(){const on=(S.f.theme||0)>0,g=(t>>4)%2;
  glow(199,49,13+g,on?'rgba(255,230,120,.55)':'rgba(180,140,255,.45)');
  r(193,41,12,16,'#5a3a7a');r(194,42,10,14,'#f4ecff');r(197,44,4,10,'#c8b8e0');r(197,on?44:49,4,5,on?'#ffd23a':'#8a5ad8');
  if(g){r(192,40,1,1,'#fff');r(206,56,1,1,'#fff')}else{r(206,41,1,1,'#fff');r(191,55,1,1,'#fff')}}
function guirl(cols,y){for(let x=4;x<320;x+=8){const yy=y+Math.round(Math.sin(x/16)*2);r(x,yy,8,1,'#2a5a2a');r(x+3,yy+1,2,2,cols[((x>>3)+(t>>4))%cols.length])}}
function coeur(x,y,c){r(x,y,2,1,c);r(x+3,y,2,1,c);r(x,y+1,5,1,c);r(x+1,y+2,3,1,c);r(x+2,y+3,1,1,c)}
function drawTheme(){const th=S.f.theme||0;if(!th)return;
 if(th===1){drawHalloween();return}
 else if(th===2){guirl(['#ff3030','#ffd23a','#3a9aff','#ffffff'],6);
   for(let i=0;i<8;i++){const x=131+(i*7+(t>>2))%20,y=29+(i*13+t/2)%55;r(x,y,1,1,'#fff')}
   r(301,40,12,12,'#2a7a3a');r(304,43,6,6,'#3a5a7a');r(306,40,2,2,'#ff3030');
   r(60,6,1,14,'#888');[[48,22],[66,26],[90,22]].forEach(([x,y],i)=>{r(x+4,6,1,y-6,'#888');r(x+2,y,5,5,['#ff3030','#ffd23a','#3a9aff'][i])});
   r(36,68,10,10,'#e8e8e8');r(39,66,4,2,'#ff3030');sapin()}
 else if(th===3){ctx.fillStyle='rgba(10,10,50,.3)';ctx.fillRect(0,0,320,104);guirl(['#ffd23a','#f0f0f0'],6);
   ctx.fillStyle='#ffd23a';ctx.font='bold 10px monospace';ctx.fillText('2027',64,36);
   for(let i=0;i<14;i++){const x=(i*37)%320,y=(i*23+t*0.7)%104;r(x,y,2,1,['#ffd23a','#ff4a8a','#3ad0ff','#7dff8a'][i%4])}
   r(104,62,5,16,'#1a4a2a');r(105,58,3,4,'#1a4a2a');r(105,56,3,2,'#ffd23a');r(112,70,3,8,'#e8f4ff');r(111,68,5,2,'#ffd23a')}
 else if(th===4){ctx.fillStyle='rgba(255,110,170,.14)';ctx.fillRect(0,0,320,104);
   for(let x=10;x<320;x+=22)coeur(x,6+((x/22|0)%2)*3,'#ff3a7a');
   for(let i=0;i<5;i++){const x=(i*67+20)%300,y=100-((t*0.5+i*30)%95);coeur(x,y,'#ff7aaa')}
   r(104,66,2,12,'#2a8a3a');r(102,62,6,5,'#d0103a');r(103,61,4,1,'#ff3a6a')}
}

function drawHalloween(){
 // tout plus sombre, papier peint lugubre
 ctx.fillStyle='rgba(8,0,12,.74)';ctx.fillRect(0,0,320,104);ctx.fillStyle='rgba(8,0,12,.6)';ctx.fillRect(0,104,320,40);
 for(let x=28;x<320;x+=12)r(x,0,1,104,'rgba(70,0,30,.5)');
 // formes qui sortent des murs : visages et mains en relief
 [[86,46],[160,10],[232,20],[276,14],[12,8]].forEach(([x,y],i)=>{const b=Math.sin(t/30+i)*1.5|0;
   r(x-1,y-1+b,12,14,'#2a1830');r(x,y+b,10,12,'#5a4a5e');r(x+1,y+1+b,8,2,'#7a6a7e');r(x+2,y+4+b,2,3,'#000');r(x+6,y+4+b,2,3,'#000');r(x+3,y+9+b,4,2,'#000')});
 [[124,40],[60,50],[304,18]].forEach(([x,y],i)=>{const e=(t/25+i)%8<4?1:0;r(x,y+e,6,3,'#5a4a5e');for(let k=0;k<4;k++)r(x+k*2-1,y-3+e,1,3,'#5a4a5e');r(x+1,y+3+e,4,4,'#4a3a4e')});
 // sang qui coule
 for(let i=0;i<10;i++){const x=8+i*31,L=8+((t/3+i*17)%40);r(x,0,3,4,'#7a0010');r(x+1,4,1,L,'#a00818');r(x,4+L,3,2,'#c01020')}
 r(100,72,9,6,'#ff7a10');r(101,71,7,1,'#ff7a10');r(104,69,1,2,'#3a8a40');r(102,73,2,1,'#ffe060');r(105,73,2,1,'#ffe060');r(102,75,5,1,'#ffe060');
 for(let i=0;i<4;i++){const x=(t*0.6+i*90)%340-10,y=12+i*8+Math.sin(t/8+i)*3,w=(t>>3)%2;r(x,y,3,2,'#000');r(x-3,y-w,3,1,'#000');r(x+3,y-w,3,1,'#000')}
 for(let i=0;i<6;i++)r(i*3,0,1,14-i*2,'#bbb');for(let i=0;i<5;i++)r(0,i*3,14-i*2,1,'#bbb');
 monstre()}
// monstre hideux qui trône sur le fauteuil
function monstre(){const x=186,y=50,bl=(t>>5)%9===0,ba=Math.sin(t/14)*1|0;
 glow(x+18,y+26,34,'rgba(120,255,80,.18)');
 r(x+2,y+30,32,26,'#2e5a22');r(x+0,y+36,6,18,'#24481a');r(x+30,y+36,6,18,'#24481a');
 for(let k=0;k<3;k++){r(x-1+k*2,y+54,1,3,'#e8e0c0');r(x+31+k*2,y+54,1,3,'#e8e0c0')}
 r(x+6,y+8+ba,24,24,'#3e7a2c');r(x+4,y+12+ba,28,16,'#3e7a2c');
 r(x+5,y+2+ba,3,8,'#d8d0b0');r(x+4,y+0+ba,2,3,'#d8d0b0');r(x+28,y+2+ba,3,8,'#d8d0b0');r(x+30,y+0+ba,2,3,'#d8d0b0');
 [[10,14],[24,22],[12,26]].forEach(([a,b])=>r(x+a,y+b+ba,3,2,'#5a9a3a'));
 r(x+12,y+12+ba,12,9,'#f0f0d0');if(!bl){r(x+15,y+14+ba,6,5,'#d01010');r(x+17,y+15+ba,2,3,'#000')}else r(x+12,y+16+ba,12,1,'#1e3a14');
 r(x+9,y+24+ba,18,6,'#1a0a0a');for(let k=0;k<5;k++){r(x+10+k*4,y+24+ba,2,2,'#f0f0d0');r(x+12+k*3,y+28+ba,1,2,'#f0f0d0')}
 r(x+14,y+30+ba,2,3+((t>>3)%3),'#7ac850');
 r(x+4,y+56,28,3,'#d8a020');r(x+6,y+53,4,3,'#d8a020');r(x+16,y+52,4,4,'#d8a020');r(x+26,y+53,4,3,'#d8a020');r(x+17,y+53,2,2,'#e02040')}
// sapin et cadeaux (thème Noël)
function sapin(){const x=258,y=56;
 r(x+13,y+76,6,8,'#5a3a20');
 for(let i=0;i<5;i++){const w=8+i*6;r(x+16-w/2,y+8+i*14,w,15,i%2?'#1e6a2e':'#247a36')}
 r(x+14,y+2,4,4,'#ffd23a');r(x+15,y,2,8,'#ffd23a');r(x+12,y+3,8,2,'#ffd23a');
 const C=['#ff3030','#ffd23a','#3a9aff','#ffffff','#ff7ad0'];
 for(let i=0;i<14;i++){const a=(i*37)%28,b=12+((i*23)%62),w=4+Math.floor(b/14)*6;if(Math.abs(a-14)<w/2)r(x+2+a,y+b,2,2,C[(i+(t>>4))%C.length])}
 [[x-8,y+76,14,10,'#d01828','#ffd23a'],[x+8,y+80,12,8,'#2a6ad8','#f6f6f6'],[x+22,y+74,12,12,'#2a9a4a','#ff3030'],[x+34,y+80,8,8,'#ffd23a','#d01828']].forEach(([a,b,w,h,c,k])=>{
   r(a,b,w,h,c);r(a+w/2-1,b,2,h,k);r(a,b+h/2-1,w,2,k);r(a+w/2-3,b-2,2,2,k);r(a+w/2+1,b-2,2,2,k)})}

/* ---------- V2 : salon entièrement redessiné à la main ---------- */
function drawSalon2(){
 // murs : crème à droite, cuisine vert d'eau carrelée à gauche
 bandes2(0,0,320,104,['#ddd0ba','#e4d8c2','#e8dcc8','#ece1ce']);
 bandes2(0,0,124,104,['#c8d8d4','#d0dedb','#d8e4e0','#dce8e4']);
 for(let x=0;x<124;x+=8)for(let y=60;y<78;y+=6){rh(x,y,8,.5,'#a8bcb8');rh(x,y,.5,6,'#a8bcb8');rh(x+.5,y+.5,7,.5,'#f0f8f6')}
 rh(123.5,0,1,104,'rgba(0,0,0,.12)');rh(0,0,320,2,'rgba(0,0,0,.1)');
 for(let x=130;x<320;x+=40)rh(x,0,.5,100,'rgba(255,255,255,.18)');
 panneau2(124,100,196,4,'#f4ece0','#ffffff','#a8987e');
 // parquet en point de Hongrie simplifié
 bandes2(0,104,320,40,['#a88a64','#b4966e','#bc9e76','#c4a67e']);
 for(let x=0;x<320;x+=20){rh(x,104,.5,40,'#8a6e50');rh(x+.5,104,.5,40,'rgba(255,240,210,.25)');for(let y=104+(x/20%2)*6;y<144;y+=12)rh(x,y,20,.5,'#9a7c58')}
 panneau2(0,104,320,2,'#8a6e50','#a8885e','#5a4430');
 ctx.globalAlpha=.12;for(let k=0;k<12;k++)rh(128+k*.6,106+k*3,26,3,'#fffbe0');ctx.globalAlpha=1;
 // escalier
 bandes2(0,28,26,76,['#4a3424','#5a4030','#4e3628']);
 for(let i=0;i<6;i++){const w=26-i*3;panneau2(0,34+i*11,w,3,'#8a6a48','#b89470','#4a3424');rh(0,37+i*11,w,1,'#3a2818')}
 panneau2(24,28,2,76,'#3a2818','#6a4a30','#1a0e08');
 // placards hauts
 rh(28,40,94,1.5,'rgba(0,0,0,.18)');
 panneau2(30,14,90,26,'#f4f4f0','#ffffff','#b8b8b0');panneau2(32,16,41,22,'#eeeee8','#ffffff','#c8c8c0');panneau2(76,16,42,22,'#eeeee8','#ffffff','#c8c8c0');
 rh(74,14,1,26,'#b8b8b0');rh(70,26,2,4,'#8a8a90');rh(70,26,.5,4,'#e0e0e4');rh(77,26,2,4,'#8a8a90');rh(77,26,.5,4,'#e0e0e4');
 // bar
 ombre2(77,110,48);
 panneau2(28,77,98,5,'#7a5a40','#b08460','#3a2818');
 bandes2(32,82,90,26,['#9a7a5a','#8e6e4e','#826444']);rh(32,82,90,2,'#5a3e28');
 for(let x=36;x<122;x+=14){panneau2(x,87,11,18,'#94744f','#b8946c','#5e4430')}
 // machine à café
 ombre2(44,78,9);
 panneau2(36,56,16,22,'#2a2a2e','#5a5a62','#0e0e10');bandes2(38,60,12,6,['#6a6a72','#4a4a52']);rh(38,60,12,.5,'#9a9aa4');
 rh(41,70,6,6,'#111');rh(42,72,4,4,S.f.tCafe?'#f4f4f4':'#e8e0d0');rh(42,72,1,4,'#fff');rh(44,66,.5,2,'#888');
 ovale2(49,59,1.2,1.2,'#ff3030');rh(48.5,58.5,.5,.5,'#ffc0c0');rh(36,56,16,.5,'#7a7a82');
 // corbeille de clémentines
 ovale2(64,75,9,3,'#8a5a2a');panneau2(56,72,16,6,'#b07a3a','#d89a5a','#6a4420');for(let k=57;k<72;k+=2)rh(k,73,.5,4,'#8a5a2a');
 [[60,71],[65,70],[70,71],[62,68],[68,68]].forEach(([a,b])=>{ovale2(a,b,2.2,2.2,'#ff8a1a');ovale2(a-.5,b-.5,1,1,'#ffb860');rh(a+1,b+1,.5,.5,'#c85a00')});
 rh(64.5,65.5,2,1,'#3a8a40');rh(65,65,1,.5,'#5ab85a');
 // fromage
 if(!S.f.cheese){rh(84,72,10,6,'#f2c832');rh(84,72,10,.5,'#fff080');rh(93.5,72,.5,6,'#c89a10');ovale2(87,75,1,1,'#d8a820');ovale2(91,73.5,.6,.6,'#d8a820')}
 if(!S.f.mouseGone||mouse.flee)mouseHD(mouse.x,0,(t>>3)%2);
 if(S.f.catOnBar){const j=barCat.jump;drawCatRows(CAT_W,cpal(),Math.round(barCat.x-14),Math.round(barCat.y-16-j),true)}
 // porte vitrée sur le jardin
 panneau2(127,25,28,79,'#3a2a20','#6a4a30','#1a0e08');
 bandes2(131,29,20,51,['#7ab8d8','#8ac4e0','#9ad0e8','#a8d8ec']);
 ovale2(138,74,6,4,'#5a9a3a');ovale2(147,76,5,3,'#4a8a30');bandes2(131,80,20,4,['#7ac0e0','#6ab04a']);bandes2(131,84,20,20,['#6ab04a','#5aa03a','#4a8a30']);
 for(let k=132;k<151;k+=2)rh(k,84+(k%3),.5,1.5,'#8ad06a');
 rh(140,29,2,75,'#3a2a20');rh(140,29,.5,75,'#6a4a30');rh(131,56,20,1.5,'#3a2a20');
 ctx.globalAlpha=.6;rh(133,34,5,.5,'#fff');rh(134,35,3,.5,'#fff');rh(144,40,4,.5,'#fff');rh(145,41,2,.5,'#fff');ctx.globalAlpha=1;
 panneau2(136,62,3,4,'#c8a040','#ffe090','#8a6418');panneau2(144,62,3,4,'#c8a040','#ffe090','#8a6418');
 if(vitreOpen){bandes2(131,29,20,75,['#1e3a24','#2a4a30','#22402a']);rh(131,84,20,20,'#4a8a3a')}
 // porte du bureau
 door2(161,38);panneau2(165,30,14,5,'#c8a040','#ffe090','#8a6418');rh(168,32,8,.5,'#5a3a10');
 // porte d'entrée
 panneau2(293,30,27,74,'#2a1c14','#5a3a24','#0e0806');bandes2(296,33,24,71,['#3a5a7a','#345272','#2e4a68']);
 panneau2(299,38,18,22,'#4a6a8a','#7a9aba','#22384e');panneau2(299,66,18,30,'#4a6a8a','#7a9aba','#22384e');
 bandes2(300,40,16,6,['#d8f0ff','#bfe0f0','#a8d0e4']);ovale2(299.5,63.5,1.5,1.5,'#e0c060');rh(299,63,.5,.5,'#fff8c0');
 panneau2(286,104,34,4,'#8a3a2a','#b85a48','#4a1a10');for(let k=288;k<320;k+=3)rh(k,108,.5,1,'#6a2a1a');
 ctx.save();ctx.translate(-16,0);
 // fauteuil, coussin et téléphone
 ombre2(226,111,26);
 ovale2(226,74,20,4,'#f6f4ee');bandes2(206,72,40,10,['#ffffff','#f4f2ea','#e8e6de']);
 bandes2(204,80,44,22,['#ffffff','#f6f4ee','#ebe8e0']);
 panneau2(203,79,7,25,'#f0eee6','#ffffff','#c8c6be');panneau2(242,79,7,25,'#f0eee6','#ffffff','#c8c6be');ovale2(206.5,79.5,3.5,1.5,'#ffffff');ovale2(245.5,79.5,3.5,1.5,'#ffffff');
 panneau2(208,94,36,10,'#efede6','#ffffff','#c8c6be');rh(226,94,.5,10,'#d8d6ce');
 panneau2(208,104,4,6,'#7a5a40','#a88060','#3a2818');panneau2(240,104,4,6,'#7a5a40','#a88060','#3a2818');
 if(!S.f.phone){rh(220,88,10,4,'#20202a');rh(221,89,8,2,'#4a6aaa');rh(221,89,3,.5,'#9ab8ff');rh(220,91.5,10,.5,'#0a0a10')}
 if(!S.f.cushion){ovale2(226,86.5,15,7.5,'#7a3a5a');ovale2(226,86,14,6.5,'#d0507a');ovale2(224,83.5,10,2.5,'#f07a9a');rh(219,82,6,.5,'#ffb0c4');
   [[215,85],[237,85],[226,88]].forEach(([a,b])=>{ovale2(a,b,1,1,'#9a2a50');rh(a-.5,b-.5,.5,.5,'#f07a9a')})}
 ctx.restore();ctx.save();ctx.translate(-22,0);
 // meuble TV et télévision
 ombre2(285,111,30);
 panneau2(256,96,58,14,'#5a3a28','#8a5e40','#2a1810');panneau2(259,99,25,8,'#4e3222','#7a5236','#2a1810');panneau2(286,99,25,8,'#4e3222','#7a5236','#2a1810');
 panneau2(281,84,8,12,'#222','#4a4a50','#0a0a0c');ovale2(285,95,8,1.5,'#2a2a2e');
 panneau2(261,51,48,34,'#111114','#3a3a42','#000');
 if(S.f.tvOn){bandes2(264,54,42,14,['#6ab8e8','#7ac8f0','#8ad4f4']);bandes2(264,68,42,14,['#5ab04a','#4aa040','#3a9030']);
   ovale2(275,66,5,4,'#fff');rh(272,64,3,2,'#222');rh(276,66,3,2,'#222');rh(268,70,2,4,'#fff');rh(279,70,2,4,'#fff');
   const fx=290+((t>>4)%2);rh(fx,60,4,4,'#f2c4a4');rh(fx-1,64,6,8,'#8a5a3a');rh(fx-1,58,6,2,'#c8a040');
   ctx.globalAlpha=.12;for(let y=54;y<82;y+=1)rh(264,y,42,.5,'#000');ctx.globalAlpha=1}
 else{bandes2(264,54,42,28,['#22222c','#1a1a22','#141418']);ctx.globalAlpha=.35;for(let k=0;k<10;k++)rh(268+k,56+k*1.5,6,.5,'#8a8aa0');ctx.globalAlpha=1}
 ovale2(306,82,.8,.8,S.f.tvOn?'#40ff60':'#ff3030');
 // console
 rh(290,92,16,5,'#333');rh(290,92,16,.5,'#5a5a62');rh(288,92,3,5,'#ff4040');rh(288,92,3,.5,'#ff9090');rh(305,92,3,5,'#3080ff');rh(305,92,3,.5,'#90c0ff');
 ovale2(295,94.5,1,1,'#111');ovale2(300,94,.6,.6,'#111');
 ctx.restore();
 drawTheme();drawInter();
 if(!S.f.tMatou&&mt.state!=='gone'){const G={O:'#8a8a94',o:'#5a5a64',W:'#e8e8e8',k:'#1a1a1a',P:'#ff8aa0'};
   if(mt.state==='sleep'){drawCatRows(["....oOOOOo....","..OOoOOoOOOO..",".OoOOOOOOOoOOO",".OOOOOOOOOkOOk","..OOOOOOOOOOO."],G,mt.x-14,mt.y-10,false);
     const z=(t>>5)%3;ctx.fillStyle='#fff';ctx.font='6px monospace';ctx.fillText('z'.repeat(z+1),mt.x+12,mt.y-14-z*2)}
   else{let rows=CAT_W;if(mt.state==='walk'&&(t>>3)%2)rows=CAT_W.map((x,i)=>i===6?"..O.O.O..O.O.O":i===7?"..W.W.W..W.W.W":x);drawCatRows(rows,G,Math.round(mt.x-14),Math.round(mt.y-16),mt.face<0)}}
}
