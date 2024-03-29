console.log('tile v1.01');
RiffShare2D.prototype.tilePlaceHolder = function (x, y, w, h, id, layer, left, top, width, height, ratio) {
	var g = this.rakeGroup(x, y, w, h, id, layer, left, top, width, height);
	if (g) {
		var s = w;
		if (h < w) {
			s = h;
		}
		this.tileRectangle(g, x, y, w, h, 'rgba(255,0,0,0.25)', '#f00', this.lineWidth * ratio); //s / 30);
		this.tileText(g, x, y, ratio * 100, id);
		/*this.tileLine(g, x, y + h, x + w, y, '#0f0', s / 30);
		this.tileCircle(g, x + w, y + h, s / 30, '#00f');
		this.addSpot(id, x + w - s / 30, y + h - s / 30, 2 * s / 30, 2 * s / 30, function () {
		console.log(id, 'clicked');
		});*/
	}
};
RiffShare2D.prototype.rakeGroup = function (x, y, w, h, id, layer, left, top, width, height) {
	if (this.collision(x, y, w, h, left, top, width, height)) {
		if (!this.childExists(id, layer)) {
			var g = document.createElementNS(this.svgns, 'g');
			g.id = id;
			layer.appendChild(g);
			return g;
		} else {
			//console.log(id,'exists');
		}
	}
	return null;
};

RiffShare2D.prototype.tileText = function (g, x, y, fontSize, html, bgColor, strokeColor, strokeWidth, fontFamily, fontStyle) {
	var txt = document.createElementNS(this.svgns, 'text');
	txt.setAttributeNS(null, 'x', x);
	txt.setAttributeNS(null, 'y', y);
	txt.setAttributeNS(null, 'font-size', fontSize);
	//txt.setAttributeNS(null, 'alignment-baseline', 'text-before-edge');
	//txt.setAttributeNS(null, 'text-anchor', 'start');
	if (bgColor) {
		txt.setAttributeNS(null, 'fill', bgColor);
	}
	if (fontFamily) {
		txt.setAttributeNS(null, 'font-family', fontFamily);
	}
	if (fontStyle) {
		txt.setAttributeNS(null, 'font-style', fontStyle);
	}
	if (strokeColor) {
		txt.setAttributeNS(null, 'stroke', strokeColor);
	}
	if (strokeWidth) {
		txt.setAttributeNS(null, 'stroke-width', strokeWidth);
	}
	txt.innerHTML = html;
	g.appendChild(txt);
};
RiffShare2D.prototype.tileRectangle = function (g, x, y, w, h, f, s, t, r) {
	var rect = document.createElementNS(this.svgns, 'rect');
	rect.setAttributeNS(null, 'x', x);
	rect.setAttributeNS(null, 'y', y);
	rect.setAttributeNS(null, 'height', h);
	rect.setAttributeNS(null, 'width', w);
	if (f) {
		rect.setAttributeNS(null, 'fill', f);
	}
	if (s) {
		rect.setAttributeNS(null, 'stroke', s);
	}
	if (t) {
		rect.setAttributeNS(null, 'stroke-width', t);
	}
	if (r) {
		rect.setAttributeNS(null, 'rx', r);
		rect.setAttributeNS(null, 'ry', r);
	}
	g.appendChild(rect);
};
RiffShare2D.prototype.tileCircle = function (g, x, y, r, f, s, t) {
	var circle = document.createElementNS(this.svgns, 'circle');
	circle.setAttributeNS(null, 'cx', x);
	circle.setAttributeNS(null, 'cy', y);
	circle.setAttributeNS(null, 'r', r);
	if (f) {
		circle.setAttributeNS(null, 'fill', f);
	}
	if (s) {
		circle.setAttributeNS(null, 'stroke', s);
	}
	if (t) {
		circle.setAttributeNS(null, 'stroke-width', t);
	}
	g.appendChild(circle);
};
RiffShare2D.prototype.tileEllipse = function (g, x, y, rx, ry, f, s, t) {
	var e = document.createElementNS(this.svgns, 'ellipse');
	e.setAttributeNS(null, 'cx', x);
	e.setAttributeNS(null, 'cy', y);
	e.setAttributeNS(null, 'rx', rx);
	e.setAttributeNS(null, 'ry', ry);
	if (f) {
		e.setAttributeNS(null, 'fill', f);
	}
	if (s) {
		e.setAttributeNS(null, 'stroke', s);
	}
	if (t) {
		e.setAttributeNS(null, 'stroke-width', t);
	}
	g.appendChild(e);
};
RiffShare2D.prototype.tileLine = function (g, x1, y1, x2, y2, s, t) {
	var line = document.createElementNS(this.svgns, 'line');
	line.setAttributeNS(null, 'x1', x1);
	line.setAttributeNS(null, 'y1', y1);
	line.setAttributeNS(null, 'x2', x2);
	line.setAttributeNS(null, 'y2', y2);
	if (s) {
		line.setAttributeNS(null, 'stroke', s);
	}
	if (t) {
		line.setAttributeNS(null, 'stroke-width', t);
	}
	line.setAttributeNS(null, 'stroke-linecap', 'round');
	g.appendChild(line);
};
RiffShare2D.prototype.tileNoteTail = function (g, color, x, y) {
	var line = document.createElementNS(this.svgns, 'path');
	//var d = 'M'+x+','+y+' L'+(x+this.tapSize)+','+(y+this.tapSize)+' Z';
	var d = 'M' + x + ' ' + y //
		 + ' C ' + (x + 0*this.tapSize) + ' ' + (y + 1*this.tapSize) //
		 + ', ' + (x + 2*this.tapSize) + ', ' + (y +0*this.tapSize) //
		 + ', ' + (x + 2*this.tapSize) + ' ' + (y + 5*this.tapSize) //
		 + ' C ' + (x + 2*this.tapSize) + ' ' + (y + 2*this.tapSize) //
		 + ', ' + (x + 1*this.tapSize) + ', ' + (y +1*this.tapSize) //
		 + ', ' +  (x + 0*this.tapSize) + ' ' + (y + 0.75*this.tapSize)//
		 + ' Z';
	line.setAttributeNS(null, 'd', d);
	//line.setAttributeNS(null, 'fill', 'none');
	//line.setAttributeNS(null, 'stroke', '#ff0000');
	//line.setAttributeNS(null, 'stroke-width', 1);
	line.setAttributeNS(null, 'fill', color);
	line.setAttributeNS(null, 'stroke', color);
	line.setAttributeNS(null, 'stroke-width', 1);
	g.appendChild(line);
};
RiffShare2D.prototype.tileMultiLine = function (g, lines, s, t) {
	var line = document.createElementNS(this.svgns, 'path');
	/*line.setAttributeNS(null, 'x1', x1);
	line.setAttributeNS(null, 'y1', y1);
	line.setAttributeNS(null, 'x2', x2);
	line.setAttributeNS(null, 'y2', y2);*/
	var d = '';
	for (var i = 0; i < lines.length; i++) {
		var one = lines[i];
		d = d + 'M' + one[0].x + ',' + one[0].y + ' ';
		for (var k = 1; k < one.length; k++) {
			d = d + 'L' + one[k].x + ',' + one[k].y + ' ';
		}
	}
	//line.setAttributeNS(null, 'd', 'M'+x1+','+y1+' L'+x2+','+y2);
	line.setAttributeNS(null, 'd', d);
	line.setAttributeNS(null, 'fill', 'none');
	if (s) {
		line.setAttributeNS(null, 'stroke', s);
	}
	if (t) {
		line.setAttributeNS(null, 'stroke-width', t);
	}
	line.setAttributeNS(null, 'stroke-linecap', 'round');
	g.appendChild(line);
	/*
	M = moveto
	L = lineto
	H = horizontal lineto
	V = vertical lineto
	C = curveto
	S = smooth curveto
	Q = quadratic Bézier curve
	T = smooth quadratic Bézier curveto
	A = elliptical Arc
	Z = closepath
	 */
};
RiffShare2D.prototype.tileSymbol = function (g, x, y, w, h, href) {
	console.log(g, x, y, w, h, href);
	var use = document.createElementNS(this.svgns, 'use');
	use.setAttributeNS(null, 'x', x);
	use.setAttributeNS(null, 'y', y);
	use.setAttributeNS(null, 'width', w);
	use.setAttributeNS(null, 'height', h);
	use.setAttributeNS(null, 'href', href);
	use.setAttributeNS('xlink', 'href', href);
	g.appendChild(use);
};
