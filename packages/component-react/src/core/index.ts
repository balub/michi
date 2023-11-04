import { createContext } from "react";
import { IFeatures, Tags } from "../api/features";
import RoadMap from "./RoadMap";

interface ICtx {
  setActiveFilter: (v: Tags) => void;
  activeFilter: Tags;
  selectedFeature: string | null;
  setSelectedFeature: (v: string | null) => void;
  featureList: IFeatures[];
  setFeatureList: (v: IFeatures[]) => void;
}

export const SharedCtx = createContext<ICtx>({
  activeFilter: Tags.ALL,
  setActiveFilter: () => {},
  selectedFeature: null,
  setSelectedFeature: () => {},
  featureList: [],
  setFeatureList: () => {},
});

export default RoadMap;
