import { ShowToastEvent } from "lightning/platformShowToastEvent";

const dateFormating = (dateValue) => {
    if(!dateValue) {
      return '';
    }
    let newDateValue = new Date(dateValue);
    let newDateString;
    let dayDate = newDateValue.getDate();
    let monthDate = newDateValue.getMonth() + 1; 
    let hoursTime = newDateValue.getHours();
    let minsTime = newDateValue.getMinutes();
    let timeSuffix = "AM";
    const yearDate = newDateValue.getFullYear();
    if(dayDate < 10) {
      dayDate = `0${dayDate}`;
    } 
    if(monthDate < 10) {
      monthDate = `0${monthDate}`;
    } 
    if(hoursTime > 12) {
      hoursTime = hoursTime - 12;
      timeSuffix = "PM";
    }
    newDateString = `${dayDate}/${monthDate}/${yearDate} ${hoursTime}:${minsTime}${timeSuffix}`;
    return newDateString;
}

const fireComponentEvent = function(reference, eventName, params, bubbleConfig) {
    let bubbleConfigFinal = (bubbleConfig && typeof bubbleConfig == 'object'
                              && Object.keys(bubbleConfig).length !== 0
                              && bubbleConfig.bubbles 
                              && typeof bubbleConfig.bubbles === 'boolean'
                              && bubbleConfig.composed 
                              && typeof bubbleConfig.composed === 'boolean')
                              ? bubbleConfig : {bubbles: false, composed: false};
    const eventToFire = new CustomEvent(eventName, { detail: params,
                                            bubbles: bubbleConfigFinal.bubbles, 
                                            composed: bubbleConfigFinal.composed
    
                        });
    reference.dispatchEvent(eventToFire);
};

const fireToast = function(reference, title, message, variant, mode = 'dismissable') {
    reference.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
      })
    );
}

const renderedCallbackHelper  = function(reference) {
    if (reference.isRendered) {
        return;
    }
    this.isRendered = true;
}

export {
    dateFormating, fireComponentEvent, fireToast
};