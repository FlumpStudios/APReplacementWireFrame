$("document.html").ready(() => {
    $("#submit-form").click(() => handleSubmit())
    }        
);

function handleSubmit(){
    if ($("#login-form").valid()){
        document.location.href = "../home.html"
    }
}