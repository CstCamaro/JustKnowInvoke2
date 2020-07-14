
// ******* Configuration ********** //
// language leave blank for english
var rolexClockLanguage = 'en';// en,fr,zhs,ja,de,ru,es

/*
 * Available dimensions.
 * How to: comment unused ones.
 */
var rolexClockScale = {
    60: {width: 56, height: 56, scale: 0.6}, // scale 0.6
    65: {width: 60, height: 60, scale: 0.65}, // scale 0.65
    70: {width: 64, height: 64, scale: 0.64}, // scale 0.7
    75: {width: 68, height: 68, scale: 0.75}, // scale 0.75
    80: {width: 73, height: 73, scale: 0.8}, // scale 0.8
    90: {width: 82, height: 82, scale: 0.95}, // scale 0.9
    100: {width: 90, height: 90, scale: 1}, // scale 1 <- default one
    110: {width: 99, height: 99, scale: 1.1}, // scale 1.1
    120: {width: 109, height: 109, scale: 1.2},// scale 1.2
    130: {width: 109, height: 109, scale: 1.3},// scale 1.2
    140: {width: 109, height: 109, scale: 1.4},// scale 1.2
    150: {width: 150, height: 150, scale: 1.5},// scale 1.2
    300: {width: 259, height: 260, scale: 2.2}// scale 1.2
}
var dim = rolexClockScale[100];

/*
 * Available assets
 * How to use: comment unused ones.
 */
var rolexAssets = {
    green: 'http://mat1.gtimg.com/sports/FERD_proj/tennis2016adv/css/images/hands/green/',
    black: 'http://mat1.gtimg.com/sports/FERD_proj/tennis2016adv/css/images/hands/black/'
}
var handsFolder = rolexAssets.green;

var clockSettings = {
    LANG: rolexClockLanguage, // Language
    contentWidth: 250, // px Width of the content
    contentHeight: 140, // px Height of the content
    clockWidth: dim.width, /* width of the clock to be set on top the html file */
    clockHeight: dim.height, /* height of the clock to be set on top the html file */
    flashname: 'http://mat1.gtimg.com/sports/FERD_proj/tennis2016adv/img/tencent_250x140.swf', /* set the flash name (place the file in the img folder)*/
    fallback: 'http://mat1.gtimg.com/sports/FERD_proj/tennis2016adv/img/tencent_250x140.jpg', /* set the fallback image name (place the file in the img folder)*/
    trackingurl: 'https://www.rolex.com/zh-hans?cmpid=dw_Wimbledon_201603211', /* set the tracking url */
    leadingZeros: false,
    amPm: false, /* display AM/PM text */
    time24hours: true, /* display time in 24 hours format */
    showText: true, /* display texts and time */
    showTime: false, /* display time without city name, 'Your Time' text */
    showDay: false, /* show the weekday in text */
    globalXcenter: dim.width / 2,
    globalYcenter: dim.height / 2,
    globalXscale: dim.scale,
    globalYscale: dim.scale,
    handsFolder: handsFolder, // hands folder
    clocktimeAtEvent: false, //Tells whether we display the time at the event location, defined in listofdates.js or not
    countdownNumbersOnly: false, // Display only numbers in count
    showDefaultCity: false, // Show the default city if no configurable city is currently active
    dateList: Events, // List of date
    isCountdownClock: false// Whether it is a countdown
};

(function($, document) {

    $(document).ready(function() {
        $('.container').rolexClock(clockSettings);
    });

}(jQuery, document));
/*  |xGv00|7b151303dd86d12c6df0926a306ced2f */