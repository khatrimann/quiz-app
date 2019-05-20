$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/questions",
    datatype: 'json',
    success: function(data){
      
      i = 0;
      display(i);
      var right = 0, wrong = 0;

      var totalTime = 60;
      timeassigned = totalTime;
      var hh, mm;

      for(var i=0;i<data.length;i++)
      {
        $('#completed').append(`<div class="col" style="align-text: center"><span>${i+1}</span></div>`);
      }

      function setCompleted(i) {
        var obj = document.getElementById('completed');
        console.log(obj);
        obj.children[i].style.background = '#dfc6c0';
      }
      i=0;
      var timr = setInterval(function(){
        totalTime -= 1;
        var rtotalTime = totalTime;
        var h = Math.floor(totalTime/3600); //Get whole hours
        rtotalTime -= h*3600;
        var m = Math.floor(rtotalTime/60); //Get remaining minutes
        rtotalTime -= m*60;
        $('#timer').html(h+":"+(m < 10 ? '0'+m : m)+":"+(rtotalTime < 10 ? '0'+rtotalTime : rtotalTime));

        if(totalTime/timeassigned > 0.5) {
          $('#timer').css({"background": "green"});
        }

        if(totalTime/timeassigned <= 0.5 && totalTime/timeassigned > 0.2) {
          $('#timer').css({"background": "yellow"});
        }

        if(totalTime/timeassigned < 0.2 && totalTime/timeassigned > 0) {
          $('#timer').css({"background": "red"});
        }

        $('#timer').css({"width": (1 - totalTime/timeassigned)*100 + '%'});

        if(totalTime<=0) {
          $('#prev').attr('disabled', true);
          $('#next').attr('disabled', true);
          alert('Time\'s up\nYour Score: ' + String(right) + '/' + String(15));
          clear();
        }
      }, 1000);

      function clear() {
        clearInterval(timr);
      }

      function matchAnswer(current, index, answer) {
        console.log('current: ', current);
        console.log('answer: ', answer);
        if(current==answer)  right++;
        else wrong++;
        console.log('right: ', right);
        console.log('wrong: ', wrong);

      }

      function display(i) {
        $("#question-container").fadeOut(1);


        $('#question').html(data[i].question);


        $('#options').html(`
        <div class="form-check">
          <input type="radio" name="options" id='${data[i].options[0]}' value='${data[i].options[0]}'>
          <label class="form-check-label" for='${data[i].options[0]}' for="exampleRadios1">${data[i].options[0]}</label>
        </div>
            
        <div class="form-check">
          <input type="radio" name="options" id='${data[i].options[1]}' value='${data[i].options[1]}'>
          <label class="form-check-label" for='${data[i].options[1]}'>${data[i].options[1]}</label>
        </div>

        <div class="form-check">
          <input type="radio" name="options" id='${data[i].options[2]}' value='${data[i].options[2]}'>
          <label class="form-check-label" for='${data[i].options[2]}'>${data[i].options[2]}</label>
        </div>
        
        <div class="form-check">
          <input type="radio" name="options" id='${data[i].options[3]}' value='${data[i].options[3]}'>
          <label class="form-check-label" for='${data[i].options[3]}'>${data[i].options[3]}</label>
        </div>`);

            $("#question-container").fadeIn("slow");

      }
      $('#next').click(function() {
        console.log(i);
        var radioValue = $("input[name='options']:checked").val();
        if(radioValue){
            matchAnswer(radioValue, i, data[i].answer);
            setCompleted(i);
        }
        i++;

        display(i);

      });
      $('#prev').click(function() {
        console.log(i);
        var radioValue = $("input[name='options']:checked").val();
        console.log(radioValue);
        if(radioValue){
            matchAnswer(radioValue, i, data[i].answer);
            setCompleted(i);
        }
        i--;   
        display(i);
      });

    }
  });
});