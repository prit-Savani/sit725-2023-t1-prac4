const cardList = [
    {
        title: "Heart",
        image: "images/Heart.jpg",
        link: "About Blood Donation",
        desciption: "Demo desciption about Blood Donation"
    }
    
]

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text card-desc-color">' + item.desciption + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const getcards = () => {
    $.get('/api/heart',(response) => {
    if(response.statusCode==200){
    addCards(response.data);
    }
    })
    }



$(document).ready(function () {
    $('.materialboxed').materialbox();
    addCards(cardList);
    $('.modal').modal();
    $('#formSubmit').click(() => {
        submitForm();
    })
})