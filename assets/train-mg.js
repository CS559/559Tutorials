/*jshint esversion: 6 */
// @ts-check

// include draggablePoints so this is easier to Obfuscate
// import {draggablePoints} from "./dragPoints.js";
/**
 * Set up Draggable Points for an HTML Canvas
 * pass in the array of point positions (which it will change in the future)
 * and this will add the appropriate event handlers to the Canvas
 *
 * The "redraw" function is called for any event that changes the state of
 * the points (mouse down, up, move).
 * If the redraw is called by something else (e.g., and animation loop) it
 * can be set to null
 *
 * @param {HTMLCanvasElement} canvas - canvas to attach to
 * @param {Array<Array<number>>} pointList - list of points
 * @param {?FrameRequestCallback} redraw - function to be called when things change
 * @param {number} [circleRadius =10] - radius of circles (for hit testing)
 * @param {function} [changeNumber=undefined] - function to call if the number of points changes
 */
function draggablePoints(
    canvas,
    pointList,
    redraw,
    circleRadius = 10,
    changeNumber = undefined
  ) {
    // keep state within the closure of the function
    let theCanvas = canvas;
    let thePoints = pointList;
    let theRedraw = redraw;
    let dragging = -1;
  
    if (!circleRadius) {
      circleRadius = 10;
    }
    let circRadiusSq = circleRadius * circleRadius;
  
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("mouseup", endDrag);
    canvas.addEventListener("mouseleave", endDrag);
  
    // box up the redraw
    function doRedraw() {
      if (theRedraw) {
        // rather than drawing immediately, queue up a redraw
        // note that this runs the redraw once (just not now)
        window.requestAnimationFrame(theRedraw);
      }
    }
  
    // get the mouse position relative to a canvas
    function mousePosition(evt) {
      // remember - the clientX,clientY is not the actual mouse position
      // in the canvas coordinate system!
      let x = evt.clientX;
      let y = evt.clientY;
      var canvasbox = theCanvas.getBoundingClientRect();
      x -= canvasbox.left;
      y -= canvasbox.top;
      return [x, y];
    }
  
    // select the point nearest to the mouse
    // note that this returns the index of the point - it does not set selection
    // or cause a redraw - you probably don't want to use this
    // as a handler
    function pickPoint(evt) {
      let [x, y] = mousePosition(evt);
  
      // nothing is selected, and minimum distance
      let sel = -1;
      let minD = circRadiusSq;
      thePoints.forEach((pt, i) => {
        let dx = pt[0] - x;
        let dy = pt[1] - y;
        let d = dx * dx + dy * dy;
        if (d < minD) {
          minD = d;
          sel = i;
        }
      });
      return sel;
    }
  
    // mouse click - perform dragging
    // if shift is held down, make a new point
    // if ctrl or meta is held down, delete the point
    // we need to do meta for the mac, where ctrl means something
    /**
     *
     * @param {MouseEvent} evt
     */
    function mouseDown(evt) {
      if (evt.shiftKey) {
        // we need to decide where to put the point
        // guess 1 = after the selected point
        let select = pickPoint(evt);
  
        if (select >= 0) {
          let p1 = select;
          let p2 = (select + 1) % thePoints.length;
          let newPt = [
            (thePoints[p1][0] + thePoints[p2][0]) / 2,
            (thePoints[p1][1] + thePoints[p2][1]) / 2
          ];
          thePoints.splice(p1 + 1, 0, newPt);
        } else {
          // easy part is where,
          // the harder part is what position
          let xy = mousePosition(evt);
          thePoints.push(xy);
          if (changeNumber) changeNumber();
          doRedraw();
        }
      } else if (evt.ctrlKey || evt.metaKey) {
        // do not delete the only point
        if (thePoints.length > 1) {
          let select = pickPoint(evt);
          if (select >= 0) {
            thePoints.splice(select, 1);
            if (changeNumber) changeNumber();
            doRedraw();
          }
        }
      } else {
        let select = pickPoint(evt);
  
        if (select >= 0) {
          dragging = select;
          doRedraw();
        }
      }
    }
  
    function endDrag(evt) {
      dragging = -1;
      doRedraw();
    }
  
    function drag(evt) {
      if (dragging >= 0) {
        let xy = mousePosition(evt);
        thePoints[dragging] = xy;
        doRedraw();
      }
    }
  }
  

// include RunCanvas so this is easier to obfuscate
// import {RunCanvas} from "./runCanvas.js";
// useful utility function for creating HTML
/**
 * https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
 * @param {HTMLElement} el
 * @param {HTMLElement} referenceNode
 */
function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  }
  
  // taken from the 2022 WB
  export class RunCanvas {
    /**
     *
     * @param {HTMLCanvasElement|string} canvasNameOrCanvas
     * @param {function(HTMLCanvasElement, Number) : any} drawFunc
     * @param {*} noLoop
     */
    constructor(canvasNameOrCanvas, drawFunc, noLoop = false) {
      /* so often, we pass the wrong thing - so make it work either way */
      let canvas; //  = undefined
      let canvasName; //  = undefined
      if (canvasNameOrCanvas instanceof HTMLCanvasElement) {
        canvas = canvasNameOrCanvas;
        canvasName = canvas.id;
      } else {
        canvasName = canvasNameOrCanvas;
        canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
          canvasName
        ));
      }
      if (!canvas) {
        throw "RunCanvas without a Canvas to attach to!";
      }
      if (!canvasName) {
        canvasName = "canvas-" + Math.trunc(performance.now()).toString();
        console.log("RunCanvas with an unnamed canvas - naming it " + canvasName);
        canvas.id = canvasName;
      }
  
      this.canvas = /** @type {HTMLCanvasElement} */ (canvas);
      this.canvasName = canvasName;
      this.drawFunc = drawFunc;
      this.noloop = noLoop;
  
      // some style parameters
      this.digits = 2;
  
      // keep track of time - so we can measure step times
      this.lastTime = undefined;
  
      // we need to store the value
      this.value = 0;
  
      // create the elements
      this.br = document.createElement("br");
      this.br.id = canvasName + "-br";
  
      this.range = document.createElement("input");
      this.range.id = canvasName + "-slider";
      this.range.setAttribute("type", "range");
      this.range.style.width = String(this.canvas.width - 50 - 20 - 10) + "px";
      // give default values for range
      this.setupSlider(0, 1, 0.01);
  
      this.text = document.createElement("input");
      this.text.id = canvasName + "-text";
      this.text.setAttribute("type", "text");
      this.text.style.width = "50px";
      this.text.setAttribute("readonly", "1");
  
      this.runbutton = document.createElement("input");
      this.runbutton.id = canvasName + "-run";
      this.runbutton.setAttribute("type", "checkbox");
      this.runbutton.style.width = "20px";
  
      this.br2 = document.createElement("br");
      this.br2.id = canvasName + "-br2";
  
      insertAfter(this.br, this.canvas);
      insertAfter(this.runbutton, this.br);
      insertAfter(this.text, this.runbutton);
      insertAfter(this.range, this.text);
      insertAfter(this.br2, this.range);
  
      let self = this;
      this.runbutton.onchange = function() {
        if (self.noloop && Number(self.range.value) >= 1) {
          self.setValue(0);
        }
        self.tick(undefined);
      };
      this.range.oninput = function() {
        let val = Number(self.range.value);
        self.setValue(val);
      };
    }
    /**
     * Setup aspects of the slider - as a function in case you need to change them
     * @param {Number} min
     * @param {Number} max
     * @param {Number} step
     */
    setupSlider(min, max, step) {
      this.range.setAttribute("min", String(min));
      this.range.setAttribute("max", String(max));
      this.range.setAttribute("step", String(step));
    }
  
    // set the value of the slide - make sure to update everything
    setValue(value) {
      this.value = value;
      this.range.value = String(value);;
      this.text.value = value.toFixed(this.digits);
      if (this.drawFunc) {
        this.drawFunc(this.canvas, value);
      }
    }
  
    /**
     * this function doesn't directly go as a req animation from (it's a method
     * not a function) - but it acts as if it was
     * It is possible that tick is called without a timestamp (if the button is clicked)
     * - if that's the case, assume a delta of 0 - we generate a redraw at the current frame
     * @param {DOMHighResTimeStamp} timestamp 
     */
    tick(timestamp) {
      // convert delta to "frames" (at 60fps)
      const delta = ((timestamp && this.lastTime) ? timestamp-this.lastTime : 0) * 1.0/60.0;
      this.lastTime = timestamp;
      let maxV = Number(this.range.max);
      let stepV = Number(this.range.step);
      let value = this.value + stepV * delta;
      if (this.noloop) {
        if (value >= maxV) {
          this.runbutton.checked = false;
        }
        value = Math.min(maxV, value);
      } else {
        value = value % maxV;
      }
      this.setValue(value);
      if (this.runbutton.checked) {
        let self = this;
        window.requestAnimationFrame(function(timestamp) {
          self.tick(timestamp);
        });
      }
    }
  }
  
  

/************************************************************************/
// stick everything in one file so its easier to run through a code obfuscator

function vminus(p1,p2) {
    return [p1[0]-p2[0],p1[1]-p2[1]];
}


/* keep a set of "smoke points", x,y, size */
/** @type Array<number[]> */
let smokePoints = [];

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} context 
 * @param {Array<number[]>} thePoints 
 * @param {*} param 
 */
function mikesDraw(canvas,context,thePoints,param) {
    let simpleTrack = /** @type{HTMLInputElement} */ (document.getElementById("simple-track")).checked;
    let doArcLength = /** @type{HTMLInputElement} */ (document.getElementById("arc-length")).checked;
    let doBspline = /** @type{HTMLInputElement} */ (document.getElementById("bspline")).checked;
    let doSmoke = /** @type{HTMLInputElement} */ (document.getElementById("smoke")).checked;

    let n = thePoints.length;

    function cardinal(param) {
        let u = param % 1;
        let seg = param-u;

        let p0 = thePoints[(seg-1+n)%n];
        let p1 = thePoints[seg];
        let p2 = thePoints[(seg+1)%n];
        let p3 = thePoints[(seg+2)%n];
    
        // cardinal basis functions
        const s=0.5;
        let u2 = u*u;
        let u3 = u*u*u;
        let b0 =     -s*u +     2*s*u2 -    s  * u3;
        let b1 = 1 +          (s-3)*u2 + (2-s) * u3;
        let b2 =      s*u + (3-2*s)*u2 + (s-2) * u3;
        let b3 =                 -s*u2 +    s  * u3;
    
        let x = b0*p0[0] + b1*p1[0] + b2*p2[0] + b3*p3[0];
        let y = b0*p0[1] + b1*p1[1] + b2*p2[1] + b3*p3[1];
    
        // derivative of cardinal basis functions
        let d0 = -s + 2 * u * (2*s)   + 3 * u2 * (-s);
        let d1 =      2 * u * (s-3)   + 3 * u2 * (2-s);
        let d2 =  s + 2 * u * (3-2*s) + 3 * u2 * (s-2);
        let d3 =      2 * u * (-s)    + 3 * u2 * s;
    
        let dx = d0 * p0[0] + d1*p1[0] + d2*p2[0] + d3*p3[0];
        let dy = d0 * p0[1] + d1*p1[1] + d2*p2[1] + d3*p3[1];
    
        return [x,y,dx,dy];
    }

    function bspline(param) {
        let u = param % 1;
        let seg = param-u;

        let p0 = thePoints[(seg-1+n)%n];
        let p1 = thePoints[seg];
        let p2 = thePoints[(seg+1)%n];
        let p3 = thePoints[(seg+2)%n];
    
        // cardinal basis functions
        const s=0.5;
        let u2 = u*u;
        let u3 = u*u*u;
        let b0 = 1/6 * (-u3+3*u2-3*u+1);
        let b1 = 1/6 * (3*u3-6*u2+4);
        let b2 = 1/6 * (-3*u3+3*u2+3*u+1);
        let b3 = 1/6 * u3;
    
        let x = b0*p0[0] + b1*p1[0] + b2*p2[0] + b3*p3[0];
        let y = b0*p0[1] + b1*p1[1] + b2*p2[1] + b3*p3[1];
    
        // derivative of cardinal basis functions
        let d0 = 1/6 * (-3*u2 + 6*u -3);
        let d1 = 1/6 * (9*u2-12*u);
        let d2 = 1/6 * (-9*u2+6*u+3);
        let d3 = 1/6 * (3*u2);
    
        let dx = d0 * p0[0] + d1*p1[0] + d2*p2[0] + d3*p3[0];
        let dy = d0 * p0[1] + d1*p1[1] + d2*p2[1] + d3*p3[1];
    
        return [x,y,dx,dy];
    }

    let basis = (!simpleTrack && doBspline) ? bspline : cardinal;
    
    // build an arclength table
    /** @type Array<Object> */
    let altable = [];
    let dst = 0;
    let lp = basis(0);
    lp.push(0);
    altable.push({"u":0,"a":0});
    for(let pa=0.1; pa<=thePoints.length; pa+=0.1) {
        let p=basis(pa);
        let dx = p[0]-lp[0];
        let dy = p[1]-lp[1];
        let d=Math.sqrt(dx*dx+dy*dy);
        p.push(d + lp[4]);
        altable.push({"u":pa,"a":p[4]});
        lp = p;
    }
    let buf = [lp[0],lp[1],0,0,lp[4]+1];
    altable.push(buf);   // push an extra to keep from going off end

    // draw the track as a line
    if (simpleTrack) {
        context.beginPath();
        context.moveTo(thePoints[0][0],thePoints[0][1]);
        for(let i=0; i<n; i++) {
            let p0 = thePoints[(i-1+n)%n];
            let p1 = thePoints[i];
            let p2 = thePoints[(i+1)%n];
            let p3 = thePoints[(i+2)%n];

            let d1 = vminus(p2,p0);
            let d2 = vminus(p3,p1);

            let b2x = p1[0] + d1[0] / 2 / 3;
            let b2y = p1[1] + d1[1] / 2 / 3;
            let b3x = p2[0] - d2[0] / 2 / 3;
            let b3y = p2[1] - d2[1] / 2 / 3;

            context.bezierCurveTo(b2x,b2y,b3x,b3y,p2[0],p2[1]);
        }
    }
    context.closePath();
    context.stroke();
    
    function tablerp(p1,p2,v) {
        if (!p2) {
            console.log("no p2!");
            return p1.u;
        }
        if (!p1) {
            console.log("no p1!");
            return 0;
        }
        let a = (v-p1.a) / (p2.a-p1.a);
        let a1=1-a;
        return a1*p1.u + a*p2.u;
    }

    const tieSpacing = 20;
    const tieSize = 20;
    const tieSize2 = tieSize/2;

    // draw the rail ties
    context.save();
    context.fillStyle = "brown";
    if (!simpleTrack) {
        let cs = 0;
        let np = 0;
        let pt = basis(0);
        if (doArcLength) {
            for(let ud=0; ud<=lp[4]; ud+=tieSpacing) {
                for(np=cs; altable[np].a<ud; np++);
                if (np>0) {
                    cs=np-1;
                    pt = basis(tablerp(altable[cs],altable[np],ud));
                } 
                context.save();
                context.translate(pt[0],pt[1]);
                context.rotate(Math.atan2(pt[3],pt[2]));
                context.fillRect(-2,-tieSize2,4,tieSize);
                context.restore();
            }
        } else {    // this doesn't actually, make sense, but fore pedagogy... 
            for(let u=0; u<n; u += .1) {
                pt = basis(u);
                context.save();
                context.translate(pt[0],pt[1]);
                context.rotate(Math.atan2(pt[3],pt[2]));
                context.fillRect(-2,-tieSize2,4,tieSize);
                context.restore();
            }
        }
    }
    context.restore();

    context.save();
    if (!simpleTrack) {
        for(let lr=-5;lr<=5;lr+=10) {
            context.beginPath();
            let cs = 0;
            let np = 0;
            let pt = basis(0);
            let d = Math.sqrt(pt[2]*pt[2]+pt[3]*pt[3]);
            let dx = lr*pt[2]/d;
            let dy = lr*pt[3]/d;
            context.moveTo(pt[0]+dy,pt[1]-dx);
            for(let ud=0; ud<=lp[4]; ud+=10) {
                for(np=cs; altable[np].a<ud; np++);
                if (np>0) {
                    cs=np-1;
                    pt = basis(tablerp(altable[cs],altable[np],ud));
                } 
                let d = Math.sqrt(pt[2]*pt[2]+pt[3]*pt[3]);
                let dx = lr*pt[2]/d;
                let dy = lr*pt[3]/d;
                /* note - we need to rotate by 90 degrees! */
                context.lineTo(pt[0]+dy,pt[1]-dx);
            }
            context.closePath();
            context.stroke();
        } 
    }
    context.restore();

    // where is the train
    let x,y,dx,dy;

    if (doArcLength) {
        /* convert the parameter from arc length to regular */
        // first scale so that 100% of the slider = 100% of arc length
        let aparam = (param / thePoints.length) * lp[4];

        let cs=0;
        let np=0;
        for(np=0; altable[np].a<aparam; np++);
        cs = np-1;
        let npp = altable[np];
        let csp = altable[cs];
        [x,y,dx,dy] = basis(tablerp(csp,npp,aparam));
    } else {
        /* compute the value of the current point */
        [x,y,dx,dy] = basis(param);
    }
    context.save();
    context.save();
    context.translate(x,y);
    context.rotate(Math.atan2(dy,dx));
    context.fillRect(-20,-10,40,20);
    // headlight
    context.fillStyle = "#FFFF0080";
    context.beginPath();
    context.moveTo(20,0);
    context.lineTo(80,-30);
    context.lineTo(80, 30);
    context.closePath();
    context.fill();
    context.restore();
    context.restore();

    // smoke...
    // make each smoke dot bigger
    smokePoints.forEach(function(pt) {pt[2] += 1; });
    // get rid of smoke dots that are old (big)
    smokePoints = smokePoints.filter(pt => pt[2] < 30);
    // add a smoke dot for the train
    if (doSmoke && (Math.random()<.5)) 
        smokePoints.push([x,y,3]);
    // draw the smoke dots
    context.save();
    context.fillStyle = "#80808080";
    smokePoints.forEach(function(pt) {
        context.beginPath();
        context.arc(pt[0],pt[1],pt[2],0,Math.PI*2);
        context.fill();
    });
    context.restore();
}

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 * the initial track is edited to show off arc length
 */
/** @type Array<number[]> */
let thePoints = [ [150,150], [200,450], [300,500], [400,450], [450,150]];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
    let context = canvas.getContext("2d");
    // clear the screen
    context.clearRect(0,0,canvas.width,canvas.height);

    // draw the control points
    thePoints.forEach(function(pt) {
        context.beginPath();
        context.arc(pt[0],pt[1],5,0,Math.PI*2);
        context.closePath();
        context.fill();
    });

    // get the value

    // do the heavy lifting
    mikesDraw(canvas,context,thePoints,param);
}

/**
 * Setup stuff - make a "window.onload" that sets up the UI and starts
 * the train
 */
let oldOnLoad = window.onload;
window.onload = function() {
    let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let theContext = theCanvas.getContext("2d");
    // we need the slider for the draw function, but we need the draw function
    // to create the slider - so create a variable and we'll change it later
    let theSlider; // = undefined;

    // note: we wrap the draw call so we can pass the right arguments
    function wrapDraw() {
        // do modular arithmetic since the end of the track should be the beginning
        draw(theCanvas, Number(theSlider.value) % thePoints.length);
    }
    // create a UI
    let runcavas = new RunCanvas(theCanvas,wrapDraw);
    // now we can connect the draw function correctly
    theSlider = runcavas.range;

    // this is a helper function that makes a checkbox and sets up handlers
    // it sticks it at the end after everything else
    // you could also just put checkboxes into the HTML, but I found this more
    // convenient
    function addCheckbox(name, initial = false) {
        const div = document.getElementById("train-div");
        if (div) {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            div.appendChild(checkbox);
            checkbox.id = name;
            checkbox.onchange = wrapDraw;
            checkbox.checked = initial;
            let checklabel = document.createElement("label");
            checklabel.setAttribute("for", name);
            checklabel.innerText = name;
            div.appendChild(checklabel);
        } else {
            alert("No div for checkbox")
        }
    }
    // note: if you add these features, uncomment the lines for the checkboxes
    // in your code, you can test if the checkbox is checked by something like:
    // document.getElementById("simple-track").checked
    addCheckbox("simple-track",false);
    addCheckbox("arc-length",true);
    addCheckbox("bspline",false);
    addCheckbox("smoke",true)

    // helper function - set the slider to have max = # of control points
    function setNumPoints() {
        runcavas.setupSlider(0,thePoints.length,0.05);
    }

    setNumPoints();
    runcavas.setValue(0);

    // add the point dragging UI
    draggablePoints(theCanvas,thePoints,
                    wrapDraw,
                    10,setNumPoints);


};
