import React, { useEffect, useRef } from 'react';
import './stylesheets/App.scss';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from './components/layout';
import PizzaLocIconActive from './assets/pizza_icon_active.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import PizzaMarker from './assets/pizza_marker';
import locations from './data/locations.json';

function App() {
  const mapRef = useRef();

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if (!map) return;

    map.eachLayer((layer = {}) => {
      const { options } = layer;
      const { name } = options;

      if (name !== 'Mapbox') {
        map.removeLayer(layer);
      }
    });

    const geoJson = new L.GeoJSON(locations, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
          icon: new L.Icon({
            iconUrl: PizzaLocIconActive,
            iconSize: [35, 35],
            popupAnchor: [0, -15],
            shadowUrl: markerShadow,
            shadowAnchor: [13, 28],
          }),
        });
      },

      onEachFeature: (feature = {}, layer) => {
        const { properties = {}, geometry = {} } = feature;
        const {
          name,
          delivery,
          takeout,
          noContact,
          outdoorSeating,
          deliveryRadius,
          description,
          tags,
          phone,
          website,
        } = properties;
        const { coordinates } = geometry;

        let deliveryZoneCircle;

        if (delivery) {
          deliveryZoneCircle = L.circle(coordinates.reverse(), {
            radius: deliveryRadius,
            color: 'tomato',
          });
        }

        const popup = L.popup();

        const html = `
          <div class="pizza_popup">
            <h3>${name}</h3>
            <ul>
            <li>
                <strong>Description:</strong> ${description}
              </li>
              <li>
                <strong>Delivery:</strong> ${delivery ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Takeout:</strong> ${takeout ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>No Contact:</strong> ${noContact ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Outdoor Seating:</strong> ${
                  outdoorSeating ? 'Yes' : 'No'
                }
              </li>
              <li>
                <strong>Phone:</strong> ${phone}
              </li>
              <li>
                <strong>Website:</strong> <a href="${website}">${website}</a>
              </li>
              <li>
                <strong><i>${tags.join(', ')}</i></strong>
              </li>
            </ul>
          </div>
        `;

        popup.setContent(html);

        layer.bindPopup(popup);

        layer.on('mouseover', () => {
          if (deliveryZoneCircle) {
            deliveryZoneCircle.addTo(map);
          }
        });

        layer.on('mouseout', () => {
          if (deliveryZoneCircle) {
            deliveryZoneCircle.removeFrom(map);
          }
        });
      },
    });
    geoJson.addTo(map);
  }, [mapRef]);

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if (!map) return;

    map.on('locationfound', handleOnLocationFound);

    return () => {
      map.off('locationfound', handleOnLocationFound);
    };
  }, [mapRef]);

  function handleOnLocationFound(event) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    const latlng = event.latlng;

    const marker = L.marker(latlng);

    marker.addTo(map);

    const radius = event.accuracy;

    const circle = L.circle(latlng, { radius, color: 'rgb(218, 211, 195)' });

    circle.addTo(map);
  }

  function handleOnFindLocation() {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.locate({ setView: true });
  }

  return (
    <Layout>
      <div className="float-right loc_btn_wrap">
        <button className="my_loc btn" onClick={handleOnFindLocation}>
          <PizzaMarker baseLayer="loc_icon" /> Find My Location
        </button>
      </div>
      <Map ref={mapRef} center={[40.654817, -73.963498]} zoom={13}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        />
      </Map>
    </Layout>
  );
}

export default App;
