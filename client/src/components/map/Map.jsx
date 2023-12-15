import React from "react";
import ListOfEvents from "./ListOfEvents.jsx";
import Comments from "./Comments.jsx";

const Map = () => {

    return (
        <div>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

            <gmp-map id="marker-click-event-example" center="22.3193, 114.1694" zoom="15" map-id="DEMO_MAP_ID">
                <gmp-advanced-marker position="22.3193, 114.1694" title="MK"></gmp-advanced-marker>
                <gmp-advanced-marker position="22.3193, 114.1894" title="ToGuaWan"></gmp-advanced-marker>
            </gmp-map>

            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBedbw_-j59ihSLX0n4GEezzV0e4bt3IPY&callback=initMap&libraries=marker&v=beta"
                defer></script>
                
            <ListOfEvents />
            <Comments />
        </div>
    )
}

export default Map;