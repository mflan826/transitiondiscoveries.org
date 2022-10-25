import React, { useCallback } from "react";
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  TabbedForm,
  FormTab,
  ImageInput,
  ImageField,
  SimpleFormIterator,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import { useForm } from "react-final-form";
import { Config } from "../../config";

const CreateIndicator = (props) => {
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

      fetch(Config.api() + "/Indicators/upload", {
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

  const getSubIndicatorsFor = (value) => { };

  return (
    <Create {...props}>
      <TabbedForm enctype='multipart/form-data' toolbar={<ResourceCreateToolbar />}>
        <FormTab label="1st Section">
          <TextInput source="title" validate={[required()]} variant="outlined" />
          <TextInput source="slug" validate={[required()]} variant="outlined" />
          <ImageInput source="iconImageName" label="Icon Image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <ImageInput source="imageName" label="Bg Image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="s1_desc" validate={[required()]} variant="outlined" />
          <TextInput source="s1_video_url" validate={[required()]} variant="outlined" />
        </FormTab>
        <FormTab label="2nd Section">
          <TextInput source="s2_heading" label="Heading"  validate={[required()]} variant="outlined" />
          <TextInput
          multiline
          source="s2_description"
          label="Description" 
          rows={4}
          variant="outlined"
          fullWidth
        />
        <TextInput
          multiline
          source="s2_bullet"
          label="Bullet Points" 
          rows={4}
          variant="outlined"
          fullWidth
        />
         <ImageInput source="s2_imageName" label="Right Image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>

        </FormTab>
        <FormTab label="3rd Section">
        <ImageInput source="s3_imageName" label="Left Image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="s3_video_url" label="Video Url"  validate={[required()]} variant="outlined" />
          <TextInput
          multiline
          source="s3_description"
          label="Description" 
          rows={4}
          variant="outlined"
          fullWidth
        />
        </FormTab>
        <FormTab label="4th Section">
          <TextInput source="s4_heading" label="Heading"  validate={[required()]} variant="outlined" />
          <TextInput
          multiline
          source="s4_description"
          label="Description" 
          rows={4}
          variant="outlined"
          fullWidth
        />
        </FormTab>
        <FormTab label="5th Section">
          <TextInput source="s5_heading" label="Heading"  validate={[required()]} variant="outlined" />
          <TextInput
          multiline
          source="s5_description"
          label="Description" 
          rows={4}
          variant="outlined"
          fullWidth
        />
        <TextInput source="s5_subheading1" label="Sub Heading1"  validate={[required()]} variant="outlined" />
        <ImageInput source="s5_imageName1" label="Icon Image1" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="s5_subheading2" label="Sub Heading2"  validate={[required()]} variant="outlined" />
        <ImageInput source="s5_imageName2" label="Icon Image2" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="s5_subheading3" label="Sub Heading3"  validate={[required()]} variant="outlined" />
        <ImageInput source="s5_imageName3" label="Icon Image3" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
      {/* <SimpleForm enctype='multipart/form-data' toolbar={<ResourceCreateToolbar />}>
       
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
      </SimpleForm> */}
    </Create>
  );
};

export default CreateIndicator;
