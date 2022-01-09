var currentTab = 0;
document.addEventListener("DOMContentLoaded", function(event) {


    showTab(currentTab);

});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
    } else {
        document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
    }
    fixStepIndicator(n)
}

async function sendData() {
    var data = {}
        //TAB 1
    data['clg_name'] = $("#clg_name").val();
    data['age_m'] = $("#age_months").val();
    data['age_y'] = $("#age_years").val();
    data['sex'] = $('input[name="gender"]:checked').val();
    data['course'] = $('input[name="course"]:checked').val();
    data['residence'] = $('input[name="residence"]:checked').val();
    data['religion'] = $("#religion").val();
    data['no_of_fam_mem'] = $("#no_of_fam_mem").val();
    data['f_details'] = []
    data['m_details'] = []
    data['f_details'][0] = $("#father_edu").val();
    data['f_details'][1] = $("#father_ocp").val();
    data['f_details'][2] = $("#father_income").val();
    data['m_details'][0] = $("#mother_edu").val();
    data['m_details'][1] = $("#mother_ocp").val();
    data['m_details'][2] = $("#mother_income").val();
    //TAB 2
    data['stay'] = $('input[name="stay_radio"]:checked').val();
    if (data['stay'] == 'others') {
        data['stay'] = $("#stay_other_value").val();
    }
    data['p_working'] = $('input[name="p_working_radio"]:checked').val();
    data['activity'] = {}
    $('#activities > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        if (activity_name != '') {
            var activity_hours = $(tr.cells[1]).find("input[type='number']").val();
            var activity_per = $(tr).find('input[type="radio"]:checked').val()
            data['activity'][activity_name] = [activity_hours, activity_per]
        }
    });
    data['eat_junkfood'] = []
    data['eat_junkfood'][0] = $('input[name="junkfood_radio"]:checked').val();
    if (data['eat_junkfood'][0] == 'yes') {
        data['eat_junkfood'][1] = $("#junkfood_since_long").val();
        data['eat_junkfood'][2] = $("#junkfood_how_many_times").val();
        data['eat_junkfood'][3] = $('input[name="junkfood_radio_how"]:checked').val();
    }
    data['habbit'] = {}
    data['habbit']['smoking'] = []
    data['habbit']['smoking'][0] = $('input[name="smoking_radio"]:checked').val();
    if (data['habbit']['smoking'][0] == 'yes') {
        data['habbit']['smoking'][1] = $('input[name="smoking_frequently_radio"]:checked').val();
        data['habbit']['smoking'][2] = $("#smoking_since_years").val();
        data['habbit']['smoking'][3] = $('input[name="smoking_since_radio"]:checked').val();
    }
    data['habbit']['alcohol'] = []
    data['habbit']['alcohol'][0] = $('input[name="alcohol_radio"]:checked').val();
    if (data['habbit']['alcohol'][0] == 'yes') {
        data['habbit']['alcohol'][1] = $('input[name="alcohol_frequently_radio"]:checked').val();
        data['habbit']['alcohol'][2] = $("#alcohol_since_years").val();
        data['habbit']['alcohol'][3] = $('input[name="alcohol_since_radio"]:checked').val();
    }
    data['habbit']['tobacco'] = []
    data['habbit']['tobacco'][0] = $('input[name="smoking_radio"]:checked').val();
    if (data['habbit']['tobacco'][0] == 'yes') {
        data['habbit']['tobacco'][1] = $("#tobacco_since_years").val();
        data['habbit']['tobacco'][2] = $('input[name="tobacco_since_radio"]:checked').val();
    }

    //TAB3
    data['use_social_media'] = []
    data['use_social_media'][0] = $('input[name="use_sm_radio"]:checked').val();
    if (data['use_social_media'][0] == 'yes') {
        data['use_social_media'][1] = $("#use_sm_since_years").val();
        data['use_social_media'][2] = $('input[name="use_sm_since_radio"]:checked').val();
    }

    data['which_sm_use'] = {}
    $('#which_sm_use > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        if (activity_name != '') {
            var activity_hours = $(tr.cells[1]).find("input[type='number']").val();
            var activity_per = $(tr).find('input[type="radio"]:checked').val()
            data['which_sm_use'][activity_name] = [activity_hours, activity_per]
        }
    });

    data['A_q9'] = $('#A_q9').val();
    data['A_q10'] = $('#A_q10').val();
    data['A_q11'] = $('input[name="A_q11_radio"]:checked').val();
    data['A_q12'] = $('#A_q12').val();
    data['A_q13'] = []
    data['A_q13'][0] = $('#A_q13').val();
    data['A_q13'][1] = $('input[name="A_q13_radio"]:checked').val();
    data['A_q14'] = {}

    //PANDING TAB
    var inx = 0;
    data['A_q14']['general'] = []
    $('input[name="where_you_use_sm_radio"]:checked').each(function() {
        data['A_q14']['general'].push(this.value);
    });
    if ($('#where_you_use_sm_Driving').is(':checked') || $('#where_you_use_sm_Walking').is(':checked')) {
        var use_sm_temp = $('input[name="use_sm_while_walk_drive_radio"]:checked').val();
        data['A_q14']['walking-driving'] = use_sm_temp;
        if (use_sm_temp == 'yes') {
            data['A_q14']['walking-driving-continue'] = $('input[name="use_sm_after_accident_radio"]:checked').val(); //PANDING
        }
    }
    if ($('#where_you_use_sm_others').is(':checked')) {
        data['A_q14']['general'].push($('#use_sm_other_value').val());
    }


    var t = $("#what_you_first_check_sm option:selected").val();
    data['what_you_first_check_sm'] = t;
    if (t == 'others') {
        data['what_you_first_check_sm'] = 'Others,' + $('what_you_first_check_sm_other_value').val()
    }

    data['hear_sound_of_phone_ring'] = $('input[name="hear_sound_of_phone_ring"]:checked').val();
    data['fear_being_out_coverage_area'] = $('input[name="fear_being_out_coverage_area"]:checked').val();
    data['feel_any_while_use_sm_long_time'] = {}
    var row_index = 0;

    $('#feel_any_while_use_sm_long_time > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        name_tag = 'q18_' + row_index;
        if (activity_name != '') {
            data['feel_any_while_use_sm_long_time'][activity_name] = $(`input[name="${name_tag}"]:checked`).val();
        }
        row_index++;
    });

    data['q19'] = $('input[name="q19"]:checked').val();
    data['q19b'] = $('input[name="q19b"]:checked').val();
    data['q19c'] = []
    if ($("#19c_0").prop('checked') == true) {
        data['q19c'].push($("#19c_0").val());
    }
    if ($("#19c_1").prop('checked') == true) {
        data['q19c'].push($("#19c_1").val());
    }
    if ($("#19c_2").prop('checked') == true) {
        data['q19c'].push($("#19c_2").val());
    }
    if ($("#19c_3").prop('checked') == true) {
        data['q19c'].push($("#19c_3").val());
    }
    if ($("#19c_other").val() != '') {
        data['q19c'].push('other');
        data['q19c'].push($("#19c_other").val());
    }

    //TAB4
    row_index = 1;
    data['SM_Q'] = {}
    $('#SM_Q > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        name_tag = 'sm_q' + row_index + '_radio';
        if (activity_name != '') {
            data['SM_Q'][activity_name] = $(`input[name="${name_tag}"]:checked`).val();
        }
        row_index++;
    });

    row_index = 1
    data['sm_offline_feel'] = {}
    $('#sm_offline_feel > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        name_tag = 'sm_offline_feel_q' + row_index + '_radio';
        if (activity_name != '') {
            data['sm_offline_feel'][activity_name] = $(`input[name="${name_tag}"]:checked`).val();
        }
        row_index++;
    });


    //TAB5
    data['games_you_play'] = $('#games_you_play_text_id').val()
    data['hours_in_game'] = []
    data['hours_in_game'][0] = $('#hours_in_game_number_id').val();
    data['hours_in_game'][1] = $('input[name="hours_in_game_radio"]:checked').val();

    data['frequency_of_game_number'] = []
    data['frequency_of_game_number'][0] = $('#frequency_of_game_number_id').val();
    data['frequency_of_game_number'][1] = $('input[name="frequency_of_game_radio"]:checked').val();

    data['money_on_gaming'] = $('#money_on_gaming_number_id').val();

    row_index = 1;
    data['gaming_table'] = {}
    $('#gaming_table > tbody  > tr').each(function(index, tr) {
        var activity_name = $(tr.cells[0]).text();
        name_tag = 'gaming_q' + row_index + '_radio';
        if (activity_name != '') {
            data['gaming_table'][activity_name] = $(`input[name="${name_tag}"]:checked`).val();
        }
        row_index++;
    });
    console.log(data)
    sData(data);


}

function sData(final_data) {
    $.ajax({
        type: "POST",
        url: 'https://niketproforma.el.r.appspot.com/add_data',
        headers: {
            "content-type": "application/json",
        },
        data: JSON.stringify(final_data),
        success: function(result) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 500) {
                Swal.fire({
                    icon: "error",
                    title: "Internal Server Error Please try again later",
                });
            }
            if (jqXHR.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "Bad request",
                });
            }
        },
    });
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        sendData();
        document.getElementById("nextprevious").style.display = "none";
        document.getElementById("all-steps").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("text-message").style.display = "block";
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    var clg_name_select = document.getElementById("clg_name");
    if (clg_name_select.value == "") {
        clg_name_select.classList.add("border-danger");
    }
    for (i = 0; i < y.length; i++) {
        if (!y[i].classList.contains("ignore_invalid")) {
            if (y[i].type == "radio") {
                var radios = document.getElementsByName(y[i].name);
                var isChecked = false;
                var j = 0;
                while (!isChecked && j < radios.length) {
                    if (radios[j].checked) isChecked = true;
                    j++;
                }
                if (!isChecked) {
                    y[i].parentElement.parentElement.className += " border border-danger";
                    valid = false;
                }
            } else if (y[i].value == "" && y[i].type != "radio") {
                y[i].className += " border-danger";
                valid = false;
            }
        }
    }



    //valid = true;

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
        document.getElementById("fill_warning").setAttribute("hidden", true);
    } else {
        document.getElementById("fill_warning").removeAttribute("hidden");
    }

    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
    x[n].className += " active";
}
