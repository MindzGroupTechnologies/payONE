// Agency Theme JavaScript
var institutes = null;
var insurance = null;

(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $('#slPurpose').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
        console.log($(this).val());
        switch ($(this).val()[0]) {
            case "1":
                showLoadingTarget();
                getInstitutes();
                break;
            case "2":
                showLoadingTarget()
                getInsuranceCompanies();
                break;
            default:
                clearTarget();
        }
    });

})(jQuery); // End of use strict

function clearTarget() {
    $("#slTarget").children().remove();
    $("#slTarget").attr('disabled', "disabled");
    $('#slTarget').selectpicker({
        "noneSelectedText": "Select Purpose First"
    });
    $('#slTarget').selectpicker('refresh');
}

function showLoadingTarget() {
    $("#slTarget").children().remove();
    $("#slTarget").attr('disabled', "disabled");
    $('#slTarget').selectpicker({
        "noneSelectedText": "Loading Options ..."
    });
    $('#slTarget').selectpicker('refresh');
}

function populateTarget(data, message) {
    $("#slTarget").children().remove();
    data.forEach(function (element) {
        $("#slTarget").append($("<option></option>").attr("value", element.key).text(element.text));
    }, this);
    $("#slTarget").attr('disabled', null);
    $('#slTarget').selectpicker({
        "noneSelectedText": message
    });
    $('#slTarget').selectpicker('refresh');
}

function getInstitutes() {
    if (institutes) {
        populateTarget(institutes, "Select an Institue ...");
    } else {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://baas.kinvey.com/appdata/kid_HkkPNq3--/education",
            "method": "GET",
            "headers": {
                "authorization": "Basic cGF5b25lOnBheW9uZUAxMjM=",
                "cache-control": "no-cache",
            }
        }

        $.ajax(settings).done(function (response) {
            institutes = response;
            populateTarget(response, "Select an Institue ...");
        });
    }
}

function getInsuranceCompanies() {
    if (insurance) {
        populateTarget(insurance, "Select an Insurance Company ...");
    } else {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://baas.kinvey.com/appdata/kid_HkkPNq3--/insurance",
            "method": "GET",
            "headers": {
                "authorization": "Basic cGF5b25lOnBheW9uZUAxMjM=",
                "cache-control": "no-cache",
            }
        }

        $.ajax(settings).done(function (response) {
            insurance = response;
            populateTarget(response, "Select an Insurance Company ...");
        });
    }
}