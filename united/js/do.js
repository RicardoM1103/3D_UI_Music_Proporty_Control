﻿FretChordSheet.prototype.resetUndoStatus = function () {
	document.getElementById('undobutton').style.width = this.tiler.tapSize + 'px';
	document.getElementById('undobutton').style.height = this.tiler.tapSize + 'px';
	document.getElementById('redobutton').style.width = this.tiler.tapSize + 'px';
	document.getElementById('redobutton').style.height = this.tiler.tapSize + 'px';
	document.getElementById('redobutton').style.top = (5 * 2 + this.tiler.tapSize) + 'px';
	this.clearUndo();
	var me = this;
	document.getElementById('undobutton').onclick = function () { me.undoLast(); };
	document.getElementById('redobutton').onclick = function () { me.redoNext(); };
	this.setUndoStatus();
}
FretChordSheet.prototype.setUndoStatus = function () {
	if (this.undoStep < this.undoQueue.length) {
		document.getElementById('redoimg').src = "redoActive.png";
	} else {
		document.getElementById('redoimg').src = "redo.png";
	}
	if (this.undoStep > 0) {
		document.getElementById('undoimg').src = "undoActive.png";
	} else {
		document.getElementById('undoimg').src = "undo.png";
	}
};
FretChordSheet.prototype.makeUndo = function (level) {
	console.log('makeUndo', level);
	var last = null;
	for (var i = this.undoQueue.length - 1; i >= level; i--) {
		var u = this.undoQueue.pop();
		u.undo();
		last = u;
	}
	if (last) {
		this.resetAllLayersNow();
		this.startSlideTo(last.x, last.y, last.z);
	}
};
FretChordSheet.prototype.clearUndo = function () {
	this.undoQueue = [];
	this.undoStep = 0;
}
FretChordSheet.prototype.setUndoStatus = function () {
	if (this.undoStep < this.undoQueue.length) {
		document.getElementById('redoimg').src = "img/redoActive.png";
	} else {
		document.getElementById('redoimg').src = "img/redo.png";
	}
	if (this.undoStep > 0) {
		document.getElementById('undoimg').src = "img/undoActive.png";
	} else {
		document.getElementById('undoimg').src = "img/undo.png";
	}
};
FretChordSheet.prototype.redoNext = function (v) {
	if (this.undoStep < this.undoQueue.length) {
		this.modalDialogMode = false;
		var a = this.undoQueue[this.undoStep];
		console.log('redo', a.caption);
		a.redo();
		this.undoStep++;
		this.tiler.resetAllLayersNow();
		this.tiler.startSlideTo(a.x, a.y, a.z);
		this.setUndoStatus();
	}
};
FretChordSheet.prototype.undoLast = function () {
	if (this.undoStep > 0) {
		this.modalDialogMode = false;
		this.undoStep--;
		var a = this.undoQueue[this.undoStep];
		console.log('undo', a.caption);
		a.undo();
		this.tiler.resetAllLayersNow();
		this.tiler.startSlideTo(a.x, a.y, a.z);
		this.setUndoStatus();
	}
};
FretChordSheet.prototype.pushAction = function (action) {
	console.log('pushAction', action.caption);
	action.x = this.tiler.translateX;
	action.y = this.tiler.translateY;
	action.z = this.tiler.translateZ;
	action.redo();
	var rm = this.undoQueue.length - this.undoStep;
	for (var i = 0; i < rm; i++) {
		this.undoQueue.pop();
	}
	this.undoQueue.push(action);
	this.undoStep++;
	rm = this.undoQueue.length - this.undoSize;
	for (var i = 0; i < rm; i++) {
		this.undoQueue.shift();
		this.undoStep--;
	}
	this.setUndoStatus();
};
FretChordSheet.prototype.userActionChangeFeel = function (nn) {
	var olds = this.options.feel;
	var news = nn;
	var me = this;
	this.pushAction({
		caption: 'Change feel mode ' + nn,
		undo: function () {
			me.options.feel = olds;
		},
		redo: function () {
			me.options.feel = news;
		}
	});
};
FretChordSheet.prototype.userActionChangeMarkMode = function (nn) {
	var olds = this.options.markNotesCount;
	var news = nn;
	var me = this;
	this.pushAction({
		caption: 'Change mark mode ' + nn,
		undo: function () {
			me.options.markNotesCount = olds;
		},
		redo: function () {
			me.options.markNotesCount = news;
		}
	});
};
FretChordSheet.prototype.userActionChangeMeasureMode = function (nn) {
	var olds = this.options.measureMode;
	var news = nn;
	var me = this;
	this.pushAction({
		caption: 'Change measure mode ' + nn,
		undo: function () {
			me.options.measureMode = olds;
			me.options.measureLen = (me.options.measureMode + 3) * 8;
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.measureMode = news;
			me.options.measureLen = (me.options.measureMode + 3) * 8;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionClearSong = function () {
	var me = this;
	var old = me.measures;
	this.pushAction({
		caption: 'Clear song',
		undo: function () {
			me.measures = old;
			var minfo = me.measureInfo(0);
		},
		redo: function () {
			me.measures = [];
			var minfo = me.measureInfo(0);
		}
	});
};
FretChordSheet.prototype.userActionTrackUp = function (n) {
	var me = this;
	var old = this.trackOrder;
	var newOrder = this.createTrackUp(n);
	this.pushAction({
		caption: 'Up track ' + n,
		undo: function () {
			me.trackOrder = old;
		},
		redo: function () {
			me.trackOrder = newOrder;
		}
	});
};
FretChordSheet.prototype.userActionAddNote = function (track, morder, start192, note) {
	//console.log('userActionAddNote',note);
	var me = this;
	var pre = this.cloneMeasure(morder);
	var minfo = this.measureInfo(morder);
	var beat = this.beatInfo(minfo, start192);
	beat.chords[track].notes.push(note);
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Add note ' + track + ":" + morder + ":" + start192 + ":" + note.octave+ "/" + note.step+ "/" + note.accidental,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionAlterNote = function (track, morder, start192, note) {
	var me = this;
	var pre = this.cloneMeasure(morder);
	var minfo = this.measureInfo(morder);
	var beat = this.beatInfo(minfo, start192);
	beat.chords[track].notes.push(note);
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Alter note ' + track + ":" + morder + ":" + start192 + ":" + note.octave+ "/" + note.step+ "/" + note.accidental,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionAddDrum = function (morder, start192, drum) {
	var me = this;
	var pre = this.cloneMeasure(morder);
	var minfo = this.measureInfo(morder);
	var beat = this.beatInfo(minfo, start192);
	beat.drums[drum] = 1;
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Add drum ' + morder + ":" + start192 + ":" + drum,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionBreakMode = function (n) {
	var me = this;
	var old = this.options.breakMode;
	var newMode = n - 1;
	this.pushAction({
		caption: 'Set break mode ' + newMode,
		undo: function () {
			me.options.breakMode = old;
			me.resetHeaderWidth();
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.breakMode = newMode;
			me.resetHeaderWidth();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionDropDrums = function (morder, start192, duration192, drum) {
	var me = this;
	var pre = this.cloneMeasure(morder);
	var noteDrums = me.findDrums(morder, start192, duration192, drum);
	for (var d = 0; d < noteDrums.length; d++) {
		me.dropDrumAtBeat(noteDrums[d].morder, noteDrums[d].beatStart, noteDrums[d].drum);
	}
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Drop drums ' + ":" + morder + ":" + start192 + ":" + duration192 + ":" + drum,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionDropNotes = function (track, morder, start192, duration192, pitch) {
	var me = this;
	var pre = this.cloneMeasure(morder);
	var noteBeats = me.findNotes(track, morder, start192, duration192, pitch);
	for (var d = 0; d < noteBeats.length; d++) {
		me.dropNoteAtBeat(noteBeats[d].track, noteBeats[d].morder, noteBeats[d].beatStart, pitch);
	}
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Drop notes ' + track + ":" + morder + ":" + start192 + ":" + duration192 + ":" + pitch,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionDropNotes7 = function (track, morder, start192, duration192, octave, step) {
	//console.log('userActionDropNotes7', octave, step);
	var me = this;
	var pre = this.cloneMeasure(morder);
	var noteBeats = me.findNotes7(track, morder, start192, duration192, octave, step);
	//console.log('noteBeats',noteBeats, octave, step);
	for (var d = 0; d < noteBeats.length; d++) {
		//console.log('dropNoteAtBeat7', noteBeats[d].note.octave, noteBeats[d].note.step);
		me.dropNoteAtBeat7(noteBeats[d].track, noteBeats[d].morder, noteBeats[d].beatStart, noteBeats[d].note.octave, noteBeats[d].note.step);
	}
	var after = this.cloneMeasure(morder);
	this.pushAction({
		caption: 'Drop notes7 ' + track + ":" + morder + ":" + start192 + ":" + duration192 + ":" + octave + '/' + step,
		undo: function () {
			me.measures[morder] = pre;
			me.shrinkMeasures();
			me.reCalcContentSize();
		},
		redo: function () {
			me.measures[morder] = after;
			me.shrinkMeasures();
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionSetHidePiano = function (n) {
	var me = this;
	var pre = this.options.hidePiano;
	this.pushAction({
		caption: 'Piano ' + n,
		undo: function () {
			me.options.hidePiano = pre;
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.hidePiano = n;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionSetHideStaff = function (n) {
	var me = this;
	var pre = this.options.hideStaff;
	this.pushAction({
		caption: 'Staff ' + n,
		undo: function () {
			me.options.hideStaff = pre;
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.hideStaff = n;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionSetHideFrets = function (n) {
	var me = this;
	var pre = this.options.hideFrets;
	this.pushAction({
		caption: 'Frets ' + n,
		undo: function () {
			me.options.hideFrets = pre;
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.hideFrets = n;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionSetHideDrums = function (n) {
	var me = this;
	var pre = this.options.hideDrums;
	this.pushAction({
		caption: 'Drums ' + n,
		undo: function () {
			me.options.hideDrums = pre;
			me.reCalcContentSize();
		},
		redo: function () {
			me.options.hideDrums = n;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionRollMeter = function (morder) {
	var me = this;
	var minfo = this.measureInfo(morder);
	var pre = minfo.duration4;
	var aftr = pre + 1;
	if (aftr > 7) {
		aftr = 3;
	}
	this.pushAction({
		caption: 'Roll meter ' + morder,
		undo: function () {
			minfo.duration4 = pre;
			me.reCalcContentSize();
		},
		redo: function () {
			minfo.duration4 = aftr;
			me.reCalcContentSize();
		}
	});
};
FretChordSheet.prototype.userActionRollKeys = function (morder) {
	var me = this;
	var minfo = this.measureInfo(morder);
	var pre = minfo.keys;
	var aftr = pre + 1;
	if (aftr >= this.keys.length) {
		aftr = 0;
	}
	this.pushAction({
		caption: 'Roll keys ' + morder,
		undo: function () {
			minfo.keys = pre;
		},
		redo: function () {
			minfo.keys = aftr;
		}
	});
};

FretChordSheet.prototype.dropDrumAtBeat = function (morder, beatStart, drum) {
	if (morder < this.measures.length) {
		minfo = this.measures[morder];
		for (var i = 0; i < minfo.beats.length; i++) {
			var measureBeat = minfo.beats[i];
			if (measureBeat.start192 == beatStart) {
				measureBeat.drums[drum] = 0;
			}
		}
	}
};
FretChordSheet.prototype.dropNoteAtBeat = function (track, morder, beatStart, pitch) {
	
	if (morder < this.measures.length) {
		var minfo = this.measures[morder];
		
		for (var i = 0; i < minfo.beats.length; i++) {
			var measureBeat = minfo.beats[i];
			
			if (measureBeat.start192 == beatStart) {
				var measureToneChord = measureBeat.chords[track];
				//console.log(pitch,measureToneChord);
				for (var n = 0; n < measureToneChord.notes.length; n++) {
					var measureToneNote = measureToneChord.notes[n];
					if (this.octaveStepAccidental(measureToneNote.octave, measureToneNote.step, measureToneNote.accidental) == pitch) {
						measureToneChord.notes.splice(n, 1);
						break;
					}
				}
			}
		}
	}
};
FretChordSheet.prototype.dropNoteAtBeat7 = function (track, morder, beatStart, octave, step) {
	
	if (morder < this.measures.length) {
		minfo = this.measures[morder];
		for (var i = 0; i < minfo.beats.length; i++) {
			var measureBeat = minfo.beats[i];
			if (measureBeat.start192 == beatStart) {
				var measureToneChord = measureBeat.chords[track];
				for (var n = 0; n < measureToneChord.notes.length; n++) {
					var measureToneNote = measureToneChord.notes[n];
					if (measureToneNote.octave == octave && measureToneNote.step == step) {
						measureToneChord.notes.splice(n, 1);
						break;
					}
				}
			}
		}
	}
};
FretChordSheet.prototype.cloneNote = function (measureToneNote) {
	var clone = new MeasureToneNote();
	clone.string = measureToneNote.string;
	clone.octave = measureToneNote.octave;
	clone.step = measureToneNote.step;
	clone.accidental = measureToneNote.accidental;
	clone.palmMute = measureToneNote.palmMute;
	clone.slap = measureToneNote.slap;
	clone.deadNote = measureToneNote.deadNote;
	for (var i = 0; i < measureToneNote.slides.length; i++) {
		clone.slides[i] = { shift: measureToneNote.slides[i].shift, end192: measureToneNote.slides[i].end192 };
	}
	return clone;
};
FretChordSheet.prototype.cloneChord = function (measureToneChord) {
	var clone = new MeasureToneChord();
	clone.direction = measureToneChord.direction;
	for (var i = 0; i < measureToneChord.notes.length; i++) {
		clone.notes[i] = this.cloneNote(measureToneChord.notes[i]);
	}
	return clone;
};
FretChordSheet.prototype.cloneBeat = function (measureBeat) {
	var clone = new MeasureBeat();
	clone.start192 = measureBeat.start192;
	for (var i = 0; i < measureBeat.drums.length; i++) {
		clone.drums[i] = measureBeat.drums[i];
	}
	for (var i = 0; i < measureBeat.chords.length; i++) {
		clone.chords[i] = this.cloneChord(measureBeat.chords[i]);
	}
	return clone;
};
FretChordSheet.prototype.cloneMeasure = function (morder) {
	var clone = new MeasureInfo();
	if (morder < this.measures.length) {
		minfo = this.measures[morder];
		clone.meter = minfo.meter;
		clone.keys = minfo.keys;
		clone.duration4 = minfo.duration4;
		for (var i = 0; i < minfo.beats.length; i++) {
			clone.beats[i] = this.cloneBeat(minfo.beats[i]);
		}
	}
	return clone;
};
FretChordSheet.prototype.createTrackUp = function (n) {
	var newOrder = [];
	for (var i = 0; i < this.trackOrder.length; i++) {
		if (this.trackOrder[i] < this.trackOrder[n]) {
			newOrder[i] = this.trackOrder[i] + 1;
		} else {
			newOrder[i] = this.trackOrder[i];
		}
	}
	newOrder[n] = 0;
	return newOrder;
};
FretChordSheet.prototype.shrinkMeasures = function () {
	var minfo = this.measureInfo(0);
	var mx = 1;
	for (var i = 0; i < this.measures.length; i++) {
		if (!this.isMeasureEmpty(this.measures[i])) {
			mx = i;
		}
	}
	this.measures.splice(mx + 1);
};

