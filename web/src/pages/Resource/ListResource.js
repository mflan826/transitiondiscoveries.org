import React from "react";
import {
  List,
  Datagrid,
  TextField,
  FileField,
  ImageField,
  EditButton,
  DeleteButton
} from "react-admin";
import CustomImageField from "./CustomImageField";
import CustomTextField from "./CustomTextField";
const ListResource = (props) => {
  return (
    <List title="Resources" {...props} exporter={false} sort={{ field: 'publish_date', order: 'DESC' }}>
      <Datagrid>
        <TextField source="name" />
        <CustomImageField source="thumbnail" label="Thumbnail" />
        {/* <ImageField source="thumbnail.src" label="Thumbnail" /> */}
        <CustomTextField source="indicator" label="Framework"/>
        {/* <CustomTextField source="subindicator" label="Sub Indicator"/> */}
        <CustomTextField source="preemploymenttransitionservices" label="Pre-employment Transition Services"/>
        <CustomTextField source="resourcetypes" label="Resource Types"/>
        {/* <FileField source="files.src" title="files.title" label="File" />   */}
        {/* <TextField source="tags" /> */}
        <EditButton />
        <DeleteButton undoable={false} />
      </Datagrid>
    </List>
  );
};

export default ListResource;
