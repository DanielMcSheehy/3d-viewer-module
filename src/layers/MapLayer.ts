import {
  CanvasTexture,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
} from 'three';
import * as uuid from 'uuid';
import { IUniverseData } from '@formant/universe-core';
import { UniverseLayer } from './UniverseLayer';
import { LayerSuggestion } from './LayerRegistry';

export class MapLayer extends UniverseLayer {
  static layerTypeId = 'map';

  static commonName = 'Map';

  static description = 'A plane showing satellite data';

  static usesData = true;

  static async getLayerSuggestions(
    universeData: IUniverseData,
    deviceContext?: string
  ): Promise<LayerSuggestion[]> {
    const dataLayers: LayerSuggestion[] = [];
    if (deviceContext) {
      (await universeData.getHardwareStreams(deviceContext)).forEach(
        (stream) => {
          if (stream.rtcStreamType === 'h264-video-frame') {
            dataLayers.push({
              sources: [
                {
                  id: uuid.v4(),
                  sourceType: 'hardware',
                  rtcStreamName: stream.name,
                },
              ],
              layerType: MapLayer.layerTypeId,
            });
          }
        }
      );
    }
    return dataLayers;
  }

  loaded: boolean = false;

  ctx?: CanvasRenderingContext2D;

  texture?: CanvasTexture;

  mesh?: Mesh;

  group?: Group;

  init() {
    // const dataSource = defined(this.layerDataSources)[0];
    // defined(this.universeData).subscribeToVideo(
    //   defined(this.getLayerContext()).deviceId,
    //   defined(dataSource),
    //   (d) => {
    //     if (typeof d === 'symbol') {
    //       throw new Error('unhandled data status');
    //     }
    //     this.onData(d as HTMLCanvasElement);
    //   }
    // );
    this.onData();
  }

  onLayerPartsRequested(): {
    [key in string]: Material | Mesh | Group | Object3D | undefined;
  } {
    return {};
  }

  onData = () => {
    const material = new MeshBasicMaterial({});
    const geometry = new PlaneGeometry(1, 1);
    this.mesh = new Mesh(geometry, material);

    this.add(this.mesh);
    this.mesh.scale.set(10, 10, 0);
  };
}
