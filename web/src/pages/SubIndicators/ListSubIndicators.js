import React from "react";
import { List, Datagrid, TextField, FileField,EditButton,ShowButton, ImageField,DeleteButton } from "react-admin";

const ListSubIndicators = (props) => {
  return (
    <List {...props}>
      <Datagrid>
      <ImageField source="iconImageName" label="Thumbnail" />
        <TextField source="title" />
        <ShowButton />
        <EditButton />
        <DeleteButton undoable={false} />
      </Datagrid>
    </List>
  );
};

export default ListSubIndicators;
