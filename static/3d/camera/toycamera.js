// @ts-check
import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class ToyCamera extends GrObject {
    constructor(from = [0,2,5],at=[0,2,0],fov=50,vupth=0) {
        let camera = new T.PerspectiveCamera(40,1,1,10);
        let help = new T.CameraHelper(camera);
        let lookatPt = new T.Mesh(
            new T.SphereGeometry(.25),
            new T.MeshBasicMaterial({color:"red"}));
            let vupCyl = new T.Mesh(
                new T.CylinderGeometry(.1,.1,1),
                new T.MeshBasicMaterial({color:"yellow"})
                                    );
        
        super("mycam",[camera,help,lookatPt,vupCyl],
                [   ["from.x",-5,5,from[0],.1],
                    ["from.y",-5,5,from[1],.1],
                    ["from.z",-5,5,from[2],.1],
                    ["fov",10,90,fov,1],
                    ["at.x",-5,5,at[0],.1],
                    ["at.y",-5,5,at[1],.1],
                    ["at.z",-5,5,at[2],.1],
                    ["vup.th",-.5,.5,vupth,.1]
                ]
        );
        this.camera = camera;
        this.helper = help;
        this.lookatPt = lookatPt;
        this.vupCyl = vupCyl;
    }
    update(vec) {
        const vupAng = vec[7]*Math.PI;
        this.camera.position.x = vec[0];
        this.camera.position.y = vec[1];
        this.camera.position.z = vec[2];
        this.camera.fov = vec[3];
        this.lookatPt.position.x = vec[4];
        this.lookatPt.position.y = vec[5];
        this.lookatPt.position.z = vec[6];
        this.vupCyl.position.x = vec[4];
        this.vupCyl.position.y = vec[5];
        this.vupCyl.position.z = vec[6];
        this.vupCyl.rotation.set(0,0,vupAng);

        this.camera.up.set(-Math.sin(vupAng),Math.cos(vupAng),0);
        this.camera.lookAt(this.lookatPt.position);
        this.camera.updateProjectionMatrix();
        this.helper.update();        
    }

}

export class OrthoToyCamera extends GrObject {
    constructor(from = [0,2,5],at=[0,2,0],size=2,vupth=0) {
        let camera = new T.OrthographicCamera(-3,3,3,-3,0,10);
        let help = new T.CameraHelper(camera);
        let lookatPt = new T.Mesh(
            new T.SphereGeometry(.25),
            new T.MeshBasicMaterial({color:"red"}));
            let vupCyl = new T.Mesh(
                new T.CylinderGeometry(.1,.1,1),
                new T.MeshBasicMaterial({color:"yellow"})
                                    );
        
        super("mycam",[camera,help,lookatPt,vupCyl],
                [   ["from.x",-5,5,from[0],.1],
                    ["from.y",-5,5,from[1],.1],
                    ["from.z",-5,5,from[2],.1],
                    ["size",.1,5,size,.1],
                    ["at.x",-5,5,at[0],.1],
                    ["at.y",-5,5,at[1],.1],
                    ["at.z",-5,5,at[2],.1],
                    ["vup.th",-.5,.5,vupth,.1]
                ]
        );
        this.camera = camera;
        this.helper = help;
        this.lookatPt = lookatPt;
        this.vupCyl = vupCyl;
    }
    update(vec) {
        const vupAng = vec[7]*Math.PI;
        this.camera.position.x = vec[0];
        this.camera.position.y = vec[1];
        this.camera.position.z = vec[2];

        this.camera.left  = - vec[3];
        this.camera.right = vec[3];
        this.camera.top = vec[3];
        this.camera.bottom = -vec[3];

        this.lookatPt.position.x = vec[4];
        this.lookatPt.position.y = vec[5];
        this.lookatPt.position.z = vec[6];
        this.vupCyl.position.x = vec[4];
        this.vupCyl.position.y = vec[5];
        this.vupCyl.position.z = vec[6];
        this.vupCyl.rotation.set(0,0,vupAng);

        this.camera.up.set(-Math.sin(vupAng),Math.cos(vupAng),0);
        this.camera.lookAt(this.lookatPt.position);
        this.camera.updateProjectionMatrix();
        this.helper.update();        
    }

}

