/* ---------- bouton « ? Aide » : deux degrés d'aide ----------
   Pour chaque tâche, des étapes selon l'avancement (la première dont la condition est vraie s'applique).
   1er clic : indice vague (v). Clic suivant sur la même étape : indice précis (p). */
const aDispo=id=>S.inv.includes(id);
const AIDES={
 tShaggy:[
  {si:()=>aDispo('chat'),v:"Shaggy sent le fauve. Une bonne trempette ?",p:"Emmène Shaggy dans la salle de bain et utilise-le sur la baignoire."},
  {si:()=>true,v:"Shaggy traîne dans le couloir, tout crasseux.",p:"Va dans le couloir et prends Shaggy dans tes bras."}],
 tHabit:[
  {si:()=>aDispo('robe'),v:"On ne s'habille pas sans s'être lavée.",p:"Va dans la salle de bain et utilise la baignoire : Magali s'habillera ensuite."},
  {si:()=>S.f.armoire,v:"La robe bleue t'irait bien.",p:"Prends la robe bleue dans l'armoire de la chambre."},
  {si:()=>true,v:"Les vêtements sont rangés quelque part dans la chambre.",p:"Ouvre l'armoire de la chambre."}],
 tCafe:[
  {si:()=>S.f.mouseGone,v:"La voie est libre : la machine t'attend.",p:"Utilise la machine à café du salon."},
  {si:()=>S.f.catOnBar,v:"Shaggy a besoin d'une petite motivation pour chasser.",p:"Utilise le laser sur Shaggy, posé sur le bar."},
  {si:()=>aDispo('chat')&&S.f.catWhite,v:"Une souris squatte le bar... et tu as un chasseur dans les bras.",p:"Utilise Shaggy sur la souris du bar."},
  {si:()=>true,v:"Impossible de prendre un café avec cette souris sur le bar.",p:"Il faut un chasseur propre : lave d'abord Shaggy, puis pose-le près de la souris."}],
 tPhone:[
  {si:()=>S.f.cushion,v:"Il était juste dessous !",p:"Prends le téléphone sur le fauteuil du salon."},
  {si:()=>true,v:"Où l'as-tu laissé hier soir ? Quelque chose de bosselé, au salon...",p:"Prends le coussin du salon."}],
 tCouloir:[
  {si:()=>!S.f.bust&&aDispo('serviette'),v:"Ce buste a besoin d'un coup de propre.",p:"Utilise la serviette sur le buste du couloir."},
  {si:()=>!S.f.bust,v:"Le buste du couloir est sale. Il faut de quoi l'essuyer.",p:"Prends la serviette dans la salle de bain."},
  {si:()=>aDispo('fromage'),v:"Quelqu'un d'autre pourrait faire le sale boulot.",p:"Mets le fromage dans la litière : la souris s'en chargera."},
  {si:()=>true,v:"La litière... une tâche à déléguer à un petit rongeur.",p:"Prends le fromage dans la cuisine, puis utilise-le sur la litière du couloir."}],
 tMatou:[
  {si:()=>aDispo('clems'),v:"Le matou adore le spectacle.",p:"Utilise les clémentines sur le matou : numéro de jonglage !"},
  {si:()=>true,v:"Il faut le distraire. Un petit spectacle, peut-être ?",p:"Prends des clémentines dans la corbeille de la cuisine."}],
 tWork:[{si:()=>true,v:"Tout est prêt : direction le travail !",p:"Sors par la porte d'entrée du salon."}]};
function aideTexte(){const t=TASKS.find(([id])=>!S.f[id]);if(!t)return "Tout est réglé !";
  const L=AIDES[t[0]],k=L.findIndex(e=>e.si()),cle=t[0]+'#'+k;S.f.aide=S.f.aide||{};const n=S.f.aide[cle]||0;S.f.aide[cle]=n+1;save();
  return n?"Indice précis : "+L[k].p:"Indice : "+L[k].v+" (Clique encore sur « ? Aide » pour un indice plus précis.)"}
$('aideBtn').onclick=()=>{if(busy||mode!=='play')return;run(()=>say('narr',aideTexte()))};
