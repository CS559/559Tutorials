
/*jshint esversion: 6 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";

// get things we need
import { GrWorld }  from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as AutoUI  from "../../libs/CS559-Framework/AutoUI.js";
import * as InputHelpers from "../../libs/CS559/inputHelpers.js";

const s2 = Math.sqrt(2)/2;

let cylcount = 0;

// vector "registers"
let _up = new T.Vector3(0,1,0);
let _edge = new T.Vector3();

/* make a cylinder where each face is a separate set of triangles
 * (all vertices split) so we can show different do face normals
 * and vertex normals
 * splitting the vertices also allows for coloring
 */
class MyCylinder extends GrObject {
    constructor(params={}, material) {
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
        let stepTheta = Math.PI * 2 / sides;
        for(let thetaSteps = 0; thetaSteps < sides; thetaSteps++) {
            let theta = stepTheta * thetaSteps;
            let xn = Math.cos(theta);
            let x = xn*radius;
            let zn = Math.sin(theta);
            let z = zn*radius;
            // make the next vertices on the face as well
            let x2n = Math.cos(theta+stepTheta);
            let x2 = x2n*radius;
            let z2n = Math.sin(theta+stepTheta);
            let z2 = z2n*radius;

            // if we're making flat normals, we need to make flat normals...
            if (params.flatNormals) {
                _edge.set(x-x2,0,z-z2);
                _edge.normalize();
                _edge.cross(_up);
                _edge.normalize();
                xn = _edge.x;
                zn = _edge.z;
                x2n = xn;
                z2n = zn;
            }

            // bottom
            vertices.push(x,0,z);
            normals.push(xn,0,zn);
            // top
            vertices.push(x,height,z);
            normals.push(xn,0,zn);
            // bottom
            vertices.push(x2,0,z2);
            normals.push(x2n,0,z2n);
            // top
            vertices.push(x2,height,z2);
            normals.push(x2n,0,z2n);
            
        }
        // faces - since it's doubled...
        let indices = [];
        for(let i=0; i<sides; i++) {
            indices.push(4*i, 4*i+2, 4*i+1);
            indices.push(4*i+2, 4*i+3, 4*i+1);
        }

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


function test() {
    let box = InputHelpers.makeBoxDiv({width:1050});
    InputHelpers.makeBreak();   // sticks a break after the box
   
    InputHelpers.makeHead("Normals Test",box);

    let world = new GrWorld({width:1000, height:600, where:box, ambient: 0.3});

    let mat = new T.MeshPhongMaterial({color:"white",side:T.DoubleSide});

    let c1 = new MyCylinder({height:3,x:-1,z:3,flatNormals:true},mat);
    let c2 = new MyCylinder({height:3,x:3,z:3},mat);

    let c3 = new MyCylinder({height:3,x:-3,z:-3,flatNormals:true,sides:12},mat);
    let c4 = new MyCylinder({height:3,x:1,z:-3, sides:12},mat)

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
    world.go();
}
test();

