// import * as React from "react";
// import {
//   Show,
//   SimpleShowLayout,
//   RichTextField,
// } from "react-admin";

// export const ShowPost = (props) => (
//   <Show {...props}>
//     <SimpleShowLayout>
//       <RichTextField source="body" label="Blog Content" />
//     </SimpleShowLayout>
//   </Show>
// );


import React from "react";
import {
  Show,
  TextField,
  TopToolbar,
  ArrayField,
  SimpleShowLayout,
  SimpleFormIterator,
  Datagrid,
} from "react-admin";
import PublishButton from "./PublishButton";

const ShowWhatWorks = (props) => {
  const ShowWhatWorksActions = ({ basePath, data, resource }) => (
    <TopToolbar>
      <PublishButton record={data} />
    </TopToolbar>
  );

  return (
    <Show {...props} actions={<ShowWhatWorksActions />}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="state" />
        <ArrayField source="data">
          <Datagrid>
            <TextField source="name" />
            <TextField source="ALL_QIS" label="All QIS" />
            <TextField source="ALL_sdev" label="All SDEV" />
            <TextField source="FAMILY_QIS" label="Family QIS" />
            <TextField source="FAMILY_sdev" label="Family SDEV" />
            <TextField source="YOUTH_QIS" label="Youth QIS" />
            <TextField source="YOUTH_sdev" label="Youth SDEV" />
            <TextField source="SH_QIS" label="Stakeholder QIS" />
            <TextField source="SH_sdev" label="Stakeholder SDEV" />
            <ArrayField source="subIndicators">
              <Datagrid>
                <TextField source="name" />
                <TextField source="ALL_QIS" label="All QIS" />
                <TextField source="ALL_sdev" label="All SDEV" />
                <TextField source="FAMILY_QIS" label="Family QIS" />
                <TextField source="FAMILY_sdev" label="Family SDEV" />
                <TextField source="YOUTH_QIS" label="Youth QIS" />
                <TextField source="YOUTH_sdev" label="Youth SDEV" />
                <TextField source="SH_QIS" label="Stakeholder QIS" />
                <TextField source="SH_sdev" label="Stakeholder SDEV" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
export default ShowWhatWorks;
