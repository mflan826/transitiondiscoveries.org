import PollIcon from '@material-ui/icons/Poll';
import CreateWhatWorks from "./CreateWhatWorks";
import ListWhatWorks from "./ListWhatWorks";
import ShowWhatWorks from "./ShowWhatWorks";

export default {
  name: "whatworkstests",
  list: ListWhatWorks,
  create: CreateWhatWorks,
  show: ShowWhatWorks,
  icon: PollIcon,
};
