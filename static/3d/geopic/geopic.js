/*jshint esversion: 11 */
// @ts-check

import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";

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
selector.onchange = () => {
    const img_path = selector.value;

    if (img_path === "") { return }

    loadImage(img_path)
        .then(setGeoPic)
}

uploader.onchange = (event) => {
    const image = event.target.files[event.target.files.length - 1]
    if (image) {
        readFile(image)
            .then(setGeoPic)
    }
}


export class GeoPic extends GrObject {

    constructor() {
        super("geopic", []);

        /** @type {T.Group} */
        this.base = new T.Group();
        this.base.position.set(0, 0, 0);
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
        this.clear();

        const width  = image.width ;
        const height = image.height;
        const pixels = image.data  ;

        const center = new T.Group();
        center.position.set(0, 0, 0);


        // size (length, width, height) of each box
        const size = this._psize;

        // center of the boxes
        const cx = 0;
        const cy = 0;

        // the top-left corner of the boxes
        let tx = (cx - width *size / 2);
        let ty = (cy + height*size / 2);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {

                let i = (y*width + x) * 4;

                const color = `rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`;

                const geometry = new T.BoxGeometry(size, size, size);
                const material = new T.MeshBasicMaterial( { color: new T.Color(color), } ); 
                const cube = new T.Mesh(geometry, material);
                cube.position.x = tx + size*x;
                cube.position.y = ty - size*y;
                center.add(cube);
            }
        }

        this.imageGeo = center;
        this.base.add(center);
    }
}

const geopic = new GeoPic();

/**
 * @param {HTMLImageElement} data 
 */
function setGeoPic(data) {
    geopic.setImage(data);
}


let world = new GrWorld({
    groundplane: false,
    where: document.getElementById("canvas_div"),
});

world.add(geopic);

world.go();
