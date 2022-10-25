import React, { useCallback } from 'react';
import {
  DisabledInput,
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  FileInput,
  FileField,
  ArrayInput,
  SelectInput,
  ImageInput,
  ImageField,
  SimpleFormIterator,
  useCreate,
  useRedirect,
  useNotify,
} from 'react-admin';

import { Config } from '../../config';

const EditIndicator = (props) => {
  const [create] = useCreate("indicators");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  //const finalForm = useForm();


  const handleSave = useCallback(
    (values, redirect) => {
      debugger;

      const form = new FormData();
      //Grab uploaded thumbnail image
      form.append(`iconImageName`, values.iconImageName.rawFile);

      //Grab uploaded file
      form.append(`imageName`, values.imageName.rawFile);

      for (let [key, value] of Object.entries(values)) {
        form.append(`${key}`, `${value}`);
      }

      fetch(Config.api() + "/Indicators/editupload", {
        // content-type header should not be specified!
        method: "POST",
        body: form,
      })
        .then((resp) => {
          console.log(resp);
          notify("ra.notification.created", "info", {
            smart_count: 1,
          });
          redirectTo(redirect, basePath);
        })
        .catch((error) => console.log(error));
    },
    [create, notify, redirectTo, basePath]
  );

  const ResourceCreateToolbar = ({ ...props }) => (
    <Toolbar {...props}>
      <SaveButton
        label="Save"
        redirect="list"
        submitOnEnter={true}
        onSave={handleSave}
      />
    </Toolbar>
  );


  return (
    <Edit {...props}>
      <SimpleForm encType='multipart/form-data' toolbar={<ResourceCreateToolbar />}>
        <TextInput source="title" validate={[required()]} variant="outlined" />
        <TextInput source="slug" validate={[required()]} variant="outlined" />
        <ImageInput source="iconImageName" label="Icon Image" accept="image/*">
          <ImageField source="iconImageName" title="title" />
          
        </ImageInput>
        <ImageInput source="imageName" label="Big Image" accept="image/*">
          <ImageField source="imageName" title="title" />
          
        </ImageInput>
        <TextInput source="heading" validate={[required()]} variant="outlined" />
       
        <TextInput
          multiline
          source="content"
          rows={4}
          variant="outlined"
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};

export default EditIndicator;