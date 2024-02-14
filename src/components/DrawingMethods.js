// if i want to change the animation to always stick to time and have constate propogation speed i need to use C.time=Date.now()
// then calculate time difference and calulate how much R shuld be
// R = R + 6 => (R gets bigger 6 px each 1/60 of a second => V = 0.36 px/ms )
// the R used for the cirlce should be Rayon =  Speed * (Date.now() - C.time)
// this way it willl always be constate speed for all circles as animation will depend on the time the animation started from 
// all of the animations will take 1933.3ms to finish every time 
// speed of propogation can be set for every charcter... LOL probabily not

const CleanLayer = [];
const SurvivorSelected = [];
const SurvivorSelectedBG = [];
const BlackLinesGone = [];
const RedLinesGone = [];
const SurvivorBanned = [];

function importAll(r) {
  return r.keys().map(r);
}

const       cleanlayer = importAll(require.context('../images/layers/cleanlayer', false, /\.(png|jpe?g|svg)$/));
const survivorselected = importAll(require.context('../images/layers/survivorSelected', false, /\.(png|jpe?g|svg)$/));
const survivorselectedBG = importAll(require.context('../images/layers/survivorSelectedBG', false, /\.(png|jpe?g|svg)$/));
const   blacklinesgone = importAll(require.context('../images/layers/blacklinesgone', false, /\.(png|jpe?g|svg)$/));
const     redlinesgone = importAll(require.context('../images/layers/redlinesgone', false, /\.(png|jpe?g|svg)$/));
const   survivorbanned = importAll(require.context('../images/layers/survivorBanned', false, /\.(png|jpe?g|svg)$/));

function makeIdImagesArr(layerX){
  const images = [];
  layerX.forEach(filepath => {
    var img = new Image();
    img.src = filepath
    images.push({id: filepath,img: img});
  });
  return images
}

      CleanLayer.push(...makeIdImagesArr(cleanlayer));
SurvivorSelected.push(...makeIdImagesArr(survivorselected));
SurvivorSelectedBG.push(...makeIdImagesArr(survivorselectedBG));
  BlackLinesGone.push(...makeIdImagesArr(blacklinesgone));
    RedLinesGone.push(...makeIdImagesArr(redlinesgone));
  SurvivorBanned.push(...makeIdImagesArr(survivorbanned));
  

const charctercolisionsmap = {
  "Cowboy":       {"id": "Cowboy",        "x1": 52,  "x2": 96,  "y1": 42,  "y2": 91, "R":5,"RR":5},
  "Coordinator":  {"id": "Coordinator",   "x1": 223, "x2": 269, "y1": 33,  "y2": 89, "R":5,"RR":5},
  "ToyMerchant":  {"id": "ToyMerchant",   "x1": 469, "x2": 513, "y1": 46,  "y2": 104,"R":5,"RR":5},
  "Composer":     {"id": "Composer",      "x1": 622, "x2": 665, "y1": 46,  "y2": 102,"R":5,"RR":5},
  "Aeroplanist":  {"id": "Aeroplanist",   "x1": 51,  "x2": 99,  "y1": 201, "y2": 257,"R":5,"RR":5},
  "Prospector":   {"id": "Prospector",    "x1": 147, "x2": 192, "y1": 201, "y2": 258,"R":5,"RR":5},
  "Antiquarian":  {"id": "Antiquarian",   "x1": 280, "x2": 322, "y1": 201, "y2": 255,"R":5,"RR":5},
  "Embalmer":     {"id": "Embalmer",      "x1": 387, "x2": 430, "y1": 161, "y2": 212,"R":5,"RR":5},
  "Mechanic":     {"id": "Mechanic",      "x1": 550, "x2": 596, "y1": 169, "y2": 225,"R":5,"RR":5},
  "Lawyer":       {"id": "Lawyer",        "x1": 773, "x2": 821, "y1": 219, "y2": 277,"R":5,"RR":5},
  "Acrobat":      {"id": "Acrobat",       "x1": 53,  "x2": 102, "y1": 337, "y2": 398,"R":5,"RR":5},
  "Patient":      {"id": "Patient",       "x1": 169, "x2": 211, "y1": 340, "y2": 393,"R":5,"RR":5},
  "Psychologist": {"id": "Psychologist",  "x1": 280, "x2": 324, "y1": 341, "y2": 393,"R":5,"RR":5},
  "Priestess":    {"id": "Priestess",     "x1": 467, "x2": 512, "y1": 283, "y2": 340,"R":5,"RR":5},
  "Seer":         {"id": "Seer",          "x1": 623, "x2": 669, "y1": 283, "y2": 337,"R":5,"RR":5},
  "Explorer":     {"id": "Explorer",      "x1": 774, "x2": 820, "y1": 332, "y2": 387,"R":5,"RR":5},
  "Wildling":     {"id": "Wildling",      "x1": 41,  "x2": 83,  "y1": 469, "y2": 524,"R":5,"RR":5},
  "Mercenary":    {"id": "Mercenary",     "x1": 170, "x2": 214, "y1": 472, "y2": 521,"R":5,"RR":5},
  "Forward":      {"id": "Forward",       "x1": 278, "x2": 328, "y1": 470, "y2": 521,"R":5,"RR":5},
  "Barmaid":      {"id": "Barmaid",       "x1": 398, "x2": 443, "y1": 469, "y2": 524,"R":5,"RR":5},
  "Entomologist": {"id": "Entomologist",  "x1": 569, "x2": 611, "y1": 472, "y2": 526,"R":5,"RR":5},
  "Dancer":       {"id": "Dancer",        "x1": 702, "x2": 745, "y1": 471, "y2": 524,"R":5,"RR":5},
  "FirstOfficer": {"id": "FirstOfficer",  "x1": 105, "x2": 149, "y1": 592, "y2": 646,"R":5,"RR":5},
  "Gravekeeper":  {"id": "Gravekeeper",   "x1": 279, "x2": 323, "y1": 595, "y2": 649,"R":5,"RR":5},
  "Professor":    {"id": "Professor",     "x1": 398, "x2": 441, "y1": 593, "y2": 645,"R":5,"RR":5},
  "Magician":     {"id": "Magician",      "x1": 572, "x2": 617, "y1": 615, "y2": 667,"R":5,"RR":5},
  "Gardener":     {"id": "Gardener",      "x1": 678, "x2": 723, "y1": 614, "y2": 670,"R":5,"RR":5},
  "Cheerleader":  {"id": "Cheerleader",   "x1": 787, "x2": 825, "y1": 615, "y2": 674,"R":5,"RR":5},

  "LuckyGuy":     {"id": "LuckyGuy ",     "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Doctor":       {"id": "Doctor ",       "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Perfumer":     {"id": "Perfumer ",     "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Painter":      {"id": "Painter ",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Thief":        {"id": "Thief ",        "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Batter":       {"id": "Batter ",       "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "TME":          {"id": "TME ",          "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Postman":      {"id": "Postman ",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Enchantress":  {"id": "Enchantress ",  "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Journalist":   {"id": "Journalist ",   "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Novelist":     {"id": "Novelist ",     "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "LittleGirl":   {"id": "LittleGirl ",   "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "WeepingClown": {"id": "WeepingClown ", "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Prisoner":     {"id": "Prisoner ",     "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
}

export function resetCCM(){
  for (const Charcter in charctercolisionsmap){
    charctercolisionsmap[Charcter].state = 0;
    charctercolisionsmap[Charcter].R  = 5;
    charctercolisionsmap[Charcter].RR = 5;
  }
}

export function GetIdOfColission(event,CCM){
  const X = event.clientX;    
  const Y = event.clientY;
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
      if (X+10 < charcterData.x1 || X-10 > charcterData.x2 || Y+10 < charcterData.y1 || Y-10 > charcterData.y2) { continue }
      console.log("hit on charcter id:",charcterData.id)
      return charcterData.id //C is the array entry (charcter) that was modified after the click event
  }
  console.log("no hit on ANY charcter !!")
  return 0
}
function LinkIdsAndLayers(CCM){
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
    for (const surv of CleanLayer){
        if (surv.id.includes(charcterData.id)) CCM[CharcterId].CleanLayerIMG = surv.img
    }
    for (const surv of SurvivorSelected){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorSelectedIMG = surv.img
    }
    for (const surv of SurvivorSelectedBG){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorSelectedBGIMG = surv.img
    }
    for (const surv of BlackLinesGone){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].BlackLinesGoneIMG = surv.img
    }
    for (const surv of RedLinesGone){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].RedLinesGoneIMG = surv.img
    }
    for (const surv of SurvivorBanned){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorBannedIMG = surv.img
    }

  }
  return CCM// console.log(CCM)
}
export const CCM = LinkIdsAndLayers(charctercolisionsmap);


const PropogationSpeed = {select:10, blacklines:10, redlines:6}

export function Draw_5_Selection_Layer_BG (Drawing_array,context, width, height){
  // const Drawing_array = GlobalList.getSelected()
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData || !charcterData.SurvivorSelectedBGIMG) continue

    const img = charcterData.SurvivorSelectedBGIMG
    if (!img) continue
    if (charcterData.R<=700){
      DrawLayerWithCircleAnimation(charcterData,'R',img,context, width, height)
      charcterData.R = charcterData.R + PropogationSpeed.select
      }else{
      context.drawImage(img, 0, 0, width, height);
      charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_51_Selection_Layer (Drawing_array,context, width, height){
  // const Drawing_array = GlobalList.getSelected()
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData || !charcterData.SurvivorSelectedIMG) continue

    const img = charcterData.SurvivorSelectedIMG
    if (!img) continue
    if (charcterData.R<=700){
    DrawLayerWithCircleAnimation(charcterData,'R',img,context, width, height)
    charcterData.R = charcterData.R + PropogationSpeed.select
    }else{
    context.drawImage(img, 0, 0, width, height);
    charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_6_Clean_Hunter_Layer (Drawing_array,context,width,height){
  // const Drawing_array = GlobalList.getBannedRemoved()
  //console.log("Clean Layer for => ",Drawing_array)
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (charcterData && !!charcterData.CleanLayerIMG ) context.drawImage(charcterData.CleanLayerIMG, 0, 0, width, height);
  }
}
export function Draw_7_Black_Lines_Gone_Layer (Drawing_array,context, width, height){
  // const Drawing_array = GlobalList.getBannedRemoved()
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData  || !charcterData.BlackLinesGoneIMG) continue // else =>

    const img = charcterData.BlackLinesGoneIMG
    if (charcterData.R <= 700){
      DrawLayerWithCircleAnimation(charcterData,'R',img,context,width, height)
      charcterData.R = charcterData.R + PropogationSpeed.blacklines
    }else{
      context.drawImage(img, 0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
      charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_71_Red_Lines_Gone_Layer (Drawing_array,context,width, height){
  // const Drawing_array = GlobalList.getRemoved()
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData  || !charcterData.RedLinesGoneIMG) continue // else =>

    const img = charcterData.RedLinesGoneIMG
    if (charcterData.RR <= 220){
        DrawLayerWithCircleAnimation(charcterData,'RR',img,context,width, height)
        charcterData.RR = charcterData.RR + PropogationSpeed.redlines
    }else{
      context.drawImage(img, 0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
      charcterData.RR = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_8_Banned_Charcters_Layer (Drawing_array,context,width, height){
  // const Drawing_array = GlobalList.getBanned()
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (charcterData && !!charcterData.SurvivorBannedIMG) context.drawImage(charcterData.SurvivorBannedIMG, 0, 0, width, height);
  }
}

function DrawLayerWithCircleAnimation(C,RayonPropertyToUse,img,context,width,height){
  context.save()
  context.beginPath();
  context.arc(C.x1/2+C.x2/2-6,C.y1/2+C.y2/2, C[RayonPropertyToUse], 0, Math.PI * 2);
  context.clip();
  context.drawImage(img, 0, 0, width, height);
  context.restore();
}

export function AnimationNotOver(CCM){
  let restart = false
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
    if (((charcterData.R<706 && charcterData.R!==850 && charcterData.R!==5) || (charcterData.RR<220 && charcterData.RR!==850 && charcterData.RR!==5 ))){
      restart = true
      break;
    }
  }
  return restart
}
