import {Component, OnInit} from '@angular/core';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  map:any = null;
  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [31, 51],
        zoom: 5,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }
}
