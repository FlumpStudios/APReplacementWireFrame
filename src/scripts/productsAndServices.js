/*******************
 **  PAGE DATA    **
 *******************/

//Date to be pulled from the client record

//QUESTION: Mappings could be quite complex here, have included the basics, but believe will need further discussion.

let productDetails = {
    //List of selected product ID's
    selectedProducts: [
        {
            productId: "7b51781a",
            coverDetails: {
                policyTypeId: 1,
                policyDurationId: 1,
                policyClaimLimit: 3000,
                policyRetailPrice: 599.0,
                coverStartDate: "1548248651530",
                expiryDate: "1548248651530",
                productOnMainOrder: false
            },
            financeDetails: null
        },
        {
            productId: "a341fae3",
            coverDetails: null,
            financeDetails: {
                policyTypeId: 1,
                financeType: "Conditional Sale",
                financeCompanyId: 5,
                finalPayment: 1000,
                monthlyRepayment: 200,
                financeTerm: 36,
                contractedMilage: 1000,
                anticipatedMilage: 900
            }
        }
    ]
};

//Data pulled from the page data repo
//QUESTION: Probably a lot more here or to be handeled differently. Needs a discussion.
let pageData = {
    products: [
        {
            productId: "7b51781a",
            productName: "Listers SMART",
            isDefered: false,
            content: {
                productPresentation: "",
                coverDetails: [{}],
                financeDetails: [{}]
            }
        },
        {
            productId: "a341fae3",
            productName: "Listers Gap",
            isDefered: false,
            content: {
                productPresentation: "",
                coverDetails: [{}],
                financeDetails: [{}]
            }
        }
    ]
};

/***************
 ** PAGE CODE **
 ***************/

//Fields
let currentProductId = null;
let selectedProducts = [];

//IFFY
$("document").ready(() => {
    //Setup the date pickers style
    $("#presentation-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });

    $("#cover-start-date-picker").datepicker({
        uiLibrary: "bootstrap4"
    });

    //set datepickers default date
    $("#presentation-date-picker").val(moment().format("DD/MM/YYYY"));
    $("#cover-start-date-picker").val(
        moment()
            .subtract(20, "days")
            .format("DD/MM/YYYY")
    );

    //Even listeners
    $("#save-button").click(() => handleSave());
    $(".add-product").click(() => handleAddProduct());
    $("#policy-select").change(e => handlePolicyChange(e));

    $(".product-button-remove").click(function () {
        handleRemoveProduct($(this));
    });
    $(".product-button").click(function () {
        handleViewProduct($(this));
    });
}
)



//Event handelers
function handleViewProduct(x) {
    $("#product-presentation-tab").tab("show");
    currentProductId = x.attr("id");

    if (x.hasClass("finance")) {
        $("#cover-details-tab").show();
        $("#finace-details-tab").hide();
    } else {
        $("#cover-details-tab").hide();
        $("#finace-details-tab").show();
    }

    //if current product in selectedProducts array, hide the add button and show the hide button
    if (selectedProducts.includes(currentProductId)) {
        $(".modal-remove-product").show();
        $(".add-product").hide();
        $("#model-taken-label").show();
    } else {
        $(".modal-remove-product").hide();
        $(".add-product").show();
        $("#model-taken-label").hide();
    }

    //set titles to selected products
    $(".product-header").text(x.attr("name"));

    $("#exampleModal").modal("show");
}

function handleAddProduct() {
    //Add the currently selected item to the selectedProducts array.
    if (!$("#finance-details").valid()) return;
    selectedProducts.push(currentProductId);
    var removeButtonId = `#${currentProductId}-remove`;
    $(removeButtonId).show();
    $("#exampleModal").modal("hide");
}

function handleRemoveProduct(x) {
    var curProd = currentProductId;
    if (!x.hasClass("modal-remove-product")) {
        curProd = x.attr("id").replace("-remove", "");
    }
    var removeButtonIs = `#${curProd}-remove`;

    selectedProducts = selectedProducts.filter(e => e !== curProd);
    $(removeButtonIs).hide();
}

function handlePolicyChange(e) {
    //Set finance details H5 to selected policy
    $("#cover-details-title").text($(`#${e.target.id} option:selected`).text());
}

function handleSave() {
    document.location.href = "summary.html"
}
