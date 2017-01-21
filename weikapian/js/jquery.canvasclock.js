/*
 * jquery.canvasClock.js : jQuery plugin to display graphical clock using canvas
 *
 * Copyright (c) 2013 HarishLabs
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Harish Premkumar
 * Date: 20th Dec 2013
 *
 * Reference: http://www.dhtmlgoodies.com/tutorials/canvas-clock/
 */

(function ( $ ) {
  $.fn.canvasClock = function( options ) {
    var settings = $.extend({
      showSecondHand: true,
      showMinuteHand: true,
      showHourHand: true,
      bgImgUrl: 'clock-face1.png'
    }, options );

    var degreesToRadians = function(degrees) {
      return (Math.PI / 180) * degrees
    };

    var drawHand = function(context, size, thickness, shadowOffset) {
      thickness = thickness || 4;

      context.shadowColor = '#555';
      context.shadowBlur = 10;
      context.shadowOffsetX = shadowOffset;
      context.shadowOffsetY = shadowOffset;

      context.beginPath();
      context.moveTo(0,0); // center
      context.lineTo(thickness *-1, -10);
      context.lineTo(0, size * -1);
      context.lineTo(thickness,-10);
      context.lineTo(0,0);

      context.fill();
    };

    var drawHourHand = function(context, theDate){
      var hours = theDate.getHours() + theDate.getMinutes() / 60;
      var degrees = (hours * 360 / 12) % 360;

      context.save();
      context.fillStyle = 'black';
      context.rotate(degreesToRadians(degrees));
      drawHand(context, 70, 5, 3);
      context.restore();
    };

    drawMinuteHand = function(context, theDate){
      var minutes = theDate.getMinutes() + theDate.getSeconds() / 60;

      context.save();
      context.fillStyle = 'black';
      context.rotate(degreesToRadians(minutes * 6));
      drawHand(context, 90, 5, 5);
      context.restore();
    }

    var drawSecondHand = function(context, theDate){
      context.save();
      context.fillStyle = 'red';
      var seconds = theDate.getSeconds();
      context.rotate( degreesToRadians(seconds * 6));
      drawHand(context, 90, 2, 8);

      // Draw filled circle at the center
      context.moveTo(0,0); // center
      context.arc(0,0,5,0,2*Math.PI);
      context.fill();

      context.restore();
    };

    var addBackgroundImage = function(canvas, context, clockImage) {
      context.drawImage(clockImage, canvas.width/2 * -1, canvas.height/2 * -1, canvas.width, canvas.height);
    };

    var writeBrandName = function(context, brandName) {
      context.font = "20pt Helvetica";
      var brandNameSize = context.measureText(brandName);
      context.strokeText(brandName, 0 - brandNameSize.width / 2, -20);
    }

    return this.each(function() {
      var canvasClock = $.extend($.extend({}, settings), $(this).data());
      var clockImage = new Image();

      clockImage.src = canvasClock.bgImgUrl;

      canvasClock.canvas = $("<canvas />")[0];
      clockImage.onload = function() {
        canvasClock.canvas.setAttribute('width', clockImage.width);
        canvasClock.canvas.setAttribute('height', clockImage.height);
        canvasClock.context = canvasClock.canvas.getContext('2d');
        canvasClock.context.translate(canvasClock.canvas.width/2, canvasClock.canvas.height/2);

        window.setInterval( function() {
          var theDate = new Date();
          canvasClock.context.clearRect(-canvasClock.canvas.width/2, -canvasClock.canvas.height/2, canvasClock.canvas.width, canvasClock.canvas.height);
          addBackgroundImage(canvasClock.canvas, canvasClock.context, clockImage);

          if(canvasClock.brandName)
            writeBrandName(canvasClock.context, canvasClock.brandName);

          if(canvasClock.showHourHand)
            drawHourHand(canvasClock.context, theDate);

          if(canvasClock.showMinuteHand)
            drawMinuteHand(canvasClock.context, theDate);

          if(canvasClock.showSecondHand)
            drawSecondHand(canvasClock.context, theDate);
        }, 1000);
      }
      $(this).append(canvasClock.canvas);
      $(this).data().canvasClock = canvasClock;
    });
  };
}( jQuery ));
