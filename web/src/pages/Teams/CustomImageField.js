import * as React from "react";
import { Config } from "../../config";
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    icon: {
        margin: '0.5rem',
        'max-height': '5rem',
    },
});
const getURL = (thumbnailData) => {
    return Config.s3_url() + thumbnailData.title;
}

const CustomImageField = ({ record = {}, source, label}) => {
    const classes = useStyles();

    return (
        <div>
            <img src= {getURL(record[source])}  title={label} class="RaImageField-image-55" className={classes.icon}/>
        </div>
    );
}

export default CustomImageField
;