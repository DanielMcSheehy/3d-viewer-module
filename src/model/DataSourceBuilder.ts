import * as uuid from "uuid";
import { UniverseDataSource, StreamType } from "@formant/universe-core";

export class DataSourceBuilder {
  static telemetry(
    streamName: string,
    streamType: StreamType
  ): UniverseDataSource {
    return {
      id: uuid.v4(),
      sourceType: "telemetry",
      streamName,
      streamType,
    };
  }
}
