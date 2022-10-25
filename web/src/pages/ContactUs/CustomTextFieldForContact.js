import * as React from "react";
import {  
    getAllFormIamOption,
    getAllFormInterestsOption,
  } from "../../helper";


const getName = (indicators, source) => {
    console.log(indicators);
    console.log(source);

    if(source){
        const item = indicators.filter(f => { return source == f.id })
                                .map(function(k){return k.title})
                                .join(", ");
        return item || source; 
    }
    return source;
}

const CustomTextFieldForContact = ({ record = {}, source, label}) => {

    switch (label) {
        
        case 'Interests':
            return(
                <span>{getName(getAllFormInterestsOption, record[source])}</span>
            );
            break;
        case 'I am':
            return(
                <span>{getName(getAllFormIamOption, record[source])}</span>
            );
            break;
        default:
            return(
                <span>{record[source]}</span>
            );
            break;
    }
}

export default CustomTextFieldForContact;