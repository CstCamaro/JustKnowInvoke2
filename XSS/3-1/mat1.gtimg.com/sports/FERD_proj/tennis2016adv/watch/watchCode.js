// include other useful files
// function include(fileName){
//     document.write("<scr" + "ipt type='text/javasc" + "ript' src='" + fileName + "'></sc" + "ript>" );
// }
// include('watchCode/objects/OTWButton.js');
// include('watchCode/objects/OTWHand.js');
// include('watchCode/objects/OTWTimepieceCenter.js');
// include('watchCode/objects/OTWTimezone.js');

function OTW(watchID, options) {
	var settings = {
		isDynamicContentOutsideCanvas: (typeof options === 'undefined' && typeof options.isDynamicContentOutsideCanvas === 'undefined') ? false : options.isDynamicContentOutsideCanvas,
		isDynamicContentWithCss: (typeof options === 'undefined' && typeof options.isDynamicContentWithCss === 'undefined') ? false : options.isDynamicContentWithCss,
		hasCenterDebug: (typeof options === 'undefined' && typeof options.hasCenterDebug === 'undefined') ? false : options.hasCenterDebug,
		hasDebugCyclopMask: (typeof options === 'undefined' && typeof options.hasDebugCyclopMask === 'undefined') ? false : options.hasDebugCyclopMask,
		showDebugCyclopMaskInCanvas: (typeof options === 'undefined' && typeof options.showDebugCyclopMaskInCanvas === 'undefined') ? false : options.showDebugCyclopMaskInCanvas
	};
	var objectRoot = this; // sometimes, we can't use 'this', (in subfunction of object, like bla.onload)

	var globalWatchID = watchID;

	var globalWatch;
	var globalWatch_ticksPerSecond;
	var globalWatch_isRunning;
	var globalWatch_hasBeenPaused;
	var globalWatch_countdownZeroAngle;
	var globalWatch_baseRotationAngle;
	var globalWatch_baseScaleX;
	var globalWatch_baseScaleY;
	var globalWatch_lightSourceAngle;
	var globalWatch_magnifiedValue;
	var globalWatch_magnifiedOffsetX;
	var globalWatch_magnifiedOffsetY;
	var globalWatch_xCenter;
	var globalWatch_yCenter;
	var globalWatch_width;
	var globalWatch_height;
	var globalWatch_spinTime;
	var globalWatch_spinType;
	var globalWatch_delayBeforeSpin;
	var globalWatch_delayBetweenSpinSteps;
	var globalWatch_totalSpinSteps;
	var globalWatch_totalSpinDone;
	var globalWatch_imageFolderName;
	var globalWatch_backgroundImageName;
	var hasCyclop;
	var hasCountdownCapabilities, hasChronoCapabilities, hasAlarmCapabilities;
	var globalWatch_timer;
	var globalWatch_spinTimers;
	var timepieces;
	var timepieceHolders;
	var hands;
	var handsCount;
	var handsBackupDate;
	var dynamicContent;
	var dynamicContentImageNameFormat;
	var dynamicContentType;
	var dynamicContentPosX;
	var dynamicContentPosY;
	var dynamicContentTimezone;
	var staticContent;
	var staticContentPosX;
	var staticContentPosY;
	var staticContentAlpha;
	var timepieceCenters;
	var timezones;
	var shouldTakeSpinTimeDelayIntoAccount;
	var shouldSaveUpdatedRotations;

	var previousWeekDay;
	var previousWeekDayImageSrc;
	var previousMonthDate;
	var previousMonthDateImageSrc;
	var previousYearMonth;
	var previousYearMonthImageSrc;

	var globalWatch_cyclopMaskImage;
	var globalWatch_cyclopPosX;
	var globalWatch_cyclopPosY;

	var currentDays, currentHours, currentMinutes, currentSeconds;
	var chronoTotalAccumulatedTime;

	var buttons;
	var alarmIsOn;
	var chronoIsRunning;
	var chronoShouldRunAfterSpin;
	var flybackShouldRestartAfterReset;
	var countdownIsRunning;
	var chronoTotalRunTime;
	var countdownShouldAlertWhenFinished;
	var countdownTotalRunTime;
	var countdownHasReachedEnd;
	var countdownInitialValue;
	var nextButtonReleaseShouldBeTakenIntoAccount;
	var watchIsShownOnStaticDefaultTimeAndDate;

	var chronoTimestampOnStart;
	var countdownTimestampOnStart;

	var hoursOffset;
	var minutesOffset;
	var secondsOffset;

	var left_shade_start, left_shade_end, right_shade_start, right_shade_end, top_shade_start, top_shade_end, bottom_shade_start, bottom_shade_end;

	var left_shade_min, left_shade_max, right_shade_min, right_shade_max, top_shade_min, top_shade_max, bottom_shade_min, bottom_shade_max;

	var left_shade_max_point, left_shade_range, left_shade_mid_range, right_shade_max_point, right_shade_range, right_shade_mid_range, top_shade_max_point, top_shade_range, top_shade_mid_range, bottom_shade_max_point, bottom_shade_range, bottom_shade_mid_range;

	var imagesToBeLoaded;

	/*******************************************************************************************/
	function _________________________Debug() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	/*******************************************************************************************/
	function _________________________Class_initialisation() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	this.traceClassVersionNumber = function() {
		console.log('[ "otw" info -> version number is: 2.0 beta 1 ]');
	}

	/*******************************************************************************************/

	this.traceGivenLog = function(the_log) {
		if (the_log) {
			console.log('[ "otw" info -> ' + the_log + ' ]');
		} else {
			console.log(' ');
		}
	}

	/*******************************************************************************************/
	function _________________________Display_functions() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	this.runWatchOvertime = function() {
		this.watchIsShownOnStaticDefaultTimeAndDate = false;
		//[self setButtonsInteractivityTo:YES];
		this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, null, null);
		//if ([this.globalWatch_timer isValid] != YES) {
		this.globalWatch_timer = setInterval(function() {
			objectRoot.updateWatchTimeFromTimer();
		}, 1000 / this.globalWatch_ticksPerSecond);
		//this.setHandsToDefaultPosition();
		//} else {
		// unPause watch
		//NSDateComponents *components = [[NSDateComponents alloc] init];
		//[components setYear:1900];
		//NSCalendar *gregorian = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
		//NSDate *date = [gregorian dateFromComponents:components];
		//[components release];
		//[gregorian release];
		//[this.globalWatch_timer setFireDate:date];
		//}
		this.globalWatch_isRunning = true;
		this.globalWatch_hasBeenPaused = false;
	}

	/*******************************************************************************************/

	this.pauseWatchRun = function() {
		//console.log("pauseWatchRun");
		// kill the possible spinTo timer currently running
		if (this.globalWatch_spinTimers.length > 0) {
			if (this.globalWatch_spinTimers[0]) {
				clearInterval(this.globalWatch_spinTimers[0]);
				this.globalWatch_spinTimers.splice(0, 1);
			}
		}
		// Pausing the watch stops (actually delays) the mechanism timer, so every hand is stopped (chrono, countdown, ...)
		// But if the chrono (or other) was running, the chrono is still running (counting), but the hands don't move.
		if (this.globalWatch_isRunning == true) {
			//NSLog(@"@pauseWatchRun is in");
			// save current state
			this.handsBackupDate = new Date();
			//[self updateWatchTimeNowToOptionalDate:nil toOptionalRotations:nil saveRotationsTo:self.handsBackupRotation];
			this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, null, 'backupRotation');
			// we just set a fire date very far in the futur, so it waits...
			/*NSDateComponents *components = [[NSDateComponents alloc] init];
			 [components setYear:2100];
			 NSCalendar *gregorianCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
			 NSDate *date = [gregorianCalendar dateFromComponents:components];
			 [components release];
			 [gregorianCalendar release];
			 [self.globalWatch_timer setFireDate:date];*/
			clearInterval(this.globalWatch_timer);
			//this.globalWatch_timer = setInterval( function(){ objectRoot.updateWatchTimeFromTimer(); }, 100000000000);
			this.globalWatch_isRunning = false;
			this.globalWatch_hasBeenPaused = true;
		}
	}

	/*******************************************************************************************/

	this.unPauseWatchRun = function() {
		//console.log("unPauseWatchRun");
		if (this.globalWatch_isRunning == false) {
			//NSLog(@"unPauseWatchRun is in");
			if (this.chronoIsRunning == true) {
				this.chronoTotalRunTime += this.globalWatch_spinTime;
			}
			if (this.countdownIsRunning == true) {
				this.countdownTotalRunTime += this.globalWatch_spinTime;
			}
			//var tempDate = new Date();
			var tempDate = this.getDateForGivenTimezone("");
			//console.log(tempDate);
			//console.log('this.globalWatch_spinTime = ' + this.globalWatch_spinTime);
			tempDate.setSeconds(tempDate.getSeconds() + this.globalWatch_spinTime / 1000);
			//console.log(tempDate);
			this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(tempDate, null, 'targetRotation');
			if (this.chronoIsRunning == true) {
				this.chronoTotalRunTime -= this.globalWatch_spinTime;
			}
			if (this.countdownIsRunning == true) {
				this.countdownTotalRunTime -= this.globalWatch_spinTime;
			}
			this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, 'backupRotation', null);
			this.spinHandsFromCurrentPositionToTargetPositionWithDelay(0);
		}
	}

	/*******************************************************************************************/

	this.setHandsToDefaultPosition = function() {
		//console.log("setHandsToDefaultPosition");
		//[self setButtonsInteractivityTo:NO];
		var date = new Date(2006, 7, 28, 10, 10, 31);
		// chrono
		this.chronoTotalRunTime = ((9 * 3600) + (6 * 60) + 54);
		// countdown
		this.countdownTotalRunTime = 27;
		// alarm
		// TODO
		//
		this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(date, null, null);
	}

	/*******************************************************************************************/

	this.setHoursOffset = function(theNum) {
		this.hoursOffset = theNum;
	}

	/*******************************************************************************************/

	this.setMinutesOffset = function(theNum) {
		this.minutesOffset = theNum;
	}

	/*******************************************************************************************/

	this.setSecondsOffset = function(theNum) {
		this.secondsOffset = theNum;
	}

	/*******************************************************************************************/

	this.addHoursOffset = function(theNum) {
		this.setHoursOffset(this.hoursOffset + theNum);
	}

	/*******************************************************************************************/

	this.addMinutesOffset = function(theNum) {
		this.setMinutesOffset(this.minutesOffset + theNum);
	}

	/*******************************************************************************************/

	this.addSecondsOffset = function(theNum) {
		this.setSecondsOffset(this.secondsOffset + theNum);
	}

	/*******************************************************************************************/

	this.showAndRunInDiv_startOption_techElapsedTime = function(the_view, the_startOption, the_techElapsedTime) {

		//console.log("showAndRunInDiv_startOption_techElapsedTime");
		//console.log('this.imagesToBeLoaded = ' + this.imagesToBeLoaded);

		document.getElementById(the_view).appendChild(this.globalWatch);

		// the watch was fully created, finish some vars
		this.handsCount = this.hands.length;
		this.watchIsShownOnStaticDefaultTimeAndDate = false;

		if (this.hasChronoCapabilities == true) {
			this.chronoTotalRunTime = the_techElapsedTime;
		} else if (this.hasCountdownCapabilities == true) {
			this.countdownTotalRunTime = the_techElapsedTime;
		}

		if (the_startOption == "spinToTime") {
			if (the_techElapsedTime > 0) {
				var additionalTime = this.globalWatch_spinTime + this.globalWatch_delayBeforeSpin; // add the time it takes to spin
				if (this.hasChronoCapabilities == true) {
					this.chronoTotalRunTime += additionalTime;
				} else if (this.hasCountdownCapabilities == true) {
					this.countdownTotalRunTime += additionalTime;
				}
			}
			this.spinToTimeWithTechElapsedTime(the_techElapsedTime);
		} else if (the_startOption == "defaultTime") {
			this.watchIsShownOnStaticDefaultTimeAndDate = true;
			this.changeStateImagesButtonFrom_to("disabled", "normal");
			this.setHandsToDefaultPosition();
		} else if (the_startOption == "debugHandRotation") {
			this.changeStateImagesButtonFrom_to("disabled", "normal");
			this.debugHandRotationOvertime();
		} else { // just run
			this.changeStateImagesButtonFrom_to("disabled", "normal");
			this.runWatchOvertime();
		}

		//this.traceViewHierarchy();
	}

	/*******************************************************************************************/

	this.spinToTimeWithTechElapsedTime = function(the_techElapsedTime) {
		//console.log("spinToTimeWithTechElapsedTime = " + the_techElapsedTime);
		this.shouldTakeSpinTimeDelayIntoAccount = true;
		//[self setButtonsInteractivityTo:NO];
		var additionalTime; // add the time it takes to spin
		if (the_techElapsedTime > 0) {
			additionalTime = this.globalWatch_spinTime + this.globalWatch_delayBeforeSpin;
		} else {
			additionalTime = 0;
		}
		this.chronoTotalRunTime = 0;
		this.countdownTotalRunTime = 0;
		this.shouldTakeSpinTimeDelayIntoAccount = true;
		this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, null, "targetRotation");
		this.shouldTakeSpinTimeDelayIntoAccount = false;
		// then we put the hands back to the desired default positions
		this.watchIsShownOnStaticDefaultTimeAndDate = true; // !!!!!!!!!!!!!!
		this.setHandsToDefaultPosition();
		// reset tech time to wanted one
		if (this.hasChronoCapabilities == true) {
			this.chronoTotalRunTime = the_techElapsedTime + additionalTime;
		} else if (this.hasCountdownCapabilities == true) {
			this.countdownTotalRunTime = the_techElapsedTime + additionalTime;
		}
		// lastly, we animate between to target position from current one
		this.spinHandsFromCurrentPositionToTargetPositionWithDelay(this.globalWatch_delayBeforeSpin);
	}

	/*******************************************************************************************/

	this.spinHandsFromCurrentPositionToTargetPositionWithDelay = function(the_delay) {

		//console.log("spinHandsFromCurrentPositionToTargetPositionWithDelay = " + the_delay);
		if (this.globalWatch_totalSpinDone > 0) { // means a spin is already happening, and we are doing another one
			clearInterval(this.globalWatch_spinTimers[0]);
			this.globalWatch_spinTimers.splice(0, 1);
			this.globalWatch_totalSpinDone = 0;

			for (var i = 0; i < this.handsCount; i++) {
				var tempHand = this.hands[i];
				if (tempHand.cycleTime != null) { // make sure this is a hand and not a static element
					this.hands[i].currentRotation = this.hands[i].currentSpinRotation;
				}
			}

		}

		this.globalWatch_totalSpinSteps = (1 / this.globalWatch_delayBetweenSpinSteps) * this.globalWatch_spinTime;

		setTimeout(function() {

			var tempSpinTimer = setInterval(function() {
				objectRoot.spinHandsFromCurrentPositionToTargetPositionFromTimer();
			}, objectRoot.globalWatch_delayBetweenSpinSteps);

			objectRoot.globalWatch_spinTimers.push(tempSpinTimer);

		}, the_delay)



	}

	/*******************************************************************************************/

	this.spinHandsFromCurrentPositionToTargetPositionFromTimer = function() {

		//console.log("spinHandsFromCurrentPositionToTargetPositionFromTimer started");

		for (var i = 0; i < this.handsCount; i++) {

			var tempHand = this.hands[i];

			if (tempHand.cycleTime != null) { // make sure this is a hand and not a static element

				if (this.globalWatch_spinType == "timezoneChange") {
					if ((tempHand.cycleType == "hours") || (tempHand.cycleType == "minutes")) {
						if (tempHand.cycleTime != 24) {
							// nothing
						} else {
							tempHand = null;
						}
					} else {
						tempHand = null;
					}
				}

				if (tempHand != null) {

					//console.log(tempHand.cycleType + tempHand.cycleTime +  ' is spining');

					var from = tempHand.currentRotation;
					var to = tempHand.targetRotation;

					var to_bis = to;
					while (to_bis < from) {
						to_bis += 360;
					}
					if (tempHand.cycleIsReversed == true) {
						if (to_bis > from) {
							to_bis -= 360;
						}
					}

					//console.log("this.globalWatch_spinType = " + this.globalWatch_spinType + " - this.globalWatch_totalSpinSteps = " + this.globalWatch_totalSpinSteps);
					//console.log("type = " + tempHand.cycleType + " - from = " + from + " - to = " + to + " - to_bis = " + to_bis);

					var newRotation = this.easeInOutQuadWithT_withB_withC_withD(this.globalWatch_totalSpinDone, from, (to_bis - from), this.globalWatch_totalSpinSteps);
					tempHand.currentSpinRotation = newRotation;

					//console.log("type = " + tempHand.cycleType + " - from = " + from + " - to = " + to + " - to_bis = " + to_bis + " - newRotation = " + newRotation);



					//UIView *tempHandView = [tempHand handView];
					//tempHandView.transform = CGAffineTransformMakeRotation([self degreesToRadians:newRotation]);
					//[self updateLightEffectOnHandWithNumber:i forRotation:newRotation];

				}

			}

		}

		this.shouldSaveUpdatedRotations = false;
		this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, "currentSpinRotation", null);

		this.globalWatch_totalSpinDone++;
		//console.log('this.globalWatch_totalSpinDone = ' + this.globalWatch_totalSpinDone + ' / this.globalWatch_totalSpinSteps = ' + this.globalWatch_totalSpinSteps);
		if (this.globalWatch_totalSpinDone >= this.globalWatch_totalSpinSteps) {
			//NSLog(@"spinHandsFromCurrentPositionToTargetPositionFromTimer ended");
			//console.log('this.globalWatch_spinTimers = ' + this.globalWatch_spinTimers);
			clearInterval(this.globalWatch_spinTimers[0]);
			this.globalWatch_spinTimers.splice(0, 1);
			//console.log('this.globalWatch_spinTimers = ' + this.globalWatch_spinTimers);
			this.globalWatch_totalSpinDone = 0;
			//[self setButtonsInteractivityTo:YES];
			this.runWatchOvertime();
			this.globalWatch_spinType = null;
			if (this.chronoShouldRunAfterSpin == true) {
				//[self onChronoTopButtonPressed:nil];
				this.chronoShouldRunAfterSpin = false;
			}
			this.shouldSaveUpdatedRotations = true;
		}

	}

	/*******************************************************************************************/
	function _________________________Watch_creation() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	this.addTimepieceCenterNamed_xCenter_yCenter = function(the_name, the_xCenter, the_yCenter) {

		var tempCenter = new OTWTimepieceCenter();
		tempCenter.createNewTimepieceCenterNamed_xCenter_yCenter(the_name, the_xCenter, the_yCenter);

		this.timepieceCenters.push(tempCenter);

	}

	/*******************************************************************************************/

	this.addTimepieceUnderCyclopWithCyclopImageNamed_cyclopX_cyclopY_timepieceX_timepieceY_zoomValue = function(the_imageName, the_cyclopX, the_cyclopY, the_timepieceX, the_timepieceY, the_zoomValue) {

		this.hasCyclop = true;
		this.globalWatch_magnifiedValue = the_zoomValue;
		this.globalWatch_magnifiedOffsetX = the_timepieceX;
		this.globalWatch_magnifiedOffsetY = the_timepieceY;
		this.globalWatch_cyclopMaskImage = new Image();
		this.globalWatch_cyclopMaskImage.src = this.globalWatch_imageFolderName + '/' + the_imageName;
		this.globalWatch_cyclopPosX = the_cyclopX;
		this.globalWatch_cyclopPosY = the_cyclopY;

		// prepare magnified timepiece holder
		var magnifiedTimepieceHolder = document.createElement('DIV');
		magnifiedTimepieceHolder.setAttribute('id', 'OTW_magnifiedTimepieceHolder_' + globalWatchID);
		//magnifiedTimepieceHolder.setAttribute("width",this.globalWatch_width);
		//magnifiedTimepieceHolder.setAttribute("height",this.globalWatch_height);
		magnifiedTimepieceHolder.style.left = '0px';
		magnifiedTimepieceHolder.style.top = '0px';
		magnifiedTimepieceHolder.style.position = 'absolute';
		this.timepieceHolders.push(magnifiedTimepieceHolder);
		this.globalWatch.appendChild(magnifiedTimepieceHolder);

		// prepare magnified timepiece
		var magnifiedTimepiece = document.createElement('CANVAS');
		magnifiedTimepiece.setAttribute('id', 'OTW_magnifiedTimepiece_' + globalWatchID);
		//magnifiedTimepiece.setAttribute("width",this.globalWatch_width);
		//magnifiedTimepiece.setAttribute("height",this.globalWatch_height);
		magnifiedTimepiece.style.left = '0px';
		magnifiedTimepiece.style.top = '0px';
		magnifiedTimepiece.style.position = 'absolute';
		this.timepieces.push(magnifiedTimepiece);
		magnifiedTimepieceHolder.appendChild(magnifiedTimepiece);

		// prepare the cyclop
		var cyclopView = document.createElement('DIV');
		cyclopView.setAttribute('id', 'OTW_cyclop_' + globalWatchID);
		cyclopView.style.left = the_cyclopX + 'px';
		cyclopView.style.top = the_cyclopY + 'px';
		this.globalWatch.appendChild(cyclopView);

		function doFinalizeCyclopCreation() {
			objectRoot.imagesToBeLoaded.splice(objectRoot.imagesToBeLoaded.indexOf(cyclopImage.src), 1);
			cyclopView.setAttribute("width", cyclopImage.width);
			cyclopView.setAttribute("height", cyclopImage.height);
			cyclopView.style.width = cyclopImage.width + 'px';
			cyclopView.style.height = cyclopImage.height + 'px';
			cyclopView.style.backgroundImage = 'url(' + cyclopImage.src + ')';
			cyclopView.style.position = 'absolute';
			//magnifiedTimepiece.style.backgroundColor = '#0066FF';
			//magnifiedTimepiece.style.opacity = 0.5;
		}

		function doFinalizeCyclopMaskCreation() {
			objectRoot.imagesToBeLoaded.splice(objectRoot.imagesToBeLoaded.indexOf(objectRoot.globalWatch_cyclopMaskImage.src), 1);
		}

		function doFinalizeCyclopMaskDebug() {
			cyclopDebug.setAttribute("width", cyclopMask.width);
			cyclopDebug.setAttribute("height", cyclopMask.height);
			cyclopDebug.style.width = cyclopMask.width + 'px';
			cyclopDebug.style.height = cyclopMask.height + 'px';
			cyclopDebug.style.backgroundImage = 'url(' + cyclopMask.src + ')';
			cyclopDebug.style.position = 'absolute';
			//magnifiedTimepiece.style.backgroundColor = '#0066FF';
			//magnifiedTimepiece.style.opacity = 0.5;
		}
		if (settings.hasDebugCyclopMask) {
			var cyclopDebug = document.createElement('DIV');
			cyclopDebug.setAttribute('id', 'OTW_cyclop_' + globalWatchID + '_debug');
			this.globalWatch.appendChild(cyclopDebug);

			var cyclopMask = new Image();

			cyclopMask.onload = function() {
				doFinalizeCyclopMaskDebug();
			}
			cyclopMask.src = this.globalWatch_imageFolderName + '/' + the_imageName.split('.png')[0] + '_mask.png';
		}


		var cyclopImage = new Image();
		cyclopImage.onload = function() {
			doFinalizeCyclopCreation();
		}
		cyclopImage.src = this.globalWatch_imageFolderName + '/' + the_imageName;
		this.imagesToBeLoaded.push(cyclopImage.src);

		this.globalWatch_cyclopMaskImage = new Image();
		this.globalWatch_cyclopMaskImage.onload = function() {
			doFinalizeCyclopMaskCreation();
		}
		this.globalWatch_cyclopMaskImage.src = this.globalWatch_imageFolderName + '/' + the_imageName.split('.png')[0] + '_mask.png';
		this.imagesToBeLoaded.push(this.globalWatch_cyclopMaskImage.src);


	}

	/*******************************************************************************************/

	this.createNewWatchWithImageFolder_backgroundImageNamed_xCenter_yCenter_baseRotation_xScale_yScale_lightSource = function(the_folderName, the_imageName, the_xCenter, the_yCenter, the_baseRotation, the_xScale, the_yScale, the_lightSource) {

		// set vars
		this.globalWatch_ticksPerSecond = 8;
		this.globalWatch_hasBeenPaused = false;
		this.globalWatch_countdownZeroAngle = 120;
		this.globalWatch_baseRotationAngle = the_baseRotation;
		this.globalWatch_baseScaleX = the_xScale / 100;
		this.globalWatch_baseScaleY = the_yScale / 100;
		this.globalWatch_lightSourceAngle = the_lightSource;
		this.globalWatch_xCenter = the_xCenter; //this.getX_withRotatedCoordinateSystemTo_withY(the_xCenter, this.globalWatch_baseRotationAngle, the_yCenter);
		this.globalWatch_yCenter = the_yCenter; //this.getY_withRotatedCoordinateSystemTo_withX(the_yCenter, this.globalWatch_baseRotationAngle, the_xCenter);
		this.hasCyclop = false;
		this.hasCountdownCapabilities = false;
		this.hasChronoCapabilities = false;
		this.hasAlarmCapabilities = false;
		this.globalWatch_spinTime = 2 * 1000;
		this.globalWatch_totalSpinDone = 0;
		this.globalWatch_delayBeforeSpin = 2 * 1000;
		this.globalWatch_delayBetweenSpinSteps = 0.03 * 1000;
		this.globalWatch_imageFolderName = the_folderName;
		this.globalWatch_backgroundImageName = the_imageName;

		this.previousWeekDay = -1;
		this.previousWeekDayImageSrc = -1;
		this.previousMonthDate = -1;
		this.previousMonthDateImageSrc = -1;
		this.previousYearMonth = -1;
		this.previousYearMonthImageSrc = -1;

		this.hoursOffset = 0;
		this.minutesOffset = 0;
		this.secondsOffset = 0;

		this.chronoTotalRunTime = 0;
		this.countdownInitialValue = 10 * 60; // minutes converted in seconds
		this.countdownTotalRunTime = 0;
		this.alarmIsOn = true;

		this.imagesToBeLoaded = new Array();

		// compute more vars
		this.createAdditionalVars();

		// prepare the background
		var backgroundImageView = document.createElement('DIV');
		backgroundImageView.setAttribute('id', 'OTW_backgroundImageView_' + globalWatchID);
		backgroundImageView.style.left = '0px';
		backgroundImageView.style.top = '0px';
		backgroundImageView.style.position = 'absolute';

		this.globalWatch = document.createElement('DIV');
		this.globalWatch.setAttribute('id', 'OTW_globalWatch_' + globalWatchID);
		this.globalWatch.style.position = 'relative';
		this.globalWatch.appendChild(backgroundImageView);

		// prepare main timepiece holder
		var mainTimepieceHolder = document.createElement('DIV');
		mainTimepieceHolder.setAttribute('id', 'OTW_mainTimepieceHolder_' + globalWatchID);
		mainTimepieceHolder.style.left = '0px';
		mainTimepieceHolder.style.top = '0px';
		mainTimepieceHolder.style.position = 'absolute';
		this.timepieceHolders = new Array(mainTimepieceHolder);
		this.globalWatch.appendChild(mainTimepieceHolder);

		// prepare main timepiece
		var mainTimepiece = document.createElement('CANVAS');
		mainTimepiece.setAttribute('id', 'OTW_mainTimepiece_' + globalWatchID);
		mainTimepiece.style.left = '0px';
		mainTimepiece.style.top = '0px';
		mainTimepiece.style.position = 'absolute';
		this.timepieces = new Array(mainTimepiece);
		mainTimepieceHolder.appendChild(mainTimepiece);

		function doFinalizeWatchCreation() {
			objectRoot.imagesToBeLoaded.splice(objectRoot.imagesToBeLoaded.indexOf(backgroundImage.src), 1);
			objectRoot.globalWatch_width = backgroundImage.width;
			objectRoot.globalWatch_height = backgroundImage.height;
			objectRoot.globalWatch.style.width = backgroundImage.width + 'px';
			objectRoot.globalWatch.style.height = backgroundImage.height + 'px';
			backgroundImageView.style.width = backgroundImage.width + 'px';
			backgroundImageView.style.height = backgroundImage.height + 'px';
			backgroundImageView.style.backgroundImage = 'url(' + backgroundImage.src + ')';
			// we have other timepieces, so all of them should have the same size
			for (var i = 0; i < objectRoot.timepieces.length; i++) {
				objectRoot.timepieces[i].setAttribute("width", backgroundImage.width);
				objectRoot.timepieces[i].setAttribute("height", backgroundImage.height);
				objectRoot.timepieces[i].style.width = backgroundImage.width + 'px';
				objectRoot.timepieces[i].style.height = backgroundImage.height + 'px';
				objectRoot.timepieceHolders[i].setAttribute("width", backgroundImage.width);
				objectRoot.timepieceHolders[i].setAttribute("height", backgroundImage.height);
				objectRoot.timepieceHolders[i].style.width = backgroundImage.width + 'px';
				objectRoot.timepieceHolders[i].style.height = backgroundImage.height + 'px';
			}
//            mainTimepiece.style.backgroundColor = '#0066FF';
//            mainTimepiece.style.opacity = 0.5;
		}

		var backgroundImage = new Image();
		backgroundImage.onload = function() {
			doFinalizeWatchCreation();
		}
		backgroundImage.src = this.globalWatch_imageFolderName + '/' + the_imageName;
		this.imagesToBeLoaded.push(backgroundImage.src);
		//backgroundImageView.creator = self;

		//mainTimepiece.center = CGPointMake((CGFloat)0, (CGFloat)0);
		//mainTimepiece.layer.anchorPoint = CGPointMake((CGFloat)0, (CGFloat)0);
		//mainTimepiece.transform = CGAffineTransformMakeRotation([self degreesToRadians:(CGFloat)this.globalWatch_baseRotationAngle]);

		//mainTimepiece.layer.anchorPoint = CGPointMake((CGFloat)0.5, (CGFloat)0.5);
		//mainTimepiece.transform = CGAffineTransformScale(mainTimepiece.transform, (CGFloat)this.globalWatch_baseScaleX, (CGFloat)this.globalWatch_baseScaleY);
		//mainTimepiece.layer.anchorPoint = CGPointMake((CGFloat)0, (CGFloat)0);


		// prepare usefull arrays
		this.globalWatch_spinTimers = new Array();
		this.hands = new Array();
		this.dynamicContent = new Array();
		this.dynamicContentImageNameFormat = new Array();
		this.dynamicContentType = new Array();
		this.dynamicContentPosX = new Array();
		this.dynamicContentPosY = new Array();
		this.dynamicContentTimezone = new Array();
		this.dynamicContentView = new Array();// dynamic content view if outside canvas
		this.staticContent = new Array();
		this.staticContentPosX = new Array();
		this.staticContentPosY = new Array();
		this.staticContentAlpha = new Array();
		this.timepieceCenters = new Array();
		this.buttons = new Array();
		this.timezones = new Object();

	}

	/*******************************************************************************************/
	function _________________________Timepiece_creation() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	this.addDynamicContentWithImageNamedLike_xPos_yPos_contentType_timezone = function(the_imageNameFormat, the_xPos, the_yPos, the_contentType, the_timezone) {

		// prepare image
		var defaultNum;
		if (the_contentType == "monthdate") {
			defaultNum = 28;
		} else if (the_contentType == "weekday") {
			defaultNum = 1;
		} else if (the_contentType == "month") {
			defaultNum = 7;
		}

		var tempDivs = new Array();
		var finalyseContentIsAlreadyDone = false;

		function doFinalizeContentCreation(target) {
			if (finalyseContentIsAlreadyDone == false) {
				for (var i = 0; i < tempDivs.length; i++) {
					//console.log(tempDivs[i].id)
					tempDivs[i].setAttribute("width", target.width);
					tempDivs[i].setAttribute("height", target.height);
					tempDivs[i].style.width = target.width + 'px';
					tempDivs[i].style.height = target.height + 'px';
					tempDivs[i].style.backgroundImage = 'url(' + target.src + ')';
					//objectRoot.globalWatch_width = backgroundImage.width;
					//targetView.style.backgroundColor = '#0066FF';
				}
				finalyseContentIsAlreadyDone = true;
			}
		}

	   for (var i = 0; i < this.timepieceHolders.length; i++) {
		   if ((the_contentType == "monthdate") && (i > 0)) {
			   return; // not magnified
		   }
		   if ((the_contentType == "weekday") && (i > 0)) {
			   return; // not magnified
		   }
		   if ((the_contentType == "month") && (i > 0)) {
			   return; // not magnified
		   }

//            console.log(this.timepieceHolders);
			if (settings.isDynamicContentOutsideCanvas) {
				var contentView = document.createElement('DIV');
				contentView.setAttribute('id', 'OTW_' + the_contentType + '_' + i);
				contentView.style.position = 'absolute';
				if (!settings.isDynamicContentWithCss) {
					contentView.style.left = the_xPos + 'px';
					contentView.style.top = the_yPos + 'px';
				}
				this.timepieceHolders[i].appendChild(contentView);

				tempDivs.push(contentView);

				contentImage = new Image();
				contentImage.onload = function() {
					doFinalizeContentCreation(this);
				}
				contentImage.src = this.globalWatch_imageFolderName + '/' + the_imageNameFormat.split('[x]')[0] + defaultNum + the_imageNameFormat.split('[x]')[1];

				this.dynamicContentView.push(contentView);
			}
			// feed global vars
			this.dynamicContent.push(i);
			this.dynamicContentPosX.push(the_xPos);
			this.dynamicContentPosY.push(the_yPos);
			this.dynamicContentImageNameFormat.push(the_imageNameFormat);
			this.dynamicContentType.push(the_contentType);
			if (the_timezone == null) {
				the_timezone = "deviceTime";
			}
			this.dynamicContentTimezone.push(the_timezone);

		}

		//console.log(this.dynamicContent, this.dynamicContentPosX, this.dynamicContentPosY, this.dynamicContentImageNameFormat, this.dynamicContentType, this.dynamicContentTimezone);

	}

	/*******************************************************************************************/

	this.addHandWithImageNamed_toCenter_xCenter_yCenter_xOffset_yOffset_cycleType_cycleTime_cycleIsSmooth_timezone_lightEffects = function(the_imageName, the_center, the_xCenter, the_yCenter, the_xOffset, the_yOffset, the_cycleType, the_cycleTime, the_cycleIsSmooth, the_timezone, the_lightEffects) {
		this.addHandWithImageNamed_toCenter_xCenter_yCenter_xOffset_yOffset_cycleType_cycleTime_cycleIsReversed_cycleIsSmooth_timezone_lightEffects(the_imageName, the_center, the_xCenter, the_yCenter, the_xOffset, the_yOffset, the_cycleType, the_cycleTime, false, the_cycleIsSmooth, the_timezone, the_lightEffects);
	}

	/*******************************************************************************************/

	this.addHandWithImageNamed_toCenter_xCenter_yCenter_xOffset_yOffset_cycleType_cycleTime_cycleIsReversed_cycleIsSmooth_timezone_lightEffects = function(the_imageName, the_center, the_xCenter, the_yCenter, the_xOffset, the_yOffset, the_cycleType, the_cycleTime, the_cycleIsReversed, the_cycleIsSmooth, the_timezone, the_lightEffects) {

		if (the_timezone == null) {
			the_timezone = "deviceTime";
		}

		var newTimezone = new OTWTimezone();
		newTimezone.createNewTimeZoneWithName(the_timezone);
		this.timezones[the_timezone] = newTimezone;

		if (the_cycleType.indexOf("countdown") > -1) {
			this.hasCountdownCapabilities = true;
		} else if (the_cycleType.indexOf("chrono") > -1) {
			this.hasChronoCapabilities = true;
		} else if (the_cycleType.indexOf("alarm") > -1) {
			this.hasAlarmCapabilities = true;
		}


		for (var i = 0; i < this.timepieces.length; i++) {

			// prepare anchor point (timepiece center)
			var tempX = this.globalWatch_xCenter;
			var tempY = this.globalWatch_yCenter;
			/*if (the_center) {
			 for (var j=0 ; j < this.timepieceCenters.length ; j++) {
			 if (this.timepieceCenters[j].name == the_center) {
			 tempX = this.timepieceCenters[j].xCenter;
			 tempY = this.timepieceCenters[j].yCenter;
			 break;
			 }
			 }
			 }*/

			var tempRotatedOffsetX = this.getX_withRotatedCoordinateSystemTo_withY(the_xOffset, this.globalWatch_baseRotationAngle, the_yOffset) + tempX;
			var tempRotatedOffsetY = this.getY_withRotatedCoordinateSystemTo_withX(the_yOffset, this.globalWatch_baseRotationAngle, the_xOffset) + tempY;

			//tempRotatedOffsetX *= 1/this.globalWatch_baseScaleX;
			//tempRotatedOffsetY *= 1/this.globalWatch_baseScaleY;

			// temp
			tempRotatedOffsetX = the_xOffset;
			tempRotatedOffsetY = the_yOffset;

			var tempHand = new OTWHand();
			tempHand.createNewHandWithTarget_imageNamed_toCenter_xCenter_yCenter_xOffset_yOffset_cycleType_cycleTime_cycleIsReversed_cycleIsSmooth_timezone_lightEffects(this, the_imageName, the_center, the_xCenter, the_yCenter, tempRotatedOffsetX, tempRotatedOffsetY, the_cycleType, the_cycleTime, the_cycleIsReversed, the_cycleIsSmooth, the_timezone, the_lightEffects);

			if (i == 0) {
				tempHand.isMagnified = false;
			} else {
				tempHand.isMagnified = true;
			}

			//[[this.timepieces objectAtIndex:i] addSubview:tempHand.handView];
			this.hands.push(tempHand);
		}

	}

	/*******************************************************************************************/

	this.addStaticContentWithImageNamed_xPos_yPos_alpha = function(the_imageName, the_xPos, the_yPos, the_alpha) {

		function doFinalizeCreation() {
			objectRoot.imagesToBeLoaded.splice(objectRoot.imagesToBeLoaded.indexOf(contentImage.src), 1);
		}

		var contentImage = new Image();
		contentImage.onload = function() {
			doFinalizeCreation();
		}
		contentImage.src = this.globalWatch_imageFolderName + '/' + the_imageName;
		this.imagesToBeLoaded.push(contentImage.src);

		this.staticContent.push(contentImage);
		this.staticContentPosX.push(the_xPos);
		this.staticContentPosY.push(the_yPos);
		this.staticContentAlpha.push(the_alpha);
		// todo : make this better !
		this.hands.push(this.staticContent.length - 1);

	}

	/*******************************************************************************************/
	function _________________________Time_calculation() {
	} // to add separators in editor :-)
	/*******************************************************************************************/

	/*this.getCurrentChronoTimeAsString = function() {

	 var hours = ((this.chronoTotalAccumulatedTime / 3600) % 24);
	 var minutes = ((this.chronoTotalAccumulatedTime / 60) % 60);
	 var secondes = (this.chronoTotalAccumulatedTime % 60);

	 var hoursText;
	 var minutesText;
	 var secondsText;

	 if (hours < 2) {
	 hoursText = NSLocalizedString(@"HourText", nil);
	 } else {
	 hoursText = NSLocalizedString(@"HoursText", nil);
	 }

	 if (minutes < 2) {
	 minutesText = NSLocalizedString(@"MinuteText", nil);
	 } else {
	 minutesText = NSLocalizedString(@"MinutesText", nil);
	 }

	 if (secondes < 2) {
	 secondsText = NSLocalizedString(@"SecondText", nil);
	 } else {
	 secondsText = NSLocalizedString(@"SecondsText", nil);
	 }

	 return [NSString stringWithFormat:NSLocalizedString(@"CurrentChronoTimeLabel", nil), hours, minutes, secondes, hoursText, minutesText, secondsText];

	 }*/

	/*******************************************************************************************/

	/*this.getCurrentTimeAsString = function() {

	 var hoursText;
	 var minutesText;
	 var secondsText;

	 if (this.currentHours < 2) {
	 hoursText = NSLocalizedString(@"HourText", nil);
	 } else {
	 hoursText = NSLocalizedString(@"HoursText", nil);
	 }

	 if (this.currentMinutes < 2) {
	 minutesText = NSLocalizedString(@"MinuteText", nil);
	 } else {
	 minutesText = NSLocalizedString(@"MinutesText", nil);
	 }

	 if (this.currentSeconds < 2) {
	 secondsText = NSLocalizedString(@"SecondText", nil);
	 } else {
	 secondsText = NSLocalizedString(@"SecondsText", nil);
	 }

	 return [NSString stringWithFormat:NSLocalizedString(@"CurrentTimeLabel", nil), this.currentHours, this.currentMinutes, this.currentSeconds, hoursText, minutesText, secondsText];

	 }*/

	/*******************************************************************************************/

	this.getDateForGivenTimezone = function(the_timezone) {

		var newdate;

		if ((the_timezone != "") && (the_timezone != "deviceTime")) {

			/*NSDate *sourceDate = [NSDate date];
			 NSTimeZone *destinationTimeZone = [NSTimeZone timeZoneWithName:the_timezone];
			 NSTimeZone *deviceTimeZone = [NSTimeZone systemTimeZone];

			 NSInteger destinationGMTOffset = [destinationTimeZone secondsFromGMTForDate:sourceDate];
			 NSInteger deviceGMTOffset = [deviceTimeZone secondsFromGMTForDate:sourceDate];
			 NSTimeInterval interval = destinationGMTOffset - deviceGMTOffset;

			 newdate = [[NSDate alloc] initWithTimeInterval:interval sinceDate:sourceDate];*/

		} else {
			newdate = new Date();
			newdate.setHours(newdate.getHours() + this.hoursOffset);
			newdate.setMinutes(newdate.getMinutes() + this.minutesOffset);
			newdate.setSeconds(newdate.getSeconds() + this.secondsOffset);
			//console.log('newdate = ' + newdate);
		}

		return newdate;

	}

	/*******************************************************************************************/

	this.updateWatchTimeFromTimer = function() {
		//if ([this.globalWatch_timer isValid]) {
		//console.log("updateWatchTimeFromTimer");
		this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(null, null, null);
		//}
	}

	/*******************************************************************************************/

	this.drawTimepiece = function(context, magnify, the_optionalRotations, the_saveRotationsTo) {

		//console.log('this.drawTimepiece with the_optionalRotations = ' + the_optionalRotations + ' the_saveRotationsTo = ' + the_saveRotationsTo);

		//console.log('this.handsCount = ' + this.handsCount);
		for (var i = 0; i < this.handsCount; i++) {

			context.save();

			var tempHand = this.hands[i];


			if (tempHand.cycleTime == null) {
				if (this.staticContent[tempHand].width > 0) {
					//context.translate(-tempHand.xCenter, -tempHand.yCenter);//context.translate (-temp_hand['xrotation'],-temp_hand['yrotation']);
					context.drawImage(this.staticContent[tempHand], this.staticContentPosX[tempHand] - this.globalWatch_xCenter, this.staticContentPosY[tempHand] - this.globalWatch_yCenter, this.staticContent[tempHand].width, this.staticContent[tempHand].height);
				}

			} else {

				var doIdleHand = false;
				var doIdleDynamicElements = false;
				if (this.globalWatch_spinType == "timezoneChange") {
					doIdleDynamicElements = true;
					if (tempHand.cycleTime != 24) {
						if ((tempHand.cycleType == "hours") || (tempHand.cycleType == "minutes")) {
							doIdleHand = true;
						}
					}
				}

				// get hand specifications
				var tempHandRotationDeg = 0;
				var tempCycleType = tempHand.cycleType;
				var tempCycleTime = tempHand.cycleTime;
				var tempCycleIsReversed = tempHand.cycleIsReversed;
				var tempCycleIsSmooth = tempHand.cycleIsSmooth;
				var tempTimezone = tempHand.timezone;

				if (tempTimezone == null) {
					tempTimezone = "deviceTime";
				}

				var currentTimezone = this.timezones[tempTimezone];

				var tempMillisecond = currentTimezone.millisecond;
				var tempSecond = currentTimezone.second;
				var tempMinute = currentTimezone.minute;
				var tempHour = currentTimezone.hour;
				var tempDate = this.getDateForGivenTimezone(tempTimezone);

				// rotation calculations

				if (tempCycleType == "hours") {

					tempHandRotationDeg += (tempHour * (360 / tempCycleTime));
					if (tempCycleIsSmooth == true) {
						tempHandRotationDeg += tempMinute * ((360 / tempCycleTime) / 60);
					}
					this.currentHours = tempHour;

				} else if (tempCycleType == "minutes") {

					tempHandRotationDeg += (tempMinute * (360 / tempCycleTime));
					if (tempCycleIsSmooth == true) {
						tempHandRotationDeg += tempSecond * ((360 / tempCycleTime) / 60);
					}
					this.currentMinutes = tempMinute;

				} else if (tempCycleType == "seconds") {

					tempHandRotationDeg += (tempSecond * (360 / tempCycleTime));
					if (tempCycleIsSmooth == true) {
						tempHandRotationDeg += tempMillisecond * ((360 / tempCycleTime) / 1000);
					}
					this.currentSeconds = tempSecond;

				} else if (tempCycleType == "days") {

					var tempMonthDate = currentTimezone.monthDate;

					tempHandRotationDeg += (tempMonthDate * (360 / tempCycleTime));
					if (tempCycleIsSmooth == true) {
						tempHandRotationDeg += tempHour * ((360 / tempCycleTime) / 24);
					}

					if (this.currentDays != tempMonthDate) {
						//[delegate dateChanged:tempDate];
					}
					this.currentDays = tempMonthDate;

				} else if (this.hasChronoCapabilities == true) {


				} else if (this.hasCountdownCapabilities == true) {


				} else {
					this.traceGivenLog('Unrecognized CycleType received: ' + tempCycleType);
				}

				if (tempCycleIsReversed == true) {
					tempHandRotationDeg = -tempHandRotationDeg;
				}

				tempHandRotationDeg += this.globalWatch_baseRotationAngle;

				while (tempHandRotationDeg > 360) {
					tempHandRotationDeg -= 360;
				}
				while (tempHandRotationDeg < 0) {
					tempHandRotationDeg += 360;
				}

				// if rotations are received, they overwrite previous calculations
				if (the_optionalRotations == "targetRotation") {
					tempHandRotationDeg = tempHand.targetRotation;
				} else if (the_optionalRotations == "backupRotation") {
					tempHandRotationDeg = tempHand.backupRotation;
				} else if (the_optionalRotations == "currentSpinRotation") {
					tempHandRotationDeg = tempHand.currentSpinRotation;
				}

				if (doIdleHand != true) {
					// we save the rotation to an array to keep track for futur use (pause, play, spin, etc.)
					if (this.shouldSaveUpdatedRotations != false) {
						tempHand.currentRotation = tempHandRotationDeg;
					}
				}

				// if needed, save rotation to an specified array
				if (the_saveRotationsTo == "targetRotation") {
					tempHand.targetRotation = tempHandRotationDeg;
				} else if (the_saveRotationsTo == "backupRotation") {
					tempHand.backupRotation = tempHandRotationDeg;
				}


				// Upadate dynamic elements, only once, so with the first updated hand
				if ((i == 0) && (this.doIdleDynamicElements != true)) {
					for (var j = 0; j < this.dynamicContent.length; j++) {

						var tempContentType = this.dynamicContentType[j];
						var tempContentImageNameFormat = this.dynamicContentImageNameFormat[j];
						var tempContentTimezone = this.dynamicContentTimezone[j];
						var tempPosX = this.dynamicContentPosX[j];
						var tempPosY = this.dynamicContentPosY[j];

						//var newdate = this.getDateForGivenTimezone(tempContentTimezone);
						var currentTimezone = this.timezones[tempContentTimezone];
						//console.log(currentTimezone);

						contentImage = new Image();

						if (tempContentType == "monthdate") {

							var tempMonthDate = currentTimezone.monthDate;

							/*NSDateFormatter *monthDateFormatter = [[NSDateFormatter alloc] init];
							 [monthDateFormatter setDateFormat:@"dd"];
							 int tempMonthDate = [[monthDateFormatter stringFromDate:newdate] intValue];
							 //NSLog(@"tempMonthDate : %i", tempMonthDate);
							 [monthDateFormatter release];

							 if (this.watchIsShownOnStaticDefaultTimeAndDate == true) {
							 tempMonthDate = currentTimezone.monthDate;
							 }

							 if (this.currentDays != tempMonthDate) {
							 //[delegate dateChanged:tempDate];
							 }
							 this.currentDays = tempMonthDate;

							 [[this.dynamicContent objectAtIndex:j] setImage:[UIImage imageNamed:[NSString stringWithFormat:@"%@%d%@",[[tempContentImageNameFormat componentsSeparatedByString:@"[x]"] objectAtIndex:0], tempMonthDate, [[tempContentImageNameFormat componentsSeparatedByString:@"[x]"] objectAtIndex:1]]]];
							 */
							//context.save();
							//context.scale(1, 1);
							//console.log(tempMonthDate, this.previousMonthDate);
							if (tempMonthDate != this.previousMonthDate) {
								this.previousMonthDate = tempMonthDate;
								this.previousMonthDateImageSrc = this.globalWatch_imageFolderName + '/' + tempContentImageNameFormat.split('[x]')[0] + tempMonthDate + tempContentImageNameFormat.split('[x]')[1];
								//                                console.log(this.previousMonthDateImageSrc);
								if (settings.isDynamicContentOutsideCanvas) {
									// change URL of the image background
									//console.log(this.dynamicContentView[j])
									this.dynamicContentView[j].style.backgroundImage = 'url("' + this.previousMonthDateImageSrc + '")';
									contentImage.src = this.previousMonthDateImageSrc;
									//console.log(contentImage.src)
								}
							}
							if (!settings.isDynamicContentOutsideCanvas) {
								// change SRC from image drawn in canvas
								contentImage.src = this.previousMonthDateImageSrc;
							}
							//context.restore();
						} else if (tempContentType == "weekday") {


							var tempWeekDay = currentTimezone.weekDay;
							//console.log('tempWeekDay = ' + tempWeekDay);
							if (tempWeekDay != this.previousWeekDay) {
								this.previousWeekDay = tempWeekDay;
								this.previousWeekDayImageSrc = this.globalWatch_imageFolderName + '/' + tempContentImageNameFormat.split('[x]')[0] + tempWeekDay + tempContentImageNameFormat.split('[x]')[1];
								if (settings.isDynamicContentOutsideCanvas) {
									// change URL of the image background
									this.dynamicContentView[j].style.backgroundImage = 'url("' + this.previousWeekDayImageSrc + '")';
								} else {
									contentImage.src = this.previousWeekDayImageSrc;
								}
							}
							if (!settings.isDynamicContentOutsideCanvas) {
								// change SRC from image drawn in canvas
								contentImage.src = this.previousWeekDayImageSrc;
							}

						} else if (tempContentType == "month") {

							var tempYearMonth = currentTimezone.yearMonth + 1;
							if (tempYearMonth != this.previousYearMonth) {
								this.previousYearMonth = tempYearMonth;
								this.previousYearMonthImageSrc = this.globalWatch_imageFolderName + '/' + tempContentImageNameFormat.split('[x]')[0] + tempYearMonth + tempContentImageNameFormat.split('[x]')[1];
								if (settings.isDynamicContentOutsideCanvas) {
									// change URL of the image background
									this.dynamicContentView[j].style.backgroundImage = 'url("' + this.previousYearMonthImageSrc + '")';
								}
							}
							if (!settings.isDynamicContentOutsideCanvas) {
								// change SRC from image drawn in canvas
								contentImage.src = this.previousYearMonthImageSrc;
							}

						}

						if (contentImage.width > 0) {
							context.drawImage(contentImage, tempPosX - this.globalWatch_xCenter, tempPosY - this.globalWatch_yCenter, contentImage.width, contentImage.height);
						}

					}
				}


				if (doIdleHand != true) {
					if (tempHand.height > 0) {

						magnify_x_offset = 0;
						magnify_y_offset = 0;
						magnify_x_scale = 1;
						magnify_y_scale = 1;

						if (magnify == true) {
							magnify_x_offset = this.globalWatch_magnifiedOffsetX;
							magnify_y_offset = this.globalWatch_magnifiedOffsetY;
							magnify_x_scale = this.globalWatch_magnifiedValue;
							magnify_y_scale = this.globalWatch_magnifiedValue;
						}

						//console.log(objectRoot.globalWatch_xCenter);
						context.translate(tempHand.xOffset, tempHand.yOffset);//context.translate (temp_hand['xcenteroffset'],temp_hand['ycenteroffset']);
						context.translate(magnify_x_offset, magnify_y_offset);
						//context.translate (temp_hand['offset_alternate_x_center'], temp_hand['offset_alternate_y_center']);
						context.scale(this.globalWatch_baseScaleX * magnify_x_scale, this.globalWatch_baseScaleY * magnify_y_scale);
						context.rotate(this.degreesToRadians(tempHandRotationDeg));//context.rotate (display_calculation[temp_hand['update_mode']]);
						context.translate(-tempHand.xCenter, -tempHand.yCenter);//context.translate (-temp_hand['xrotation'],-temp_hand['yrotation']);
						context.drawImage(tempHand.image, 0, 0, tempHand.width, tempHand.height);//context.drawImage (temp_hand['image'], 0, 0, temp_hand['width'], temp_hand['height']);

						for (var ii = 0; ii < tempHand.effectViews.length; ii++) {
							if (tempHand.effectViews[ii].height > 0) {
								context.globalAlpha = this.getAlphaForRotation(tempHand.effectTypes[ii], this.degreesToRadians(tempHandRotationDeg), 'normal');
								context.drawImage(tempHand.effectViews[ii], 0, 0, tempHand.width, tempHand.height);
							}
						}

					}

				}


			}

			context.restore();
		}

	}

	/*******************************************************************************************/
	var cyclopMaskX = 0, cyclopMaskY = 0;
	/**
	 * Position the cyclop mask
	 * @param {number} x The X coord
	 * @param {number} y The Y coord
	 * @returns {undefined}
	 */
	this.setCyclopMask = function(x, y) {
		cyclopMaskX = x;
		cyclopMaskY = y;
	}
	this.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo = function(the_date, the_optionalRotations, the_saveRotationsTo) {
		//console.log("updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(" + the_date + ")");


		// update time for each timezone
		for (var key in this.timezones) {

			var currentTimezone = this.timezones[key];

			var nowdate;
			if (the_date) {
				nowdate = the_date;
			} else {
				nowdate = this.getDateForGivenTimezone(currentTimezone.timezoneName);
			}

			if (this.shouldTakeSpinTimeDelayIntoAccount == true) {
				var additionalTime = this.globalWatch_spinTime + this.globalWatch_delayBeforeSpin;
				//console.log('nowdate = ' + nowdate);
				nowdate.setSeconds(nowdate.getSeconds() + additionalTime / 1000);
				//console.log('nowdate = ' + nowdate);
			}

			currentTimezone.updateDataWithDate(nowdate);

		}

		// subfunction for placing the canvas (heritage from code version 1.x)
		function placeCanvas(the_canvas_context, do_translate, the_object) {
			the_canvas_context.clearRect(-objectRoot.globalWatch_width, -objectRoot.globalWatch_height, (objectRoot.globalWatch_width * 2), (objectRoot.globalWatch_height * 2));
			if (do_translate == false) {
				//nothing
			} else {
				the_canvas_context.save();
				if (the_object) {
					//the_canvas_context.translate(global_watch_p[the_object['watch_x_center']], global_watch_p[the_object['watch_y_center']]) ;
				} else {
					the_canvas_context.translate(objectRoot.globalWatch_xCenter, objectRoot.globalWatch_yCenter);
				}
			}
		}


		if ((this.hasCyclop == true) && (this.globalWatch_cyclopMaskImage.height > 0)) {

			var mytempcanvas = document.getElementById('OTW_magnifiedTimepiece_' + globalWatchID);

			var context = mytempcanvas.getContext("2d");
			placeCanvas(context, true);

			//draw magnified timepiece
			this.drawTimepiece(context, true, the_optionalRotations, the_saveRotationsTo);

			context.save();
			context.translate(-this.globalWatch_xCenter, -this.globalWatch_yCenter);
			context.globalCompositeOperation = "destination-in";
			context.drawImage(this.globalWatch_cyclopMaskImage, cyclopMaskX, cyclopMaskY);
			context.restore();
			context.restore();

		}

		var mytempcanvas = document.getElementById('OTW_mainTimepiece_' + globalWatchID);
		var context = mytempcanvas.getContext("2d");
		placeCanvas(context, true);



		//context.globalCompositeOperation = "source-over";

		// update hands with the correct timezone calculations
		this.drawTimepiece(context, false, the_optionalRotations, the_saveRotationsTo);

		if ((this.hasCyclop == true) && (this.globalWatch_cyclopMaskImage.height > 0)) {
			context.save();
			context.translate(-this.globalWatch_xCenter, -this.globalWatch_yCenter);
			if (!settings.showDebugCyclopMaskInCanvas)
				context.globalCompositeOperation = "destination-out";

			context.drawImage(this.globalWatch_cyclopMaskImage, cyclopMaskX, cyclopMaskY);
			context.restore();
		}
		context.restore();

		if (!this.hands.length || settings.hasCenterDebug) {
			// Draw Center Point
			context.save();
			context.fillStyle = "rgba(0,0,0,.2)";
			context.fillRect(this.globalWatch_xCenter - 1, this.globalWatch_yCenter - 1, 2, 2);
			context.restore();
		}

		// if we are supposed to see a default time watch, make sure to update the watch until every image is loaded
		//console.log('this.imagesToBeLoaded 2 = ' + this.imagesToBeLoaded);
		if ((this.watchIsShownOnStaticDefaultTimeAndDate == true) && (this.imagesToBeLoaded.length > 0)) {
			this.globalWatch_timer = setTimeout(function() {
				objectRoot.updateWatchTimeNowToOptionalDate_toOptionalRotations_saveRotationsTo(the_date, the_optionalRotations, the_saveRotationsTo);
			}, 1000 / this.globalWatch_ticksPerSecond);
		}


	}

	/*******************************************************************************************/
	function _________________________Interactivity() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.changeStateImagesButtonFrom_to = function(the_UIControlStateFrom, the_UIControlStateTo) {
		/*for (int i=0; i<[this.buttons count]; i++) {
			[[this.buttons objectAtIndex:i] setBackgroundImage:[[this.buttons objectAtIndex:i] imageForState:the_UIControlStateTo] forState:the_UIControlStateFrom];
		}*/
	}

	/*******************************************************************************************/

	this.getChronoRawDisplayValue = function() {
		if (this.globalWatch_isRunning == true) {
			return this.chronoTotalAccumulatedTime;
		} else { // watch is spining
			return 0;
		}
	}

	/*******************************************************************************************/

	this.getCountdownRawDisplayValue = function() {
		return this.countdownInitialValue - this.countdownTotalRunTime;

	}

	/*******************************************************************************************/

	this.getTachymeterRawDisplayValue = function() {
		var elapsedTime = this.getChronoRawDisplayValue();
		if (elapsedTime >= 0.1) {
			return 3600/elapsedTime;
		} else {
			return 3600;
		}
	}

	/*******************************************************************************************/

	this.setButtonsInteractivityTo = function(the_bool) {
		for (var i=0; i < this.buttons.length; i++) {
			//[[this.buttons objectAtIndex:i] setEnabled:the_bool];
		}
	}

	/*******************************************************************************************/

	this.setCountdownMinutesTo = function(the_value) {
		if (the_value < 1) {
			the_value = 1;
		}
		this.countdownInitialValue = the_value*60;
		this.countdownTotalRunTime = 0;//(10-the_value)*60;
	}

	/*******************************************************************************************/

	this.setCountdownMinutesToNextRoundValue = function() {
		var countVal = this.countdownInitialValue - this.countdownTotalRunTime;
		var mins = Math.floor((countVal / 60) % 60);
		this.setCountdownMinutesTo(mins+1);
	}

	/*******************************************************************************************/

	this.setCountdownMinutesToPreviousRoundValue = function() {
		var countVal = this.countdownInitialValue - this.countdownTotalRunTime;
		var mins = floor((countVal / 60) % 60);
		if (this.countdownTotalRunTime == 0) {
			mins --;
		}
		this.setCountdownMinutesTo(mins);
	}

	/*******************************************************************************************/
	function _________________________Alarm_movement() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.switchAlarmOnOff = function() {
		if (this.alarmIsOn == true) {
			this.alarmIsOn = false;
		} else {
			this.alarmIsOn = true;
		}
	}

	/*******************************************************************************************/
	function _________________________Chrono_movement() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.resetChronoMovement = function() {
		this.chronoTotalRunTime = 0;
		this.chronoTotalAccumulatedTime = 0;
		//[delegate chronoReset];
	}

	/*******************************************************************************************/

	this.startChronoMovement = function() {
		this.chronoTimestampOnStart = new Date();
		this.chronoIsRunning = true;
		//[delegate chronoStarted:this.chronoTimestampOnStart previousRunTimeInterval: this.chronoTotalRunTime];
	}

	/*******************************************************************************************/

	this.stopChronoMovement = function() {
		// memorize chrono spent time
		//NSTimeInterval chronoInterval = [[NSDate date] timeIntervalSinceDate:this.chronoTimestampOnStart];
		this.chronoTotalRunTime += chronoInterval;
		this.chronoIsRunning = false;
		//[delegate chronoStopped];
	}

	/*******************************************************************************************/
	function _________________________Countdown_movement() {} // to add separators in editor :-)
	/*******************************************************************************************/

	/*******************************************************************************************/
	function _________________________Flyback_movement() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.resetFlybackMovement = function() {
		this.resetChronoMovement();
	}

	/*******************************************************************************************/

	this.startFlybackMovement = function() {
		this.startChronoMovement();
	}

	/*******************************************************************************************/

	this.stopFlybackMovement = function() {
		this.stopChronoMovement();
	}

	/*******************************************************************************************/
	function _________________________Buttons() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.onAlarmButtonPressed = function(the_sender) {
		console.log("onAlarmButtonPressed");
		this.switchAlarmOnOff();
	}

	/*******************************************************************************************/

	this.onAlarmButtonReleased = function(the_sender) {
		console.log("onAlarmButtonReleased");
	}

	/*******************************************************************************************/

	this.onChronoTopButtonPressed = function(the_sender) {
		console.log("onChronoTopButtonPressed");
		if (this.chronoIsRunning != true) {
			this.startChronoMovement();
			this.nextButtonReleaseShouldBeTakenIntoAccount = false;
		} else {
			this.stopChronoMovement();
		}
		//[the_sender switchActionWillStartBoolAfterDelay];
	}

	/*******************************************************************************************/

	this.onChronoTopButtonReleased = function(the_sender) {
		console.log("onChronoTopButtonReleased");
		if (this.nextButtonReleaseShouldBeTakenIntoAccount == true) {
			if (this.chronoIsRunning == true) {
			}
		} else {
			this.nextButtonReleaseShouldBeTakenIntoAccount = true;
		}
	}

	/*******************************************************************************************/

	this.onChronoBottomButtonPressed = function(the_sender) {
		console.log("onChronoBottomButtonPressed");
		if (this.chronoIsRunning == true) {
		} else {
			this.resetChronoMovement();
		}

	}

	/*******************************************************************************************/

	this.onChronoBottomButtonReleased = function(the_sender) {
		console.log("onChronoBottomButtonReleased");
		if (this.nextButtonReleaseShouldBeTakenIntoAccount == true) {
		} else {
			this.nextButtonReleaseShouldBeTakenIntoAccount = true;
		}
	}

	/*******************************************************************************************/

	this.onCountdownTopButtonPressed = function(the_sender) {
		console.log("onCountdownTopButtonPressed");
		if (this.countdownIsRunning != true) {
			this.startCountdownMovement();
			this.nextButtonReleaseShouldBeTakenIntoAccount = false;
		} else {
			this.stopCountdownMovement();
		}
		//[the_sender switchActionWillStartBoolAfterDelay];
	}

	/*******************************************************************************************/

	this.onCountdownTopButtonReleased = function(the_sender) {
		console.log("onCountdownTopButtonReleased");
		if (this.nextButtonReleaseShouldBeTakenIntoAccount == true) {
			if (this.countdownIsRunning == true) {
			}
		} else {
			this.nextButtonReleaseShouldBeTakenIntoAccount = true;
		}
	}

	/*******************************************************************************************/

	this.onCountdownBottomButtonPressed = function(the_sender) {
		console.log("onCountdownBottomButtonPressed");
		this.resetCountdownMovement();
	}

	/*******************************************************************************************/

	this.onCountdownBottomButtonReleased = function(the_sender) {
		console.log("onCountdownBottomButtonReleased");
		if (this.nextButtonReleaseShouldBeTakenIntoAccount == true) {
		} else {
			this.nextButtonReleaseShouldBeTakenIntoAccount = true;
		}
	}

	/*******************************************************************************************/

	this.onFlybackTopButtonPressed = function(the_sender) {
		console.log("onFlybackTopButtonPressed");
		if (this.chronoIsRunning != true) {
			this.startFlybackMovement();
			this.nextButtonReleaseShouldBeTakenIntoAccount = false;
		} else {
			this.stopFlybackMovement();
		}
		//[the_sender switchActionWillStartBoolAfterDelay];
	}

	/*******************************************************************************************/

	this.onFlybackTopButtonReleased = function(the_sender) {
		console.log("onFlybackTopButtonReleased");
		if (this.nextButtonReleaseShouldBeTakenIntoAccount == true) {
			if (this.chronoIsRunning == true) {
			}
		} else {
			this.nextButtonReleaseShouldBeTakenIntoAccount = true;
		}
	}

	/*******************************************************************************************/

	this.onFlybackBottomButtonPressed = function(the_sender) {
		console.log("onFlybackBottomButtonPressed");
		if (this.chronoIsRunning == true) {
			this.stopFlybackMovement();
			this.flybackShouldRestartAfterReset = true;
		}
		this.resetFlybackMovement();
	}

	/*******************************************************************************************/

	this.onFlybackBottomButtonReleased = function(the_sender) {
		console.log("onFlybackBottomButtonReleased");
		if (this.flybackShouldRestartAfterReset == true) {
			this.flybackShouldRestartAfterReset = false;
			this.startFlybackMovement();
		}
	}

	/*******************************************************************************************/
	function _________________________Events() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.onCountdownReachedEnd = function() {
		console.log("onCountdownReachedEnd");
		this.countdownHasReachedEnd = true;
		if (this.countdownShouldAlertWhenFinished == true) {
			this.countdownShouldAlertWhenFinished = false;
			//[delegate countdownFinished];
		}
	}

	/*******************************************************************************************/
	function _________________________Effects() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.createAdditionalVars = function() {

		//this.globalWatch_lightSourceAngle = this.globalWatch_lightSourceAngle + this.globalWatch_baseRotationAngle;
		this.globalWatch_lightSourceAngle = this.globalWatch_lightSourceAngle;
		while (this.globalWatch_lightSourceAngle < 0) {
			this.globalWatch_lightSourceAngle += 360 ;
		}
		while (this.globalWatch_lightSourceAngle > 360) {
			this.globalWatch_lightSourceAngle -= 360 ;
		}

		this.left_shade_start = this.globalWatch_lightSourceAngle + 180;
		this.left_shade_end = this.globalWatch_lightSourceAngle;
		this.right_shade_start = this.globalWatch_lightSourceAngle;
		this.right_shade_end = this.globalWatch_lightSourceAngle + 180;
		this.top_shade_start = this.globalWatch_lightSourceAngle + 90;
		this.top_shade_start = this.globalWatch_lightSourceAngle - 90;
		this.bottom_shade_start = this.globalWatch_lightSourceAngle + 90;
		this.bottom_shade_start = this.globalWatch_lightSourceAngle - 90;

		while (this.left_shade_start > this.left_shade_end) {
			this.left_shade_end += 360 ;
		}
		while (this.right_shade_start > this.right_shade_end) {
			this.right_shade_end += 360 ;
		}
		while (this.top_shade_start > this.top_shade_end) {
			this.top_shade_end += 360 ;
		}
		while (this.bottom_shade_start > this.bottom_shade_end) {
			this.bottom_shade_end += 360 ;
		}

		while (this.left_shade_end > 360) {
			this.left_shade_start -= 360 ;
			this.left_shade_end -= 360 ;
		}
		while (this.right_shade_end > 360) {
			this.right_shade_start -= 360 ;
			this.right_shade_end -= 360 ;
		}
		while (this.top_shade_end > 360) {
			this.top_shade_start -= 360 ;
			this.top_shade_end -= 360 ;
		}
		while (this.bottom_shade_end > 360) {
			this.bottom_shade_start -= 360 ;
			this.bottom_shade_end -= 360 ;
		}

		this.left_shade_min = 0 ;
		this.left_shade_max = 100 ;
		this.right_shade_min = 0 ;
		this.right_shade_max = 100 ;
		this.top_shade_min = 0 ;
		this.top_shade_max = 100 ;
		this.bottom_shade_min = 0 ;
		this.bottom_shade_max = 100 ;

		this.left_shade_max_point = 0;
		this.left_shade_range = 0;
		this.left_shade_mid_range = 0;
		this.right_shade_max_point = 0;
		this.right_shade_range = 0;
		this.right_shade_mid_range = 0;
		this.top_shade_max_point = 0;
		this.top_shade_range = 0;
		this.top_shade_mid_range = 0;
		this.bottom_shade_max_point = 0;
		this.bottom_shade_range = 0;
		this.bottom_shade_mid_range = 0;

		if (this.left_shade_start < this.left_shade_end) {
			this.left_shade_max_point = ((this.left_shade_start + this.left_shade_end)/2) ;
			while(this.left_shade_max_point > 360) {
				this.left_shade_max_point -= 360 ;
			}
			this.left_shade_range = this.left_shade_end - this.left_shade_start ;
		} else {
			this.left_shade_max_point = (this.left_shade_start + this.left_shade_end) ;
			while(this.left_shade_max_point > 360) {
				this.left_shade_max_point -= 360 ;
			}
			this.left_shade_max_point = this.left_shade_max_point/2 ;
			this.left_shade_range = 360 + this.left_shade_end - this.left_shade_start ;
		}
		this.left_shade_mid_range = this.left_shade_range/2 ;

		if (this.right_shade_start < this.right_shade_end) {
			this.right_shade_max_point = ((this.right_shade_start + this.right_shade_end)/2) ;
			while(this.right_shade_max_point > 360) {
				this.right_shade_max_point -= 360 ;
			}
			this.right_shade_range = this.right_shade_end - this.right_shade_start ;
		} else {
			this.right_shade_max_point = (this.right_shade_start + this.right_shade_end) ;
			while(this.right_shade_max_point > 360) {
				this.right_shade_max_point -= 360 ;
			}
			this.right_shade_max_point = this.right_shade_max_point/2 ;
			this.right_shade_range = 360 + this.right_shade_end - this.right_shade_start ;
		}
		this.right_shade_mid_range = this.right_shade_range/2 ;

		if (this.top_shade_start < this.top_shade_end) {
			this.top_shade_max_point = ((this.top_shade_start + this.top_shade_end)/2);
			while(this.top_shade_max_point > 360) {
				this.top_shade_max_point -= 360 ;
			}
			this.top_shade_range = this.top_shade_end - this.top_shade_start;
		} else {
			this.top_shade_max_point = (this.top_shade_start + this.top_shade_end) ;
			while(this.top_shade_max_point > 360) {
				this.top_shade_max_point -= 360 ;
			}
			this.top_shade_max_point = this.top_shade_max_point/2 ;
			this.top_shade_range = 360 + this.top_shade_end - this.top_shade_start ;
		}
		this.top_shade_mid_range = this.top_shade_range/2 ;

		if (this.bottom_shade_start < this.bottom_shade_end) {
			this.bottom_shade_max_point = ((this.bottom_shade_start + this.bottom_shade_end)/2) ;
			while(this.bottom_shade_max_point > 360) {
				this.bottom_shade_max_point -= 360 ;
			}
			this.bottom_shade_range = this.bottom_shade_end - this.bottom_shade_start ;
		} else {
			this.bottom_shade_max_point = (this.bottom_shade_start + this.bottom_shade_end) ;
			while(this.bottom_shade_max_point > 360) {
				this.bottom_shade_max_point -= 360 ;
			}
			this.bottom_shade_max_point = this.bottom_shade_max_point/2 ;
			this.bottom_shade_range = 360 + this.bottom_shade_end - this.bottom_shade_start ;
		}
		this.bottom_shade_mid_range = this.bottom_shade_range/2 ;

	}

	/*******************************************************************************************/

	this.getAlphaForRotation = function(the_effectType, the_rotation, the_direction) {

		// the_rotation is given in radian, we need to convert back to degrees
		the_rotation = (180 * the_rotation / Math.PI) - this.globalWatch_baseRotationAngle;

		//console.log('Entered getAlphaForRotation for '+ the_effectType + ' for the rotation ' + the_rotation + ' in the  ' + the_direction + ' direction');

		// do the function only if the hand does exist
		//if (one_hand) {

			// update temp distances to lights and shades points to manage "normal" and "reverse" rotation effects
			// a function first...
			subf_find_distance_to_max_point = function(the_max_point) {
				var temp_distance_to_max_point = Math.abs(the_max_point - the_rotation) ;
				if (temp_distance_to_max_point > 180) {
					temp_distance_to_max_point = Math.abs(180 - (temp_distance_to_max_point - 180)) ;
				}
				return temp_distance_to_max_point ;
			}

			var answer;

			if (the_effectType == 'top_light') {
				// update effect alpha for top_light
				if (the_direction == 'reverse') {
					this_hand_distance_to_top_light_point = subf_find_distance_to_max_point(-this.top_light_max_point) ;
				} else {
					this_hand_distance_to_top_light_point = subf_find_distance_to_max_point(this.top_light_max_point) ;
				}
				if (this_hand_distance_to_top_light_point <= this.top_light_mid_range) {
					answer = this.TOP_LIGHT_MIN + ((1 - (this_hand_distance_to_top_light_point/this.top_light_mid_range))*(this.TOP_LIGHT_MAX - this.TOP_LIGHT_MIN)) ;
					//one_hand.top_light_mc._alpha = 0 ; //temp line to throw away
				} else {
					answer = this.TOP_LIGHT_MIN ;
				}
			} else if (the_effectType == 'bottom_light') {
				// update effect alpha for bottom light
				if (the_direction == 'reverse') {
					this_hand_distance_to_bottom_light_point = subf_find_distance_to_max_point(-this.bottom_light_max_point) ;
				} else {
					this_hand_distance_to_bottom_light_point = subf_find_distance_to_max_point(this.bottom_light_max_point) ;
				}
				if (180-this_hand_distance_to_bottom_light_point <= this.bottom_light_mid_range) {
					answer = this.BOTTOM_LIGHT_MIN + ((1 - ((180-this_hand_distance_to_bottom_light_point)/bottom_light_mid_range))*(this.BOTTOM_LIGHT_MAX - this.BOTTOM_LIGHT_MIN)) ;
					//one_hand.bottom_light_mc._alpha = 0 ; //temp line to throw away
				} else {
					answer = this.BOTTOM_LIGHT_MIN ;
				}
			} else if (the_effectType == 'top_shade') {
				// update effect alpha for top_shade
				if (the_direction == 'reverse') {
					this_hand_distance_to_top_shade_point = subf_find_distance_to_max_point(-this.top_shade_max_point) ;
				} else {
					this_hand_distance_to_top_shade_point = subf_find_distance_to_max_point(this.top_shade_max_point) ;
				}
				if (this_hand_distance_to_top_shade_point <= this.top_shade_mid_range) {
					answer = this.top_shade_min + ((1 - (this_hand_distance_to_top_shade_point/top_shade_mid_range))*(this.top_shade_max - this.top_shade_min)) ;
					//one_hand.top_shade_mc._alpha = 0 ; //temp line to throw away
				} else {
					answer = this.top_shade_min ;
				}
			} else if (the_effectType == 'bottom_shade') {
				// update effect alpha for bottom_shade
				if (the_direction == 'reverse') {
					this_hand_distance_to_bottom_shade_point = subf_find_distance_to_max_point(-this.bottom_shade_max_point) ;
				} else {
					this_hand_distance_to_bottom_shade_point = subf_find_distance_to_max_point(this.bottom_shade_max_point) ;
				}
				if (180-this_hand_distance_to_bottom_shade_point <= this.bottom_shade_mid_range) {
					answer = this.bottom_shade_min + ((1 - ((180-this_hand_distance_to_bottom_shade_point)/bottom_shade_mid_range))*(this.bottom_shade_max - this.bottom_shade_min)) ;
					//one_hand.bottom_shade_mc._alpha = 0 ; //temp line to throw away
				} else {
					answer = this.bottom_shade_min ;
				}
			}

			// and now working with the left/right light and shade. Could be done a better way (instead of switching right and left mc's) ??
			if (the_direction == 'reverse') {
				if (the_effectType == 'left_light') {
					// update effect alpha for left_light
					this_hand_distance_to_left_light_point = subf_find_distance_to_max_point(-this.left_light_max_point) ;
					if (this_hand_distance_to_left_light_point <= this.left_light_mid_range) {
						answer = this.LEFT_LIGHT_MIN + ((1 - (this_hand_distance_to_left_light_point/this.left_light_mid_range))*(this.LEFT_LIGHT_MAX - this.LEFT_LIGHT_MIN)) ;
						//one_hand.right_light_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.LEFT_LIGHT_MIN ;
					}
				} else if (the_effectType == 'right_light') {
					// update effect alpha for right_light
					this_hand_distance_to_right_light_point = subf_find_distance_to_max_point(-this.right_light_max_point) ;
					if (this_hand_distance_to_right_light_point <= this.right_light_mid_range) {
						answer = this.RIGHT_LIGHT_MIN + ((1 - (this_hand_distance_to_right_light_point/this.right_light_mid_range))*(this.RIGHT_LIGHT_MAX - this.RIGHT_LIGHT_MIN)) ;
						//one_hand.left_light_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.RIGHT_LIGHT_MIN ;
					}
				} else if (the_effectType == 'left_shade') {
					// update effect alpha for left_shade
					this_hand_distance_to_left_shade_point = subf_find_distance_to_max_point(-this.left_shade_max_point) ;
					if (this_hand_distance_to_left_shade_point <= this.left_shade_mid_range) {
						answer = ((1 - (this_hand_distance_to_left_shade_point/left_shade_mid_range))*(this.left_shade_max - this.left_shade_min)) ;
						//one_hand.right_shade_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.left_shade_min ;
					}
				} else if (the_effectType == 'right_shade') {
					// update effect alpha for right_shade
					this_hand_distance_to_right_shade_point = subf_find_distance_to_max_point(-this.right_shade_max_point) ;
					if (this_hand_distance_to_right_shade_point <= this.right_shade_mid_range) {
						answer = ((1 - (this_hand_distance_to_right_shade_point/right_shade_mid_range))*(this.right_shade_max - this.right_shade_min)) ;
						//one_hand.left_shade_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.right_shade_min ;
					}
				}
			} else {
				if (the_effectType == 'left_light') {
					// update effect alpha for left_light
					this_hand_distance_to_left_light_point = subf_find_distance_to_max_point(this.left_light_max_point) ;
					if (this_hand_distance_to_left_light_point <= this.left_light_mid_range) {
						answer = this.LEFT_LIGHT_MIN + ((1 - (this_hand_distance_to_left_light_point/this.left_light_mid_range))*(this.LEFT_LIGHT_MAX - this.LEFT_LIGHT_MIN)) ;
						//one_hand.left_light_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.LEFT_LIGHT_MIN ;
					}
				} else if (the_effectType == 'right_light') {
					// update effect alpha for right_light
					this_hand_distance_to_right_light_point = subf_find_distance_to_max_point(this.right_light_max_point) ;
					if (this_hand_distance_to_right_light_point <= this.right_light_mid_range) {
						answer = this.RIGHT_LIGHT_MIN + ((1 - (this_hand_distance_to_right_light_point/this.right_light_mid_range))*(this.RIGHT_LIGHT_MAX - this.RIGHT_LIGHT_MIN)) ;
						//one_hand.right_light_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.RIGHT_LIGHT_MIN ;
					}
				} else if (the_effectType == 'left_shade') {
					// update effect alpha for left_shade
					this_hand_distance_to_left_shade_point = subf_find_distance_to_max_point(this.left_shade_max_point) ;
					if (this_hand_distance_to_left_shade_point <= this.left_shade_mid_range) {
						answer = this.left_shade_min + ((1 - (this_hand_distance_to_left_shade_point/this.left_shade_mid_range))*(this.left_shade_max - this.left_shade_min)) ;
						//one_hand.left_shade_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.left_shade_min ;
					}
				} else if (the_effectType == 'right_shade') {
					// update effect alpha for right_shade
					this_hand_distance_to_right_shade_point = subf_find_distance_to_max_point(this.right_shade_max_point) ;
					if (this_hand_distance_to_right_shade_point <= this.right_shade_mid_range) {
						answer = this.right_shade_min + ((1 - (this_hand_distance_to_right_shade_point/this.right_shade_mid_range))*(this.right_shade_max - this.right_shade_min)) ;
						//one_hand.right_shade_mc._alpha = 0 ; //temp line to throw away
					} else {
						answer = this.right_shade_min ;
					}
				}
			} // end if else for left/right lights and shades

		//} // end if (one_hand)

		return answer/100;

	}

	/*******************************************************************************************/
	function _________________________General() {} // to add separators in editor :-)
	/*******************************************************************************************/

	this.degreesToRadians = function(the_degrees) {
		return the_degrees * (Math.PI / 180);
	}

	/*******************************************************************************************/

	this.radiansToDegrees = function(the_radians) {
		return the_radians * (180 / Math.PI);
	}

	/*******************************************************************************************/

	this.easeInOutQuadWithT_withB_withC_withD = function(t, b, c, d) {
		//// Robert Penner - Sept. 2001 - robertpenner.com ////
		// t: current time
		// b: beginning value
		// c: change in value
		// d: duration
		// t and d can be in frames or seconds/milliseconds
		//console.log('t = ' + t + ' / b = ' + b + ' / c = '+ c + ' / d = '+ d);
		if (t < d/2) return 2*c*t*t/(d*d) + b;
		var ts = t - d/2;
		return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b ;
		// from http://gizma.com/easing/
		/*t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;*/
	}

	/*******************************************************************************************/

	this.getX_withRotatedCoordinateSystemTo_withY = function(the_x, the_rotation, the_y) {

		// original help was here : answers.yahoo.com/question/index?qid=20100531151549AAisHWe
		// and here : en.wikipedia.org/wiki/Rotation_matrix

		var trigValue = this.degreesToRadians(the_rotation);

		return ((the_x * Math.cos(trigValue)) + (the_y * Math.sin(trigValue)));

	}

	/*******************************************************************************************/

	this.getY_withRotatedCoordinateSystemTo_withX= function(the_y, the_rotation, the_x) {

		// original help was here : answers.yahoo.com/question/index?qid=20100531151549AAisHWe
		// and here : en.wikipedia.org/wiki/Rotation_matrix

		var trigValue = this.degreesToRadians(the_rotation);

		return (-(the_x * Math.sin(trigValue)) + (the_y * Math.cos(trigValue)));

	}

	/*******************************************************************************************/

	this.traceClassVersionNumber();

}


function OTWButton() {



}

function OTWHand() {

	var objectRoot = this;
	var backupRotation, currentRotation, currentSpinRotation, cycleIsSmooth, cycleTime, cycleType, effectTypes, effectViews, isMagnified, targetRotation, previousTimezone, timezone;
	var image, height, width;
	var xCenter, yCenter, xOffset, yOffset;

	this.createNewHandWithTarget_imageNamed_toCenter_xCenter_yCenter_xOffset_yOffset_cycleType_cycleTime_cycleIsReversed_cycleIsSmooth_timezone_lightEffects = function(the_target, the_imageName, the_center, the_xCenter, the_yCenter, the_xOffset, the_yOffset, the_cycleType, the_cycleTime, the_cycleIsReversed, the_cycleIsSmooth, the_timezone, the_lightEffects) {

		// working with main image first

		var basicImageName = the_imageName.split(".")[0];
		var fileType = the_imageName.split(".")[1];

		this.width = 0;
		this.height = 0;

		function doFinalizeHandCreation() {
			the_target.imagesToBeLoaded.splice(the_target.imagesToBeLoaded.indexOf(newHand.src), 1);
			objectRoot.width = newHand.width;
			objectRoot.height = newHand.height;
			objectRoot.image = newHand;
		}

		var newHand = new Image();
		newHand.onload = function() {
			doFinalizeHandCreation();
		}
		newHand.src = the_target.globalWatch_imageFolderName + '/' + the_imageName;
		the_target.imagesToBeLoaded.push(newHand.src);

		// working with light effects
		this.effectTypes = new Array();
		this.effectViews = new Array();
		if (the_lightEffects) {
			for (var i = 0; i < the_lightEffects.length; i++) {
				this.effectTypes.push(the_lightEffects[i]);
				var lightEffectImage = new Image();
				lightEffectImage.src = the_target.globalWatch_imageFolderName + '/' + basicImageName + '_' + the_lightEffects[i] + '.' + fileType;
				this.effectViews.push(lightEffectImage);
				//the_target.imagesToBeLoaded.push(lightEffectImage.src);
			}
		}

		this.cycleType = the_cycleType;
		this.cycleTime = the_cycleTime;
		this.cycleIsReversed = the_cycleIsReversed;
		this.cycleIsSmooth = the_cycleIsSmooth;

		this.xCenter = the_xCenter;
		this.yCenter = the_yCenter;
		this.xOffset = the_xOffset;
		this.yOffset = the_yOffset;

		if (the_timezone == null) {
			the_timezone = "";
		}
		this.timezone = the_timezone;

	}

}

function OTWTimepieceCenter() {

	var name, xCenter, yCenter;

	this.createNewTimepieceCenterNamed_xCenter_yCenter = function(the_name, the_xCenter, the_yCenter) {

		this.name = the_name;
		this.xCenter = the_xCenter;
		this.yCenter = the_yCenter;

	}

}

function OTWTimezone() {

	var timezoneName, millisecond, second, minute, hour, monthDate, weekDay, yearMonth;

	this.createNewTimeZoneWithName = function(the_timezoneName) {

		this.timezoneName = the_timezoneName;
		this.millisecond = 0;
		this.second = 0;
		this.minute = 0;
		this.hour = 0;
		this.monthDate = 0;
		this.weekDay = 0;
		this.yearMonth = 0;

	}

	this.updateDataWithDate = function(the_date) {

		// millisecond
		this.millisecond = the_date.getMilliseconds();

		// second
		this.second = the_date.getSeconds();

		// minute
		this.minute = the_date.getMinutes();

		// hour
		this.hour = the_date.getHours();

		// month date
		this.monthDate = the_date.getDate();

		// week Day
		this.weekDay = the_date.getDay();

		// Month
		this.yearMonth = the_date.getMonth();

	}

}
/*  |xGv00|98db9ef35281b0fdc8b2f97c6eb12ae3 */