function fillModelControls() {
	iconPinSetting = {
		kind: 'p',
		x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 - 1.1,
		y: 0.25,
		z: levelEngine.tapSize / 300,
		l: pathList,
		css: 'buttonFill'
	};
	controlsModel.length = 0;
	controlsModel.push({
		id: 'controlsLayer',
		x: 0.25,
		y: 0.25,
		w: 3,
		h: 1,
		z: [1, 100],
		l: [{
				kind: 'r',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 - 1.1 - 0.05,
				y: 0.25 - 0.05,
				w: 1 + 0.1,
				h: 1 + 0.1,
				css: 'buttonBack',
				rx: 0.55,
				ry: 0.55
			} //
		, iconPinSetting //
		, {
				kind: 'r',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 - 1.1, //0.25,
				y: 0.25,
				w: 1,
				h: 1,
				css: 'buttonSpot',
				a: pinClickAction
			}, {
				kind: 'r',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 + 0.1 - 0.05, //1.5,
				y: 0.25 - 0.05,
				w: 1 + 0.1,
				h: 1 + 0.1,
				css: 'buttonBack',
				rx: 0.55,
				ry: 0.55
			}, {
				kind: 'p',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 + 0.1, //1.5,
				y: 0.25,
				z: levelEngine.tapSize / 300,
				l: 'M207.597,115.365h-71.22l-18.759-17.029H85.649c-2.446,0-4.435,1.989-4.435,4.432v108.899' +
				'c0,2.443,1.989,4.432,4.435,4.432h3.369l17.688-91.03h105.32v-5.27C212.027,117.357,210.038,115.365,207.597,115.365z',
				css: 'buttonFill'
			}, {
				kind: 'p',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 + 0.1, //1.5,
				y: 0.25,
				z: levelEngine.tapSize / 300,
				l: 'M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003' +
				'S232.835,0,149.996,0z M227.241,212.721c-0.542,10.333-8.948,18.601-19.343,18.912c-0.101,0.005-0.197,0.031-0.301,0.031' +
				'l-9.231,0.005l-112.72-0.005c-11.023,0-19.991-8.969-19.991-19.994V102.768c0-11.025,8.969-19.994,19.997-19.994h37.975' +
				'l18.759,17.029h65.211c11.023,0,19.991,8.969,19.991,19.997v5.27l17.904,0.003L227.241,212.721z',
				css: 'buttonFill'
			}, {
				kind: 'r',
				x: (levelEngine.viewWidth / levelEngine.tapSize) / 2 + 0.1,
				y: 0.25,
				w: 1,
				h: 1,
				css: 'buttonSpot',
				a: promptClickAction
			}
		]
	});
}
