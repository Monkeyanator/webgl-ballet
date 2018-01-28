var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' + 
  '}\n';


var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';


// Global ANIMATION variables -- Rotation angle rate (degrees/second)
var ANIMATION_PLAYING = true;
var ANGLE_STEP = 30.0;
var BALLERINA_LEG_ANGLE = -35.0;

function main() {
//==============================================================================
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1);

  // Get storage location of u_ModelMatrix
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Current rotation angle
  var currentAngle = 0.0;
  
  // Model matrix
  var modelMatrix = new Matrix4();

  // Start drawing
  var tick = function() {
    //currentAngle = 0;
    // Alter current render angle IFF ANIMATION_PLAYING true
    currentAngle = ANIMATION_PLAYING ? animate(currentAngle) : currentAngle;  // Update the rotation angle
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);   // Draw the ballerina and the other thing
    requestAnimationFrame(tick, canvas);   // Don't quite understand this line
  };
  tick();
}

function initVertexBuffers(gl) {
//==============================================================================
  // Vertices for a cube
  var vertices = new Float32Array ([
     0.00, 0.00, 0.00, 1.00,		// first triangle   (x,y,z,w==1)
     0.20, 0.00, 0.00, 1.00,  
     0.00, 0.20, 0.00, 1.00,
     0.00, 0.20, 0.00, 1.00,		// second triangle
     0.20, 0.00, 0.00, 1.00,
     0.20, 0.20, 0.00, 1.00,    
     0.00, 0.20, 0.00, 1.00,    // third triangle 
     0.20, 0.20, 0.20, 1.00,
     0.00, 0.20, 0.20, 1.00,
     0.00, 0.20, 0.00, 1.00,    // fourth triangle
     0.20, 0.20, 0.00, 1.00,
     0.20, 0.20, 0.20, 1.00,
     0.20, 0.00, 0.00, 1.00,    // fifth triangle
     0.20, 0.00, 0.20, 1.00,
     0.20, 0.20, 0.20, 1.00,
     0.20, 0.00, 0.00, 1.00,    // sixth triangle
     0.20, 0.20, 0.20, 1.00,
     0.20, 0.20, 0.00, 1.00,
     0.00, 0.00, 0.00, 1.00,    // seventh triangle
     0.20, 0.00, 0.00, 1.00,
     0.00, 0.00, 0.20, 1.00,
     0.20, 0.00, 0.00, 1.00,    // eigth triangle
     0.20, 0.00, 0.20, 1.00,
     0.00, 0.00, 0.20, 1.00,
     0.00, 0.00, 0.20, 1.00,    // ninth triangle
     0.00, 0.20, 0.20, 1.00,
     0.20, 0.20, 0.20, 1.00,
     0.00, 0.00, 0.20, 1.00,    // tenth triangle
     0.20, 0.00, 0.20, 1.00,
     0.20, 0.20, 0.20, 1.00,
     0.00, 0.00, 0.00, 1.00,    // eleventh triangle
     0.00, 0.20, 0.00, 1.00,
     0.00, 0.00, 0.20, 1.00,
     0.00, 0.20, 0.00, 1.00,    // twelfth triangle
     0.00, 0.00, 0.20, 1.00,
     0.00, 0.20, 0.20, 1.00,
  ]);

  var n = 30;   // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Assign the buffer object to a_Position variable
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // Set unique colors
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0){
    console.log('Failed to locate storage for the color attribute!');
    return -1;
  }

  //Assign buffer object to a_Color varaible
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);

  return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {

  //command to draw ballerina
  drawBallerina(gl, n, currentAngle, BALLERINA_LEG_ANGLE, modelMatrix, u_ModelMatrix);

}


// Last time that this function was called:  (used for animation timing)
var g_last = Date.now();

function animate(angle) {
//==============================================================================
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}


//==============================================================================
// MODEL DEFINITIONS AND LOADS
//==============================================================================

  // Vertices for a cube
  var ballerinaBaseComponent = new Float32Array ([
    0.00, 0.00, 0.00, 1.00,		// first triangle   (x,y,z,w==1)
    0.20, 0.00, 0.00, 1.00,  
    0.00, 0.20, 0.00, 1.00,
    0.00, 0.20, 0.00, 1.00,		// second triangle
    0.20, 0.00, 0.00, 1.00,
    0.20, 0.20, 0.00, 1.00,    
    0.00, 0.20, 0.00, 1.00,    // third triangle 
    0.20, 0.20, 0.20, 1.00,
    0.00, 0.20, 0.20, 1.00,
    0.00, 0.20, 0.00, 1.00,    // fourth triangle
    0.20, 0.20, 0.00, 1.00,
    0.20, 0.20, 0.20, 1.00,
    0.20, 0.00, 0.00, 1.00,    // fifth triangle
    0.20, 0.00, 0.20, 1.00,
    0.20, 0.20, 0.20, 1.00,
    0.20, 0.00, 0.00, 1.00,    // sixth triangle
    0.20, 0.20, 0.20, 1.00,
    0.20, 0.20, 0.00, 1.00,
    0.00, 0.00, 0.00, 1.00,    // seventh triangle
    0.20, 0.00, 0.00, 1.00,
    0.00, 0.00, 0.20, 1.00,
    0.20, 0.00, 0.00, 1.00,    // eigth triangle
    0.20, 0.00, 0.20, 1.00,
    0.00, 0.00, 0.20, 1.00,
    0.00, 0.00, 0.20, 1.00,    // ninth triangle
    0.00, 0.20, 0.20, 1.00,
    0.20, 0.20, 0.20, 1.00,
    0.00, 0.00, 0.20, 1.00,    // tenth triangle
    0.20, 0.00, 0.20, 1.00,
    0.20, 0.20, 0.20, 1.00,
    0.00, 0.00, 0.00, 1.00,    // eleventh triangle
    0.00, 0.20, 0.00, 1.00,
    0.00, 0.00, 0.20, 1.00,
    0.00, 0.20, 0.00, 1.00,    // twelfth triangle
    0.00, 0.00, 0.20, 1.00,
    0.00, 0.20, 0.20, 1.00,
 ]);

var ballerinaFaces = 30; 

function bufferBallerinaVertexData(){

}


//==============================================================================
// GENERAL ANIMATION INTERACTIONS
//==============================================================================

function playAnimation(){ 
  // update time so animation continues smootly upon continuation
  g_last = Date.now();
  ANIMATION_PLAYING = true; 
}

function pauseAnimation(){ ANIMATION_PLAYING = false; }


//==============================================================================
// BALLERINA UI INTERACTIONS
//==============================================================================

function moreLegAngle() { BALLERINA_LEG_ANGLE += 10.0; }
function lessLegAngle() { BALLERINA_LEG_ANGLE -= 10.0; }

function moreCCW() { ANGLE_STEP += 10; }
function lessCCW() { ANGLE_STEP -= 10; }