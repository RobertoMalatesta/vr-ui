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

import LinearLayout from './linear-layout';

export default class VerticalLayout extends LinearLayout {

    constructor( data, style ) {

        super( data, style );
        this.type = `vertical-layout`;

    }

    refresh( maxEltWidth, maxEltHeight ) {

        // TODO: Padding and marging are not working correctly.

        super.refresh( maxEltWidth, maxEltHeight );

        let dimensions = this._dimensions;
        let padding = dimensions.padding;

        let offset = {
            top: padding.top,
            bottom: padding.bottom,
            x: padding.left - padding.right
        };

        let horizontalPad = padding.right + padding.left;
        let verticalPad = padding.top + padding.bottom;

        let maxWidthPerElt = dimensions.width - horizontalPad;
        let maxHeightPerElt = dimensions.height - verticalPad;

        for ( let elt of this._elements ) {
            elt.refresh( maxWidthPerElt, maxHeightPerElt );
            let eltDim = elt._dimensions;

            switch ( elt.style.align ) {
                case `top`:
                    offset.top += eltDim.margin.top;
                    elt.group.position.y = - offset.top;
                    offset.top += eltDim.height + eltDim.margin.bottom;
                    break;
                case `center`:
                    let warnMsg = `\'center\' is not supported yet with this layouts`;
                    console.warn( `VerticalLayout.refresh(): ` + warnMsg );
                    break;
                case `bottom`:
                    offset.bottom += eltDim.margin.bottom;
                    elt.group.position.y = offset.bottom - dimensions.height + eltDim.height;
                    offset.bottom += eltDim.height + eltDim.margin.top;
                    break;
            }

            switch ( elt.style.position ) {
                // The UI has a top left coordinate system by default.
                // We do not need to do anything here. We do not need the 'left'
                // case.
                case `right`:
                    elt.group.position.x = maxWidthPerElt - eltDim.width;
                    break;
                case `center`:
                    elt.group.position.x = maxWidthPerElt * 0.5 - eltDim.halfW;
                    break;
            }

        }

    }

    /**
     * Checks whether the layout is full or not.
     * Note: this function is O(n), because developer can remove elements by
     * hand.
     */
    isFull() {

        let height = 0.0;
        for ( let elt of this._elements ) {
            height += elt.style.height;
        }
        return height >= 1.0;

    }

}
