import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  DateField,
  ImageField,
  DeleteButton
} from "react-admin";

import { Config } from "../../config";

class ListStory extends Component {
  componentDidMount() {
    document.title = Config.app.name + " - Story";
  }

  render() {
    return (
      <List {...this.props} exporter={false} bulkActionButtons={false}>
        <Datagrid>
          <TextField source="title" />
          <TextField source="author" />
          <DateField source="publish_date" />
          <EditButton />
          <DeleteButton undoable={false} />
        </Datagrid>
      </List>
    );
  }
}

export default ListStory;
