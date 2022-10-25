import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  ShowButton,
  ImageField,
  CreateButton,
  DeleteButton
} from "react-admin";
import CustomImageField from "./CustomImageField";

import PublishButton from "./PublishButton";
import { Config } from "../../config";


class ListPost extends Component {
  componentDidMount() {
    document.title = Config.app.name + " - Post";
  }

  render() {
    console.log(this.props);
    return (
      <List {...this.props}   exporter={false} bulkActionButtons={false}>
         <Datagrid>
          <TextField source="PageName" label="Page Name"/>
          <EditButton />
          <DeleteButton undoable={false} />
        </Datagrid>

      </List>


    );
  }
}
export default ListPost;
