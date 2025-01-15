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

let canvas1 = document.getElementById("canvas1");
if (!(canvas1 instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

let canvas2 = document.getElementById("canvas2");
if (!(canvas2 instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

{
  let thePoints = [
      [25, 150],
      [50, 150],
      [120, 50],
      [150, 75],
      [250, 100],
      [275, 100]
  ];
  
//   let slider = /** @type {HTMLInputElement} */ (document.getElementById(
//     "canvas-1-slider"
//   ));
  
//   let textbox = /** @type {HTMLInputElement} */ (document.getElementById(
//     "canvas-1-text"
//   ));

  let update = function () {
    // let t = Number(slider.value);
    // textbox.value = "t = " + slider.value;
    
    let t = 0;
    
    let innerPoints = thePoints.slice(1,thePoints.length-1);
    let n = innerPoints.length;
    
    let repeatPaddedPoints = [innerPoints[0]].concat(innerPoints).concat([innerPoints[n-1]])
    
    
    clearCanvases([canvas1,canvas2])
    
    plotCurve(canvas1, innerPoints, new LagrangePolyCurve(innerPoints), 200);
    plotCurve(canvas2, thePoints, [new CardinalCurve(thePoints, 0.5), new CardinalCurve(repeatPaddedPoints,0.5)],200);
  };
  
  draggablePoints(canvas1, thePoints, update);
  draggablePoints(canvas2, thePoints, update);
//   slider.oninput = update;
  
  update();
}

