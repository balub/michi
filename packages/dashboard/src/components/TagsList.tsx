import TagBadge from "./TagBadge";

interface IProps {
  tags: string[];
}

function TagsList({ tags }: IProps) {
  return (
    <div>
      {tags.map((item) => (
        <TagBadge tag={item} />
      ))}
    </div>
  );
}

export default TagsList;
