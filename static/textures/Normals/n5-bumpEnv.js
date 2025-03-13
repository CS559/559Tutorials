/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as AutoUI  from "../libs/CS559-Framework/AutoUI.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js"
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let check = new T.TextureLoader().load("../textures/paintBump.png");
let bumps = new T.TextureLoader().load("../textures/dots-bump.png");
bumps.wrapS = T.MirroredRepeatWrapping;
bumps.wrapT = T.MirroredRepeatWrapping;

let spinYspeed = .25;
/**
 * speed is a global variable...
 * 
 * @param {GrObject} obj 
 */
function spinY(obj) {
    obj.stepWorld = function(delta,timeOfDay) {
        obj.objects.forEach(obj => obj.rotateY(spinYspeed*delta/1000*Math.PI));
    };
    return obj;
}

function setYrot(obj,theta) {
    obj.objects.forEach(ob => ob.rotation.y = (theta*Math.PI/180));
}


/**
 * Read in a set of textures from HDRI Heaven, as converted by 
 * https://www.360toolkit.co/convert-spherical-equirectangular-to-cubemap
 * 
 * this uses a specific naming convention, and seems to (usually) swap bottom and front,
 * so I provide to undo this
 * 
 * @param {string} name 
 * @param {string} [ext="png"]
 * @param {boolean} [swapBottomFront=true]
 */
function cubeTextureHelp(name,ext="png", swapBottomFront=true) {
    return new T.CubeTextureLoader().load([
        name + "_Right."  +ext,
        name + "_Left."   +ext,
        name + "_Top."    +ext,
        name + (swapBottomFront ? "_Front."  : "_Bottom.") +ext,
        name + "_Back."   +ext,
        name + (swapBottomFront ? "_Bottom." : "_Front.")  +ext
    ]);
}

// http://localhost:5500/normals/textures/rooituo_Bottom.png
// http://localhost:5500/normals/textures/rooitou_Bottom.png

function test() {
    let mydiv;

    let ct = cubeTextureHelp("../textures/HDRIHeaven/rooituo")

    let box = InputHelpers.makeBoxDiv({width: (mydiv ? 640:820)},mydiv);
    if (!mydiv) {
        InputHelpers.makeBreak();   // sticks a break after the box
    }
    InputHelpers.makeHead("Bump Map Test",box);

    let world = new GrWorld({groundplane: false, width:(mydiv ? 600:800), height: 600, where:box
    });
    world.scene.background = ct;

    let objs = [];
    let dx = -6;

    let shaderMat = new T.MeshStandardMaterial({color:"white",bumpMap:check, side:T.DoubleSide, envMap:ct, metalness:1.0, roughness:0});

    let sph = spinY(new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat}));
    let sqh = spinY(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));
    world.add(sph);
    world.add(sqh);

    function camButton(obj) {
        InputHelpers.makeButton(obj.name).onclick = function() {
            let x = obj.objects[0].position.x;
            let y = obj.objects[0].position.y;

            world.active_camera.position.x = x;
            world.active_camera.position.y = y;
            world.active_camera.position.z = 6;

            //world.active_camera.lookAt( -4.5 + id*3,
            //                           objs[id].objects[0].position.y,
            //                           objs[id].objects[0].position.z);
            world.orbit_controls.target = new T.Vector3(x, y, 0);
        }
    }
    camButton(sph);
    camButton(sqh);
    InputHelpers.makeButton("World Camera").onclick = function() {
        world.active_camera.position.set(2.5,5,10);
        world.orbit_controls.target = new T.Vector3(0, 0, 0);
    }
    
   
    let cb = InputHelpers.makeCheckbox("Spin");
    cb.checked = true;
    cb.onchange = function () {
        spinYspeed = cb.checked ? .25 : 0;
    }

    let cb2 = InputHelpers.makeCheckbox("Bumps");
    cb2.onchange = function() {
        shaderMat.bumpMap = cb2.checked ? bumps : check;
        shaderMat.needsUpdate = true;
    }

    let cb3 = InputHelpers.makeCheckbox("BumpMap");
    cb3.checked = true;
    cb3.onchange = function() {
        if (cb3.checked) 
            cb2.onchange();
        else {
            shaderMat.bumpMap = undefined;
            shaderMat.needsUpdate = true;
        }
    }

    let sl = new InputHelpers.LabelSlider("Y Rot",{min:0,max:180,step:5,where:undefined});
    sl.oninput = function() {
        setYrot(sph,sl.value());
        setYrot(sqh,sl.value());
    }

    let s2 = new InputHelpers.LabelSlider("bumprepeat",{min:1,max:5,step:.1,where:undefined});
    s2.oninput = function() {
        bumps.repeat.set(s2.value(),s2.value());
    };

    world.go();

    let s3 = new InputHelpers.LabelSlider("metal",{initial:1, min:0, max:1, step:.1, where:undefined});
    s3.oninput = function() {
        shaderMat.metalness = s3.value();
        shaderMat.needsUpdate = true;
    }
    let s4 = new InputHelpers.LabelSlider("rough",{initial:0, min:0, max:1, step:.05, where:undefined});
    s4.oninput = function() {
        shaderMat.roughness = s4.value();
        shaderMat.needsUpdate = true;
    }
}
test();
