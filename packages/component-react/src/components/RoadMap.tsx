// packages
import React, { useEffect, useState } from "react";

// custom imports
import { IFeatures, fetchFeatures } from "../api/features";

// styles
import "../styles/index.css";

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
              <button className="feature-card__btn">
                <span className="feature-card__title feature-card__arrow">
                  ▲
                </span>
                <span className="feature-card__title">{val?.upvotes}</span>
              </button>
            </div>
            {/* tags */}
            <div className="feature-card__tag-wrap">
              {val?.tags?.map((tag) => {
                const properties: { [key: string]: any } = {
                  IN_PROGRESS: {
                    title: "In progress",
                    img: "/progress.svg",
                    color: "#ffe664",
                    borderColor: "rgba(255, 230, 100, 0.2)",
                  },
                  BUILT: {
                    title: "Built",
                    img: "/built.svg",
                    color: "#8c25e5",
                    borderColor: "rgba(114, 97, 220, 0.4)",
                  },
                  CANCELLED: {
                    title: "Cancelled",
                    img: "/cancel.svg",
                    color: "#C70039",
                    borderColor: "rgba(199, 0, 57,0.4)",
                  },
                  BACKLOG: {
                    title: "Backlog",
                    img: "/backlog.svg",
                    color: "#FFA1E0",
                    borderColor: "rgba(255, 161, 224,0.3)",
                  },
                  NEWLY_ADDED: {
                    title: "Newly added",
                    img: "/added.svg",
                    color: "#64ff8f",
                    borderColor: "rgba(100, 255, 143, 0.2)",
                  },
                };

                return (
                  <div
                    className="feature-card__tag"
                    style={{
                      color: properties[tag]?.color,
                      borderColor: properties[tag]?.borderColor,
                    }}
                  >
                    <span>{properties[tag]?.title}</span>
                    <img
                      className="feature-card__tag-img"
                      src={properties[tag]?.img}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoadMap;
