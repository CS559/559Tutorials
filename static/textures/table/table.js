
/*jshint esversion: 6 */
// @ts-check

/* table top (wood grain) demo */

import * as T from "../../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../../libs/CS559-Framework/GrWorld.js";
import * as InputHelpers from "../../libs/CS559/inputHelpers.js";
import { SimpleGroundPlane } from "../../libs/CS559-Framework/GroundPlane.js";

import {Book} from "./book.js";

let div = document.getElementById("div1");

let wood = new T.TextureLoader().load("./freestrock-woodgrain-square.jpg");

const bookScale = 8;

let gp = new SimpleGroundPlane(10,.2,"#baa689")
let gpm = new T.MeshStandardMaterial({color:"white", map:wood});

wood.repeat.set(1,1);
wood.wrapS = T.RepeatWrapping;
wood.wrapT = T.RepeatWrapping;

// remember the old (plain) material, and set to the new one
// warning - an Object3D doesn't have a material - a mesh does
let gpo = (/** @type {T.Mesh} */ (gp.objects[0]));
let gpc = gpo.material;    
gpo.material = gpm;

let world = new GrWorld({groundplane: gp, where:div});
let book0 = new Book(true);
let book1 = new Book();


let wire = new T.WireframeGeometry(book0.bgeom);
let lines = new T.LineSegments(wire);
// lines.material.depthTest = false;
book0.objects.push(lines);
world.scene.add(lines);

world.add(book0);
world.add(book1);

book0.setPos(-6);
book0.setScale(bookScale);
book1.setPos(2);
book1.setScale(bookScale);

world.ambient.intensity = 0.1;

function enable(obj,name) {
    let cb = InputHelpers.makeCheckbox(name,div1);
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

InputHelpers.makeBreak(div1);
enable(book0.objects[0],"box");
enable(lines,"wire");
enable(book1.objects[0],"textured");

let sl = new InputHelpers.LabelSlider("repeats", {min:1, max:5, initial:1, where:div1});
sl.oninput = function() {
    wood.repeat.set(sl.value(),sl.value());
}
console.log(sl);

let cb = InputHelpers.makeCheckbox("mirror",div1);
cb.onchange = function() {
    wood.wrapS = cb.checked ? T.MirroredRepeatWrapping : T.RepeatWrapping;
    wood.wrapT = cb.checked ? T.MirroredRepeatWrapping : T.RepeatWrapping;
    wood.needsUpdate = true;
}

let cb2 = InputHelpers.makeCheckbox("texture",div1);
cb2.checked=true;
cb2.onchange = function() {
    (/** @type {T.Mesh} */ (gp.objects[0])).material = cb2.checked ? gpm : gpc;        
}

let cb3 = InputHelpers.makeCheckbox("clamp",div1);
cb3.onchange = function() {
    wood.wrapT = cb3.checked ? T.ClampToEdgeWrapping : T.RepeatWrapping;
    wood.wrapS = cb3.checked ? T.ClampToEdgeWrapping : T.RepeatWrapping;
    wood.needsUpdate = true;
}

world.go();
