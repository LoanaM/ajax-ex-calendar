var paese = $('#country').val()
// var trentuno = ["Gennaio","Marzo","Maggio","Luglio","Agosto","Ottobre","Dicembre"];
var trenta = ["Novembre", "Aprile", "Giugno", "Settembre"];
var monthselected = $('#mese').text()
var bisesto = $('#anno').text()

var ggmese = $('ul')


if (trenta.includes(monthselected)) {
  daygenerate(30)
}
else if ((monthselected=="Febbraio") && (bisesto % 4 == 0)) {
  daygenerate(29)
}
else if ((monthselected=="Febbraio") && (bisesto % 4 != 0)) {
  daygenerate(28)
}
else {
  daygenerate(31)
}




$.ajax ({
      url: 'https://holidayapi.com/v1/holidays',
      method: "GET",
      data: {
          key:'32d92b68-8aae-4bc5-bab4-597ffee7b838',
          country: paese,
          month: '01',
          year: '2017',
        },
      success: function(data) {
        for (var i = 0; i < data.holidays.length; i++) {
          $('.result').append(moment(data.holidays[i].date).format('D MMMM')  + ' - ' + data.holidays[i].name + '<br>')

        }
        console.log(data);

      },
      error: function(){
        alert('error');
      }
    });


//funziona che genera i giorni del mese
function daygenerate(numberOfday) {
  for (var i = 1; i <= numberOfday; i++) {
    $('ul').append('<li>'+ i +'</li>')
  }
}
