import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import CreateResource from "./CreateResource";
import ListResource from "./ListResource";
import EditResource from "./EditResource";

export default {
  name: "resources",
  list: ListResource,
  create: CreateResource,
  edit: EditResource,
  icon: LocalLibraryIcon,
};
