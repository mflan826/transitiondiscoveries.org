import React from "react";
import { List, Datagrid, TextField, Button,EditButton,ShowButton, ImageField,DeleteButton,useTranslate } from "react-admin";
import {Link} from 'react-router-dom';

const ListIndicators = (props) => {
  const GetSubindicatorLink = ({ record }) => {
    const filtervar = new Object();
    filtervar.indicator_id = record.id;
    let searchFilter = {
      where: filtervar,
    };
    console.log(JSON.stringify(searchFilter));
    const indicator_id = "/subindicators?filter="+ encodeURIComponent(JSON.stringify(searchFilter))+"'";
    const translate = useTranslate();
    return record ? (
        <Link  to={{
          pathname: '/subindicators',
          search: 'filter='+JSON.stringify(filtervar),
      }}
        onClick={event=>event.stopPropagation()}
        >SubIndicators</Link>
  
    ) : null;
  };
  return (
    <List {...props}>
      <Datagrid>
      <ImageField source="iconImageName" label="Thumbnail" />
        <TextField source="title" />
     
        <GetSubindicatorLink />

        <ShowButton />
        <EditButton />
        <DeleteButton undoable={false} />

      </Datagrid>
    </List>
  );
};

export default ListIndicators;
