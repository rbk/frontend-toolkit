/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "googleMap",
        defaults = {
            coordinates : '36.1560901,-95.9834545',
            zoom    : 16,
            infobox : false,
            infodata  : 'Change me',
            phone   : '918-582-1881',
            place   : 'GuRuStu',
            scrollwheel: false,
            zoomControl: true,
            disableDefaultUI: true,
            panControl: false,
            // draggable: false,
            type: google.maps.MapTypeId.ROADMAP,
            styles : '',
            drawing: false
        };

    // [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}]

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
        this.addResizeListener();
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            // console.log( this.options );
            // console.log( $(this.element).attr('id') );
            var map_id = $(this.element).attr('id');

            // 1. Parse Coordinates, center map
            var coordinates = this.options.coordinates.split(',');
            lat = parseFloat(coordinates[0]) 
            lng = parseFloat(coordinates[1])
            var latlng = new google.maps.LatLng( lat, lng );
            this.options.coordinates = latlng;
            this.options.center = latlng;

            // 3. Setup map
            var map = new google.maps.Map( document.getElementById( map_id ), this.options);

            // 4. Add marker to map
            var marker = new google.maps.Marker({
                map: map,
                position: this.options.center
            });

            var infodata = this.options.infodata;

            // 5. Add info box
            var infowindow = new google.maps.InfoWindow();
            // http://maps.google.com/maps?saddr=&daddr=settings['place']

            infowindow.setContent(this.options.infodata);
            google.maps.event.addListener( marker, 'click', function(event) {
                infowindow.setContent(infodata);
                if( $(window).width() > 767 ){
                    infowindow.open(map, marker);
                }
            });
            if( $(window).width() > 767 ){
                infowindow.open(map, marker);
            }

            $(window).resize(function(){
                map.setCenter( latlng );
            });

            // Define the LatLng coordinates for the polygon's path.
            var triangleCoords = [
                {lat: 25.774, lng: -80.190},
                {lat: 18.466, lng: -66.118},
                {lat: 32.321, lng: -64.757},
                {lat: 25.774, lng: -80.190}
            ];
            var bluedome = [
                { lng: -95.99032759666443, lat: 36.157177095432516},
                { lng: -95.98921179771422, lat: 36.15515004928788},
                { lng: -95.98806381225585, lat: 36.155565857897386},
                { lng: -95.98705530166626, lat: 36.15372935323556},
                { lng: -95.98585367202759, lat: 36.154119180934245},
                { lng: -95.98635792732239, lat: 36.155089410348126},
                { lng: -95.98397612571715, lat: 36.155895038149474},
                { lng: -95.98545670509338, lat: 36.15859772901826},
                { lng: -95.99032759666443, lat: 36.157177095432516}
            ];

            // Construct the polygon.
            var bermudaTriangle = new google.maps.Polygon({
                paths: bluedome,
                strokeColor: '#2F89B9',
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: '#2F89B9',
                fillOpacity: 0.8
            });
            bermudaTriangle.setMap(map);

            // this.drawingManager();
        
            // var drawingManager = new google.maps.drawing.DrawingManager({
            //     drawingMode: google.maps.drawing.OverlayType.MARKER,
            //     drawingControl: true,
            //     drawingControlOptions: {
            //     position: google.maps.ControlPosition.TOP_CENTER,
            //     drawingModes: [
            //         google.maps.drawing.OverlayType.MARKER,
            //         google.maps.drawing.OverlayType.CIRCLE,
            //         google.maps.drawing.OverlayType.POLYGON,
            //         google.maps.drawing.OverlayType.POLYLINE,
            //         google.maps.drawing.OverlayType.RECTANGLE
            //         ]
            //     },
            //     circleOptions: {
            //         fillColor: '#ffff00',
            //         fillOpacity: 1,
            //         strokeWeight: 5,
            //         clickable: false,
            //         editable: true,
            //         zIndex: 1
            //     }
            // });
            // drawingManager.setMap(map);
            // google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            //     // var radius = polygon.getRadius();
            //     console.log( polygon );
            // });
        },

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );