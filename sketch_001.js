let video;
let bodyPose;
let poses = [];
let trailleft = []; // store previous positions of the keypoint
let trailright = [];
let trailhand = [];
let isDetecting = false;

function preload() {
  bodyPose = ml5.bodyPose({ flipped: true });
}

function setup() {
  // I ADDED THIS VARIABLE + ID
  let cnv = createCanvas(400, 600);
  cnv.parent("myContainer");
  cnv.style('display', 'block');
  cnv.style('visibility', 'visible');

  video = createCapture(VIDEO);
  video.size(400, 600);
  video.hide();

  // bodyPose.detectStart(video, gotPoses);

}

function draw() {
  background(255); // clear canvas each frame
  //image(video, 0, 0, width, height);

  if (poses.length > 0) {
    let pose = poses[0];

    let right = pose.keypoints[9];
    if (right.confidence > 0.1) {  // higher confidence threshold
      let x = right.x;
      let y = right.y;

      // store position
      trailright.push(createVector(x, y));

      for (let v of trailright) {
        fill(220);
        stroke(0);
        strokeWeight(0);
        circle(v.x, v.y, 70);
      }

      fill(220);
      circle(x, y, 70);
    }
    
    let left = pose.keypoints[0];
    if (left.confidence > 0.05) {
      let x = left.x;
      let y = left.y;
      
      // store position
      trailleft.push(createVector(x, y));

      // draw trail
      noFill();
      stroke(0);
      strokeWeight(30);
      beginShape();
      for (let v of trailleft) {
        vertex(v.x, v.y);
      }
      endShape();

      //draw dot
      fill(0);
      noStroke();
      circle(x, y, 30);
    }

    let hand = pose.keypoints[10];
     if (hand.confidence > 0.05) {
      let x = hand.x;
      let y = hand.y;

      // store position
      trailhand.push(createVector(x, y));

      // draw trail
      noFill();
      stroke(0);
      strokeWeight(4);
      beginShape();
      for (let v of trailhand) {
        vertex(v.x, v.y);
      }
      endShape();

      //draw dot
      fill(0);
      noStroke();
      circle(x, y, 4);
    }
    
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {   // press "s" to save
    save('keypointTrail.png');        // saves the current canvas as a PNG
  }
}

// Toggle detection when mouse is pressed
function mousePressed() {
  toggleDetection();
}

// Call this function to start and stop detection
function toggleDetection() {
  if (isDetecting) {
    bodyPose.detectStop();
    isDetecting = false;
  } else {
    bodyPose.detectStart(video, gotPoses);
    isDetecting = true;
  }
}

function gotPoses(results) {
  poses = results;
}