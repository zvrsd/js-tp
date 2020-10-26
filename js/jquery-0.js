/*
 * The code inside will only be run once 
 * the document is loaded
 */
$(document).ready(function () {
    // Shorter version
    //$(function(){

    // jQuery methods go here...

    // Hides all content when button is clicked
    $("#hide_button").click(function () {
        $("#hidden_content").toggle("fast");
    });

    // Changes text color
    $("#color_button").click(function () {
        $("#hide_p").css("color", "#" + Math.floor(Math.random() * 999));
    });

    // Hides all button when u click on em
    $(".hide_me").click(function () {
        $(this).hide();
    });

    // Changes text color
    $("#fadeout_button").click(function () {
        $("#hide_p").fadeto(200);
    });

    // Changes text color
    $("#slide_button").click(function () {
        $("#hide_p").slideToggle(200);
    });

    /*
    $(":root").mouseup(function(event){
        console.log(event.pageX+" "+event.pageY);
        let element = document.createElement("p");
        element.style.position = "absolute";
        element.style.left = event.pageX+"px";
        element.style.top = event.pageY - 32+"px";
        element.style.zIndex = "1";
        element.innerHTML = ".   "+event.pageX+" "+event.pageY;
        element.innerHTML = "*";
        document.body.appendChild(element);
        
        
    })
    */
});