$(document).ready(function () {
    // Get auth and ee
    const auth_token = Cookies.get('at');
    const ee = Cookies.get('ee');
  
	// Input
    var form_input = JSON.stringify({
  	    at: auth_token, ee: ee, 't':'read'
    });
  
    fetch("https://1q08ucpgd9.execute-api.us-east-1.amazonaws.com/default/CDH_Settings",{
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
        // Get rest oof vars
        const fname = val_response["fn"];
        const lname = val_response["ln"];
        const phone = val_response["phone"];
        const email = val_response["email"];
        const picture = val_response["pp"];
        const cover = val_response["cover"];
        const subto = val_response["st"];
        const agents = val_response["agents"];
        const sellers = val_response["sellers"];
        const attorneys = val_response["attorneys"];
        const wholesalers = val_response["wholesalers"];
        const dispo = val_response["dispo"];
        const buy = val_response["buy"];
        const wrap = val_response["wrap"];
        const jv_status = val_response["jv_status"];
        const jv_page = val_response["jv_page"];
        const bio = val_response["bio"];
        const ig = val_response["ig"];
        const fb = val_response["fb"];
        const yt = val_response["yt"];
        const tk = val_response["tk"];
        const help = val_response["help"];
        const closer_fee = val_response["closer_fee"];
        const dispo_fee = val_response["dispo_fee"];
        const advanced_fee = val_response["advanced_fee"];
        const tc_fee = val_response["tc_fee"];
        const emd_fee = val_response["emd_fee"];
        const wraps = val_response["wraps"];
        const LTR = val_response["LTR"];
        const MTR = val_response["MTR"];
        const STR = val_response["STR"];
        const flips = val_response["flips"];
        const states = val_response["states"];
        const min_cashflow = val_response["min_cashflow"];
        const max_entry = val_response["max_entry"];
        
        // Set profile data
        $("#name").val(fname);
        $("#lastname").val(lname);
        $("#phone").val(phone);
        $("#pp_embed").attr("src", picture);
        $("#pp_embed2").attr("src", picture);
        $("#cover_embed").attr("src", cover);
        $("#n_ln").html(`${fname} ${lname}`);
        $("#email").html(`${email}`);
        
        if (agents){
            $("#agents").prop('checked', true);
        }
        if (sellers){
            $("#sellers").prop('checked', true);
        }
        if (attorneys){
            $("#attorneys").prop('checked', true);
        }
        if (wholesalers){
            $("#wholesalers").prop('checked', true);
        }
        if (dispo){
            $("#dispo").prop('checked', true);
        }
        if (buy){
            $("#buy").prop('checked', true);
        }
        if (wrap){
            $("#wrap").prop('checked', true);
        }
        
        // Clean subto status
        if (subto === 'Y'){
            $("#subto-ver").addClass('show')
        } else if (subto === 'P') {
            $("#subto-pending").addClass('show')
        } else {
            $("#subto-apply").addClass('subto_apply--show')
        }
        
        // JV partner details
        if (jv_status == "A") {
            // Show JV section
            $("#jv_section").addClass('show')
            // Populate fields
            if (ig){
                $("#ig").val(ig);
            }
            if (fb){
                $("#fb").val(fb);
            }
            if (yt){
                $("#yt").val(yt);
            }
            if (tk){
                $("#tk").val(tk);
            }
            if (bio){
                $("#bio").val(bio);
            }
            if (min_cashflow){
                $("#min_cashflow").val(min_cashflow);
            }
            if (wraps){
                $("#jv_wraps").prop('checked', true);
            }
            if (STR) 
                $("#jv_str").prop('checked', true);
            }
            if (MTR){
                $("#jv_mtr").prop('checked', true);
            }
            if (LTR){
                $("#jv_ltr").prop('checked', true);
            }
            if (flips){
                $("#jv_flips").prop('checked', true);
            }
            if (max_entry){
                $("#max_entry").val(max_entry);
            }
            if (states){
                $("#states").val(states);
            }
            
            // Clean help with
            if (help.includes("closer")){
                $("#closer").prop('checked', true);
                $("#closer_fee_input").val(closer_fee);
                $('#closer_fee').addClass("text-input--show");
            }
            if (help.includes("dispo")){
                $("#dispo-h").prop('checked', true);
                $("#dispo_fee_input").val(dispo_fee);
                $('#dispo_fee').addClass("text-input--show");
            }
            if (help.includes("advanced")){
                $("#advanced").prop('checked', true);
                $("#advanced_fee_input").val(advanced_fee);
                $('#dispo_fee').addClass("text-input--show");
            }
            if (help.includes("emd")){
                $("#emd").prop('checked', true);
                $("#emd_fee_input").val(emd_fee);
                $('#emd_fee').addClass("text-input--show");
            }
            if (help.includes("tc")){
                $("#tc").prop('checked', true);
                $("#tc_fee_input").val(tc_fee);
                $('#tc_fee').addClass("text-input--show");
            }
        }
    
        // Set ee and at in form
        $("#at").val(auth_token);
        $("#ee").val(ee);
        
        // show app content
        $('#app').addClass("app--show");
        
        // hide preloader
        document.getElementById('preloader-submit2').style="display: none; opacity: 0";
    });
});

// Show/hide request subto
$('#request-subto').on('change', function(e) {
    if (e.target.checked) {
        $('#subto-evidence').addClass('subto-evidence--show');
    } else {
        $('#subto-evidence').removeClass('subto-evidence--show');
    };
  });

// Show/hide text input for checkboxes
$(function() {
    $('#closer').change(function() {
        if(this.checked) {$('#closer_fee').addClass("text-input--show");} 
        else {$('#closer_fee').removeClass("text-input--show");}
    });
    $('#dispo-h').change(function() {
        if(this.checked) {$('#dispo_fee').addClass("text-input--show");} 
        else {$('#dispo_fee').removeClass("text-input--show");}
    });
    $('#advanced').change(function() {
        if(this.checked) {$('#advanced_fee').addClass("text-input--show");} 
        else {$('#advanced_fee').removeClass("text-input--show");}
    });
    $('#emd').change(function() {
        if(this.checked) {$('#emd_fee').addClass("text-input--show");} 
        else {$('#emd_fee').removeClass("text-input--show");}
    });
    $('#tc').change(function() {
        if(this.checked) {$('#tc_fee').addClass("text-input--show");} 
        else {$('#tc_fee').removeClass("text-input--show");}
    });
});


// Show upload widget to upload subto evidence
$("#upload_button").click(function() {
  const uploader = Uploader({
    apiKey: "public_FW25bC92K8wkZonkLHnyFfUgrDa5"
  });
  uploader.open({
  	maxFileCount: 1, 
  	"path": {"folderPath": "/se",
    "fileName": "{UTC_TIME_TOKEN_INVERSE}-{UNIQUE_DIGITS_3}{ORIGINAL_FILE_EXT}",
  	"fileNameVariablesEnabled": true}
  }).then(
    files => {
      const fileUrls = files.map(x => x.fileUrl).join("\n");
      if (fileUrls) {
      	// Show success styling in button
        $("#upload_text").addClass('uploaded');
        $("#upload_divider").addClass('uploaded');
        $("#upload_svg").addClass('uploaded');
        $("#uploaded_svg").addClass('uploaded');
      	// Set link in form
      	$("#subto_evidence").val(fileUrls); 
        console.log(fileUrls);
      }
    },
    error => {
      alert(error);
    }
  );
});

// Show upload widget to upload profile picture
$( "#upload_button_pp" ).click(function() {
  const uploader = Uploader({
    apiKey: "public_FW25bC92K8wkZonkLHnyFfUgrDa5"
  });
  uploader.open({ 
  	maxFileCount: 1, 
  	"path": {"folderPath": "/pp",
    "fileName": "{UTC_TIME_TOKEN_INVERSE}-{UNIQUE_DIGITS_3}{ORIGINAL_FILE_EXT}",
  	"fileNameVariablesEnabled": true}
  }).then(
    files => {
      const fileUrls = files.map(x => x.fileUrl).join("\n");
      if (fileUrls) {
      	// Show success styling in button
        $("#upload_text_pp").addClass('uploaded');
        $("#upload_divider_pp").addClass('uploaded');
        $("#upload_svg_pp").addClass('uploaded');
        $("#uploaded_svg_pp").addClass('uploaded');
      	// Set link in form
      	$("#new_pp").val(fileUrls); 
        // Show image in embed
        $("#pp_embed").attr("src",fileUrls);
        $("#pp_embed2").attr("src", fileUrls);
      }
    },
    error => {
      alert(error);
    }
  );
});

// Show upload widget to upload cover picture
$( "#upload_button_cover" ).click(function() {
    const uploader = Uploader({
      apiKey: "public_FW25bC92K8wkZonkLHnyFfUgrDa5"
    });
    uploader.open({ 
        maxFileCount: 1, 
        "path": {"folderPath": "/cover",
        "fileName": "{UTC_TIME_TOKEN_INVERSE}-{UNIQUE_DIGITS_3}{ORIGINAL_FILE_EXT}",
        "fileNameVariablesEnabled": true}
    }).then(
      files => {
        const fileUrls = files.map(x => x.fileUrl).join("\n");
        if (fileUrls) {
            // Set link in form
            $("#new_cover").val(fileUrls); 
            // Show image in embed
            $("#cover_embed").attr("src",fileUrls);
        }
      },
      error => {
        alert(error);
      }
    );
  });

// Redir if clicks cancel
$("#settings_cancel").click(function(){
	location.href = '/app/dashboard'
});


// Save settings
function convertFormToJSON(form) {
  var array = $(form).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  var form_input = JSON.stringify(json);
  return form_input;
}
  
$('#settings-form').each(function (i, el) {
	var form = $(el);
  form.submit(function (e) {
    e.preventDefault();
    $('#t').val('update');
    form = $(e.target);
    var data = convertFormToJSON(form);

    // Call API
    fetch("https://1q08ucpgd9.execute-api.us-east-1.amazonaws.com/default/CDH_Settings",{
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: data,
    })
    .then(res => res.json())
    .then(json => {
        // Set cookies from response
        const val_response = json;
        const redir = val_response["redir"];
        
        if (redir) {
            // Redirect if back returned a redirect
            location.href = redir;
        }
    });
  });
});