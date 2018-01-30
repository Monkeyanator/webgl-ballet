function drawHouse(gl, n , currentAngle, modelMatrix, u_ModelMatrix, dragX, dragY){
  
    var cartRotation = currentAngle < 180 ? currentAngle : 360 - currentAngle;
    cartRotation /= 2.0;

    // how much should we rotate the legs?
    //var limbRotationAngle = currentAngle / 10.0;
    //console.log(limbRotationAngle);
  
    //set intial translation values
    modelMatrix.setTranslate(-0.2, 0.30, 0.0); 
    modelMatrix.translate(dragX / 500.0, dragY / 500.0, 0.0);
    modelMatrix.rotate(currentAngle, 0, 1, 0);
    modelMatrix.scale(0.28, 0.58, 0.28); 
    modelMatrix.translate(0.0, 0.2, 0.0);

    //==============================================================================
    // House body :: all spin around this central feature :: MATRIX CONTEXT -> RESPECT TO BODY, UNSCALED BUT ROTATED
  
    for(var i = 3; i < 8; i++){

      var currentRot = i % 2 == 0 ? cartRotation : -cartRotation;

      modelMatrix.translate(i * 0.15, - i * 0.01, 0.0);
      modelMatrix.rotate(currentRot / (i - 2), 1, 1, 0);

      pushMatrix(modelMatrix);
    
      modelMatrix.scale(5 / (i * 1.2), 1.5 / (i * 1.0), 0.75);
    
      gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
      gl.drawArrays(gl.TRIANGLES, 0, n); 
    
      //Restore to old
      modelMatrix = popMatrix();
    }
  
  }