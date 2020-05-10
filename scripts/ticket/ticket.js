/*
 *  This files refrenses data defined in 
 *      - scripts/ticket_data.js
 *      - scripts/templates.js
 */
$(document).ready(function(){
    //inits timeTable
    timeTable = initTimeTable();
    //hides all error outputs
    $("[error]").each(function(){
        $(this).hide();
    });
    //stops selection of old dates
    setDateRestrictions($("#input-departure-date"));
    //populates the cart with sessionStorage data
    shoppingCart.set(loadFromSessionStorage("shoppingCart")); 
    initCart();
    //populates to and from with valid stops
    let dataFrom = $("#data-from");
    let dataTo = $("#data-to");
    stops.forEach(function(stop){
        let optionElement = getOptionTemplate(stop);
        dataFrom.append(optionElement);
        dataTo.append(optionElement);
    });
    $("#input-from").val(stops[0]);
    $("#input-to").val(stops[1]);
    //sets functionality for payment form
    let paymentElement = $("#payment-details"); 
    let cartElement = $("#shopping-cart");
    $("#input-go-to-payment").on("click", function(){
        if(!paymentElement.is(":visible")){
            paymentElement.show();
            cartElement.hide();
        }
    });
    $("#input-payment-regret").on("click",function(){
        if(!cartElement.is(":visible")){
            paymentElement.hide();
            cartElement.show();
        }
    });
    let paymentSuccessElement = $("#output-payment-success");
    $("#input-payment-confirm").on("click", function(){
        pushToLocalStorage("boughtTickets", shoppingCart.cart);
        shoppingCart.clear() // emptys the current shopping cart
        sessionStorage.clear("shoppingCart");
        initCart();
        if(!paymentSuccessElement.is(":visible"))
            paymentSuccessElement.show();
    });
    //hides output-payment-success element when body is clicked
    $("#payment-success-confirm").on("click", function(){
        if(paymentSuccessElement.is(":visible"))
        {
            paymentSuccessElement.hide();
            paymentElement.hide();
            cartElement.show();
        }
    });
    //makes sure that from and to inputs cant be the same
    $("#input-from").on("change", function(){
        let toInput = $("#input-to");
        if($(this).val() == toInput.val())
        {
            let nextValidStop;
            if(stops.indexOf($(this).val()) + 1 == stops.length)
                nextValidStop = 0;
            else
                nextValidStop = stops.indexOf($(this).val()) + 1;
            toInput.val(stops[nextValidStop]);
        }
        hideDataOption($("#data-to option"), $(this).val());
    }).on("focusout", function(){ //checks that the station exists
        let error = $("#error-from");
        if(!stops.includes($(this).val())){
            error.show();
            searchData.fromIsValid = false;
        }
        else{
            error.hide();
            searchData.fromIsValid = true;
            searchData.from = $(this).val();
            getSearchResults();
        }
    }).trigger("change").trigger("focusout");
    $("#input-to").on("focusout", function(){ //checks that the to station exists
        let error = $("#error-to");
        if($(this).val() == $("#input-from").val())
        {
            $(this).val("");
            error.show();
            searchData.toIsValid = false;
        }
        else if(!stops.includes($(this).val()))
        {
            $(this).val("");
            error.show();
            searchData.toIsValid = false;
        }
        else{
            error.hide();
            searchData.toIsValid = true;
            searchData.to = $(this).val();
            getSearchResults();
        }
    }).trigger("focusout");
});
function getSearchResults(){
    // TODO: some way of stopping unnecessary searches of old data
    // if(oldSearchData === null || oldSearchData != searchData){// checks if any search params changed
        if(searchData.dateIsValid === true &&
            searchData.toIsValid === true &&
            searchData.fromIsValid === true)
            {
                let searchResults = [];
                timeTable.forEach(function(item){
                    if(item.from == searchData.from && item.to == searchData.to){
                        let departureDate = new Date(searchData.departureData);
                        if(item.days[departureDate.getDay() - 1])//check if buss active on that week day
                            searchResults.push(item);
                    }
                });
                populateSearchOutput(searchResults);
            }
    // }
}

function populateSearchOutput(results){
    let searchOutput = $("#output-search-results");
    searchOutput.html('\
        <div class="row" id="output-search-results">\
            <h1>Tidtabell:</h1>\
        </div>'
    );
    results.forEach(function(ticket){
        searchOutput.append(getSearchResultTemplate(ticket));
        ticket.times.forEach(function(time){
            let elementID = ticket.id + "-" + time.departure; 
            $(document.getElementById("ticket-info-id-" + elementID)).on("click", function(){ // sets the hide and unhide button for ticket details
                let options = $(document.getElementById("input-ticket-options-id-" + elementID));
                if(options.is(":visible"))
                    options.hide();
                else
                    options.show();
            });
            //sets functionallity for adding new tickets to cart
            $(document.getElementById("add-to-cart-id-" + elementID)).on("click",function(){
                let discountType = $(document.getElementById("discount-type-"+ elementID)).val();
                let ticketType = $(document.getElementById("ticket-type-" + elementID)).val();
                let departureDate = $("#input-departure-date").val();
                let ticketId = elementID + "-" + departureDate + "-" + shoppingCart.index();
                let price = time.price * getDiscount(discountType);
                let newTicket = new Ticket(ticketId, departureDate, ticket.to, ticket.from, time.departure, time.arrival, price, discountType, ticketType);
                shoppingCart.push(newTicket);
                shoppingCart.set(pushToSessionStorage("shoppingCart", shoppingCart.cart, false));
                addTicketToCart(newTicket);
            });
        });
    });
}
/**
 * creates and appends a ticket element to the shoppingcart
 * @param {*} ticket takes a ticket object as input
 */
function addTicketToCart(ticket){
    let paymentCostElement = $("#output-payment-cost"); 
    paymentCostElement.html("Totalpris: " + shoppingCart.totalCost + " €");
    $("#shopping-cart").prepend(getTicketTemplate(ticket));
        //removes a ticketf
        $(document.getElementById("remove-ticket-" + ticket.id)).click(function(){
            shoppingCart.remove(ticket);
            shoppingCart.set(pushToSessionStorage("shoppingCart", shoppingCart.cart, false));
            paymentCostElement.html("Totalpris: " + shoppingCart.totalCost + " €");
            $(document.getElementById("ticket-id-" + ticket.id)).remove();
        });
}
function setDateRestrictions(dateInput){
    let date = new Date();
    dateInput.attr("min", getShortDate(date))
            .attr("value", getShortDate(date));

    dateInput.on("focusout", function(){
        let error = $("#error-date")
        let selectedDate = new Date($(this).val().toString());
        let dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - 1);
        if(selectedDate <= dateLimit)
        {
            let d = getShortDate(new Date())
            $(this).val(d);
            error.show().text("datum måste vara större än " + d);
            searchData.dateIsValid = false;
        }
        else
        {
            error.hide();
            searchData.departureData = $(this).val();
            searchData.dateIsValid = true;
            getSearchResults();
        }
    }).trigger("focusout");
}
function hideDataOption(select, option){
    select.each(function(){
        if($(this).val() == option)
            $(this).prop("disabled", true);
        else 
            $(this).prop("disabled", false);
    })
}
function getShortDate(date){
    let day = (date.getDate() >= 10) ? date.getDate() : "0" + date.getDate().toString();
    let month = (date.getMonth() + 1 >= 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString()
    let year = date.getFullYear();
    let dateString = year + "-" + month + "-" + day;
    return dateString;
}
function initCart(){
    if(shoppingCart.cart.length === 0){
        $('div[name="cart-item"]').remove(); // removes all items from the shopping cart div
        $("#output-payment-cost").html("Totalpris: " + shoppingCart.totalCost + "€");
    }
    
    shoppingCart.cart.forEach(function(ticket){
        addTicketToCart(ticket);
    });
}
