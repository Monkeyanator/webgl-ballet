//==============================================================================
// KEY INTERACIONS
//==============================================================================

document.addEventListener('keydown', (event) => {

    //grab keyname 
    const pressedKeycode = event.keyCode;

    //pause and unpause for spacebar
    if(pressedKeycode == 32){
        console.log("Spacebar pressed");
        if(ANIMATION_PLAYING == true){
            pauseAnimation(); 
        } else {
            playAnimation();
        }
    }

    //up key pressed
    if(pressedKeycode == 38){
        console.log("Up pressed");
        moreLegAngle();
    }

    //down key pressed
    if(pressedKeycode == 40){
        console.log("Down pressed");
        lessLegAngle();
    }

})


//==============================================================================
// DRAG INTERACTIONS
//==============================================================================

var previousX;
var previousY;
var mainCanvas = document.getElementById('webgl');

function handleDrag(event){

    //move this shit
    DRAG_TRANSFORM_X = event.clientX - previousX;
    DRAG_TRANSFORM_Y = previousY - event.clientY;

}

mainCanvas.addEventListener('mousedown', (event) => {
    console.log("Mouse down!");
    
    previousX = event.clientX; 
    previousY = event.clientY;

    //start listening for mouse moves until mouseup event
    mainCanvas.addEventListener('mousemove', handleDrag);
}); 

mainCanvas.addEventListener('mouseup', (event) => {

    console.log("Mouse up!");

    //unbind mousemove
    mainCanvas.removeEventListener('mousemove', handleDrag);
})

//==============================================================================
// CLICK INTERACTIONS
//==============================================================================

mainCanvas.addEventListener('click', (event) => {
    //rotate that ballerina
    BALLERINA_BODY_ROTATION = (BALLERINA_BODY_ROTATION + 90.0) % 360.00; 
});