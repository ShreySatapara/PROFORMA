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

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {

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

    var clg_name_select = document.getElementById("clg_name");
    if (clg_name_select.value == "") {
        clg_name_select.classList.add("border-danger");
    }

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
        document.getElementById("fill_warning").setAttribute("hidden", true);
    } else {
        document.getElementById("fill_warning").removeAttribute("hidden");
    }
    valid = true;
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
    x[n].className += " active";
}