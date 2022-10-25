import React, { useCallback } from "react";
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  DeleteButton,
} from "react-admin";

const ListWhatWorks = (props) => {
  return (
    <List {...props} bulkActionButtons={false} title="List of posts">
      <Datagrid>
        <TextField source="state" />
        <TextField source="status" />
        <ShowButton label="View and Publish" />
        <DeleteButton label="Delete" undoable={false} />
      </Datagrid>
    </List>
  );
};
export default ListWhatWorks;
