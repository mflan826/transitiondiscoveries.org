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
    <List title="What Works" {...props}>
      <Datagrid>
        <TextField source="state" />
        {/* <TextField source="status" /> */}
        <ShowButton label="View" />
        <DeleteButton label="Delete" undoable={false} />
      </Datagrid>
    </List>
  );
};
export default ListWhatWorks;
