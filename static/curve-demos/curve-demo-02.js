/**
 * written by Wiley Corning, February 2021
 */
// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../559-Lib/runCanvas.js";
import { draggablePoints } from "../559-Lib/dragPoints.js";
import { LagrangePolyCurve, CardinalCurve, GeneralPiecewiseCurve } from "./curve-definitions.js"
import { clearCanvases, plotCurve } from "./curve-plotter.js"

/* no need for onload - we use defer */

let canvas1 = document.getElementById("canvas1b");
if (!(canvas1 instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

let canvas2 = document.getElementById("canvas2b");
if (!(canvas2 instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

let canvas3 = document.getElementById("canvas3b");
if (!(canvas3 instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

  
function makeSquigglePoints(x_start, y_start) {
  let pts = [[x_start,y_start]];
  for(let i = 1; i < 9; i+=2) {
    let p0 = pts[i-1];
    
    let p1 = [p0[0]+ 50, p0[1] - 40];
    let p2 = [p1[0]+ 20, p1[1] + 30];
    
    pts.push(p1);
    pts.push(p2);
  }
  return pts;
}

{
  let thePoints = makeSquigglePoints(20,150);
  
  // let slider = /** @type {HTMLInputElement} */ (document.getElementById(
  //   "canvas-2-slider"
  // ));
  
  // let textbox = /** @type {HTMLInputElement} */ (document.getElementById(
  //   "canvas-2-text"
  // ));
  
  let update = function () {
    // let t = Number(slider.value);
    // textbox.value = "t = " + slider.value;
    
    let t = 0;
    
    let innerPoints = thePoints.slice(1,thePoints.length-1);
    let n = innerPoints.length;
    
    let repeatPaddedPoints = [innerPoints[0]].concat(innerPoints).concat([innerPoints[n-1]])
    
    
    let halfway = Math.min(n-1, Math.floor(n/2));
    
    clearCanvases([canvas1,canvas2,canvas3])
    
    plotCurve(canvas1, innerPoints, new LagrangePolyCurve(innerPoints), 200);
    plotCurve(canvas2, innerPoints, new GeneralPiecewiseCurve([
      new LagrangePolyCurve(innerPoints.slice(0,halfway+1)),
      new LagrangePolyCurve(innerPoints.slice(halfway,n))
    ]),500);
    
    plotCurve(canvas3, thePoints, [new CardinalCurve(thePoints, 0.5), new CardinalCurve(repeatPaddedPoints,0.5)],200);
  };
  
  draggablePoints(canvas1, thePoints, update);
  draggablePoints(canvas2, thePoints, update);
  draggablePoints(canvas3, thePoints, update);
  // slider.oninput = update;
  
  update();
}

