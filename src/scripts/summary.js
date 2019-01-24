/*******************
 **   PAGE DATA   **
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
    //set to false toshow GAP warning card
    hasGapInfoBeenPresented: true
};

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
    }
};

let productDetails = {
    selectedProducts: [
        {
            productName: "Listers SMART £10 Bodyshop Excess 30cm..",
            coverDetails: {
                policyDuration: "12 Months",
                policyClaimLimit: 3000,
                presentatioDate: "1548248651530",
                coverStartDate: "1548248651530",
                expiryDate: "1673348651530"
            },
            financeDetails: null
        },
        {
            productName: "Listers Personal Loan/Autoloan",
            coverDetails: null,
            financeDetails: {
                financeTerm: 36
            }
        }
    ]
};

//Data pulled from the page data repo
let pageData = {};

/***************
 ** PAGE CODE **
 ***************/

//IFFY

$("document").ready(() => {
    let warnMessage = $("#key-info-warning");
    if (clientDetails.hasGapInfoBeenPresented) {
        warnMessage.show();
    }

    //Even listeners
    $("#save-button").click(() => {
        handleSave();
    });
});





//Event handelers
function handleSave() {
    alert("Page data saved!");
}
