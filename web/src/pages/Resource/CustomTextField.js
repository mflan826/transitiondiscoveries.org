import * as React from "react";
import {  
    getAllIndicators,
    getAllSubIndicators,
    getAllPreEmploymentTransitionServices,
    getAllResourceTypes
  } from "../../helper";

const indicators = getAllIndicators();
const subIndicators = getAllSubIndicators();
const preEmploymentTransitionServices = getAllPreEmploymentTransitionServices();
const resourceTypes = getAllResourceTypes();

const getName = (indicators, source) => {
    console.log(source);
    if(source){
        const item = indicators.filter(f => source.includes(f.id))
                                .map(function(k){return k.title})
                                .join(", ");
        return item || source; 
    }
    return source;
}

const CustomTextField = ({ record = {}, source, label}) => {

    switch (label) {
        case 'Framework':
            return(
                <span>{getName(indicators, record[source])}</span>
            );
            break;
        case 'Sub Indicator':
                return(
                    <span>{getName(subIndicators, record[source])}</span>
                );
                break;
        case 'Pre-employment Transition Services':
            return(
                <span>{getName(preEmploymentTransitionServices, record[source])}</span>
            );
            break;
        case 'Resource Types':
            return(
                <span>{getName(resourceTypes, record[source])}</span>
            );
            break;
        default:
            return(
                <span>{record[source]}</span>
            );
            break;
    }
}

export default CustomTextField;