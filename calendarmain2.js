var mese = "01"
var anno = "2017"
var paese = $('#country').val()

generategrid()
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
  //svuoto la griglia dal contenuto e ne genero una nuova
  $('.grid').html('')
  generategrid()
  // $('.calendario').html(''); -- vecchio calendario
  dayweek = moment("2017-"+mese+"-02").day()
  for (var i = 1; i <= ggmese; i++) {
    // var data2 = moment("2017-"+mese).format("MMMM") -- calendario verticale
    // $('.calendario').append('<li>'+'<span id='+i+'>'+i+'</span>'+data2+'</li>')- calendario verticale
    $('.grid .block.'+dayweek).html('<span id='+i+'>'+i+'</span>')
    dayweek++
  }

  // $.ajax ({
  //           url: 'https://holidayapi.com/v1/holidays',
  //           method: "GET",
  //           data: {
  //               key:'32d92b68-8aae-4bc5-bab4-597ffee7b838',
  //               country: paese,
  //               month: mese,
  //               year: anno,
  //             },
  //           success: function(data) {
  //             for (var i = 0; i < data.holidays.length; i++) {
  //               dayHoly = moment(data.holidays[i].date).format('D')
  //               //confronto i gg festivi e aggiungo il colore red
  //               for (var k = 1; k < 31; k++) {
  //                 inclusa = $('.calendario #' + k).text()
  //                 if (inclusa==dayHoly) {
  //                   var ggfestivo = $('.calendario #' + k)
  //                   ggfestivo.parent('li').addClass('festività').append(' ' + data.holidays[i].name)
  //                 }
  //               }
  //             }
  //             console.log(data);
  //           },
  //           error: function(){
  //             alert('error');
  //           }
  //       })
};


// creo la griglia-calendario
function generategrid(){
  for (var i = 0; i < 35; i++) {
    $('.grid').append('<div class="block '+i+'"'+'>'+'</div>')
    }
}
