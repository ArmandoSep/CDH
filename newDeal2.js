// Map fields on load
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
        at: auth_token, ee: ee, 's':'2-load', 'pid':pid
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
        console.log("no redir");
        console.log(val_response);
        // Get rest of vars
        const fname = val_response["fn"];
        const lname = val_response["ln"];
        const email = val_response["email"];
        const picture = val_response["pp"];
        const notifications = val_response['notifications'];
        const subto = val_response["st"];
        
        const address = val_response["address"];
        const mls_status = val_response["mls"];
        const beds = val_response["bd"];
        const baths = val_response["bt"];
        const year_built = val_response["yb"];
        const pool = val_response["pool"];
        const insurance = val_response["insurance"];
        const tax = val_response["tax"];
        const property_type = val_response["property_type"];
        const image1 = val_response["im1"];
        const image2 = val_response["im2"];
        const image3 = val_response["im3"];
        const has_mortagage = val_response["has_mortagage"];
        const mortgage_pi = val_response["mortgage_pi"];
        const loan1_balance = val_response["loan1_balance"];
        const loan1_pay = val_response["loan1_pay"];
        const loan1_int = val_response["loan1_int"];
        const loan1_date = val_response["loan1_date"];
        const loan2_balance = val_response["loan2_balance"];
        const loan2_pay = val_response["loan2_pay"];
        const loan2_int = val_response["loan2_int"];
        const loan2_date = val_response["loan2_date"];
        const loan3_balance = val_response["loan3_balance"];
        const loan3_pay = val_response["loan3_pay"];
        const loan3_int = val_response["loan3_int"];
        const loan3_date = val_response["loan3_date"];
        const has_liens = val_response["has_liens"];
        const lien1_type = val_response["lien1_type"];
        const lien1_amount = val_response["lien1_amount"];
        const lien2_type = val_response["lien2_type"];
        const lien2_amount = val_response["lien2_amount"];
        const has_arrears = val_response["has_arrears"];
        const arrears = val_response["arrears"];
        const has_hoa = val_response["has_hoa"];
        const hoa = val_response["hoa"];

        // Map property details
        $('#property_address').html(`${address}`);
        $('#property_pic1').attr("src", image1);
        $('#property_pic2').attr("src", image2);
        $('#property_pic3').attr("src", image3);
        $('#property_type').html(`${property_type}`);
        $('#mls').html(`${mls_status}`);
        $('#beds').val(beds);
        $('#baths').val(baths);
        $('#pool').val(pool);
        $('#yearbuilt').val(year_built);
        $('#insurance').val(insurance);
        $('#taxes').val(tax);
        
        if (pool === 'Y'){
            $('#pool').prop('selectedIndex', 1);
        } else {
            $('#pool').prop('selectedIndex', 2);
        }
        
        if (has_mortagage === 'Y'){
            $('#active_loans').addClass('show');
            $('#h_mortagage').val('Y');
            $('#pi').val(mortgage_pi);
            $('#loan1_balance').val(loan1_balance);
            $('#loan1_payment').val(loan1_pay);
            $('#loan1_int').val(loan1_int);
            $('#loan1_date').val(loan1_date);

            if (loan2_balance) {
                $('#loan2_input').removeClass("hide");
                $('#loan2_balance').val(loan2_balance);
                $('#loan2_payment').val(loan2_pay);
                $('#loan2_int').val(loan2_int);
                $('#loan2_date').val(loan2_date);
            }
            if (loan3_balance) {
                $('#loan3_input').removeClass("hide");
                $('#additional_loan').addClass("hide")
                $('#loan3_balance').val(loan3_balance);
                $('#loan3_payment').val(loan3_pay);
                $('#loan3_int').val(loan3_int);
                $('#loan3_date').val(loan3_date);
                }

            // Display section
            $('#mortgage_section input[type=checkbox]').attr("checked", true);
        }
        if (has_liens === 'Y'){
            $('#active_liens').addClass('show');
            $('#h_liens').val('Y');
            $('#lien1_type').val(lien1_type);
            $('#lien1_amount').val(lien1_amount);

            if (lien2_amount){
                $('#loan2_input').removeClass("hide");
                $('#lien2_type').val(lien2_type);
                $('#lien2_type').val(lien2_amount);
            }
            // Display section
            $('#liens_section input[type=checkbox]').attr("checked", true);
        }
    
    if (has_arrears === 'Y'){
            $('#active_arrears').addClass('show');
            $('#h_arrears').val('Y');
            $('#total_arrears').val(arrears);
            // Display section
            $('#arrears_section input[type=checkbox]').attr("checked", true);
        }
    
    if (has_hoa === 'Y'){
            $('#active_hoa').addClass('show');
            $('#h_hoa').val('Y');
            $('#hoa_fee').val(hoa);
            // Display section
            $('#hoa_section input[type=checkbox]').attr("checked", true);
        }
        
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
    
    // hide preloader
    document.getElementById('preloader-submit2').style="display: none; opacity: 0";
      
});

// Toggle functionality
$('#mortgage_section').on('change', function(e) {
    if (e.target.checked) {
        $('#active_loans').addClass('show');
        $('#h_mortgage').val('Y');
    } else {
        $('#active_loans').removeClass('show');
        $('#h_mortgage').val('');
    };
});

$('#liens_section').on('change', function(e) {
    if (e.target.checked) {
        $('#active_liens').addClass('show');
        $('#h_liens').val('Y');
    } else {
        $('#active_liens').removeClass('show');
        $('#h_liens').val('');
    };
});
$('#arrears_section').on('change', function(e) {
    if (e.target.checked) {
        $('#active_arrears').addClass('show');
        $('#h_arrears').val('Y');
    } else {
        $('#active_arrears').removeClass('show');
        $('#h_arrears').val('');
    };
});
$('#hoa_section').on('change', function(e) {
    if (e.target.checked) {
        $('#active_hoa').addClass('show');
        $('#h_hoa').val('Y');
    } else {
        $('#active_hoa').removeClass('show');
        $('#h_hoa').val('');
    };
});

$("#additional_loan").click(function(){
	if ($('#loan2_input').hasClass("hide")){
  		$('#loan2_input').removeClass("hide");
    } else {
  		$('#loan3_input').removeClass("hide");
      $('#additional_loan').addClass("hide");
    }
});
$("#additional_lien").click(function(){
	if ($('#lien2_input').hasClass("hide")){
  		$('#lien2_input').removeClass("hide");
    } else {
  		$('#lien3_input').removeClass("hide");
        $('#additional_lien').addClass("hide");
    }
});