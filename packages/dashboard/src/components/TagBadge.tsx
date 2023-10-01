import { Tags } from "@/types/Project";
import { Badge } from "@/components/ui/badge";

interface IProps {
  tag: string;
}

function TagBadge({ tag }: IProps) {
  function getBGColor() {
    switch (tag) {
      case Tags.IN_PROGRESS:
        return "mx-0.5 bg-green-400";
        break;

      case Tags.BUILT:
        return "mx-0.5 bg-cyan-400";
        break;

      case Tags.CANCELLED:
        return "mx-0.5 bg-rose-400";
        break;

      case Tags.BACKLOG:
        return "mx-0.5 bg-orange-400";
        break;

      case Tags.NEWLY_ADDED:
        return "mx-0.5 bg-yellow-400";
        break;

      default:
        break;
    }
  }

  return <Badge className={getBGColor()}>{tag}</Badge>;
}

export default TagBadge;
