// @ts-check
import { GrCube, GrGroup, GrCone } from "../../libs/CS559-Framework/SimpleObjects.js";
import { GrObject, paramObjFromParam } from "../../libs/CS559-Framework/GrObject.js";

/**
 * 
 * @param {GrObject} grobj 
 */
export function sliderize(grobj, x=0, y=0, z=0,theta=0,scale=1){
    const paramInfo =           [
        ["pos.x",-3,3,x,.1],
        ["pos.y",-3,3,y,.1],
        ["pos.z",-3,3,z,.1],
        ["rot.y",-180,180,theta],
        ["scale",0.2,2,scale]
    ];;
    paramInfo.forEach(function(param) {
      // default values for the parameter in case we don't get any
      const paramObj = paramObjFromParam(param);
      grobj.params.push(paramObj);
    });
    grobj.update = function(vec) {
        this.objects[0].position.x = vec[0];
        this.objects[0].position.y = vec[1];
        this.objects[0].position.z = vec[2];
        this.objects[0].rotation.y = vec[3]*Math.PI/180;
        this.objects[0].scale.set(vec[4],vec[4],vec[4]);
    }
}

export class SliderCube extends GrCube {
    constructor(color,x=0,y=1,z=0) {
      super({ color: color, x:x, y:y, z:z }, 
          [
              ["pos.x",-3,3,x,.1],
              ["pos.y",-3,3,y,.1],
              ["pos.z",-3,3,z,.1],
              ["rot.y",-180,180,0],
              ["scale",0.2,2,1]
          ]
          );
      this.name += "-" + color;
    }
    update(vec) {
        this.objects[0].position.x = vec[0];
        this.objects[0].position.y = vec[1];
        this.objects[0].position.z = vec[2];
        this.objects[0].rotation.y = vec[3]*Math.PI/180;
        this.objects[0].scale.set(vec[4],vec[4],vec[4]);
    }
  }
  