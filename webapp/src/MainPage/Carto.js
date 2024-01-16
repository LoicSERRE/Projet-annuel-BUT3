import React, { useState, useEffect } from 'react';
import SideMenu from './SideMenu.js';
import CustomEditControl from './CustomEditControl.js';
import { MapContainer, useMapEvents, FeatureGroup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import styles from '../Style/Carto.module.css';
import { CRS } from 'leaflet';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

/**
 * Draw the zones on the map
 * @param {*} zones
 * @returns the zones on the map
 */
function DrawZones(zones) {
    const cellWidth = zones.width / zones.nbcolumn;
    const cellHeight = zones.height / zones.nbline;
    const cells = [];

    // Draw the name of the zone on the top center of the zone
    const markerIcon = L.divIcon({
        className: "my-custom-icon",
        html: `${zones.name}`
    });
    let markerPosition;
    // Condition to place the marker on the top center of the zone
    if (zones.nbline > zones.nbcolumn) {
        markerPosition = [zones.y + (cellHeight * zones.nbline) + cellHeight * 2, zones.x + cellWidth / 2 * zones.nbcolumn];
    } else {
        markerPosition = [zones.y + (cellWidth * zones.nbcolumn * 2) + cellWidth * 2, zones.x + cellHeight / 2 * zones.nbline/2];
    }
    cells.push(
        <Marker position={markerPosition} icon={markerIcon} />
    );

    // Draw the id of the zone on the top left of the zone
    const markerIconId = L.divIcon({
        className: "my-custom-icon",
        html: `${zones.zone_id}`
    });
    let markerPositionId;
    // Condition to place the marker on the top left of the zone
    if (zones.nbline > zones.nbcolumn) {
        markerPositionId = [zones.y + (cellHeight * zones.nbline) + cellHeight * 3, zones.x + cellWidth / 2 * zones.nbcolumn + 2];
    } else {
        markerPositionId = [zones.y + (cellWidth * zones.nbcolumn * 2) + cellWidth * 3, zones.x + cellHeight / 2 * zones.nbline/2 + 2];
    }
    cells.push(
        <Marker position={markerPositionId} icon={markerIconId} />
    );

    for (let i = 0; i < zones.nbline; i++) {
        for (let j = 0; j < zones.nbcolumn; j++) {
            const x = zones.x + j * cellWidth;
            const y = zones.y + i * cellHeight;
            cells.push(
                <Rectangle
                    key={`${zones.zones_id}-${i}-${j}`}
                    bounds={[[y, x], [y + cellHeight, x + cellWidth]]}
                    color="blue"
                />
            );
            if (j === 0) {
                const markerIcon = L.divIcon({
                    className: "my-custom-icon", // optional, you can use it to style the DivIcon
                    html: `${i + 1}`
                });
                let markerPosition = zones.nbline > zones.nbcolumn ? [y + cellHeight / 2, x - cellHeight / 2] : [y + cellHeight / 2, x - cellWidth / 2];
                cells.push(
                    <Marker position={markerPosition} icon={markerIcon} />
                );
            }
            if (i === zones.nbline - 1) {
                const markerIcon = L.divIcon({
                    className: "my-custom-icon", // optional, you can use it to style the DivIcon
                    html: `${j + 1}`
                });
                let markerPosition = zones.nbline > zones.nbcolumn ? [y + cellHeight * 1.5, x + cellWidth / 2] : [y + cellHeight * 1.2, x + cellWidth / 2];
                cells.push(
                    <Marker key={`${i}-${j}`} position={markerPosition} icon={markerIcon} />
                );
            }
        }
    }

    return cells;
}

function MousePosition() {
    const [position, setPosition] = useState(null);
    useMapEvents({
        mousemove: (e) => {
            setPosition(e.latlng);
        },
    });

    return position ? (
        <p className={styles.mouseposition}>
            X: {position.lat.toFixed(2)}, Y: {position.lng.toFixed(2)}
        </p>
    ) : null;
}

function Carto() {
    const [zones, setZones] = useState([]);

    useEffect(() => {
        // Récupère les zones de la base de données
        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_IP + '/zones', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            }
            )
            .then(data => {
                setZones(data);
            }
            )
            .catch(err => {
                console.log(err);
            }
            );
    }, []);

    return (
        <>
            <SideMenu />
            <div className={styles.container}>
                <h1 className={styles.title}>Éditeur de cartographie</h1>
                <MapContainer className={styles.mapContainer} center={[100, 100]} zoom={2} style={{ height: "90vh", width: "95%" }} crs={CRS.Simple}>
                    <FeatureGroup>
                        {zones.map((zone, index) => (
                            <React.Fragment key={index}>
                                {DrawZones(zone)}
                            </React.Fragment>
                        ))}
                        <CustomEditControl />
                    </FeatureGroup>
                    <MousePosition />
                </MapContainer>
            </div>
        </>
    );
}

export default Carto;
