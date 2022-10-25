import PeopleIcon from '@material-ui/icons/People';import CreatePost from "./CreatePost";
import ListPost from "./ListPost";
import EditPost from "./EditPost";
import  ShowPost  from "./ShowPost";

export default {
  name: "teams",
  list: ListPost,
  create: CreatePost,
  edit: EditPost,
  show: ShowPost,
  icon: PeopleIcon,
};
