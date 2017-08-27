var canvas = document.getElementById('canvas');
paper.setup(canvas);

let parameters = {
	maxRadius: 50,
	minRadius: 10
};

let mills = new paper.Group();

let tool = new paper.Tool();

pepperMill = function() {
	mills.removeChildren();

	let maxRadius = Math.max(parameters.minRadius, parameters.maxRadius);
	let minRadius = Math.min(parameters.minRadius, parameters.maxRadius);

	let step = 3 * maxRadius;
	let nIntervals = Math.floor((paper.view.size.width - 2 * maxRadius) / step);
	let nMills = nIntervals + 1;
	let margins = paper.view.size.width - nIntervals * step;
	let margin = margins / 2;

	let totalCirclesMin = paper.view.size.height / maxRadius;
	let totalCirclesMax = paper.view.size.height / minRadius;
	let nCirclesMax = 0.95 * totalCirclesMin + 0.05 * totalCirclesMax;

	for(let i=0 ; i<nMills ; i++) {
	    let nCircles = Math.random() * nCirclesMax;
	    let x = margin + i * step;
	    let y = paper.view.size.height;
	    for(let j=0 ; j<nCircles ; j++) {
	        let radius = minRadius + Math.random() * (maxRadius - minRadius);
	        let c = new paper.Path.Circle(x, y, radius);
	        c.fillColor = 'black';
	        mills.addChild(c);
	        y -= radius;
	    }
	}
}

pepperMill();

tool.onMouseDown = function(event) {
	pepperMill();
}


window.onresize = function (event) {
	paper.view.viewSize.width = window.innerWidth;
	paper.view.viewSize.height = window.innerHeight;
	pepperMill();
}

var gui = new dat.GUI();

gui.add(parameters, 'minRadius', 5, 100).name('Min radius').onChange(pepperMill);
gui.add(parameters, 'maxRadius', 5, 100).name('Max radius').onChange(pepperMill);
gui.add({'generatePepperMills': pepperMill}, 'generatePepperMills').name('Generate pepper mills');
