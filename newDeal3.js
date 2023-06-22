$(document).ready(function () {
        const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let pid = params.id;
    $('#pid').val(pid);

    // Get auth and ee
    const auth_token = Cookies.get('at');
    const ee = Cookies.get('ee');
    $('#at').val(auth_token);
    $('#ee').val(ee);

    // Input
    var form_input = JSON.stringify({
        at: auth_token, ee: ee, 's':'3-load', 'pid':pid
    });

    fetch("https://5polwwhyb9.execute-api.us-east-1.amazonaws.com/default/CDH_NewDeal",{
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: form_input,
    })
    // response
    .then(res => res.json())
    .then(json => {
        const val_response = json;
        const redir = val_response["redir"];
        // Redir to another page if missing/wrong data
        if (redir){
            location.href = `/${redir}`;
        }
        // Get rest of vars
        const fname = val_response["fn"];
        const lname = val_response["ln"];
        const email = val_response["email"];
        const picture = val_response["pp"];
        const notifications = val_response['notifications'];
        const subto = val_response["st"];
        
        // Map address
        var rent_comps = val_response["rent_comps"];
        var arv_comps = val_response["arv_comps"];
        var bnb_comps = val_response["bnb_comps"];
        $('#address').html(val_response["address"]);
        $('#property_details').html(val_response["p_details"]);
        
        // Map rent comps
        $('.rentcomp_row').each(function (index) {
            var rentData = rent_comps[index];
            var rent_adress = rentData['address']
            $(this).children().eq(0).children().eq(0).html(`<a href="https://www.google.com/search?q=${rent_adress} zillow" target="_blank">${rent_adress}</a>`); 
            $(this).children().eq(1).children().eq(0).html(rentData['bedbath']); 
            $(this).children().eq(2).children().eq(0).html(rentData['yb']); 
            $(this).children().eq(3).children().eq(0).html(rentData['status']); 
            $(this).children().eq(4).children().eq(0).html(rentData['price']); 
            $(this).children().eq(5).children().eq(0).html(rentData['sqft']);
            $(this).children().eq(6).children().eq(0).html(rentData['days']);
            // Show element only if there is data
            if (rent_adress){
                $(this).removeClass('hide');
            }
            // Stop on the fifth element
            if (index === 4){
                return false;
            }
        });
        // Map ARV comps
        $('.arvcomp_row').each(function (index) {
            var arvData = arv_comps[index];
            var arv_adress = arvData['address']
            $(this).children().eq(0).children().eq(0).html(`<a href="https://www.google.com/search?q=${arv_adress} zillow" target="_blank">${arv_adress}</a>`); 
            $(this).children().eq(1).children().eq(0).html(arvData['bedbath']); 
            $(this).children().eq(2).children().eq(0).html(arvData['yb']); 
            $(this).children().eq(3).children().eq(0).html(arvData['prop_type']); 
            $(this).children().eq(4).children().eq(0).html(arvData['price']); 
            $(this).children().eq(5).children().eq(0).html(arvData['sqft']);
            $(this).children().eq(6).children().eq(0).html(arvData['status']);
            // Show element only if there is data
            if (arv_adress){
                $(this).removeClass('hide');
            }
            // Stop on the fifth element
            if (index === 4){
                return false;
            }
        });
        // Map Airbnb comps
        $('.bnbcomp_row').each(function (index) {
            var bnbData = bnb_comps[index];
            var bnb_adress = bnbData['address']
            $(this).children().eq(0).children().eq(0).html(bnb_adress); 
            $(this).children().eq(1).children().eq(0).html(bnbData['bd']); 
            $(this).children().eq(2).children().eq(0).html(bnbData['pool']); 
            $(this).children().eq(3).children().eq(0).html(bnbData['rev']); 
            // Show element only if there is data
            if (bnb_adress){
                $(this).removeClass('hide');
            }
            // Stop on the forth element
            if (index === 3){
                return false;
            }
        });
        
        // Load header data
        $("#pp_drop_embed").attr("src", picture);
        $("#pp_embed").attr("src", picture);
        $("#header_email").html(`${email}`);
        $("#header_name").html(`${fname} ${lname}`);
        if (notifications === undefined || notifications.length == 0) {
            $('#no_notification').addClass("show")
        }
        if (subto === 'Y'){
            $("#header_subtov").addClass('show')
        } else if (subto === 'P') {
            $("#header_subtop").addClass('show')
        }
    });

    // Display app content
    $('#app').addClass("app--show");
});

// Show additionals
$("#additional_rentcomp").click(function(){
    if ($('#new_rentcomp1').hasClass("hide")){
        $('#new_rentcomp1').removeClass("hide");
    }
    else if ($('#new_rentcomp2').hasClass("hide")){
        $('#new_rentcomp2').removeClass("hide");
    }
    else {
        $('#new_rentcomp3').removeClass("hide");
        $('#additional_rentcomp').addClass("hide");
    }
});
$("#additional_arvcomp").click(function(){
    if ($('#new_arvcomp1').hasClass("hide")){
        $('#new_arvcomp1').removeClass("hide");
    }
    else if ($('#new_arvcomp2').hasClass("hide")){
        $('#new_arvcomp2').removeClass("hide");
    }
    else {
        $('#new_arvcomp3').removeClass("hide");
        $('#additional_arvcomp').addClass("hide");
    }
});

$("#additional_bnbcomp").click(function(){
    if ($('#new_bnbcomp1').hasClass("hide")){
        $('#new_bnbcomp1').removeClass("hide");
    } 
    else if ($('#new_bnbcomp2').hasClass("hide")){
        $('#new_bnbcomp2').removeClass("hide");
    } 
    else {
        $('#new_bnbcomp3').removeClass("hide");
        $('#additional_bnbcomp').addClass("hide");
    }
});
// Toggle functionality
$('.include-comp-toggle').on('change', function(e) {
    var toggle_id = $(this).attr('id');
    if (e.target.checked) {
        $('#include_'+toggle_id).val('Y');
    } else {
        $('#include_'+toggle_id).val('');
    };
});