import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EditButton,
  RichTextField,
} from "react-admin";

export const ShowStory = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="body" label="Story Description" />
    </SimpleShowLayout>
  </Show>
);
