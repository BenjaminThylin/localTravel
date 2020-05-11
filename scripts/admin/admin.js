$(document).ready(function(){
    //inits timeTable
    timeTable = initTimeTable();
    let statsButton = $("#stats");
    let ticketsButton = $("#tickets");
    let statsWrapper = $(".stats-wrapper");
    let ticketsWrapper = $(".tickets-wrapper");
    console.log(ticketsWrapper) ;
    statsButton.click(function() {
        statsButton.addClass("active");
        ticketsButton.removeClass("active");
        if (statsButton.hasClass("active")) {
            if (ticketsWrapper.hasClass("show")) {
                ticketsWrapper.removeClass("show");
            }
            statsWrapper.addClass("show");
        }
    });
    
    ticketsButton.click(function() {
        ticketsButton.addClass("active");
        statsButton.removeClass("active");
        if (ticketsButton.hasClass("active")) {
            if (statsWrapper.hasClass("show")) {
                statsWrapper.removeClass("show");
            }
            ticketsWrapper.addClass("show");
        }
    }).trigger("click"); //for testing
});