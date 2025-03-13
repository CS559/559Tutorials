/*jshint esversion: 11 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import * as AutoUI  from "../../libs/CS559-Framework/AutoUI.js";
import { OrbitControls } from "../../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

// Get HTML Elements

const selector = /** @type HTMLSelectElement | null */ (document.getElementById("image_selector"));
if (!selector) { throw Error("missing image selector") }

const uploader = /** @type HTMLInputElement | null */ (document.getElementById("image_uploader"));
if (!uploader) { throw Error("missing image uploader") }

// --- Helper Functions ---

/**
 * @param {string} source The path to the image.
 * @returns {Promise<HTMLImageElement>} The pixel data of the image.
 */
function loadImage(source) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(`failed to load image ${source}`)
        }
        img.src = source;
    });
}

/**
 * Reads image we know the location of and returns its pixels.
 * @param {HTMLImageElement} img The image.
 * @param {number} width Width of the image (will resize it).
 * @param {number} height Height of the image (will resize it).
 * @returns {Promise<ImageData>} The pixel data of the image.
 */
async function imagePixels(img, width, height) {

    // write image to a canvas

    const cv = document.createElement("canvas");
    document.body.appendChild(cv);

    // The height and width of the image.
    cv.width  = width;
    cv.height = height;

    const c = cv.getContext("2d");
    if (!c) {
        document.body.removeChild(cv);
        throw Error("failed to load image because a 2D context could not be gotten")
    }

    c.imageSmoothingQuality = "low";
    c.imageSmoothingEnabled = false;

    c.save()
        c.fillStyle = "white";
        c.fillRect(0, 0, cv.width, cv.height);
    c.restore()

    c.drawImage(img, 0, 0, cv.width, cv.height);

    // get and return the pixel data written to the canvas

    const data = c.getImageData(0, 0, cv.width, cv.height);

    document.body.removeChild(cv);

    return data;
}

/**
 * @param {File} file 
 * @returns {Promise<HTMLImageElement>}
 */
async function readFile(file) {
    return new Promise((resolve, reject) => {

        // load file

        const fr = new FileReader();
        fr.onload = function () {

            const rs = fr.result;
            if (rs) {
                if (typeof rs == "string") {

                    // now that the file is loaded, load its contents into an image and return said image
                    const img = new Image();
                    img.onload  = () => resolve(img)
                    img.onerror = () => reject("image failed to load")
                    img.src = rs;

                } else {
                    reject("file did not load as a string");
                }
            } else {
                reject("file failed to load");
            }
        }
        fr.onerror = () => {
            reject("file failed to load")
        }
        fr.readAsDataURL(file);
    });
}

selector.value = "";
let selectorOnChange = () => {
    const img_path = selector.value;

    if (img_path === "") { return }

    loadImage(img_path)
        .then(setGeoPic)
};
selector.onchange = selectorOnChange;

uploader.onchange = (event) => {
    const image = event.target.files[event.target.files.length - 1]
    if (image) {
        readFile(image)
            .then(setGeoPic)
    }
}


export class GeoPic extends GrObject {

    constructor() {

        let group = new T.Group();
        super("GeoPic", group, [
            ["width"     , 10   , 600, 100, 10    ],
            ["height"    , 10   , 600, 100, 10    ],
            ["pixel_size", 0.01 , 1  , 0.1,  0.010],
        ]);

        /** @type {T.Group} */
        this.base = group;
        this.base.position.set(0, 0, 0);
        this.base.rotation.set(0, Math.PI, Math.PI/2);
        this.objects.push(this.base);

        /** @type {T.Group | null} */
        this.imageGeo = null;

        /** @type {HTMLImageElement | null} */
        this._image = null;

        /** @type {number} */
        this._width  = 100;
        /** @type {number} */
        this._height = 100;
        /** @type {number} The size of the "pixels". */
        this._psize = 0.1;
    }

    update(vals) {
        this._width  = vals[0];
        this._height = vals[1];
        this._psize  = vals[2];
        if (this._image) {
            this.setImage(this._image);
        }
    }

    /**
     * Removes the current image if there is one.
     */
    clear() {
        if (this.imageGeo) {
            this.base.remove(this.imageGeo);
            this.imageGeo = null;
        }
    }

    /**
     * @param {number} width The new width of the picture (in pixels).
     */
    set width(width) {
        this._width = width;
        if (this._image) {
            this.setImage(this._image);
        }
    }

    /**
     * @returns {number} The width of this picture (in pixels).
     */
    get width() {
        return this._width
    }

    /**
     * @param {number} height The new height of the picture (in pixels).
     */
    set height(height) {
        this._height = height;
        if (this._image) {
            this.setImage(this._image);
        }
    }

    /**
     * @returns {number} The height of this picture (in pixels).
     */
    get height() {
        return this._height
    }

    /**
     * @params {number} size The size of each pixel in THREE units.
     */
    set pixel_size(size) {
        this._psize = size;
        if (this._image) {
            this.setImage(this._image);
        }
    }

    /**
     * @returns {number} The size of each pixel in THREE units.
     */
    get pixel_size() {
        return this._psize
    }

    /**
     * @param {HTMLImageElement} image 
     */
    setImage(image) {
        this.clear();
        this._image = image;
        imagePixels(image, this._width, this._height)
            .then((data) => this.setImageData(data))
    }

    /**
     * @param {ImageData} image 
     * @protected
     */
    setImageData(image) {

        const width  = image.width ;
        const height = image.height;
        const pixels = image.data  ;

        // size (length, width, height) of each box
        const size = this._psize;

        // center of the boxes
        const cx = 0;
        const cy = 0;

        // the top-left corner of the boxes
        let tx = (cx - width *size/2);
        let ty = (cy + height*size/2);

        /** @type {number[]} */
        const verts = [];
        /** @type {number[]} */
        const colors = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {

                {
                    const l = tx + size*x;
                    const r = l  + size  ;
                    const t = ty - size*y;
                    const b = t  - size  ;

                    verts.push(
                        b,r,0, t,l,0, t,r,0, 
                        b,r,0, b,l,0, t,l,0,
                    );
                }

                {
                    const i = (y*width + x) * 4;
                    const [r, g, b] = [pixels[i]/255, pixels[i+1]/255, pixels[i+2]/255];
                    colors.push(r,g,b, r,g,b, r,g,b, r,g,b, r,g,b, r,g,b,);
                }
            }
        }

        // -- Create the Geometry/Material/Mesh --

        const center = new T.Group();
        center.position.set(0, 0, 0);

        let geom = new T.BufferGeometry();
        geom.setAttribute("position", new T.Float32BufferAttribute(new Float32Array(verts ), 3));
        geom.setAttribute("color"   , new T.Float32BufferAttribute(new Float32Array(colors), 3));

        const mat = new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide, });

        const mesh = new T.Mesh(geom, mat);

        center.add(mesh);

        // -- Set the Mesh --

        this.clear();
        this.imageGeo = center;
        this.base.add(center);
    }
}

export class TexPic extends GrObject {
    constructor() {
        const group = new T.Group();
        group.position.set(0, 0, 0);

        super("TexPic", group, [
            ["width"     , 10   , 600, 100, 10   ],
            ["height"    , 10   , 600, 100, 10   ],
            ["pixel_size", 0.01 , 1  , 0.1, 0.010],
        ]);

        /** @type {T.Group} */
        this._group = group;

        /** @type {T.Group | null} */
        this._geoGroup = null;

        /** @type {HTMLImageElement | null} */
        this._image = null;

        /** @type {number} */
        this._width = 100;

        /** @type {number} */
        this._height = 100;

        /** @type {number} */
        this._psize = 0.1;
    }

    update(vals) {
        this._width  = vals[0];
        this._height = vals[1];
        this._psize  = vals[2];
        if (this._image) {
            this.setImage(this._image);
        }
    }

    clear() {
        if (this._geoGroup) {
            this._group.remove(this._geoGroup);
            this._geoGroup = null;
            this._image = null;
        }
    }

    /**
     * @param {HTMLImageElement} img 
     */
    setImage(img) {

        const cv = document.createElement("canvas");
        document.body.appendChild(cv);

        const width  = this._width ;
        const height = this._height;

        // The height and width of the image.
        cv.width  = width ;
        cv.height = height;

        const c = cv.getContext("2d");
        if (!c) {
            document.body.removeChild(cv);
            throw Error("failed to load image because a 2D context could not be gotten")
        }

        c.imageSmoothingQuality = "low";
        c.imageSmoothingEnabled = false;

        c.save()
            c.fillStyle = "white";
            c.fillRect(0, 0, cv.width, cv.height);
        c.restore()
        c.drawImage(img, 0, 0, cv.width, cv.height);

        document.body.removeChild(cv);

        const texture = new T.CanvasTexture(cv);

        // the square showing the texture
        const sqGeom = new T.BufferGeometry();
        const pw = width *this._psize;
        const ph = height*this._psize;
        const sqXYZ = new Float32Array([
            0,0,0,
            pw,0,0,
            0,ph,0,
            pw,ph,0
        ]);
        const sqUV  = new Float32Array([0,0, 1,0, 0,1, 1,1]);
        sqGeom.setAttribute("position", new T.BufferAttribute(sqXYZ,3) );
        sqGeom.setAttribute("uv", new T.BufferAttribute(sqUV,2) );
        sqGeom.setIndex([0,1,2,3,2,1]);
        sqGeom.computeVertexNormals();
        const texMat = new T.MeshBasicMaterial({ map: texture, side: T.DoubleSide, });
        const mesh = new T.Mesh(sqGeom, texMat);

        const geoGroup = new T.Group();
        geoGroup.add(mesh);
        geoGroup.position.set(-pw/2, -ph/2, 0);

        this.clear();
        this._image = img;
        this._geoGroup = geoGroup;
        this._group.add(geoGroup);
    }
}

const geopic = new GeoPic();
const texpic = new TexPic();

/**
 * @param {HTMLImageElement} data 
 */
function setGeoPic(data) {
    geopic.setImage(data);
    texpic.setImage(data);
}

selector.value = "./snow_flakes.svg";
selectorOnChange();

// -- GeoPic --

let geopic_world = new GrWorld({
    groundplane: false,
    where: document.getElementById("geopic_canvas"),
    width : 300,
    height: 300,
});

geopic_world.add(geopic);
//geopic.setPos(-10, 0, 0)
geopic_world.camera.position.set(0, 0, 14);

geopic_world.go();

// -- TexPic --

let texpic_world = new GrWorld({
    groundplane: false,
    where: document.getElementById("texpic_canvas"),
    width : 300,
    height: 300,
});

texpic_world.camera.position.set(0, 0, 14);

texpic_world.add(texpic);
//texpic.setPos( 1, 0, 0)

texpic_world.go();

// -- UI --

new AutoUI.AutoUI(texpic, 250, /** @type {any} */ (document.getElementById("div1")));
new AutoUI.AutoUI(geopic, 250, /** @type {any} */ (document.getElementById("div2")));
