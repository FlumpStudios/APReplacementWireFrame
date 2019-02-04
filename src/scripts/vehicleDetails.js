/*******************
 **  PAGE DATA    **
 *******************/

let pageData = {
    vehicleType: [{ vehicleTypeId: 1, name: "Car" }, { id: 2, name: "LTV" }],
    //QUESTION: Should we replace 'Is the Vehicle Reg available' with tick box?
    returnedVehicle: {
        manufacturer: [
            { manufacturerId: 1, name: "Abath" },
            { manufacturerId: 2, name: "Audi" }
        ],
        fuelType: [
            { fuelTypeId: 1, name: "Petrol" },
            { fuelTypeId: 2, name: "Diesel" }
        ],
        transmission: [
            { transmissionId: 1, name: "Manual" },
            { transmissionId: 2, name: "Automatic" },
            { transmissionId: 3, name: "Other" }
        ],
        aspiration: [
            { aspirationId: 1, name: "Normal" },
            { aspirationId: 2, name: "Turbo" },
            { aspirationId: 2, name: "Other" }
        ],
        vehicleUse: [
            { aspirationId: 1, name: "Normal" },
            { aspirationId: 2, name: "Turbo" },
            { aspirationId: 2, name: "Other" }
        ]
    }
};

//Model list requires and AJAX call to return list based off manufacturer
let modelList = [{ modelID: 1, name: "A1" }, { modelID: 2, name: "A2" }];

//Date to be pulled from the client record
let vehicleDetails = {
    vehicleDescription: {
        vehicleType: "4",
        vehicleRegAvailable: true,
        VehicleRegistration: "BW80 XBA"
    },
    returnedVehicle: {
        manufacturer: "SEAT",
        modal: "SEAT Arona 1.0 TSI (115ps) FR (s/s) Hatchback 5d 999cc",
        fuelType: "Petrol",
        transmission: "Manual",
        modelYear: "2019",
        engineSize: "999c",
        keywords: []
    },
    additionalVehicleDetails: {
        dateFirstRegistered: "1547820512345",
        vehiclePurchaseDate: "1547820856874",
        currentMileage: 60,
        invoiceValue: "20000",
        isCarNew: true,
        IsVehicleFinanced: false,
        StockId: "54321",
        warrantyExpires: "1641600000000",
        DeliveryDate: "",
        MotDue: "1641600000000"
        //'Vehicle Will Be Kept For'  will not be carried over from Auto protect
    }
};

/***************
 ** PAGE CODE **
 ***************/

//IFFY
$(document).ready(() => {
    setupDatePickers();

    //Even listeners
    $("#vehicle-reg-available").change(function (e) {
        handleRegChange(this.value);
    });
    $("#search-button").click(() => handleSearchPressed());
    $("#correct-vehicle-details-button").click(() => handleCorrectDetailsClicked());
    $("#find-vehicle-button").click(() => handleFindVehicleClicked());
    $(".vehicle-model-anchor").click(() => handleVehicleSelected());
    $("#edit-vehicle-button").click(() => handleEditButtonClicked());
    $("#save-button").click(() => handleSave());
    $("#change-search-button").click(() => handleChageVehicle());
    $("#incorrect-vehicle-details-button").click(() =>
        handleIncorrectDetailsClicked()
    );
})



//Event handelers
function handleRegChange(regAvailable) {
    var vehicleRegGroup = $("#vehicle-reg-available-group");
    var returnedVehicle = $("#returned-vehicle");

    if (regAvailable === "true") {
        vehicleRegGroup.show();
        returnedVehicle.hide();
    } else {
        vehicleRegGroup.hide();
        returnedVehicle.show();
        returnedVehicle.prop("disabled", false);
        $("#find-vehicle-button").show();
        $("#detail-confirm-buttons").hide();
    }
}

function handleSearchPressed() {
    if (validateForm("specified-vehicle-description-form")) {
        showReturnedVehicleFieldset();
    }
}

function handleVehicleSelected() {
    setReturnedVehiclesBasedOnReg();
    showAdditionalDetails();
    $("#returned-vehicle").prop("disabled", true);
    $("#find-vehicle-button").hide();

    $("#vehicle-table").hide();
    $("#edit-vehicle-button").show();
}

function handleSave() {
    if (validateForm("additional-details-form")) {
        document.location.href = "sdn.html";
    }
}

function handleIncorrectDetailsClicked() {
    $("#detail-confirm-buttons").hide();
    $("#vehicle-table").show();
    $("#find-vehicle-button").show();
    $("#returned-vehicle").prop("disabled", false);
}

function handleChageVehicle() {
    //Using reload here for prototyping, replace with a proper reset function if to be use in prodiction code.
    location.reload();
}

function handleFindVehicleClicked() {
    if (validateForm("returned-vehicle-form")) {
        $("#vehicle-table").show();
    }
}

function handleCorrectDetailsClicked() {
    showAdditionalDetails();
}

function handleEditButtonClicked() {
    $("#vehicle-table").show();
    $("#find-vehicle-button").show();
    $("#detail-confirm-buttons").hide();
    $("#additional-details").hide();
    $("#edit-vehicle-button").hide();
    $("#returned-vehicle").prop("disabled", false);
}

//Helper functions
function showReturnedVehicleFieldset() {
    $("#error-list-card").hide();
    var returnedVehicle = $("#returned-vehicle");
    returnedVehicle.show();
    setReturnedVehiclesBasedOnReg();
    returnedVehicle.prop("disabled", true);
    $("#detail-confirm-buttons").show();
    $("#find-vehicle-button").hide();
    $("#edit-vehicle-button").hide();
    $("#change-search-button").show();
    $("#search-button").hide();
}

function showAdditionalDetails() {
    $("#save-button").attr("disabled", false);
    $("#additional-details").show();
}

function setReturnedVehiclesBasedOnReg() {
    $("#manufacturer-select").val("RL");
    $("#model-select").val("A1");
    $("#fuel-type-select").val("1");
    $("#transmission-select").val("1");
    $("#aspiration-select").val("1");
}

function setupDatePickers() {
    //Pickers have to be setup seperatly to prevent load error.
    $("#first-registered-date-picker").datepicker({

        uiLibrary: "bootstrap4"
    });
    $("#vehicle-purchase-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });
    $("#warranty-expires-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });
    $("#delivery-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });
    $("#mot-due-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });

    $("#first-registered-date-picker").val(moment().format("DD/MM/YYYY"));
    $("#vehicle-purchase-date-picker").val(moment().format("DD/MM/YYYY"));
    $("#warranty-expires-date-picker").val(moment().add(2, 'years').format("DD/MM/YYYY"));
    $("#mot-due-date-picker").val(moment().add(2, 'years').add(1,'days').format("DD/MM/YYYY"));
}

function validateForm(id) {
    id = `#${id}`;

    if ($(id).valid()) {
        return true;
    } else {
        $("#error-list").empty();
        $.each($(id).validate().errorMap, (index, value) => {
            $("#error-list-card").show();
            $("#error-list").append(
                "<li class='error'>" + index + " - " + value + "</li>"
            );
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}
