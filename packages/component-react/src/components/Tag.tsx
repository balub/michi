interface IProperties {
  [key: string]: {
    title: string;
    img: string;
    color: string;
    borderColor: string;
  };
}

const properties: IProperties = {
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

const Tag = ({ tag }: { tag: string }) => {
  return (
    <div
      className="feature-card__tag"
      style={{
        color: properties[tag]?.color,
        borderColor: properties[tag]?.borderColor,
      }}
    >
      <span>{properties[tag]?.title}</span>
      <img className="feature-card__tag-img" src={properties[tag]?.img} />
    </div>
  );
};

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="feature-card__tag-wrap">
      {tags?.map((tag, idx) => (
        <Tag tag={tag} key={`Tag_${idx}_${Math.random()}`} />
      ))}
    </div>
  );
};

export default TagList;
