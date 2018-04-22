var paese = $('#country').val()
var monthselected = "Gennaio"
// var trentuno = ["Gennaio","Marzo","Maggio","Luglio","Agosto","Ottobre","Dicembre"];
var trenta = ["Novembre", "Aprile", "Giugno", "Settembre"];

var meseajax = parseInt($('.active').attr('valore'))
console.log(meseajax)
var bisesto = $('#anno').text()

var ggmese = $('ul')
var control = "1";

$('#successivo').click(function(){
  if(meseajax!=12) {
    meseajax++
    $('#' + control).removeClass('active').addClass('displaynone')
    control++
    $('#' + control).addClass('active').removeClass('displaynone')
    console.log(control)
  }
  else {
    meseajax="01";
    bisesto++
  }

  monthselected = $('.active .mese').text();
  console.log(monthselected)


    if (trenta.includes(monthselected)) {
      daygenerate(30,monthselected)
    }
    else if ((monthselected=="Febbraio") && (bisesto % 4 == 0)) {
      daygenerate(29,monthselected)
    }
    else if ((monthselected=="Febbraio") && (bisesto % 4 != 0)) {
      daygenerate(28,monthselected)
    }
    else {
      daygenerate(31,monthselected)
    }


    $.ajax ({
          url: 'https://holidayapi.com/v1/holidays',
          method: "GET",
          data: {
              key:'32d92b68-8aae-4bc5-bab4-597ffee7b838',
              country: paese,
              month: meseajax,
              year: bisesto,
            },
          success: function(data) {
            holidaysArrey = [];
            for (var i = 0; i < data.holidays.length; i++) {
              // $('.active .result').append(moment(data.holidays[i].date).format('D MMMM')  + ' - ' + data.holidays[i].name + '<br>')
              holidaysArrey.push(moment(data.holidays[i].date).format('D'))

              for (var k = 1; k < 31; k++) {
                inclusa = $('.active .result .' + k).text()
                if (holidaysArrey.includes(inclusa)) {
                  var ggfestivo = $('.active .result .' + k)
                  ggfestivo.parent('li').addClass('festività')
                }
              }

            }
            console.log(data);
          },
          error: function(){
            alert('error');
          }
      });



  })


//funzione che genera i giorni del mese
function daygenerate(numberOfday,month) {
  for (var i = 1; i <= numberOfday; i++) {
    $('.active .result').append('<li>' + '<span ' + 'class=' + i + '>'+ i + '</span>' + '<span>' + month + '</span>' + '</li>')
    // + ' ' + month
  }
}
