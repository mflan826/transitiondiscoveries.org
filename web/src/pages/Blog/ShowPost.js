import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EditButton,
  RichTextField,
} from "react-admin";

export const ShowPost = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="body" label="Blog Content" />
    </SimpleShowLayout>
  </Show>
);
