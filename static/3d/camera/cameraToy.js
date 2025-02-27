/*jshint -W008, esversion: 6 */
// @ts-check

// Toy Demo for Explaining Cameras
// This grew out of 07-05-02 and 06-03-01

import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrCube, GrGroup, GrCone } from "../../libs/CS559-Framework/SimpleObjects.js";
import { AutoUI } from "../../libs/CS559-Framework/AutoUI.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

import {ToyCamera, OrthoToyCamera} from "./toycamera.js";
import {SliderCube} from "./slidercube.js";
import { makeFlexDiv, makeFlexBreak, makeHead } from "../../libs/CS559/inputHelpers.js";


////
// Main 
function main(cam,enclosure) {
    let div = document.getElementById(enclosure);
    let bigdiv = makeFlexDiv(div);

    let world = new GrWorld({
        groundplanecolor: "#444",
        where: bigdiv
    });

    // make a second viewport
    let renderer2 = new T.WebGLRenderer();
    renderer2.setSize(300, 300);
    bigdiv.appendChild(renderer2.domElement);

    makeFlexBreak(bigdiv);

    let c1 = new GrCone({height:2,y:1});
    world.add(c1);


    // cube0 and cube1 are "GrObject" (framework objects)
    // to make things clearer, we'll get the "THREE Object3D" from them...
    let cube0 = new SliderCube("green",-2,0.5,0);
    let cube1 = new SliderCube("cyan", 0, 1, 0);
    let obj0 = cube0.objects[0];
    let obj1 = cube1.objects[0];
    let cubeUI1 = new AutoUI(cube0, 200, bigdiv);

    // put the top level cube in the world
    world.add(cube0);
    obj0.add(obj1);

    let tc = new cam(); // ToyCamera();
    world.add(tc);
    new AutoUI(tc,250,bigdiv);

    world.go( { postdraw: function(x) {renderer2.render(world.scene, tc.camera); } });
}

main(ToyCamera,"div1");

main(OrthoToyCamera,"div2");
