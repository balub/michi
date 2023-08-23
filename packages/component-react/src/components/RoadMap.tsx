// packages
import React, { useEffect, useState } from "react";

// custom imports
import { IFeatures, fetchFeatures } from "../api/features";

// styles
import "../styles/index.css";
import TagList from "./Tag";

interface IRoadMapProps {
  token: string;
  showTags?: boolean;
  collectFeedback?: boolean;
  cardStyle?: React.CSSProperties | undefined;
}

function RoadMap({
  token,
  collectFeedback = false,
  showTags = false,
  cardStyle,
}: IRoadMapProps) {
  const [featureList, setFeatureList] = useState<null | IFeatures[]>(null);

  useEffect(() => {
    fetchFeatures(token)
      .then((features) => setFeatureList(features))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {featureList?.map((val) => {
        return (
          <div key={val?.id} className="feature-card" style={cardStyle}>
            {/* title */}
            <div className="feature-card__head">
              <h2 className="feature-card__title">{val?.feature}</h2>
              <button className="feature-card__btn" onClick={()=>{console.log(val?.id)}}>
                <span className="feature-card__title feature-card__arrow">
                  ▲
                </span>
                <span className="feature-card__title">{val?.upvotes}</span>
              </button>
            </div>
            {/* tags */}
            {showTags && <TagList tags={val?.tags}/>}
          </div>
        );
      })}
    </div>
  );
}



export default RoadMap;
