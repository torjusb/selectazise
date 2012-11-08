( function ( window, document, undefined ) {
    "use strict";

    var Selectazise = function ( image ) {
        this.image = image; 

        this.createDimentions();
        this.imageData = this.getImageData();
        this.colors = this.parse();
    };

    Selectazise.prototype.MAX_COLS = 175;
    Selectazise.prototype.HEIGHT_COMPANSATOR_FACTOR = 1.75;

    Selectazise.prototype.getImageData = function () {
        var canvas = document.createElement( 'canvas' ),
            ctx;

        canvas.setAttribute( 'width', this.width );
        canvas.setAttribute( 'height', this.height );

        ctx = canvas.getContext( '2d' );
        ctx.drawImage( this.image, 0, 0, this.width, this.height );

        return ctx.getImageData( 0, 0, this.width, this.height );
    };

    Selectazise.prototype.createDimentions = function () {
        var scale;
        
        this.width = this.image.width;
        this.height = this.image.height;

        if ( this.width > this.MAX_COLS ) {
            scale = this.image.width / this.MAX_COLS;
            this.width = this.MAX_COLS;
            this.height = this.image.height / scale;
        }

        this.height = this.height / this.HEIGHT_COMPANSATOR_FACTOR;
    };


    Selectazise.prototype.parse = function () {
        var i = 0, count = 0, colors = [], data = this.imageData.data;

        for ( ; i < data.length; i += 4 ) {
            colors.push( [
                data[ i ],
                data[ i + 1 ],
                data[ i + 2 ],
                data[ i + 3 ]
            ] );
        }

        return colors;
    };

    Selectazise.prototype.generateHtml = function () {
        var html = '<pre>', i = 0;

        for ( ; i < this.colors.length; i++ ) {
            if ( i > 0 && i % this.width === 0 ) {
                html += '\n';
            }
            html += '<span id="item-' + i + '">a</span>';
        }

        return html += '</pre>';
    };

    Selectazise.prototype.generateCss = function () {
        var css = '', i = 0;

        for ( ; i < this.colors.length; i++ ) {
            css += '#item-' + i + '::-moz-selection {\n';
            css += '\tcolor:rgba(' + this.colors[ i ].join( ',' ) + ');\n';
            css += '\tbackground: rgba(' + this.colors[ i ].join( ',' ) + ');\n';
            css += '}\n\n';
        }

        return css;
    };

    window.Selectazise = Selectazise;

} ( this, document ) );

