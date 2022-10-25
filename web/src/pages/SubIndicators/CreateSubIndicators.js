import React, { useCallback } from "react";
import {
  Create,
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
  ReferenceInput,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import { useForm } from "react-final-form";
import { Config } from "../../config";

const CreateSubIndicators = (props) => {
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

      fetch(Config.api() + "/SubIndicators/upload", {
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
         
        <ReferenceInput
          source="indicator_id"
          reference="indicators"
          allowEmpty
          validate={required()}
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      <SaveButton
        label="Save"
        redirect="list"
        submitOnEnter={true}
        onSave={handleSave}
      />
    </Toolbar>
  );

  const getSubIndicatorsFor = (value) => {};

  return (
    <Create {...props}>
      <SimpleForm enctype='multipart/form-data' toolbar={<ResourceCreateToolbar />}>
  
        <TextInput source="title" validate={[required()]} variant="outlined" />
        <TextInput source="slug" validate={[required()]} variant="outlined" />
        <ImageInput source="iconImageName" label="Icon Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput source="imageName" label="Big Image" accept="image/*">
          <ImageField source="src" title="title" />
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
    </Create>
  );
};

export default CreateSubIndicators;
