import * as React from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { stringify } from 'query-string';

const LinkToRelatedIndicators = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <Button
            color="primary"
            component={Link}
            to={{
                pathname: '/indicators',
                search: stringify({
                    page: 1,
                    perPage: 25,
                    sort: 'id',
                    order: 'DESC',
                    filter: JSON.stringify({ indicator_id: record.id }),
                }),
            }}
        >
            All posts with the category {record.name} ; 
        </Button>
    ) : null;
};