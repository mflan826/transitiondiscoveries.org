import EventIcon from '@material-ui/icons/Event';
import CreateEvent from "./CreateEvent";
import ListEvent from "./ListEvent";
import EditEvent from "./EditEvent";
import { ShowEvent } from "./ShowEvent";

export default {
  name: "events",
  list: ListEvent,
  create: CreateEvent,
  edit: EditEvent,
  show: ShowEvent,
  icon: EventIcon,
};
