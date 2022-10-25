import FileIcon from "@material-ui/icons/CloudUpload";
import CreateIndicator from "./CreateIndicator";
import EditIndicator from "./EditIndicator";

import ListIndicators from "./ListIndicators";

export default {
  name: "indicators",
  list: ListIndicators,
  create: CreateIndicator,
  edit: EditIndicator,
  icon: FileIcon,
};
