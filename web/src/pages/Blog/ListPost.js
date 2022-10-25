import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  DateField,
  SelectField,
  ImageField,
  DeleteButton
} from "react-admin";
import CustomImageField from "./CustomImageField";

import { Config } from "../../config";

class ListPost extends Component {
  componentDidMount() {
    document.title = Config.app.name + " - Post";
  }

  render() {
    return (
      <List {...this.props} exporter={false} bulkActionButtons={false}>
        <Datagrid>
          <TextField source="title" />
          <TextField source="author" />
          <CustomImageField source="thumbnail" label="Image"></CustomImageField>
          <DateField source="publish_date" />
          {/* <ImageField source="thumbnail.src" label="Image"></ImageField> */}
          <EditButton />
          <DeleteButton undoable={false} />
        </Datagrid>
      </List>
    );
  }
}

export default ListPost;
