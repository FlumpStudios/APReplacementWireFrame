/*******************
 **  PAGE DATA    **
 *******************/

//Date to be pulled from the client record
let clientDetails = {
    personalDetails: {
        title: "Mr",
        firstName: "Paul",
        surname: "Marrable"
    },
    physicalAddress: {
        postcode: "CV31 2GJ",
        propertyNumber: "52",
        propertyName: "Listers House",
        addressLine: "31 Listers road",
        town: "Leamington Spa",
        county: "Warwickshire",
        country: "UK"
    },
    contactDetails: {
        telephone: "01925 456123",
        workTel: "01954 123456",
        mobileTel: "01264 987654",
        emailAddress: "test@test.co.uk",
        fax: "01543 456123"
    },
    sendElectronicDocs: false,
    preferredContactOptions: ["1", "3"],
    distanceSellingAcknowledgement: "3",

    //Question: Is this created when the client is created and therefore should it be part of the client entity or is it someehow seperate?
    quoteNumber: "14376675",

    //set to false toshow GAP warning card
    hasGapInfoBeenPresented: false
};

//Data pulled from the page data repo
let pageData = {
    salesPerson: [
        { salesPersonId: "1", salesPersonName: "Richard Branson" },
        { salesPersonId: "2", salesPersonName: "Peter Jones" },
        { salesPersonId: "3", salesPersonName: "Alan Sugar" }
    ],
    retailManager: [
        { retailsManagerId: "1", retailManagerName: "Richard Branson" },
        { retailsManagerId: "2", retailManagerName: "Peter Jones" },
        { retailsManagerId: "3", retailManagerName: "Alan Sugar" }
    ],
    franchise: [
        { franchiseId: "1", franchiseName: "Lexus" },
        { franchiseId: "2", franchiseName: "Honda" },
        { franchiseId: "3", franchiseName: "SEAT" }
    ],
    dataProtectionDetails: {
        dateProtectionText:
            "Data Protection: Please be aware that AutoProtect will not share your details with any other company for the purposes of marketing but would like to keep you informed about AutoProtect products and services that may be of interest to you, please tick the boxes below to indicate your preferred methods of contact.",
        contactOptions: [
            { contactOptionsId: "1", name: "SMS" },
            { contactOptionsId: "2", name: "Email" },
            { contactOptionsId: "3", name: "Telephone" }
        ]
    },
    distanceSellingAcknowledgement: [
        {
            distanceSellingAcknowledgementId: "1",
            text:
                "If you buy in person from a representative of Listers Group at Listers Group's business premises, for example, in a showroom, this is referred to as an 'on premises contract'."
        },
        {
            distanceSellingAcknowledgementId: "2",
            text:
                "If you are addressed in person by a representative of Listers Group not at Listers Group's business premises and the offer to purchase (completion of an order form) was not made at Listers Group's business premises, this will be an 'off-premises contract'."
        },
        {
            distanceSellingAcknowledgementId: "3",
            text:
                "If you purchase a vehicle without ever dealing in person with a Listers Group representative, for example, cars bought online or over the telephone, this is known as a 'distance contract'."
        },
        {
            distanceSellingAcknowledgementId: "4",
            text:
                "This is a business purchase and the vehicle will be used for business purposes and therefore the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 do not apply."
        }
    ]
};

/***************
 ** PAGE CODE **
 ***************/

//IFFY
$(document).ready(() => {
    if (!clientDetails.hasGapInfoBeenPresented) {
        $("#gap-warning-card").show();
    }
    //Even listeners
    $("#save-button").click(() => {
        handleSave();
    });
});


//Event handelers
function handleSave() {
    if ($("#quote-contact-details-form").valid()) {
        document.location.href = "vehicledetails.html";
    } else {
        $("#error-list").empty();
        $.each(
            $("#quote-contact-details-form").validate().errorMap,
            (index, value) => {
                $("#error-list-card").show();
                $("#error-list").append(
                    "<li class='error'>" + index + " - " + value + "</li>"
                );
            }
        );
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}
