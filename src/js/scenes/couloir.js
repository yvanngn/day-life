/* Couloir : décor et objets */
function drawCouloir(){
 r(0,0,320,104,'#c9b48a');for(let x=0;x<320;x+=24)r(x,0,1,68,'#bca67c');
 r(0,68,320,3,'#6a4a30');r(0,71,320,33,'#8a6a48');for(let x=6;x<320;x+=30)r(x,76,22,22,'#7c5e40');
 r(0,104,320,40,'#6a3030');r(0,110,320,28,'#9a4a40');r(0,112,320,1,'#e0b060');r(0,135,320,1,'#e0b060');for(let x=4;x<320;x+=16)r(x,122,4,2,'#e0b060');
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
 if(cMouse.on){const mx=cMouse.x,b=(t>>3)%2;r(mx-6,99-b,7,4,'#8a8a90');r(mx+1,100-b,3,3,'#9a9aa0');r(mx,98-b,2,2,'#d08a9a');r(mx+3,101-b,1,1,'#111');r(mx-10,102,4,1,'#d08a9a')}
 // socle + buste
 r(192,74,24,4,'#d8d0c0');r(195,78,18,26,'#c8c0b0');r(192,100,24,4,'#d8d0c0');
 if(!S.f.bust){const B={g:'#6a5a40',G:'#4a3e2a',d:'#3a3020',m:'#7a6a4a',k:'#1e180e'};
   drawMap(["....mmmmmm....","...mgggggGm...","..mgggggggGm..","..ggkgggkggG..","..gggggggggG..","..ggggdddggG..","..gdgggggdgG..","...ggkkkkgG...","....gggggG....","..mgggggggggm.",".mggggggggggGm"],B,193,51,1.6,false);
   r(197,58,2,1,'#2a2014');r(207,66,1,2,'#2a2014');r(202,52,1,1,'#2a2014')}
 else{const top=(S.f.dressed?MAG_DRESS_TOP:MAG_TOP).slice(0,14);drawMap(top,MPAL,194,49,1.7,false);
   if((t>>5)%4===0){r(198,50,1,1,'#fff');r(213,58,2,2,'#fff')}}
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
