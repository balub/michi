// packages
import React, { useContext} from "react";

// custom imports
import TagList from "./Tag";
import { Tags } from "../api/features";
import { SharedCtx } from "../core";

interface ICardProps {
  tags: Tags[];
  upvote: number;
  featureName: string;
  featureId: string;
  cardStyle: React.CSSProperties | undefined;
  showTags: boolean;
  toggleModal: () => void;
}

function Card({
  tags,
  upvote,
  featureName,
  featureId,
  cardStyle,
  showTags,
  toggleModal,
}: ICardProps) {
  const { setSelectedFeature } = useContext(SharedCtx);

  return (
    <div key={featureId} className="feature-card" style={cardStyle}>
      {/* title */}
      <div className="feature-card__head">
        <h2 className="feature-card__title">{featureName}</h2>
        <button
          className="feature-card__btn"
          onClick={() => {
            toggleModal();
            setSelectedFeature(featureId)
          }}
        >
          <span className="feature-card__title feature-card__arrow">▲</span>
          <span className="feature-card__title">{upvote}</span>
        </button>
      </div>

      {/* tags */}
      {showTags && <TagList tags={tags} />}
    </div>
  );
}

export default Card;
