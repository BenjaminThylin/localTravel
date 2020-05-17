/*
 *  This files refrenses data defined in 
 *      - scirpts/data.js
 */
var timeTable = [];
var soldTickets = [];
$(document).ready(function(){
    loadStats();
    //inits timeTable
    timeTable = initTimeTable();
    $("#stats").click(function() {
        loadStats();
    });
    
    $("#tickets").click(function() {
        loadUpdateTickets();
    });
});

function loadStats() {
    $("#stats").addClass("active");
    $("#tickets").removeClass("active");
    if ($("#stats").hasClass("active")) {
        if ($(".tickets-wrapper").hasClass("show")) {
            $(".tickets-wrapper").removeClass("show");
        }
        $(".stats-wrapper").addClass("show");
    }
}

function loadUpdateTickets() {
    $("#tickets").addClass("active");
    $("#stats").removeClass("active");
    if ($("#tickets").hasClass("active")) {
        if ($(".stats-wrapper").hasClass("show")) {
            $(".stats-wrapper").removeClass("show");
        }
        $(".tickets-wrapper").addClass("show");
    }
}