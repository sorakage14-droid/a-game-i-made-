import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

document.body.style.cssText = "margin:0;overflow:hidden;background:#8bd8e8;font-family:Arial;touch-action:none";

const css = document.createElement("style");
css.textContent = `
#hud{position:fixed;inset:0;pointer-events:none;color:white;text-shadow:0 2px 4px #222}
#title{position:absolute;top:15px;left:15px;font-size:22px;font-weight:bold}
#objective{position:absolute;top:52px;left:15px;background:#17384dcc;padding:10px;border-radius:12px;font-size:13px}
#pad{position:absolute;bottom:22px;left:18px;width:140px;height:140px;pointer-events:auto}
.key{position:absolute;width:44px;height:44px;border:0;border-radius:12px;background:#17384dcc;color:white;font-size:22px}
#up{left:48px;top:0}#down{left:48px;bottom:0}#left{left:0;top:48px}#right{right:0;top:48px}
#talk{position:absolute;right:20px;bottom:30px;width:75px;height:75px;border:0;border-radius:50%;background:#ff83b7;font-weight:bold;pointer-events:auto}
#dialog{display:none;position:absolute;bottom:120px;left:5%;width:82%;background:#17384dee;padding:15px;border-radius:15px}
#start{position:fixed;inset:0;background:#17384dbb;display:grid;place-items:center;z-index:5}
#start section{background:#17384d;padding:25px;border-radius:20px;text-align:center;color:white;width:80%}
#start button{background:#ff83b7;border:0;border-radius:30px;padding:14px 25px;font-weight:bold}
`;
document.head.appendChild(css);

document.body.innerHTML += `
<div id="hud">
<div id="title">WOMEN'S ISLAND</div>
<div id="objective">Explore the island!</div>
<div id="pad">
<button class="key" id="up">▲</button>
<button class="key" id="down">▼</button>
<button class="key" id="left">◀</button>
<button class="key" id="right">▶</button>
</div>
<button id="talk">TALK</button>
<div id="dialog"></div>
</div>
<div id="start"><section>
<h1>Women's Island</h1>
<p>Explore a tropical island, meet its residents and discover their stories!</p>
<button id="begin">START ADVENTURE</button>
</section></div>
`;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8bd8e8);
scene.fog = new THREE.Fog(0x8bd8e8,30,90);

const camera = new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,150);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.cssText="position:fixed;inset:0;z-index:-1";

scene.add(new THREE.HemisphereLight(0xffffff,0x56704a,2));
const sun=new THREE.DirectionalLight(0xffffff,2);
sun.position.set(-8,15,8);
scene.add(sun);

function material(color){
 return new THREE.MeshStandardMaterial({color});
}

const water=new THREE.Mesh(
 new THREE.PlaneGeometry(200,200),
 material(0x36aeca)
);
water.rotation.x=-Math.PI/2;
water.position.y=-.5;
scene.add(water);

const island=new THREE.Mesh(
 new THREE.CylinderGeometry(13,14,1,48),
 material(0xf2d49a)
);
island.position.y=0;
scene.add(island);

const grass=new THREE.Mesh(
 new THREE.CylinderGeometry(11.6,12.3,.35,48),
 material(0x65b96c)
);
grass.position.y=.65;
scene.add(grass);

function tree(x,z){
 const trunk=new THREE.Mesh(
  new THREE.CylinderGeometry(.15,.22,2,7),
  material(0x8b5735)
 );
 trunk.position.set(x,1.6,z);
 scene.add(trunk);

 for(let i=0;i<6;i++){
  const leaf=new THREE.Mesh(
   new THREE.ConeGeometry(.45,2.4,5),
   material(0x239b70)
  );
  leaf.position.set(
   x+Math.cos(i*Math.PI/3)*.6,
   2.7,
   z+Math.sin(i*Math.PI/3)*.6
  );
  leaf.rotation.z=Math.cos(i*Math.PI/3)*.8;
  leaf.rotation.x=Math.sin(i*Math.PI/3)*.8;
  scene.add(leaf);
 }
}

[[-8,-5],[-9,3],[8,-6],[9,3],[-3,9],[4,9]].forEach(p=>tree(...p));

function house(x,z,color){
 const building=new THREE.Mesh(
  new THREE.BoxGeometry(2.5,1.5,2),
  material(color)
 );
 building.position.set(x,1.5,z);
 scene.add(building);

 const roof=new THREE.Mesh(
  new THREE.ConeGeometry(1.9,1.2,4),
  material(0x9b5260)
 );
 roof.position.set(x,2.8,z);
 roof.rotation.y=Math.PI/4;
 scene.add(roof);
}

house(-5,-1,0xffd1a8);
house(5,1,0xb9d9ff);
house(0,6,0xffc3d8);

function character(x,z,bodyColor,hairColor,name,lines){
 const group=new THREE.Group();
 group.position.set(x,0,z);
 scene.add(group);

 const body=new THREE.Mesh(
  new THREE.CapsuleGeometry(.38,.75,4,8),
  material(bodyColor)
 );
 body.position.y=1.05;
 group.add(body);

 const head=new THREE.Mesh(
  new THREE.SphereGeometry(.36,16,12),
  material(0xffd4bd)
 );
 head.position.y=1.85;
 group.add(head);

 const hair=new THREE.Mesh(
  new THREE.SphereGeometry(.39,14,10),
  material(hairColor)
 );
 hair.position.set(0,2.02,-.06);
 hair.scale.set(1,.8,1);
 group.add(hair);

 return {group,name,lines};
}

const people=[
 character(-3,-3,0xff8db4,0x55336f,"Aiko",[
  "Welcome to our island!",
  "The village is just ahead. Enjoy exploring!"
 ]),
 character(3,-3,0x8fc9ff,0x70452f,"Mika",[
  "The beach is my favourite place!",
  "Have you visited the lighthouse?"
 ]),
 character(-1,4,0xffd36e,0x282b45,"Yuna",[
  "I keep a journal of island stories.",
  "Maybe you can be part of the next chapter!"
 ]),
 character(7,5,0xa8e6a1,0x9b4e5e,"Sakura",[
  "The island has many secrets.",
  "Keep exploring!"
 ])
];

const player=new THREE.Group();
scene.add(player);

const torso=new THREE.Mesh(
 new THREE.CapsuleGeometry(.34,.72,4,8),
 material(0x4b78c8)
);
torso.position.y=1;
player.add(torso);

const face=new THREE.Mesh(
 new THREE.SphereGeometry(.34,16,12),
 material(0xffd5bf)
);
face.position.y=1.78;
player.add(face);

const hair=new THREE.Mesh(
 new THREE.SphereGeometry(.37,14,10),
 material(0x30263d)
);
hair.position.set(0,1.96,-.06);
player.add(hair);

player.position.set(0,0,0);

let keys={forward:false,back:false,left:false,right:false};
let started=false;
let active=null;
let line=0;
let talking=false;

function nearest(){
 let found=null;
 let distance=3.2;

 people.forEach(p=>{
  const d=player.position.distanceTo(p.group.position);
  if(d<distance){
   distance=d;
   found=p;
  }
 });

 return found;
}

function talk(){
 const box=document.getElementById("dialog");
 const objective=document.getElementById("objective");

 if(!started)return;

 if(talking){
  line++;
  if(line>=active.lines.length){
   talking=false;
   box.style.display="none";
   objective.textContent="Explore the island!";
   return;
  }
 }else{
  active=nearest();
  if(!active){
   objective.textContent="Move closer to someone!";
   return;
  }
  talking=true;
  line=0;
 }

 box.style.display="block";
 box.textContent=active.name+": "+active.lines[line];
}

document.getElementById("talk").onclick=talk;

document.getElementById("begin").onclick=()=>{
 started=true;
 document.getElementById("start").style.display="none";
 document.getElementById("objective").textContent="Find someone nearby and tap TALK.";
};

function bind(id,key){
 const button=document.getElementById(id);
 button.addEventListener("pointerdown",e=>{
  e.preventDefault();
  keys[key]=true;
 });
 ["pointerup","pointerleave","pointercancel"].forEach(event=>{
  button.addEventListener(event,e=>{
   e.preventDefault();
   keys[key]=false;
  });
 });
}

bind("up","forward");
bind("down","back");
bind("left","left");
bind("right","right");

let angle=0;
let dragging=false;
let lastX=0;

renderer.domElement.addEventListener("pointerdown",e=>{
 dragging=true;
 lastX=e.clientX;
});

window.addEventListener("pointerup",()=>dragging=false);

window.addEventListener("pointermove",e=>{
 if(dragging){
  angle-=(e.clientX-lastX)*.006;
  lastX=e.clientX;
 }
});

const clock=new THREE.Clock();

function animate(){
 requestAnimationFrame(animate);

 const dt=Math.min(clock.getDelta(),.04);

 if(started&&!talking){
  const movement=new THREE.Vector3(
   (keys.right?1:0)-(keys.left?1:0),
   0,
   (keys.back?1:0)-(keys.forward?1:0)
  );

  if(movement.lengthSq()){
   movement.normalize();
   movement.applyAxisAngle(new THREE.Vector3(0,1,0),angle);
   player.position.addScaledVector(movement,dt*4);
   player.rotation.y=Math.atan2(movement.x,movement.z);
  }
 }

 player.position.x=THREE.MathUtils.clamp(player.position.x,-10,10);
 player.position.z=THREE.MathUtils.clamp(player.position.z,-10,10);

 const target=player.position.clone().add(new THREE.Vector3(0,1,0));
 const behind=new THREE.Vector3(
  Math.sin(angle)*7,
  4.2,
  Math.cos(angle)*7
 );

 camera.position.lerp(target.clone().add(behind),.08);
 camera.lookAt(target);

 water.position.y=-.5+Math.sin(performance.now()*.0007)*.035;

 renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{
 camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 renderer.setSize(innerWidth,innerHeight);
});