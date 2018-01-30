function drawBallerina(gl, n , currentAngle, clickRotation, legAngle, modelMatrix, u_ModelMatrix){

    var minorLimbRotation = currentAngle < 180 ? currentAngle : 360 - currentAngle;
    minorLimbRotation /= 2.0;

    //set intial translation values
    modelMatrix.setTranslate(-0.50, -0.60, 0.0); 
    modelMatrix.scale(0.40, 0.40, 0.40); 
  
    //==============================================================================
    // Ballerina body :: all spin around this central feature :: MATRIX CONTEXT -> RESPECT TO BODY, UNSCALED BUT ROTATED
  
    modelMatrix.translate(0.0, 0.2, 0.0);
    modelMatrix.rotate(currentAngle, 0, 1, 0);
    modelMatrix.rotate(clickRotation, 0, 0, 1);
  
    pushMatrix(modelMatrix);
  
    modelMatrix.scale(3, 1.5, 0.75);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    //Restore to old
    modelMatrix = popMatrix();
  
    //==============================================================================
    // Ballerina first leg, right :: MATRIX CONTEXT -> LEAVES IN TRANSLATION CONTEXT OF THIS RIGHT LEG 
  
    //Push old again
    pushMatrix(modelMatrix);
  
    modelMatrix.translate(-0.5, 0.20, 0.00);
    modelMatrix.rotate(minorLimbRotation, 0, 0, 1);

    pushMatrix(modelMatrix);  //this gets undone after
    modelMatrix.scale(2.2, 0.5, 1);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
    //==============================================================================
    // Ballerina second leg, right :: MATRIX CONTEXT -> 
  
    modelMatrix.translate(-0.25, 0.03, 0.0);
    modelMatrix.rotate(-minorLimbRotation, 0, 0, 1);
    pushMatrix(modelMatrix); //this gets undone after
    modelMatrix.scale(1.0, 0.3, 0.5);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
  
    //==============================================================================
    // Ballerina first leg, left :: MATRIX CONTEXT -> 
  
    //BRINGS OUR CONTEXT BACK TO THE MAIN BODY
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
  
    modelMatrix.translate(0.02, -0.48, 0.0);
    modelMatrix.rotate(35, 0, 0, 1); 
    modelMatrix.rotate(legAngle, 0, 0, 1);
    
    pushMatrix(modelMatrix);  //gets undone
    modelMatrix.scale(0.5, 2.2, 1);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
  
    //==============================================================================
    // Ballerina second leg, left :: MATRIX CONTEXT -> 
  
    modelMatrix.translate(0.02, -0.25, 0.0);
    pushMatrix(modelMatrix); //this gets undone after
    modelMatrix.scale(0.3, 1.0, 0.5);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
    //==============================================================================
    // Ballerina first arm :: MATRIX CONTEXT -> 
  
    //BRINGS OUR CONTEXT BACK TO THE MAIN BODY
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
  
    modelMatrix.translate(0.78, -0.38, 0.0);
    modelMatrix.rotate(35, 0, 0, 1)
    modelMatrix.rotate(minorLimbRotation, 0, 0, 1);
  
    pushMatrix(modelMatrix);  //gets undone
  
    modelMatrix.scale(0.5, 2.0, 1);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();  
  
    //==============================================================================
    // Ballerina second arm, left :: MATRIX CONTEXT -> 
  
    modelMatrix.translate(0.08, -0.24, 0.0);
    pushMatrix(modelMatrix); //this gets undone after
    modelMatrix.rotate(15, 0, 0, 1); 
    modelMatrix.rotate(-minorLimbRotation, 0, 0, 1);
    modelMatrix.scale(0.3, 1.0, 0.5);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
   //==============================================================================
    // Ballerina first arm, right :: MATRIX CONTEXT -> 
  
    //BRINGS OUR CONTEXT BACK TO THE MAIN BODY
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
  
    modelMatrix.translate(0.51, 0.33, 0.0);
    modelMatrix.rotate(30, 0, 0, 1)
  
    pushMatrix(modelMatrix);  //gets undone
  
    modelMatrix.scale(0.5, 2.0, 1);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();  
  
    //==============================================================================
    // Ballerina second arm, right :: MATRIX CONTEXT -> 
  
    modelMatrix.translate(0.04, 0.42, 0.0);
    pushMatrix(modelMatrix); //this gets undone after
    modelMatrix.rotate(30, 0, 0, 1); 
    modelMatrix.scale(0.3, 1.0, 0.5);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();
  
  
    //==============================================================================
    // Ballerina HEAD :: MATRIX CONTEXT -> 
  
    //BRINGS OUR CONTEXT BACK TO THE MAIN BODY
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
  
    modelMatrix.translate(0.7, 0.02, 0.0);
    modelMatrix.rotate(15, 0, 0, 1)
  
    pushMatrix(modelMatrix);  //gets undone
  
    modelMatrix.scale(1.3, 1.3, 1);
  
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n); 
  
    modelMatrix = popMatrix();  
  
  }