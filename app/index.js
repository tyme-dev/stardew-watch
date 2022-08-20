import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as appActivity from "./activity.js";
import * as util from "../common/utils";
let _date = document.getElementById("date");
let _step1 = document.getElementById("steps1");
let _step10 = document.getElementById("steps10");
let _step100 = document.getElementById("steps100");
let _step1k = document.getElementById("steps1k");
let _step10k = document.getElementById("steps10k");
let tod = document.getElementById("line");
const _days = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT'
};
const _months = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC'
};



// Update the clock every minute
clock.granularity = "seconds";
let timePos = document.getElementById("timePos")
// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
// Update the <text> element every tick with the current time
function timeToAngle(hours){
  let x = 180;
  let y = 0.0;
  if ( hours > 3 && hours < 6){
    return 180;
  }
  if ( hours >= 0 && hours < 3){
    return 0;
  }
  if ( hours > 5 && hours < 13){
    y = hours - 6;
    y = y * 15;
    y = y + 180;
    return y;
  }
  else{
    y = hours - 12;
    y = y * 7.5;
    y = y + 270;
    return y;
  }
}
clock.ontick = (evt) => {
  let _today = new Date();
  _date.text = `${_days[_today.getDay()]} ${_months[_today.getMonth()]} ${_today.getDate()}`;
  var ampm ="";
  let today = evt.date;
  let hours = today.getHours();
  let secs = today.getSeconds();
  tod.groupTransform.rotate.x = 75;
  tod.groupTransform.rotate.angle = timeToAngle(hours);
  if (preferences.clockDisplay === "12h") {
    // 12h format
     if(hours < 12){
      ampm = " AM"
    }
    else{
      ampm = " PM"
    }
    
    hours = hours % 12 || 12;
   
    
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}${ampm}`;
  
}
function activityCallback(data) {
  _step1.text = util.getDigit(data.steps.raw,1);
  if(_step10.text == "" && _step1.text == 0){
    _step1.text = "";
  }
  _step10.text = util.getDigit(data.steps.raw,2);
  if(_step100.text == "" && _step10.text == 0){
    _step10.text = "";
  }
  _step100.text = util.getDigit(data.steps.raw,3);
  if(_step1k.text == "" && _step100.text == 0){
    _step100.text = "";
  }
  _step1k.text = util.getDigit(data.steps.raw,4);
  if(_step10k.text == "" && _step1k.text == 0){
    _step1k.text = "";
  }
  _step10k.text = util.getDigit(data.steps.raw,5);
  if (_step10k.text == 0){
    _step10k.text = "";
  } 
}
appActivity.initialize(activityCallback);
