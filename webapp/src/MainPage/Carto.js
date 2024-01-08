import React, { useState, useEffect } from 'react';
import SideMenu from './SideMenu.js';
import { MapContainer, FeatureGroup, Rectangle, Polygon } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import styles from '../Style/Carto.module.css';
import { CRS } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function DrawZones(zones) {
    const cellWidth = zones.width / zones.nbcolumn;
    const cellHeight = zones.height / zones.nbline;
    const cells = [];

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

function Carto() {
    const [zones, setZones] = useState([]);

    useEffect(() => {
        // Récupère les zones de la base de données
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/zones', {
            method: 'GET',
            headers: {
                Authorization: `${token}`
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
                console.log(data);
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
                        {zones.map(zone => (
                            DrawZones(zone)
                        ))}
                        <EditControl
                            position='topright'
                            onEdited={e => {
                                console.log('onEdited', e);
                            }}
                            onCreated={e => {
                                console.log('onCreated', e);
                            }}
                            onDeleted={e => {
                                console.log('onDeleted', e);
                            }}
                            draw={{
                                polyline: false,
                                polygon: true,
                                circle: false,
                                marker: false,
                                circlemarker: false,
                                rectangle: false
                            }}
                            edit={{
                                edit: true,
                                remove: true
                            }}
                        />
                    </FeatureGroup>
                </MapContainer>
            </div>
        </>
    );
}

export default Carto;
