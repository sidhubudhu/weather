$(document).ready(function() {
    $('.short').hide();
    if(navigator.geolocation){
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition
        (function(position)
         {currentPosition = position;

          var latitude = currentPosition.coords.latitude;
          var longitude = currentPosition.coords.longitude;

          console.log(latitude, longitude);

          // console.log(currentPosition);
          var url = 'https://api.apixu.com/v1/current.json?key=e488a312d7464fd6900141908180702&q=';

          $.getJSON(url + latitude + ',' + longitude, function(data){
              // JSON.stringify turns JS object into JSON text and stores it in a string.
              var data = JSON.stringify(data);
              //JSON.parse turns a string of JSON text into a JS object
              var json = JSON.parse(data);

              var country = json.location.country;
              var city = json.location.name;
              var state = json.location.region;

              var temp = json.current.temp_c;
              var temp_f = json.current.temp_f;
              var last_updated = json.current.last_updated.replace('-', ' ');

              var wind = json.current.wind_kph;
              var humidity = json.current.humidity;
              var time = json.location.localtime.split(' ')[1];
              var cloud = json.current.cloud;

              console.log(country + ' - ' + city + ' - ' + state + ' - ' + temp + ' - ' + temp_f + ' - ' + last_updated + ' - ' + wind + ' - ' + humidity + ' - ' + time + ' - ' + cloud);

              //   console.log(data)
              $('#weather').html(city + ', ' + state + ', ' + country);


              if (temp < 20) {
                  $('.grey-jumbo').css({
                      backgroundImage: 'url(sunset.jpg)'
                  });
                  $('#temp').html("<h1>It's a pretty cold day...</h1>");
              } else if (temp > 20 && temp < 27) {
                  $('.grey-jumbo').css({
                      backgroundImage: 'url(sunny.jpg)'
                  });
                  $('#temp').html("<h1>It's a sunny day today...</h1>");
              } else {
                  $('.grey-jumbo').css({
                      backgroundImage: 'url(hot.jpg)'
                  });
                  $('#temp').html("<h1>It's a pretty cold day...</h1>");
              }


              // Toggle temperature
              $('#info1').html(time);
              $('#info2').html('Wind ' + wind + ' kph');
              $('#info3').html(temp + '°C');

              $('.short').show();

              var yes = true;
              $('#switch').on('click', function(){
                  if(yes) {
                      $('#info3').html(temp_f + '°F'); 
                      $('#switch').html('Show in Celsius');
                      yes = false;
                  } else {
                      $('#info3').html(temp + '°C');
                      $('#switch').html('Show in Farenheight');
                      yes = true;
                  }
              });

              // Showing sky status
              if (cloud <= 30) {
                  $('#info5').html('Clear Sky');
              } else {
                  $('#info5').html('Cloudy Sky');
              }
              $('#info6').html('Humidity ' + humidity + '%');



          });   
         });
    }
});


