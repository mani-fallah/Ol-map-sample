import {Component, OnInit} from '@angular/core';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from "ol/proj";
import {Zoom} from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";
declare var bootstrap:any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  map:any = null;
  cordinater:any = [] ;
  selectedLocation:any;
  mapExist:boolean = false;
  aLocationIsSelected:boolean =false;
  ngOnInit(): void {

  }

  showMapDetails() {
    console.log(this.selectedLocation)
  }
  openMap()
  {
    let myModal = new bootstrap.Modal(document.getElementById('mapModal'),{})
      myModal.show()
    if(!this.mapExist)
    {
      setTimeout(()=>{
        this.map = new Map({
          view: new View({
            center: fromLonLat([51.33812368044173, 35.69968993834624]),
            zoom: 9,
          }),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          controls:[
            new Zoom()
          ]
          ,
          target: 'olmap'
        });

        const markers:any = new VectorLayer({
          source: new VectorSource(),
          style: new Style({
            image : new Icon({
              anchor: [0.5,1],
              src: 'favicon.ico',
              scale: 0.5
            })
          })
        })
        if(this.map)
        {    let myPoint:any
          this.map.on("click",(eve:any)=>{
            this.selectedLocation = toLonLat(eve.coordinate);

            if(!this.aLocationIsSelected)
            {
              this.map.addLayer(markers);
              myPoint = new Feature(new Point(eve.coordinate))
              markers.getSource().addFeature(myPoint);
              console.log(markers)
              this.aLocationIsSelected = true;
            }
            else {
              this.map.removeLayer(markers);
              markers.getSource().removeFeature(myPoint)
              this.aLocationIsSelected = false;
            }
            console.log(eve.coordinate)
          });

        }

        this.mapExist=true

      },1000)


    }

  }
}
