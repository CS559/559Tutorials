/**
 * written by Wiley Corning, February 2021
 */
// @ts-check
/* jshint -W069, esversion:6 */

export class LagrangePolyCurve {
    constructor(points) {
      this.p = points;
      this.n = points.length;
      var t = [];
      let inc = 1 / (this.n - 1);
      for (let i = 0; i < this.n; i++) {
        t[i] = i * inc;
      }
      this.t = t;
    }
    
    isValid() { return this.n > 1; }
      
    // unoptimized
    computeBasisPoly(t, i) {
      let prod = 1;
  
      let t_i = this.t[i];
  
      for (let j = 0; j < this.n; j++) {
        if (j === i) continue;
        let t_j = this.t[j];
        prod *= (t - t_j) / (t_i - t_j);
      }
  
      return prod;
    }
  
    eval(t) {
      let sum = [0, 0];
  
      for (let i = 0; i < this.n; i++) {
        let pt = this.p[i];
        let weight_i = this.computeBasisPoly(t, i);
        sum[0] = sum[0] + weight_i * pt[0];
        sum[1] = sum[1] + weight_i * pt[1];
      }
  
      return sum;
    }
  
    seg(t) {
      return 0; // Only one segment :)
    }
  }
  

// Perform hermite interpolation
function evalHermite(p0, d0, p1, d1, u) {
  let basisFunction = (u, c0, c1, c2, c3) =>
    c0 + u * c1 + u * u * c2 + u * u * u * c3;

  let b0 = basisFunction(u, 1, 0, -3, 2);
  let b1 = basisFunction(u, 0, 1, -2, 1);
  let b2 = basisFunction(u, 0, 0, 3, -2);
  let b3 = basisFunction(u, 0, 0, -1, 1);

  return [
    b0 * p0[0] + b1 * d0[0] + b2 * p1[0] + b3 * d1[0],
    b0 * p0[1] + b1 * d0[1] + b2 * p1[1] + b3 * d1[1],
  ];
}

export class HermiteCurve {
  constructor(points, tangents) {
    this.p = points;
    this.d = tangents;
  }
  
  isValid() { return this.p.length > 1; }
    
  eval(t) {
    let n = this.p.length;
    let k = this.seg(t);
    let h = t * (n - 1) - k;
    return evalHermite(this.p[k], this.d[k], this.p[k + 1], this.d[k + 1], h);
  }

  seg(t) {
    let n = this.p.length;
    return Math.min(Math.floor(t * (n - 1)), n - 2);
  }
}

export class CardinalCurve {
  constructor(points, s) {
    let tangents = [];
    for (let i = 0; i < points.length - 2; i++) {
      let j = i + 1;
      tangents[i] = [
        s * (points[j + 1][0] - points[j - 1][0]),
        s * (points[j + 1][1] - points[j - 1][1]),
      ];
    }

    this.innerCurve = new HermiteCurve(
      points.slice(1, points.length - 1),
      tangents
    );
  }

  isValid() { return this.innerCurve.isValid(); }
  
  eval(t) {
    return this.innerCurve.eval(t);
  }

  seg(t) {
    return this.innerCurve.seg(t);
  }
}

export class GeneralPiecewiseCurve {
    constructor(curves){
        this.curves = curves;
        this.count = curves.length;
    }
    
    isValid() { return this.curves.some(curve => curve.isValid()); }
  
    eval(t) {
        let h = t*this.count;
        let k = Math.min(Math.floor(h), this.count - 1);
        return this.curves[k].eval(h-k);
    }
    
    seg(t) {
      return Math.min(Math.floor(t * this.count), this.count - 1);
    }
}