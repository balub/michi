// packages
import React, { useContext } from "react";

// custom imports
import { Tags } from "../api/features";
import { SharedCtx } from "../core/index";

function Filter() {
  const { activeFilter, setActiveFilter } = useContext(SharedCtx);

  const tags = [
    { key: Tags.ALL, value: "All" },
    { key: Tags.NEWLY_ADDED, value: "Newly added" },
    { key: Tags.IN_PROGRESS, value: "In progress" },
    { key: Tags.BUILT, value: "Built" },
    { key: Tags.CANCELLED, value: "Cancelled" },
    { key: Tags.BACKLOG, value: "Backlog" },
  ];

  const activeTab:React.CSSProperties = {
    borderBottom: "2px solid white",
    paddingBottom: "20px",
  };

  return (
    <div className="filter">
      {tags?.map((tag, idx) => {
        return (
          <h3
            key={idx}
            className="filter__title"
            onClick={() => setActiveFilter(tag.key)}
            style={activeFilter === tag.key ? activeTab : {}}
          >
            {tag.value}
          </h3>
        );
      })}
    </div>
  );
}

export default Filter;
