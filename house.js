function drawHouse(gl, n , currentAngle, modelMatrix, u_ModelMatrix){
  
    // how much should we rotate the legs?
    //var limbRotationAngle = currentAngle / 10.0;
    //console.log(limbRotationAngle);
  
    //set intial translation values
    modelMatrix.setTranslate(0.35, 0.30, 0.0); 
    modelMatrix.scale(0.28, 0.28, 0.28); 
  
    //==============================================================================
    // Ballerina body :: all spin around this central feature :: MATRIX CONTEXT -> RESPECT TO BODY, UNSCALED BUT ROTATED
  
    modelMatrix.translate(0.0, 0.2, 0.0);
    modelMatrix.rotate(currentAngle, 0, 1, 0);
  
    pushMatrix(modelMatrix);
  
    modelMatrix.scale(3, 1.5, 0.75);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    //Restore to old
    modelMatrix = popMatrix();
  
  }