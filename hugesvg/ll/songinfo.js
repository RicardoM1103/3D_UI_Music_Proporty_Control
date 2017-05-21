﻿console.log('songinfo 1.01');
function SongInfo() {
	var sng = this;
	sng.gridColor = '#cccccc';
	sng.normalColor = '#000000';
	sng.backColor = '#999999';
	sng.handlerColor = '#000099';
	sng.commentColor = '#009900';
	sng.warningColor = '#990000';

	sng.leftMargin = 20;
	sng.rightMargin = 50;
	sng.topMargin = 7;
	sng.bottomMargin = 10;

	sng.titleHeight = 30;
	sng.notationHeight = 30;
	sng.textHeight = 3;
	sng.fretHeight = 18;
	sng.chordsHeight = 5;
	sng.pianorollHeight = 128;
	sng.title = 'Some not so long title';
	sng.tracks = [{
			name : 'First'
		}, {
			name : 'Synth'
		}, {
			name : 'Distortion second'
		}, {
			name : 'Overdrive third'
		}, {
			name : 'Solo'
		}, {
			name : 'Rhythm'
		}, {
			name : 'Bass fourth'
		}, {
			name : 'Drums'
		}
	];
	sng.measures = [];
	for (var i = 0; i < 300; i++) {
		sng.measures.push({
			meter32 : 32,
			tempo : 120
			,margin32:0
		});
	}
	sng.measures[64].meter32 = 12;
	sng.measures[128].meter32 = 12;
	sng.measures[192].meter32 = 12;
	sng.measures[0].margin32 = 8;
	sng.measures[64].margin32 = 8;
	sng.measures[128].margin32 = 8;
	sng.measures[192].margin32 = 8;
	for (var i = 250; i < 270; i++) {
		sng.measures[i].tempo = 200;
	}
	/*sng.trackCount=function(){
	return 7;
	};*/
	sng.duration32 = function () {
		var m = 0;
		for (var i = 0; i < sng.measures.length; i++) {
			m = m + sng.measures[i].meter32+ sng.measures[i].margin32;
		}
		//console.log('duration32',m);
		return m;

	};
	sng.tileTrackNames = function (me, left, top, width, height, layer) {
		var x = 0;
		var y = 0;
		var w = me.tapSize * sng.trackMargin;
		var h = me.innerHeight;
		if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
			for (var i = 0; i < sng.tracks.length; i++) {
				var id = 'trackName' + i;
				x = 0;
				y = me.tapSize * i * sng.trackHeight;
				w = me.tapSize * sng.trackMargin;
				h = me.tapSize * sng.trackHeight;
				if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
					if (!me.childExists(id, layer)) {
						tileSpot(me, x, y, w - me.tapSize, h - me.tapSize, layer, id);
					}
				}
			}
		}
	};
	sng.tileNoteLines = function (me, left, top, width, height, layer) {
		var d32 = sng.duration32();
		var x = me.tapSize * sng.trackMargin;
		var y = 0;
		var w = d32 * me.tapSize; //me.innerWidth - me.tapSize * sng.trackMargin;
		var h = sng.tracks.length * me.tapSize * sng.trackHeight;
		//var d = 16;
		if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
			for (var n = 0; n < sng.tracks.length; n++) {
				var id = 'line' + n + 'x0';
				if (!me.childExists(id, layer)) {
					tileRectangle(me, '#000000', x, n * me.tapSize * sng.trackHeight, w, 2 * me.tapSize, layer, id);
				}
			}
			var i = 0;
			for (var k = 0; k < sng.measures.length; k++) {
				x = me.tapSize * sng.trackMargin + i * me.tapSize;
				y = 0;
				w = sng.measures[k].meter32 * me.tapSize;
				h = sng.tracks.length * me.tapSize * sng.trackHeight;
				if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
					for (var n = 0; n < sng.tracks.length; n++) {
						var id = 'm' + k + 'x' + n;
						//tileSpot(me, x, n * sng.trackHeight * me.tapSize, w - me.tapSize, (sng.trackHeight-1) * me.tapSize, layer, id);
						//console.log(id,w);
					}
				}
				i = i + sng.measures[k].meter32;
			}
		}
	};
	sng.tileNoteParts = function (me, left, top, width, height, layer) {
		var x = me.tapSize * sng.trackMargin;
		var y = 0;
		var w = me.innerWidth - me.tapSize * sng.trackMargin;
		var h = sng.tracks.length * me.tapSize * sng.trackHeight;
		var d = 16;
		var c = 50;
		if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
			for (var i = 0; i < 300; i = i + c) {
				x = me.tapSize * sng.trackMargin + i * d * me.tapSize;
				y = 0;
				w = c * d * me.tapSize;
				h = sng.tracks.length * me.tapSize * sng.trackHeight;
				if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
					for (var n = 0; n < sng.tracks.length; n++) {
						var id = 'p' + i + 'x' + n;
						tileSpot(me, x, n * sng.trackHeight * me.tapSize, w - me.tapSize, (sng.trackHeight - 1) * me.tapSize, layer, id);
						//console.log(id,w);
					}
				}
			}
		}
	};
	sng.tileRollCells = function (me, left, top, width, height, layer) {
		var x = me.tapSize * sng.trackMargin;
		var y = sng.tracks.length * me.tapSize * sng.trackHeight;
		var w = me.innerWidth - me.tapSize * sng.trackMargin;
		var h = me.innerHeight - sng.tracks.length * me.tapSize * sng.trackHeight;
		var d = 16;
		var c = 1;
		if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
			//console.log('add tileRollCells',x, y, w, h, left, top, width, height);
			for (var i = 0; i < 300; i = i + c) {
				x = me.tapSize * sng.trackMargin + i * d * me.tapSize;
				y = sng.tracks.length * sng.trackHeight * me.tapSize;
				w = c * d * me.tapSize;
				h = 128 * me.tapSize;
				if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
					for (var n = 0; n < 10; n++) {
						var id = 'o' + i + 'x' + n;
						tileSpot(me, x, y + n * 12 * me.tapSize, w - me.tapSize, 11 * me.tapSize, layer, id);
						//console.log(id,x, y+n * 12 * me.tapSize, 600+w - me.tapSize, 101 * me.tapSize);
					}
				}
			}
		} else {
			//console.log('no tileRollCells',x, y, w, h, left, top, width, height);
		}
	};
	sng.addSongTitle = function (me, left, top, width, height, layer) {
		//var w = me.tapSize * (sng.leftMargin + sng.duration32() + sng.rightMargin);
		//var h = me.tapSize * (sng.topMargin + sng.titleHeight + sng.bottomMargin);
		var x=sng.leftMargin * me.tapSize;
		var y=sng.topMargin * me.tapSize;
		var w = me.tapSize * sng.duration32();
		var h = me.tapSize * sng.titleHeight;
		if (!me.outOfRect(0, 0, w, h, left, top, width, height)) {
			if (!me.childExists('title', layer)) {
				tileTextLabel(x, y, 33 * me.tapSize, sng.title, layer, 'title',sng.gridColor);
			}
		}
		//tilePlaceHolder(me,x, y,w-me.tapSize,h-me.tapSize,layer,'plTitle',left, top, width, height);
	}
	sng.addMeasureLines = function (me, left, top, width, height, layer, detailRatio,step) {
		var m = 0;
		for (var i = 0; i < sng.measures.length; i++) {
			if (i % step == 0) {
				var h = (sng.notationHeight + sng.textHeight + sng.fretHeight + sng.chordsHeight + sng.pianorollHeight) * me.tapSize;
				var x = (sng.leftMargin + m) * me.tapSize;
				var y = (sng.topMargin + sng.titleHeight) * me.tapSize;
				var w = 5 * me.tapSize;
				if (!me.outOfRect(x, y, w, h, left, top, width, height)) {
					var id = 'ms' + i;
					if (!me.childExists(id, layer)) {
						tileRectangle(sng.gridColor, x, y, me.lineWidth * detailRatio, h, layer, id);
						tileTextLabel(x, y, me.tapSize * 3 * detailRatio, ' ' + i, layer, id + 't',sng.gridColor);
					}
				}
			}
			m = m + sng.measures[i].meter32;
		}
	}
	sng.addBoundingBox = function (me, layer, s) {
		var id = 'boundingBox';
		if (!me.childExists(id, layer)) {
			var w = (sng.leftMargin + sng.duration32() + sng.rightMargin) * me.tapSize;
			var h = (sng.topMargin + sng.titleHeight + sng.notationHeight + sng.textHeight + sng.fretHeight + sng.chordsHeight + sng.pianorollHeight + sng.bottomMargin) * me.tapSize;
			tileRectangle('#ff0000', 0, 0, w, s, layer, id);
			tileRectangle('#ff0000', 0, h, w, s, layer, id + 'a');
			tileRectangle('#ff0000', 0, 0, s, h, layer, id + 'b');
			tileRectangle('#ff0000', w, 0, s, h, layer, id + 'c');
		}
	};
	sng.addHugeTiles = function (me, left, top, width, height) {
		var d32=sng.duration32();
		var detailRatio = 30;
		sng.addBoundingBox(me, me.layHugeFront, detailRatio * me.lineWidth);
		//sng.addSongTitle(me, left, top, width, height, me.layHugeBack);
		//sng.addMeasureLines(me, left, top, width, height, me.layHugeBack, detailRatio,10);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+0)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.titleHeight*me.tapSize,me.layHugeBack,'plTitle',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.notationHeight*me.tapSize,me.layHugeBack,'plNotation',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.textHeight*me.tapSize,me.layHugeBack,'plText',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.chordsHeight*me.tapSize,me.layHugeBack,'plChords',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.fretHeight*me.tapSize,me.layHugeBack,'plFret',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.pianorollHeight*me.tapSize,me.layHugeBack,'plPianoroll',left, top, width, height);
		var s=200;
		for(var i=0;i<d32;i=i+s){
			//console.log(i);
			tilePlaceHolder(me
				,(sng.leftMargin+i)*me.tapSize
				,(sng.topMargin+sng.titleHeight)*me.tapSize//
				,(s-0)*me.tapSize
				,(sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight)*me.tapSize
				,me.layHugeBack,'m0_'+Math.round(i/s),left, top, width, height);
		}
	}
	sng.addLargeTiles = function (me, left, top, width, height) {
		var d32=sng.duration32();
		var detailRatio = 3;
		sng.addBoundingBox(me, me.layLargeAction, detailRatio * me.lineWidth);
		//sng.addSongTitle(me, left, top, width, height, me.layLargeBack);
		//sng.addMeasureLines(me, left, top, width, height, me.layLargeBack, detailRatio,1);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+0)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.titleHeight*me.tapSize,me.layLargeBack,'plTitle',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.notationHeight*me.tapSize,me.layLargeBack,'plNotation',left, top, width, height);
		for(var i=0;i<5;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+10+i*2)*me.tapSize//
				,sng.duration32()*me.tapSize,0.25*me.tapSize,me.layLargeBack,'li'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.textHeight*me.tapSize,me.layLargeBack,'plText',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.chordsHeight*me.tapSize,me.layLargeBack,'plChords',left, top, width, height);
		for(var i=0;i<6;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+i*3)*me.tapSize//
				,sng.duration32()*me.tapSize,3*me.tapSize,me.layLargeBack,'plFret'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.pianorollHeight*me.tapSize,me.layLargeBack,'plPianoroll',left, top, width, height);
		for(var i=0;i<10;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight-12*(i+1))*me.tapSize//
				,sng.duration32()*me.tapSize,12*me.tapSize,me.layLargeBack,'plOctave'+i,left, top, width, height);
		}
		var s=20;
		for(var i=0;i<d32;i=i+s){
			//console.log(i);
			tilePlaceHolder(me
				,(sng.leftMargin+i)*me.tapSize
				,(sng.topMargin+sng.titleHeight)*me.tapSize//
				,(s-0)*me.tapSize
				,(sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight)*me.tapSize
				,me.layLargeBack,'m1_'+Math.round(i/s),left, top, width, height);
		}
	}
	sng.addMediumTiles = function (me, left, top, width, height) {
		var d32=sng.duration32();
		var detailRatio = 0.75;
		sng.addBoundingBox(me, me.layMediumAction, detailRatio * me.lineWidth);
		//sng.addSongTitle(me, left, top, width, height, me.layMediumBack);
		//sng.addMeasureLines(me, left, top, width, height, me.layMediumGrid, detailRatio,1);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+0)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.titleHeight*me.tapSize,me.layMediumBack,'plTitle',left, top, width, height);
		//tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight)*me.tapSize//
		//	,sng.duration32()*me.tapSize,sng.notationHeight*me.tapSize,me.layMediumBack,'plNotation',left, top, width, height);
		for(var i=0;i<5;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+10+i*2)*me.tapSize//
				,sng.duration32()*me.tapSize,0.25*me.tapSize,me.layMediumBack,'li'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.textHeight*me.tapSize,me.layMediumBack,'plText',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.chordsHeight*me.tapSize,me.layMediumBack,'plChords',left, top, width, height);
		for(var i=0;i<6;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+i*3)*me.tapSize//
				,sng.duration32()*me.tapSize,3*me.tapSize,me.layMediumBack,'plFret'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.pianorollHeight*me.tapSize,me.layMediumBack,'plPianoroll',left, top, width, height);
		for(var i=0;i<10;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight-12*(i+1))*me.tapSize//
				,sng.duration32()*me.tapSize,12*me.tapSize,me.layMediumBack,'plOctave'+i,left, top, width, height);
		}
		var s=20;
		for(var i=0;i<d32;i=i+s){
			//console.log(i);
			tilePlaceHolder(me
				,(sng.leftMargin+i)*me.tapSize
				,(sng.topMargin+sng.titleHeight)*me.tapSize//
				,(s-0)*me.tapSize
				,(sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight)*me.tapSize
				,me.layMediumBack,'m2_'+Math.round(i/s),left, top, width, height);
		}
		var h=sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight;
		for(var nx=0;nx<d32;nx=nx+4){
				tilePlaceHolder(me
					,(sng.leftMargin+nx)*me.tapSize//
					,(sng.topMargin+sng.titleHeight)*me.tapSize//
					,2*me.tapSize
					,h*me.tapSize
					,me.layMediumBack,'v'+nx,left, top, width, height);
		}
		for(var ny=0;ny<h;ny=ny+4){
				tilePlaceHolder(me
					,sng.leftMargin*me.tapSize//
					,(sng.topMargin+sng.titleHeight+ny)*me.tapSize//
					,d32*me.tapSize
					,2*me.tapSize
					,me.layMediumBack,'h'+ny,left, top, width, height);
		}
	}
	sng.addSmallTiles = function (me, left, top, width, height) {
		var d32=sng.duration32();
		var detailRatio = 0.5;
		sng.addBoundingBox(me, me.laySmallAction, detailRatio * me.lineWidth);
		//sng.addSongTitle(me, left, top, width, height, me.laySmallBack);
		//sng.addMeasureLines(me, left, top, width, height, me.laySmallGrid, detailRatio,1);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+0)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.titleHeight*me.tapSize,me.laySmallGrid,'plTitle',left, top, width, height);
		//tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight)*me.tapSize//
		//	,sng.duration32()*me.tapSize,sng.notationHeight*me.tapSize,me.laySmallGrid,'plNotation',left, top, width, height);
		for(var i=0;i<5;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+10+i*2)*me.tapSize//
				,sng.duration32()*me.tapSize,0.25*me.tapSize,me.laySmallGrid,'li'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.textHeight*me.tapSize,me.laySmallGrid,'plText',left, top, width, height);
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.chordsHeight*me.tapSize,me.laySmallGrid,'plChords',left, top, width, height);
		for(var i=0;i<6;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+i*3)*me.tapSize//
				,sng.duration32()*me.tapSize,3*me.tapSize,me.laySmallGrid,'plFret'+i,left, top, width, height);
		}
		tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight)*me.tapSize//
			,sng.duration32()*me.tapSize,sng.pianorollHeight*me.tapSize,me.laySmallGrid,'plPianoroll',left, top, width, height);
		for(var i=0;i<10;i++){
			tilePlaceHolder(me,sng.leftMargin*me.tapSize,(sng.topMargin+sng.titleHeight+sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight-12*(i+1))*me.tapSize//
				,sng.duration32()*me.tapSize,12*me.tapSize,me.laySmallGrid,'plOctave'+i,left, top, width, height);
		}
		var s=20;
		for(var i=0;i<d32;i=i+s){
			//console.log(i);
			tilePlaceHolder(me
				,(sng.leftMargin+i)*me.tapSize
				,(sng.topMargin+sng.titleHeight)*me.tapSize//
				,(s-0)*me.tapSize
				,(sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight)*me.tapSize
				,me.laySmallGrid,'m3_'+Math.round(i/s),left, top, width, height);
		}
		var h=sng.notationHeight+sng.textHeight+sng.chordsHeight+sng.fretHeight+sng.pianorollHeight;
		for(var nx=0;nx<d32;nx=nx+2){
				tilePlaceHolder(me
					,(sng.leftMargin+nx)*me.tapSize//
					,(sng.topMargin+sng.titleHeight)*me.tapSize//
					,me.tapSize
					,h*me.tapSize
					,me.laySmallGrid,'v'+nx,left, top, width, height);
		}
		for(var ny=0;ny<h;ny=ny+2){
				tilePlaceHolder(me
					,sng.leftMargin*me.tapSize//
					,(sng.topMargin+sng.titleHeight+ny)*me.tapSize//
					,d32*me.tapSize
					,me.tapSize
					,me.laySmallGrid,'h'+ny,left, top, width, height);
		}
	}
	sng.tileTrackLayers = function (me) {
		/*for(var i=0;i<sng.tracks.length;i++){
		var id='track'+i+'label';
		if (!me.childExists(id, me.layerHugeBack)) {
		//tileTextLabel(me.tapSize*1,me.tapSize*(1+i*30),me.tapSize*22,sng.tracks[i].name,me.layerHugeBack,id);
		tileSpot(me,me.tapSize*1,me.tapSize*(1+i*30),me.tapSize*100,me.tapSize*29,me.layerHugeFront,id);
		}
		id='line'+i+'label';
		if (!me.childExists(id, me.layerHugeBack)) {
		tileSpot(me,me.tapSize*102,me.tapSize*(1+i*30),me.tapSize*(16*300-102),me.tapSize*10,me.layerHugeFront,id);
		}
		}
		var cnt=0;
		for(var i=102;i<sng.duration16();i=i+16){
		var id='m'+cnt;
		if (!me.childExists(id, me.layerHugeBack)) {
		tileSpot(me,me.tapSize*i,me.tapSize*(2+sng.tracks.length*30),me.tapSize*15,me.tapSize*128,me.layerHugeFront,id);
		}
		cnt++;
		}
		cnt=0;
		for(var i=0;i<128;i=i+12){
		var id='octave'+cnt;
		if (!me.childExists(id, me.layerHugeBack)) {
		tileSpot(me,me.tapSize*102,me.tapSize*(12+i+2+sng.tracks.length*30),me.tapSize*(16*300-102),me.tapSize*11,me.layerHugeFront,id);
		}
		cnt++;
		}
		tileSpot(me,me.tapSize*(102+16+0),   me.tapSize*(12+2+2+sng.tracks.length*30),    me.tapSize*3.8,   me.tapSize*1,    me.layerHugeFront,'n1');
		tileSpot(me,me.tapSize*(102+16+4),   me.tapSize*(12+2+2+sng.tracks.length*30-4),    me.tapSize*1.8,   me.tapSize*1,    me.layerHugeFront,'n2');
		tileSpot(me,me.tapSize*(102+16+6),   me.tapSize*(12+2+2+sng.tracks.length*30-4),    me.tapSize*1.8,   me.tapSize*1,    me.layerHugeFront,'n3');
		tileSpot(me,me.tapSize*(102+16+8),   me.tapSize*(12+2+2+sng.tracks.length*30+7),    me.tapSize*3.8,   me.tapSize*1,    me.layerHugeFront,'n4');
		tileSpot(me,me.tapSize*(102+16+12),   me.tapSize*(12+2+2+sng.tracks.length*30+2),    me.tapSize*1.8,   me.tapSize*1,    me.layerHugeFront,'n5');
		tileSpot(me,me.tapSize*(102+16+14),   me.tapSize*(12+2+2+sng.tracks.length*30+2),    me.tapSize*1.8,   me.tapSize*1,    me.layerHugeFront,'n6');

		tileSpot(me,me.tapSize*(102+16+0),   me.tapSize*(12+2+2+sng.tracks.length*30+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s1');
		tileSpot(me,me.tapSize*(102+16+4),   me.tapSize*(12+2+2+sng.tracks.length*30-4+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s2');
		tileSpot(me,me.tapSize*(102+16+6),   me.tapSize*(12+2+2+sng.tracks.length*30-4+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s3');
		tileSpot(me,me.tapSize*(102+16+8),   me.tapSize*(12+2+2+sng.tracks.length*30+7+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s4');
		tileSpot(me,me.tapSize*(102+16+12),   me.tapSize*(12+2+2+sng.tracks.length*30+2+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s5');
		tileSpot(me,me.tapSize*(102+16+14),   me.tapSize*(12+2+2+sng.tracks.length*30+2+0.5),    me.tapSize*0.5,   me.tapSize*0.5,    me.layerHugeFront,'s6');
		 */
	};

	sng.tileTitle = function (me, layer) {
		var tileID = 'songTitle';
		if (!me.childExists(tileID, layer)) {
			var g = addSVGGroup(me, layer);
			//me.setTransform(g,0,0);
			//g.tileLevel=tileLevel;
			//g.tileID=tileID;
			g.id = tileID;

			g.tileLeft = 0; //1999;
			g.tileTop = 0; //200;
			//me.setTransform(g,1999,200);
			//g.tileWidth=me.tapSize*100;
			//g.tileHeight=me.tapSize*50;
			//var c=addSVGFillCircle(me, tileSize/2, tileSize/2, tileSize /2,g,color);
			var r = addSVGRectangle(me, 0, 0, me.tapSize * 5, me.tapSize * 5, g);
			var t = addSVGText(me, 0, 0, me.tapSize, 'String for testing', g);
			//console.log('bb',g.getBBox());
			//return 'Song for testing';
			//var len=t.getComputedTextLength();

			for (var i = 0; i < sng.tracks.length; i++) {
				var t = addSVGText(me, 0, me.tapSize * (1 + i * 1), me.tapSize, sng.tracks[i].name, g);
			}

			var tbb = g.getBBox();
			//console.log('tbb',tbb);
			r.setAttributeNS(null, 'width', tbb.width);
			r.setAttributeNS(null, 'height', tbb.height);
			r.setAttributeNS(null, 'x', tbb.x);
			r.setAttributeNS(null, 'y', tbb.y);
			/*
			g.tileWidth=tbb.width;
			g.tileHeight=tbb.height;
			g.tileLeft=tbb.x;
			g.tileTop=tbb.y;
			 */
		}
	};
	console.log(sng);
	return sng;
}