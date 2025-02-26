/*jshint esversion: 6 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";

// get things we need
// get things we need
import { GrWorld }  from "../../libs/CS559-Framework/GrWorld.js";
import {GrSphere, GrCube, GrCylinder} from "../../libs/CS559-Framework/SimpleObjects.js";

// set a constant to pick which texture to use
// this is the path to the set of 6 images, missing the "_Front.png" part
const envTextureBase = "../HDRIHeaven/rooituo";

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

function test() {

    let div = document.getElementById("d1");
    let world = new GrWorld({where:div});
    let cubeTexture = cubeTextureHelp(envTextureBase)
    world.scene.background = cubeTexture;

    let mat = new T.MeshStandardMaterial({ envMap: cubeTexture, metalness:.8, roughness:0.1 });

    // some solid color things to look at
    world.add(new GrCylinder({x:-4, z:-4, y:2.5, radius: .4, height:5, color: "red"}));
    world.add(new GrCylinder({x:-4, z: 4, y:2.5, radius: .4, height:5, color: "purple"}));
    world.add(new GrCylinder({x: 4, z: 4, y:2.5, radius: .4, height:5, color: "yellow"}));
    world.add(new GrCylinder({x:-4, z: 0, y:2.5, radius: .4, height:5, color: "orange"}));
    world.add(new GrCylinder({x: 4, z: 0, y:2.5, radius: .4, height:5, color: "blue"}));
    world.add(new GrCylinder({x: 4, z:-4, y:2.5, radius: .4, height:5}));

    // a moving thing
    let cube2 = new GrCube({x:0, y:.5, z:1, color:"blue"});
    world.add(cube2);
    let t=0;
    cube2.stepWorld = function(delta) { t+=delta; cube2.objects[0].position.x = 3*Math.sin(t/500);}


    // newer version of THREE requires creating this manyally
    const cubeRenderTarget = new T.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: T.LinearMipmapLinearFilter } );

    // make an environment map camera to take a picture at the center of the world
    let cubecam = new T.CubeCamera(1,1000,cubeRenderTarget);
    cubecam.position.y = 2;
    mat.envMap = cubeRenderTarget.texture;

    // we take the picture BEFORE adding the object...
    let sphere = new GrSphere({ x:2, y:2, size:1, material: mat});
    world.add(sphere);

    let cube = new GrCube({size:1, x:-2, y: 2, material: mat});
    world.add(cube);

    world.go({
        predraw: function() {
            // don't draw the reflective objects
            let oldObjs = world.scene.children;
            world.scene.children = world.scene.children.filter(
                // ob => (ob != sphere.objects[0]) && (ob != cube.objects[0])
                ob => !(ob.material == mat)
            );
            cubecam.update(world.renderer,world.scene);
            world.scene.children = oldObjs;
        }
    });
}
test();