import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import CreatePost from "./CreatePost";
import ListPost from "./ListPost";
import EditPost from "./EditPost";
import { ShowPost } from "./ShowPost";

export default {
  name: "blogs",
  list: ListPost,
  create: CreatePost,
  edit: EditPost,
  show: ShowPost,
  icon: CollectionsBookmarkIcon,
};
