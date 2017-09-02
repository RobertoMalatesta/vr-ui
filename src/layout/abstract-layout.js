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

import Element from "../element";

/**
 *
 * Abstract class describing a layout: GridLayout, LinearLayout, ...
 *
 * @export
 * @class AbstractLayout
 */
export default class AbstractLayout extends Element {

    constructor( style ) {

        super( style );
        this._elements = [];

        this._onHoverExitWrapper = () => {

            if ( this._onHoverExit ) this._onHoverExit();

            this.forceExit();

        };

    }

    /**
     *
     * Adds a given element to the layout, allowing it visual space.
     *
     * @param  {VRUI.Element} element
     */
    add( element ) {

        if ( element === undefined || element === null ) {
            let errorMsg = `provided argument is null or undefined.`;
            throw Error( `AbstractLayout: add(): ` + errorMsg );
        }

        if ( arguments.length > 0 )
            for ( let elt of arguments ) this._addItem( elt );
        else if ( element.constructor === Array )
            for ( let elt of element ) this._addItem( elt );
        else
            this._addItem( element );

    }

    _addItem( element ) {

        if ( !( element instanceof Element ) ) {
            let errorMsg = `provided element is not an instance of Element`;
            throw Error( `AbstractLayout: addView(): ` + errorMsg );
        }

        this._elements.push( element );
        // Builds Three.js scene graph when building the VRUI custom
        // layouts / views hierarchy.
        this.group.add( element.group );

    }

    forceExit() {

        for ( let elt of this._elements ) {
            if ( elt.forceExit ) elt.forceExit();
            elt.hover = false;
        }

    }

    _intersect( raycaster, state ) {

        if ( !this._checkHover( raycaster, this._background,
                                this._onHoverEnter, this._onHoverExitWrapper ) )
            return false;

        for ( let elt of this._elements )
            if ( elt._intersect( raycaster, state ) ) return true;

        return true;

    }

}
