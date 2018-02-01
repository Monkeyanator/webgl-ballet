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

var BALLERINA_LEG_ANGLE = -35.0;
var BALLERINA_ANGLE_STEP = 30.0;
var BALLERINA_BODY_ROTATION = 0.0;

var HOUSE_ANGLE_STEP = 30.0;

var DRAG_TRANSFORM_X = 0.0;
var DRAG_TRANSFORM_Y = 0.0;


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
  var currentBallerinaAngle = 0.0;
  var currentHouseAngle = 0.0;
  
  // Model matrix
  var modelMatrix = new Matrix4();

  // Start drawing
  var tick = function() {
    //currentAngle = 0;
    // Alter current render angle IFF ANIMATION_PLAYING true
    currentBallerinaAngle = ANIMATION_PLAYING ? animate_ballerina(currentBallerinaAngle) : currentBallerinaAngle;  // Update the rotation angle
    currentHouseAngle = ANIMATION_PLAYING ? animate_house(currentHouseAngle) : currentHouseAngle;
  
    draw(gl, n, currentBallerinaAngle, currentHouseAngle, modelMatrix, u_ModelMatrix, DRAG_TRANSFORM_X, DRAG_TRANSFORM_Y);   // Draw the ballerina and the other thing
    requestAnimationFrame(tick, canvas);   // Don't quite understand this line
  };
  tick();
}

function initVertexBuffers(gl) {

  bufferVertexData(gl, ballerinaVertices, ballerinaVertexCount);

  // Set unique colors
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0){
    console.log('Failed to locate storage for the color attribute!');
    return -1;
  }

  //Assign buffer object to a_Color varaible
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);

  return ballerinaVertexCount;
}

function draw(gl, n, currentBallerinaAngle, currentHouseAngle, modelMatrix, u_ModelMatrix, xDrag, yDrag) {

  //Clear the buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  //TODO buffer once, and switch buffer references
  //Buffer ballerina data and use 
  bufferVertexData(gl, ballerinaVertices, ballerinaVertexCount);
  drawBallerina(gl, n, currentBallerinaAngle, BALLERINA_BODY_ROTATION, BALLERINA_LEG_ANGLE, modelMatrix, u_ModelMatrix);

  //Buffer house data and use
  bufferVertexData(gl, houseVertices, houseVertexCount);
  drawHouse(gl, houseVertexCount, currentHouseAngle, modelMatrix, u_ModelMatrix, xDrag, yDrag);

}

var g_last_ballerina = Date.now();
var g_last_house = Date.now(); 

function animate_ballerina(angle) {

  //==============================================================================
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last_ballerina;
  g_last = now;
  
  var newAngle = angle + (BALLERINA_ANGLE_STEP * elapsed) / 1000.0;

  //update
  g_last_ballerina = Date.now();

  return newAngle %= 360;
}

function animate_house(angle) {

    //==============================================================================
    // Calculate the elapsed time
    var now = Date.now();
    var elapsed = now - g_last_house;
    g_last_house = now;
    
    var newAngle = angle + (HOUSE_ANGLE_STEP * elapsed) / 1000.0;

    //update 
    g_last_house = Date.now();

    return newAngle %= 360;
  }

//==============================================================================
// MODEL DEFINITIONS AND LOADS
//==============================================================================

function bufferVertexData(gl, vertexList, vertexCount){

  //can use either
  var FSIZE = vertexList.BYTES_PER_ELEMENT;

  // Create a buffer object
  var mainBuffer = gl.createBuffer();
  if (!mainBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, mainBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertexList, gl.STATIC_DRAW);

  //HANDLE POSITION BUFFER ATTRIBUTE
  // Assign the buffer object to a_Position variable
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  //gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, true, 0, 0);
  gl.vertexAttribPointer(
    a_Position, 
    4, 
    gl.FLOAT, 
    true, 
    FSIZE * 7, 
    0);

  gl.enableVertexAttribArray(a_Position);

  //HANDLE COLOR BUFFER ATTRIBUTE
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0){
    console.log('Failed to locate storage for the color attribute!');
    return -1;
  }

  //Assign buffer object to a_Color varaible
  gl.vertexAttribPointer(
    a_Color, 
    3, 
    gl.FLOAT, 
    false, 
    FSIZE * 7, 
    FSIZE * 4);
  gl.enableVertexAttribArray(a_Color);


}

//==============================================================================
// GENERAL ANIMATION INTERACTIONS
//==============================================================================

function playAnimation(){ 
  // update time so animation continues smootly upon continuation
  g_last_house = Date.now();
  g_last_ballerina = Date.now();
  ANIMATION_PLAYING = true; 
}

function pauseAnimation(){ ANIMATION_PLAYING = false; }


//==============================================================================
// BALLERINA UI INTERACTIONS
//==============================================================================

function moreLegAngle() { BALLERINA_LEG_ANGLE += 10.0; }
function lessLegAngle() { BALLERINA_LEG_ANGLE -= 10.0; }

function moreCCWBallerina() { BALLERINA_ANGLE_STEP += 10; }
function lessCCWBallerina() { BALLERINA_ANGLE_STEP -= 10; }

//==============================================================================
// HOUSE UI INTERACTIONS
//==============================================================================

function moreLegAngle() { BALLERINA_LEG_ANGLE += 10.0; }
function lessLegAngle() { BALLERINA_LEG_ANGLE -= 10.0; }

function moreCCWHouse() { HOUSE_ANGLE_STEP += 10; }
function lessCCWHouse() { HOUSE_ANGLE_STEP -= 10; }