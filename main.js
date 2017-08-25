var canvas = document.getElementById('canvas');
paper.setup(canvas);

let numBranches = 10;
let maxNumBubbles = 25;
let maxRadius = 10;
let minRadius = 50;

let bubbles = new paper.Group();

let tool = new paper.Tool();

pepperMill = function() {
	bubbles.removeChildren();
	for(let i=0 ; i<numBranches ; i++) {
	    let numBubbles = Math.random() * maxNumBubbles;
	    let x = i * paper.view.size.width / numBranches + 0.5 * paper.view.size.width / numBranches;
	    let y = paper.view.size.height;
	    for(let j=0 ; j<numBubbles ; j++) {
	        let radius = minRadius + Math.random() * (maxRadius - minRadius);
	        let c = new paper.Path.Circle(x, y, radius);
	        c.fillColor = 'black';
	        bubbles.addChild(c);
	        y -= radius;
	    }
	}
}

pepperMill();

tool.onMouseDown = function(event) {
	pepperMill();
}