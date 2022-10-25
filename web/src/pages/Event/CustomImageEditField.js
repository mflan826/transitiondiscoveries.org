import * as React from "react";
import { Config } from "../../config";
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    icon: {
        margin: '0.5rem',
        'max-height': '10rem',
    },
});

const getURL = (title) => {
    if (title.indexOf("blob") > -1) {
        return title;
    }
    return Config.s3_url() + title;
}

const CustomImageEditField = ({ record = {}, source, label}) => {
    const classes = useStyles();

    return (
        <div>
            <img src= {getURL(record[source])}  title={label} class="RaImageField-image-55" className={classes.icon}/>
        </div>
    );
}

export default CustomImageEditField
;