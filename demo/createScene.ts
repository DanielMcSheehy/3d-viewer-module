import * as uuid from 'uuid';
import { SceneGraphElement } from '../src/main';

export const FARM_BOT_1_DEVICE_ID = 'farmbot1';
export const FARM_BOT_2_DEVICE_ID = 'farmbot2';
export const FARM_BOT_3_DEVICE_ID = 'farmbot3';

function createSatelliteLayer(
  baseStationLocationStream: string,
  size: number,
  mapVisibility: boolean = true
): SceneGraphElement {
  return {
    id: uuid.v4(),
    editing: false,
    type: 'map',
    name: 'Satellite Map',
    deviceContext: '',
    children: [],
    visible: mapVisibility,
    position: { type: 'manual', x: 0, y: 0, z: 0 },
    fieldValues: {
      size: {
        type: 'number',
        value: Number(size),
      },
    },
    data: {},
    dataSources: [
      {
        id: uuid.v4(),
        sourceType: 'telemetry',
        streamName: baseStationLocationStream,
        streamType: 'location',
      },
    ],
  };
}

function createRobot(
  name: string,
  deviceId: string,
  odometryStream: string,
  deviceVisibility: boolean = true
): SceneGraphElement {
  return {
    id: uuid.v4(),
    editing: false,
    type: 'empty',
    name,
    deviceContext: deviceId,
    children: [
      {
        id: uuid.v4(),
        editing: false,
        type: 'label',
        name: 'Device Name',
        deviceContext: deviceId,
        children: [],
        visible: true,
        position: {
          type: 'manual',
          x: 0,
          y: 0,
          z: 0.2,
        },
        fieldValues: {
          labelText: {
            type: 'text',
            value: name,
          },
        },
        data: {},
        dataSources: [],
      },
      {
        id: uuid.v4(),
        editing: false,
        type: 'deviceDot',
        name: 'Device Dot',
        deviceContext: undefined,
        children: [],
        visible: true,
        position: { type: 'manual', x: 0, y: 0, z: 0 },
        fieldValues: {},
        data: {},
      },
    ],
    visible: deviceVisibility,
    position: {
      type: 'localization',
      stream: odometryStream,
    },
    fieldValues: {},
    data: {},
    dataSources: [],
  };
}

export function createScene(configuration: any) {
  const robots =
    configuration?.devices?.map((device) =>
      createRobot(
        device.name,
        device.deviceId,
        device.odometryStream,
        device.deviceVisibility
      )
    ) || [];

  const sg: SceneGraphElement[] = [
    createSatelliteLayer(
      configuration.baseStationLocationStream,
      configuration.mapSize,
      configuration.mapVisibility
    ),
    ...robots,
    {
      id: uuid.v4(),
      editing: false,
      type: 'ground',
      name: 'Ground',
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: 'manual', x: 0, y: 0, z: 0 },
      fieldValues: {
        flatAxes: {
          type: 'boolean',
          value: true,
        },
      },
      data: {},
    },
  ];
  return sg;
}
