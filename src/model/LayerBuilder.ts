import * as uuid from "uuid";
import { UniverseDataSource } from "@formant/universe-core";
import { PositioningBuilder } from "./PositioningBuilder";
import { Positioning, SceneGraphElement } from "./SceneGraph";

export class LayerBuilder {
  static ground(
    groundLayerConfig: {
      positioning?: Positioning;
      flat: boolean;
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), flat: true }
  ): SceneGraphElement {
    return {
      id: uuid.v4(),
      editing: false,
      type: "ground",
      name: "Ground",
      children: [],
      visible: true,
      position:
        groundLayerConfig.positioning || PositioningBuilder.fixed(0, 0, 0),
      fieldValues: {
        flatAxes: {
          type: "boolean",
          value: groundLayerConfig.flat,
        },
      },
      data: {},
    };
  }

  static deviceMarker(
    dotLayerConfig: {
      positioning?: Positioning;
      dataSources?: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ): SceneGraphElement {
    return {
      id: uuid.v4(),
      editing: false,
      type: "deviceDot",
      name: "Dot",
      children: [],
      visible: true,
      position: dotLayerConfig.positioning || PositioningBuilder.fixed(0, 0, 0),
      fieldValues: {},
      data: {},
      dataSources: dotLayerConfig.dataSources,
    };
  }

  static geometry(
    geometryLayerConfig: {
      positioning?: Positioning;
      dataSources: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ): SceneGraphElement {
    return {
      id: uuid.v4(),
      editing: false,
      type: "geometry",
      name: "Geometry",
      children: [],
      visible: true,
      position:
        geometryLayerConfig.positioning || PositioningBuilder.fixed(0, 0, 0),
      fieldValues: {},
      data: {},
      dataSources: geometryLayerConfig.dataSources,
    };
  }

  static map(
    mapLayerConfig: {
      positioning?: Positioning;
      dataSources?: UniverseDataSource[];
      longitude?: number;
      latitude?: number;
      size?: number;
    } = {
      positioning: PositioningBuilder.fixed(0, 0, 0),
      dataSources: [],
    }
  ): SceneGraphElement {
    return {
      id: uuid.v4(),
      editing: false,
      type: "map",
      name: "Map",
      children: [],
      visible: true,
      fieldValues: {
        longitude: {
          type: "number",
          value: mapLayerConfig.longitude || 0,
        },
        latitude: {
          type: "number",
          value: mapLayerConfig.latitude || 0,
        },
        size: {
          type: "number",
          value: mapLayerConfig.size || 0,
        },
      },
      position: mapLayerConfig.positioning || PositioningBuilder.fixed(0, 0, 0),
      data: {},
      dataSources: mapLayerConfig.dataSources,
    };
  } /*

  addUrdf(
    urdfLayerConfig: {
      positioning: Positioning;
      dataSources: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ) {
    this.scene.push({
      id: uuid.v4(),
      editing: false,
      type: "device_visual_tf",
      name: "URDF",
      deviceContext: this.deviceId,
      children: [],
      visible: true,
      position: urdfLayerConfig.positioning,
      fieldValues: {},
      data: {},
      dataSources: urdfLayerConfig.dataSources,
    });
    return this;
  }

  addGridMap(
    gridMapLayerConfig: {
      positioning: Positioning;
      dataSources: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ) {
    this.scene.push({
      id: uuid.v4(),
      editing: false,
      type: "grid_map",
      name: "Grid Map",
      deviceContext: this.deviceId,
      children: [],
      visible: true,
      position: gridMapLayerConfig.positioning,
      fieldValues: {},
      data: {},
      dataSources: gridMapLayerConfig.dataSources,
    });

    return this;
  }

  addPointCloud(
    pointCloudLayerConfig: {
      positioning: Positioning;
      dataSources: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ) {
    this.scene.push({
      id: uuid.v4(),
      editing: false,
      type: "point_cloud",
      name: "PointCloud",
      deviceContext: this.deviceId,
      children: [],
      visible: true,
      position: pointCloudLayerConfig.positioning,
      fieldValues: {
        pointColor: {
          type: "number",
          value: 0xffffff,
        },
        pointSize: {
          type: "number",
          value: 5,
        },
        pointTexture: {
          type: "text",
          value:
            "https://formant-3d-models.s3.us-west-2.amazonaws.com/point.png",
        },
        pointAttenuate: {
          type: "boolean",
          value: false,
        },
      },
      data: {},
      dataSources: pointCloudLayerConfig.dataSources,
    });
    return this;
  }

  addCustomLayer(
    customLayer: typeof UniverseLayer,
    customLayerConfig: {
      positioning: Positioning;
      dataSources: UniverseDataSource[];
    } = { positioning: PositioningBuilder.fixed(0, 0, 0), dataSources: [] }
  ) {
    LayerRegistry.register(customLayer);

    this.scene.push({
      id: uuid.v4(),
      editing: false,
      deviceContext: this.deviceId,
      type: customLayer.layerTypeId,
      name: customLayer.commonName,
      children: [],
      visible: true,
      position: customLayerConfig.positioning,
      fieldValues: {},
      data: customLayerConfig.dataSources,
    });
    return this;
  }
*/
}
