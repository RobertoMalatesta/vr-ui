/**
* VRUI Javascript UI Library
* https://github.com/artflow-vr/vr-ui
*
* MIT License
*
* Copyright (c) 2017 artflow-vr
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

import ElementView from './element-view';
import { PLANE_GEOM } from '../utils/geometry-factory';
import { IMAGE_DEFAULT } from '../utils/material-factory';

export default class ImageButton extends ElementView {

    constructor( imageOrMaterial, style ) {

        if ( !imageOrMaterial ) {
            let errorMsg = `you did not provide any texture.`;
            throw Error( `ButtonView.ctor(): ` + errorMsg );
        }

        let material = null;

        if ( imageOrMaterial.constructor === THREE.Texture ) {
            material = IMAGE_DEFAULT.clone();
            material.map = imageOrMaterial;
        } else if ( imageOrMaterial instanceof THREE.Material ) {
            material = imageOrMaterial.clone();
        } else {
            let errorMsg = `the provided image is neither a THREE.Texture, `;
            errorMsg += `nor a THREE.Material object.`;
            throw Error( `ButtonView.ctor(): ` + errorMsg );
        }

        super( new THREE.Mesh( PLANE_GEOM, material ), style );
        this.type = `button`;

    }

    clone() {

        return new ImageButton( this.image.material, this.style );

    }

}
