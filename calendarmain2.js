var mese = "01"
var anno = "2017"
var paese = $('#country').val()

calendar()

$('#successivo').click(function(){
  if(mese!=12) {
    mese++
  }
  else {
    mese="01";
    anno++
  }
  calendar()
});
$('#precedente').click(function(){
  if(mese!=1) {
    mese--
  }
  else {
    mese="12";
    anno--
  }
  calendar()
});

function calendar(){
  var data = moment(anno+"-"+mese+"-01")
  var dataformat = data.format("D MMMM");
  var ggmese = moment(data).daysInMonth()

  $('.calendario').html('');
  for (var i = 1; i <= ggmese; i++) {
    var data2 = moment("2017-"+mese).format("MMMM")
    $('.calendario').append('<li>'+'<span id='+i+'>'+i+'</span>'+data2 + '</li>')
  }

  $.ajax ({
            url: 'https://holidayapi.com/v1/holidays',
            method: "GET",
            data: {
                key:'32d92b68-8aae-4bc5-bab4-597ffee7b838',
                country: paese,
                month: mese,
                year: anno,
              },
            success: function(data) {
              for (var i = 0; i < data.holidays.length; i++) {
                dayHoly = moment(data.holidays[i].date).format('D')
                //confronto i gg festivi e aggiungo il colore red
                for (var k = 1; k < 31; k++) {
                  inclusa = $('.calendario #' + k).text()
                  if (inclusa==dayHoly) {
                    var ggfestivo = $('.calendario #' + k)
                    ggfestivo.parent('li').addClass('festività').append(' ' + data.holidays[i].name)
                  }
                }
              }
              console.log(data);
            },
            error: function(){
              alert('error');
            }
        })

}















// var paese = $('#country').val()
// // var trentuno = ["Gennaio","Marzo","Maggio","Luglio","Agosto","Ottobre","Dicembre"];
// var trenta = ["Novembre", "Aprile", "Giugno", "Settembre"];
// var meseajax = parseInt($('.active').attr('valore'))
// var bisesto = "2017";
// var control = "1";
//
// $('#successivo').click(function(){
//   if(meseajax!=12) {
//     meseajax++
//     $('#' + control).removeClass('active').addClass('displaynone')
//     control++
//     $('#' + control).addClass('active').removeClass('displaynone')
//     monthselected = $('.active .mese').text()
//   }
//   else {
//     meseajax="01";
//
//     bisesto++
//
//     monthselected = $('.active .mese').text()
//   }
//
//   calendar()
// });
//
// $('#precedente').click(function(){
//   if(meseajax!=1) {
//     meseajax--
//     $('#' + control).removeClass('active').addClass('displaynone')
//     control--
//     $('#' + control).addClass('active').removeClass('displaynone')
//     monthselected = $('.active .mese').text()
//   }
//   else {
//     meseajax="12";
//     control="12";
//     bisesto--
//     $('#1').removeClass('active').addClass('displaynone')
//     $('#12').addClass('active').removeClass('displaynone')
//     monthselected = $('.active .mese').text()
//   }
//
//   calendar()
// });
//
//
// //funziona che crea il calendario con le festività
// function calendar() {
//     if (trenta.includes(monthselected)) {
//       daygenerate(30,monthselected,bisesto)
//     }
//     else if ((monthselected=="Febbraio") && (bisesto % 4 == 0)) {
//       daygenerate(29,monthselected,bisesto)
//     }
//     else if ((monthselected=="Febbraio") && (bisesto % 4 != 0)) {
//       daygenerate(28,monthselected,bisesto)
//     }
//     else {
//       daygenerate(31,monthselected,bisesto)
//     }
//
//     $.ajax ({
//           url: 'https://holidayapi.com/v1/holidays',
//           method: "GET",
//           data: {
//               key:'32d92b68-8aae-4bc5-bab4-597ffee7b838',
//               country: paese,
//               month: meseajax,
//               year: bisesto,
//             },
//           success: function(data) {
//             for (var i = 0; i < data.holidays.length; i++) {
//               dayHoly = moment(data.holidays[i].date).format('D')
//
//               for (var k = 1; k < 31; k++) {
//                 inclusa = $('.active .result .' + k).text()
//                 if (inclusa==dayHoly) {
//                   var ggfestivo = $('.active .result .' + k)
//                   ggfestivo.parent('li').addClass('festività').append(' ' + data.holidays[i].name)
//                 }
//               }
//
//             }
//             console.log(data);
//           },
//           error: function(){
//             alert('error');
//           }
//       })
//     };
//
//
// //funzione che genera i giorni del mese e l'anno
// function daygenerate(numberOfday,month,anno) {
//   for (var i = 1; i <= numberOfday; i++) {
//     $('.active .result').append('<li>' + '<span ' + 'class=' + i + '>'+ i + '</span>' + '<span>' + month + '</span>' + '</li>')
//   }
//   $('.anno').html(anno)
// }
