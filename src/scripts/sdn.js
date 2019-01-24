/*******************
 **   PAGE DATA   **
 *******************/

//Date to be pulled from the client record
let clientDetails = {
    gapDetails: {
        commercialVehicle: false,
        privateHire: false,
        fullCompInsurance: false,
        authorisedAndInsured: false
    },
    smartDetails: {
        leisureUseOnly: false
    }
};

//Data pulled from the page data repo
let pageData = {
    gapDetails: {
        commercialVehicle: "Is the purchased vehicle a commercial vehicle?",
        privateHire: "Do you intend to to use the vehicle for private hire?",
        fullCompInsurance:
            "Do you intend to take out fully comprehensive insurance?",
        authorisedAndInsured:
            "Will you be authorised and fully insured to drive this vehicle?"
    },
    smartDetails: {
        leisureUseOnly:
            "Do you intend to use the vehicle for anything other than social, domestic and pleasure puroses including journeys to and from a permanent place of work?"
    }
};

/***************
 ** PAGE CODE **
 ***************/

$("document").ready(() => {
    //Even listeners
    $("#save-button").click(() => {
        handleSave();
    });
})


//Event handelers
function handleSave() {
    if ($("#sdn-details-form").valid()) {

        document.location.href = "productsandservices.html";

    } else {
        $("#error-list").empty();
        $.each($("#sdn-details-form").validate().errorMap, (index, value) => {
            $("#error-list-card").show();
            $("#error-list").append(
                "<li class='error'>" + index + " - " + value + "</li>"
            );
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}
