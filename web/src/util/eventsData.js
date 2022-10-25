export default class EventsDataObject {
    static eventParam = {};
    
    static setEventParamOption = function(option){
        debugger
        Object.assign(EventsDataObject.eventParam, option)
    }

    static getEventParamOption = function(){
        return EventsDataObject.eventParam;
    }

    static resetEventParamOption = function(){
        return EventsDataObject.eventParam = {};
    }
}