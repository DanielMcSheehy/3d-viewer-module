import { Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';
import { computeDestinationPoint } from 'geolib';
import { GeolibGeoJSONPoint } from 'geolib/es/types';
import { Fleet } from '@formant/data-sdk';
import { UniverseLayer } from './UniverseLayer';

const mapBoxConfig = {
  username: 'mapbox',
  styleId: 'satellite-v9',
  width: 1200,
  height: 1200,
  bearing: 0,
  accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
};

export class MapLayer extends UniverseLayer {
  static layerTypeId = 'map';

  static commonName = 'Map';

  static description = 'A plane showing satellite data';

  static usesData = true;

  loaded: boolean = false;

  texture?: Texture;

  mesh?: Mesh;

  location: GeolibGeoJSONPoint = [0, 0];

  distance: number = 300;

  static fields = {
    latitude: {
      name: 'Latitude',
      description: '',
      value: 0,
      type: 'number' as const,
      placeholder: 0,
      location: ['create' as const, 'edit' as const],
    },
    longitude: {
      name: 'Longitude',
      description: '',
      value: 0,
      type: 'number' as const,
      placeholder: 0,
      location: ['create' as const, 'edit' as const],
    },
    size: {
      name: 'Size',
      description: 'Size of the map in meters',
      value: 0,
      type: 'number' as const,
      placeholder: 0,
      location: ['create' as const, 'edit' as const],
    },
  };

  async init() {
    const device = await Fleet.getCurrentDevice();
    await device
      .getTelemetry(
        'base_station.location',
        new Date(Date.now() - 2000),
        new Date()
      )
      .then((results) => {
        this.location = [
          Number(results[0].points[0][1].longitude),
          Number(results[0].points[0][1].latitude),
        ];
      });
    this.distance = (this.getField(MapLayer.fields.size) || 0) / 2;

    this.onData();
  }

  onData = () => {
    const { username, styleId, width, height, accessToken } = mapBoxConfig;

    this.texture = new Texture();

    // calculate bounding box, given center and distance
    const bearings = {
      north: 0,
      east: 90,
      south: 180,
      west: 270,
    };
    const EARTH_RADIUS_IN_METERS = 6371e3;
    const maxLatitude = computeDestinationPoint(
      this.location,
      this.distance,
      bearings.north,
      EARTH_RADIUS_IN_METERS
    ).latitude.toFixed(8);
    const minLatitude = computeDestinationPoint(
      this.location,
      this.distance,
      bearings.south,
      EARTH_RADIUS_IN_METERS
    ).latitude.toFixed(8);
    const maxLongitude = computeDestinationPoint(
      this.location,
      this.distance,
      bearings.east,
      EARTH_RADIUS_IN_METERS
    ).longitude.toFixed(8);
    const minLongitude = computeDestinationPoint(
      this.location,
      this.distance,
      bearings.west,
      EARTH_RADIUS_IN_METERS
    ).longitude.toFixed(8);

    const mapImageUrl = `https://api.mapbox.com/styles/v1/${username}/${styleId}/static/[${minLongitude},${minLatitude},${maxLongitude},${maxLatitude}]/${width}x${height}@2x?logo=false&access_token=${accessToken}`;
    fetch(mapImageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const img = new Image();

        img.src = URL.createObjectURL(blob);

        img.onload = () => {
          if (this.texture) {
            this.texture.image = img;
            URL.revokeObjectURL(img.src);
            this.texture.needsUpdate = true;
          } else {
            throw new Error('error initializing texture');
          }
        };
      });

    const material = new MeshBasicMaterial({
      map: this.texture,
    });
    const geometry = new PlaneGeometry(
      this.distance * 2,
      this.distance * 2,
      100,
      100
    );
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.z = -0.001;

    this.add(this.mesh);

    // const surroundingMeshes = [];

    // for (let i = -1; i <= 1; i += 1) {
    //   for (let j = -1; j <= 1; j += 1) {
    //     // Don't add a plane if it's the center one
    //     // eslint-disable-next-line no-continue
    //     if (i === 0 && j === 0) continue;

    //     const surroundingMaterial = new MeshBasicMaterial({
    //       map: null,
    //     });
    //     const surroundingGeometry = new PlaneGeometry(
    //       this.distance * 2,
    //       this.distance * 2,
    //       100,
    //       100
    //     );
    //     const surroundingMesh = new Mesh(
    //       surroundingGeometry,
    //       surroundingMaterial
    //     );
    //     surroundingMesh.position.x = i * this.distance * 2;
    //     surroundingMesh.position.y = j * this.distance * 2;
    //     surroundingMesh.position.z = -0.001;

    //     surroundingMeshes.push(surroundingMesh);
    //   }
    // }

    // console.log(surroundingMeshes);
    // for (let i = 0; i < numImagesX; i += 1) {
    //   for (let j = 0; j < numImagesY; j += 1) {
    //     // Calculate the latitude and longitude of the center of this image
    //     const imageLat = (Number(this.location[1]) + j * imageSizeY).toFixed(4);
    //     const imageLng = (Number(this.location[0]) + i * imageSizeX).toFixed(4);

    //     const mapImageUrl2 = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${imageLng},${imageLat},19/${width}x${height}?access_token=${accessToken}`;

    //     fetch(mapImageUrl2)
    //       .then((response) => response.blob())
    //       .then((blob) => {
    //         const gridTexture = new Texture();
    //         const mapImage = new Image();
    //         mapImage.src = URL.createObjectURL(blob);
    //         mapImage.onload = () => {
    //           gridTexture.image = mapImage;
    //           gridTexture.needsUpdate = true;
    //           const planeIndex = i + j * numImagesX;
    //           if (surroundingMeshes[planeIndex]) {
    //             surroundingMeshes[planeIndex].material.map = gridTexture;
    //             // surroundingMeshes[planeIndex].material.needsUpdate = true;
    //             console.log(surroundingMeshes[planeIndex]);
    //             this.add(surroundingMeshes[planeIndex]);
    //           }
    //         };
    //       })
    //       .catch(console.error);
    //   }
    // }
  };
}
