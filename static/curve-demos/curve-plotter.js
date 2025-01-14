/**
 * written by Wiley Corning, February 2021
 */
// @ts-check
/* jshint -W069, esversion:6 */

// useful constant
const twoPi = 2 * Math.PI;

export function clearCanvases(canvases) {
  canvases.forEach((canvas) => {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
}

// gleicher modified to draw as line segments of nsamps = 0
export function plotCurve(canvas, points, curves, nsamps) {
    if (!Array.isArray(curves)) curves = [curves];
    
  const segMaps = [
    (k) => ["#7799ff", "blue"][k % 2],
    (k) => ["red", "darkred"][k % 2],
    (k) => ["green", "darkgreen"][k % 2],
  ];

  const lineWidths = [3, 1, 1];

  let context = canvas.getContext("2d");

  if (nsamps>0) {
    let n = curves.length;
    for (let i = n - 1; i >= 0; i--) {
        if(!curves[i].isValid()) continue;
        drawCurve(context, curves[i], segMaps[i % n], lineWidths[i % n],nsamps);
    }
  } else {
    for (let i=points.length-2; i>=0; i--) {
        context.save();
        context.moveTo(points[i][0], points[i][1]);
        context.lineTo(points[i+1][0], points[i+1][1]);
        context.stroke();
        context.restore();
    }
  }
  for (let i = 0; i < points.length; i++) {
    drawDot(context, points[i]);
  }
}

function drawCurve(context, curve, segMap, lineWidth, nsamps) {
  context.beginPath();
  let start = curve.eval(0);
  context.moveTo(start[0], start[1]);

  let step = 1 / nsamps;

  context.strokeStyle = segMap(0);
  context.lineWidth = lineWidth;
  let last_seg = 0;

  for (let i = 1; i < nsamps; i++) {
    let t = i * step;
    let seg = curve.seg(t);
    let point = curve.eval(t);
    context.lineTo(point[0], point[1]);

    if (seg !== last_seg) {
      context.stroke();
      context.strokeStyle = segMap(seg);
      context.beginPath();
      context.moveTo(point[0], point[1]);
      context.lineTo(point[0], point[1]);
      last_seg = seg;
    }
  }

  let end = curve.eval(1);
  context.lineTo(end[0], end[1]);
  context.stroke();
}

function drawDot(context, pt) {
  const circRadius = 4;
  context.save();

  /** draw dots for the  control points*/
  context.fillStyle = "black";
  context.beginPath();
  context.arc(pt[0], pt[1], circRadius, 0, twoPi);
  context.fill();
//   context.fillStyle = "white";
//   context.beginPath();
//   context.arc(pt[0], pt[1], circRadius * 0.6, 0, twoPi);
  context.fill();
}
