
/*jshint esversion: 6 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../../libs/CS559/inputHelpers.js";

// This is lost and gone forever...
// import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";

const s2 = Math.sqrt(2)/2;


let gradient = new T.TextureLoader().load("../textures/gradient.png");
let rplus = new T.TextureLoader().load("../textures/rplus.png");

// makes a flat object as a set of strips
// the strips are vertex split so we can play with them
class Flat extends GrObject {
    constructor(params={}) {
        let forward = params.forward || 0.0;
        let nsteps = params.steps || 8;
        let size = params.size || 2;
        //
        // make regular arrays, then convert to buffers later
        let uvs = [];
        let verts = []

        for(let step=0; step<=nsteps; step++) {
            let f = (step % 2 == 1) ? forward : 0;
            verts.push(step * (size/nsteps), 0, f);
            verts.push(step * (size/nsteps), size, f);
            uvs.push(step/4,0);
            uvs.push(step/4,1);
        }
        //
        let ruv1 = new T.Vector2(0,0);
        let ruv2 = new T.Vector2(0,1);
        let ruv3 = new T.Vector2(1,0);
        let ruv4 = new T.Vector2(1,1);
        //
        geometry.faceVertexUvs = [ [] ];
        for(let step=0; step<nsteps; step++) {
            let v1 = step*2;
            let v2 = step*2+1;
            let v3 = (step+1)*2;
            let v4 = (step+1)*2+1;
            // 
            let dir = !(step % 2);
            //
            let f1 = new Geom.Face3(v1,v2,v3);
            geometry.faces.push(f1);
            if (dir)
                geometry.faceVertexUvs[0].push([ruv3,ruv4,ruv1]);
            else
                geometry.faceVertexUvs[0].push([ruv1,ruv2,ruv3]);

            let f2 = new Geom.Face3(v2,v4,v3);
            geometry.faces.push(f2);
            if (dir)
                geometry.faceVertexUvs[0].push([ruv4,ruv2,ruv1]);
            else
                geometry.faceVertexUvs[0].push([ruv2,ruv4,ruv3]);

            if (params.bentNormals) {
                f1.normal = new T.Vector3(s2 * (dir ? 1 : -1),0,s2);
                f2.normal = new T.Vector3(s2 * (dir ? 1 : -1),0,s2);
            }
    
        }

        let geometry = new T.BufferGeometry();


        //
        let matprops = {color:"white", side:T.DoubleSide};
        //
        if (params.map || params.bump) {
            let grad = gradient; 
            if (params.map) matprops["map"] = grad;
            if (params.bump) matprops["bumpMap"] = grad;
        }
        if (params.normalMap) {
            matprops["normalMap"] = rplus;
        }
        let material = new T.MeshStandardMaterial(matprops);
        material.bumpScale = 1;
        let mesh = new T.Mesh(geometry.toBufferGeometry(),material);
        //
        super("Flat",mesh);
        //
        mesh.translateX(params.x || 0);
        mesh.translateX(params.y || 0);
        mesh.translateX(params.z || 0);
    }
}


function test() {
    let mydiv = document.getElementById("texture-triangle");

    let box = InputHelpers.makeBoxDiv({width: (mydiv ? 640:820)},mydiv);
    if (!mydiv) {
        InputHelpers.makeBreak();   // sticks a break after the box
    }
    InputHelpers.makeHead("Bump Map (Wavy) Test",box);
    InputHelpers.makeParagraph("From Left to right: " +
        "flat surface, actual wavy surface, changing the normals,"+ 
        "bump map texture, bump map, normal map",box);

    let world = new GrWorld({width:(mydiv ? 600:800), where:box, 
        lightColoring:"xtreme",
        ambient : 0.5
        // sideLightColors:[0xFF8080,0x80FFFF]
    });

    let objs = [];
    let dx = -6;

    objs.push(new Flat({x: dx+=3}));
    objs.push(new Flat({x: dx+=3, forward:0.5}));
    objs.push(new Flat({x: dx+=3, bentNormals:true}));
    objs.push(new Flat({x: dx+=3, map:true}));
    objs.push(new Flat({x: dx+=3, bump:true}));
    objs.push(new Flat({x: dx+=3, normalMap:true}));

    objs.forEach(ob => world.add(ob));

    let div = InputHelpers.makeBoxDiv({},box);

    let sl = new InputHelpers.LabelSlider("ry", {min:-2,max:2,where:div});
    sl.oninput = function(evt) {
        let v = sl.value();
        objs.forEach(ob => ob.objects[0].rotation.y = v);
    };

    function enable(obj,name) {
        let cb = InputHelpers.makeCheckbox(name);
        cb.checked=true;
        cb.onchange = function() {
            if (cb.checked) {
                if (obj in world.scene.children) 
                    console.log(obj,"already in world");
                else
                    world.scene.add(obj);
            } else {
                world.scene.remove(obj);
            }
        }
    }
    InputHelpers.makeBreak();
    enable(objs[0].objects[0],"flat");
    enable(objs[1].objects[0],"wavy");
    enable(objs[2].objects[0],"fake wavy");
    enable(objs[3].objects[0],"bump map");
    enable(objs[4].objects[0],"using bump map");
    enable(objs[5].objects[0],"using normal map");

    InputHelpers.makeBreak();

    function camButton(name,id) {
        InputHelpers.makeButton(name).onclick = function() {
            let x = -2 + id*3;
            let y = 1;

            world.active_camera.position.x = x;
            world.active_camera.position.y = y;
            world.active_camera.position.z = 6;

            //world.active_camera.lookAt( -4.5 + id*3,
            //                           objs[id].objects[0].position.y,
            //                           objs[id].objects[0].position.z);
            world.orbit_controls.target = new T.Vector3(x, y, 0);
        }
    }

    camButton("flat",0);
    camButton("wavy",1);
    camButton("fake wavy",2);
    camButton("textureMap",3);
    camButton("textured",4);
    camButton("normal map",5)
    // world.ambient.intensity = 1;

    world.go();
}
test();
