/*******************
 **   PAGE DATA   **
 *******************/

let pageDate = {
    privacyNoticeInformation: {
        title: "Data Privacy Notice for the Customer",
        message:
            "We will share your information with AutoProtect in order to follow and evidence regulatory process and / or to process products and services supplied by AutoProtect. For more detail of the ways in which your information is used by AutoProtect please read the <a href='#'>Data Privacy Notice</a> provided.",
        buttonText: "I CONFIRM THAT THE CUSTOMER AGREES"
    },
    policyHolderType: [
        { policyHolderTypeId: "1", name: "Person" },
        { policyHolderTypeId: "2", name: "Organisation" }
    ],
    gapInformation: {
        title: "Key Information on GAP Insurance presented to customer on:",
        text:
            "<p>In line with guidelines from The Financial Conduct Authority and in order to ensure you have all the information required to identify if Asset Protection Insurance is of benefit to you and to make an informed choice on this facility, we are pleased to provide you with Key Information on Asset Protection.</p> <p> Due to Financial Conduct Authority regulations we are unable to provide you with this facility until the 4th day following receipt of the information outlined in this document. However, should you require more immediate cover, you have the right to conclude purchase on day 2 or day 3 by contacting your Sales Consultant. </p><p>I am happy to receive documentation in electronic format where available. I am aware that I can request a paper version at any time.  <input id='email-consent' type='checkbox'></input>  </p><p>DataData Protection: Please be aware that AutoProtect will not share your details with any other company for the purposes of marketing but would like to keep you informed about AutoProtect products and services that may be of interest to you, please tick the boxes below to indicate your preferred methods of contact.</p>",
        contactOptions: [
            { contactOptionsId: "1", name: "SMS" },
            { contactOptionsId: "2", name: "Email" },
            { contactOptionsId: "3", name: "Telephone" }
        ]
    }
};

/***************
 ** PAGE CODE **
 ***************/

//IFFY
$("document").ready(
    () => {
        //Set initial form state
        populatePrivacyPolicy();
        populateGapInformation();
        setAsPerson();

        //Add style to datepicker
        $("#datepicker").datepicker({
            uiLibrary: "bootstrap4"
        });

        //Populate date picker with todays date
        $("#datepicker").val(moment().format("DD/MM/YYYY"));


        //Event listeners
        $(".policy-holder-options").click(e => handlePolicyHolderTypeChange(e));
        $("#key-info-modal-yes-button").click(() => handleKeyInfoYesClicked());
        $("#key-info-modal-no-button").click(() => handleKeyInfoNoClicked());

        $("#email-consent").change(function () {
            handleEmailConsentChange(this.checked);
        });

        $("#sumbmit-print").click(function (e) {
            if ($("#personal-details-form").valid()) {
                handleSubmitViaPrint(e);
            }
        });

        $("#sumbmit-email").click(function (e) {
            if ($("#personal-details-form").valid()) {
                handleSubmitViaEmail(e);
            }
        });
    })

//Event handlers
function handlePolicyHolderTypeChange(e) {
    var selectedOption = e.target.innerText;
    switch (selectedOption) {
        case "Person":
            setAsPerson();
            break;
        case "Organisation":
            setAsOrganisation();
            break;
    }
}

function handleEmailConsentChange(consentGiven) {
    $("#sumbmit-email").prop("disabled", consentGiven);
}

function handleSubmitViaPrint(e) {
    $("#key-info-modal").modal("show");
}

function handleSubmitViaEmail(e) {
    $("#email-confirmation-modal").modal("show");
}

function handleKeyInfoYesClicked() {
    var printConfirmMessage = $("#print-confirmation-message").text();
    printConfirmMessage = printConfirmMessage.replace(
        "{DATE}",
        $("#datepicker").val()
    );
    $("#print-confirmation-message").html(printConfirmMessage);

    $("#print-confirmation-modal").modal("show");
}

function handleKeyInfoNoClicked() {
    $("#new-customer-confirmation-modal").modal("show");
}

//Helper functions
function setAsOrganisation() {
    $("#contact-title").hide();
    $("#contact-person-heading").text("Fleet Manager - Contact Person:");
    $("#organisation-name").show();
    $("#contact-mobile-group").hide();
    $("#title").prop("required", false);
    $("#orgname").prop("required", true);
}

function setAsPerson() {
    $("#contact-title").show();
    $("#contact-person-heading").text("Personal Details:");
    $("#organisation-name").hide();
    $("#contact-mobile-group").show();
    $("#title").prop("required", true);
    $("#orgname").prop("required", false);
}

function populatePrivacyPolicy() {
    $("#modalLabel").text(pageDate.privacyNoticeInformation.title);
    $("#modal-message").html(pageDate.privacyNoticeInformation.message);
    $("#modal-button").text(pageDate.privacyNoticeInformation.buttonText);
    $("#exampleModal").modal("show");
}

function populateGapInformation() {
    $("#gap-title").text(pageDate.gapInformation.title);
    $("#gap-text").html(pageDate.gapInformation.text);

    for (let i = 0; i < pageDate.gapInformation.contactOptions.length; i++) {
        var foo = `<div class="form-check"><input class="form-check-input" type = "checkbox" value = "${
            pageDate.gapInformation.contactOptions[i].id
            }" id = "gap-options${i}"> <label class="form-check-label" for="gap-options${i}"> ${
            pageDate.gapInformation.contactOptions[i].name
            } </label> </div >`;
        $("#gap-checkboxes").append(foo);
    }
}

// function populatePolicyHolderType() {
//   for (let i = 0; i < pageDate.policyHolderType.length; i++) {
//     $("#policy-holder-type").append(
//       `<label class="btn btn-primary active"> <input type="radio" name="options" id="option${i}" >
//       ${pageDate.policyHolderType[i].name}</label>`
//     );
//   }
// }
