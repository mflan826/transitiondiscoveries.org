import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CreateStory from "./CreateStory";
import ListStory from "./ListStory";
import EditStory from "./EditStory";
import { ShowStory } from "./ShowStory";

export default {
  name: "story_listings",
  list: ListStory,
  create: CreateStory,
  edit: EditStory,
  show: ShowStory,
  icon: ChromeReaderModeIcon,
};
