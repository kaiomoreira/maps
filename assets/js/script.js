var appData = {}
//metodo para usar o "GET" do ajax
appData.ajaxGet = function (url, sucesso, erro){
    $.ajax({
        type:"GET",
        url:url,
        dataType: "json",
        success: sucesso,
        error: erro
    })
}
//metodo para usar o metodo "POST" do ajax
appData.ajaxSend = function (url, data, sucesso, erro){
    $.ajax({
        type:"POST",
        url:url,
        data: JSON.stringify(data),
        dataTYpe: "json",
        success: sucesso,
        error: erro
    });
}

$.ajax({
    url: "http://localhost/grid/grid.json"
  , complete: function(ret) {
        TableData =  eval(ret.responseText);

        var i = 0, theGrid = $('#theGrid'), odd = true, a;
        theGrid.html('');
        for(i = 0; i < TableData.length; i++) {
            a = $('<tr class="gradeX">');
            if(odd) {
                a.addClass('odd');
                odd = false;
            } else {
                a.addClass('even');
                odd = true;
            }
            a.append('<td>'+TableData[i].nome+'</td>');
            a.append('<td>'+TableData[i].cpf+'</td>');
            a.append('<td>'+TableData[i].inicioDaViagem+'</td>');
            a.append('<td>'+TableData[i].regra_4horas+'</td>');
            a.append('<td>'+TableData[i].regra_8horas+'</td>');
            if(TableData[i].almoco)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            if(TableData[i].tempoDeDescanso)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            a.append('<td>'+TableData[i].fimDaUltimaViagem+'</td>');
            if(TableData[i].horaExtra)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            if(TableData[i].horaExtraNoturna)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            theGrid.append(a)
        }
    }
});





function data_tables() {
    $('#managed-table').dataTable();

/*
    $("table-dark").tablecloth({
        theme: "dark"
    });
    $("table-paper").tablecloth({
        theme: "paper"
    });
    $('.selectpicker').selectpicker();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }*/
}

function google_maps() {
    new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    url = GMaps.staticMapURL({
        size: [610, 300],
        lat: -12.043333,
        lng: -77.028333
    });

    $('<img/>').attr('src', url)
        .appendTo('#static');

    map = new GMaps({
        div: '#route',
        lat: -12.043333,
        lng: -77.028333
    });
    $('#start_travel').click(function (e) {
        e.preventDefault();
        map.travelRoute({
            origin: [-12.044012922866312, -77.02470665341184],
            destination: [-12.090814532191756, -77.02271108990476],
            travelMode: 'driving',
            step: function (e) {
                $('#instructions').append('<li>' + e.instructions + '</li>');
                $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function () {
                    map.setCenter(e.end_location.lat(), e.end_location.lng());
                    map.drawPolyline({
                        path: e.path,
                        strokeColor: '#131540',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    });
                });
            }
        });
    });

    var addresspicker = $("#addresspicker").addresspicker();
    var addresspickerMap = $("#addresspicker_map").addresspicker({
        regionBias: "de",
        map: "#map_canvas",
        typeaheaddelay: 1000,
        mapOptions: {
            zoom: 16,
            center: new google.maps.LatLng(52.5122, 13.4194)
        }

    });

    addresspickerMap.on("addressChanged", function (evt, address) {
        console.dir(address);
    });
    addresspickerMap.on("positionChanged", function (evt, markerPosition) {
        markerPosition.getAddress(function (address) {
            if (address) {
                $("#addresspicker_map").val(address.formatted_address);
            }
        })
    });
}

function index() {
    //  jQuery Flot Chart
    var data1 = [
        [1, 33],
        [2, 35],
        [3, 32],
        [4, 26],
        [5, 32],
        [6, 24],
        [7, 18]
    ];
    var data2 = [
        [1, 18],
        [2, 23],
        [3, 15],
        [4, 31],
        [5, 32],
        [6, 27],
        [7, 23]
    ];

    var plot = $.plot($("#chart"), [{
        data: data1,
        label: "Last Week"
    }, {
        data: data2,
        label: "This Week"
    }], {
        series: {
            lines: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0
                    }, {
                        opacity: 0.2
                    }]
                }
            },
            points: {
                show: true,
                lineWidth: 2,
                radius: 3
            },
            shadowSize: 0,
            stack: true
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "transparent",
            borderWidth: 0
        },
        legend: {
            // show: false
            labelBoxBorderColor: "transparent",
            backgroundColor: "transparent"
        },
        colors: ["#94aec4", "#3473A9"],
        xaxis: {
            ticks: [
                [1, "Mon"],
                [2, "Tue"],
                [3, "Wed"],
                [4, "Thu"],
                [5, "Fri"],
                [6, "Sat"],
                [7, "Sun"]
            ],
            font: {
                size: 12,
                family: "Open Sans, Arial",
                variant: "lowercase",
                color: "#fff"
            }
        },
        yaxis: {
            ticks: 3,
            tickDecimals: 0,
            font: {
                size: 12,
                family: "Open Sans, Arial",
                variant: "lowercase",
                color: "#fff"
            }
        }
    });
    	$("#sparkline1").sparkline([3, 4, 5, 5, 4, 5, 4, 5, 6, 5, 6, 7, 8, 7, 6, 7, 8, 9], {
	        type: 'line',
	        width: '50px',
	        height: '50px',
	        lineColor: '#5b8bb4',
	        drawNormalOnTop: false
	    });
	    $("#sparkline2").sparkline([1.8, 1.3, 2.5], {
	        type: 'pie',
	        width: '100%',
	        height: '50px',
	        sliceColors: ['#E95151', '#64A3D7', '#5B8BB4'],
	        borderWidth: 0
	    });
	    $("#sparkline3").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
	        type: 'bar',
	        height: '50px ',
	        barColor: '#5b8bb4',
	        negBarColor: '#e95151'
	    });
    $(window).resize(function () {
	    $("#sparkline1").sparkline([3, 4, 5, 5, 4, 5, 4, 5, 6, 5, 6, 7, 8, 7, 6, 7, 8, 9], {
	        type: 'line',
	        width: '50px',
	        height: '50px',
	        lineColor: '#5b8bb4',
	        drawNormalOnTop: false
	    });
	    $("#sparkline2").sparkline([1.8, 1.3, 2.5], {
	        type: 'pie',
	        width: '100%',
	        height: '50px',
	        sliceColors: ['#E95151', '#64A3D7', '#5B8BB4'],
	        borderWidth: 0
	    });
	    $("#sparkline3").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
	        type: 'bar',
	        height: '50px ',
	        barColor: '#5b8bb4',
	        negBarColor: '#e95151'
	    });
    });

    $('input').iCheck({
        checkboxClass: 'icheckbox_square',
        radioClass: 'iradio_square',
        increaseArea: '20%' // optional
    });
}