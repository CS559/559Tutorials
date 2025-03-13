
/*jshint esversion: 6 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as AutoUI  from "../../libs/CS559-Framework/AutoUI.js";
import * as InputHelpers from "../../libs/CS559/inputHelpers.js";
import * as Simple from "../../libs/CS559-Framework/SimpleObjects.js";
import * as Geom from "./Geometry.js";

const s2 = Math.sqrt(2)/2;

let cylcount = 0;

/* make a cylinder where each face is a separate set of triangles
 * (all vertices split) so we can show different do face normals
 * and vertex normals.
 * We need to give it a material - I have no idea where the original code got it
 */
class MyCylinder extends GrObject {
    constructor(params={},material) {
        let sides = params.sides || 6;
        let height = params.height || 2;
        let radius = params.radius || 1;

        let group = new T.Group();
        super(`MyCylinder-${cylcount++}`,group);

        // for simplicity, we make the vertex arrays as JS arrays
        // and then convert them to Float32Arrays at the end
        // get the normals so we can stuck them in place
        let vertices = [];
        let normals = [];
        let indices = [];

        /*
        let stepTheta = Math.PI * 2 / sides;
        for(let thetaSteps = 0; thetaSteps < sides; thetaSteps++) {
            let theta = stepTheta * thetaSteps;
            const x = Math.cos(theta)*radius;
            const z = Math.sin(theta)*radius;
            // bottom
            vertices.push(x,0,z);
            normals.push(x,0,z);
            // 
            vertices.push(x,height,z);
            normals.push(x,height,z);
        }
        // faces
        for(let i=0; i<sides; i++) {
            const nextI = (i+1)%sides;
            indices.push(2*i, 2*nextI, 2*i+1);
            indices.push(2*i+1, 2*nextI, 2*nextI+1);
        }
        */

        vertices.push(0,0,0);
        vertices.push(0,height,0);
        vertices.push(radius,height,0);

        normals.push(0,0,1);
        normals.push(0,0,1);
        normals.push(0,0,1);

        // now make a buffer geometry
        let geom = new T.BufferGeometry();
        geom.setAttribute("position", new T.Float32BufferAttribute(vertices,3));
        geom.setAttribute("normal", new T.Float32BufferAttribute(normals,3));
        geom.setIndex(indices);

        this.mesh = new T.Mesh(geom, material);
        group.add(this.mesh);
        group.translateX(params.x || 0);
        group.translateY(params.y || 0);
        group.translateZ(params.z || 0);
    }
}



let box = InputHelpers.makeBoxDiv({width:1050});
InputHelpers.makeBreak();   // sticks a break after the box
InputHelpers.makeHead("Normals Test",box);
let world = new GrWorld({width:1000, height:600, where:box, ambient: 0.3});

let mat = new T.MeshLambertMaterial({color:0x8888ff, side:T.DoubleSide});
let c = new MyCylinder({},);
world.add(c);

let g = new Simple.GrSphere({x:2,y:1,z:2});
world.add(g);
console.log(g);

/*
let c1 = new MyCylinder({height:3,x:-1,z:3,flatNormals:true});
let c2 = new MyCylinder({height:3,x:3,z:3});

let c3 = new MyCylinder({height:3,x:-3,z:-3,flatNormals:true,sides:12});
let c4 = new MyCylinder({height:3,x:1,z:-3, sides:12})

world.add(c1);
world.add(c2);

world.add(c3);
world.add(c4);

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
enable(c1.objects[0],"6 flat");
enable(c2.objects[0],"6 smooth");
enable(c3.objects[0],"12 flat");
enable(c4.objects[0],"12 smooth");
*/
world.go();
