request = JSON.parse(localStorage.request||'{}');
localStorage.request = JSON.stringify(request);



$( document ).on( "pageinit", "#page_buy_1", function(event) {
  $("#progress_bar").progressbar({
     value: 25
  });

  $(".meet_up_confirm").tap(function(){
    request = JSON.parse(localStorage.request);
    request.method="meet";
    delete request.address;

    localStorage.request = JSON.stringify(request);
  })

  $(".deliver_confirm").tap(function(){
    request = JSON.parse(localStorage.request);
    request.method="deliver";
    localStorage.request = JSON.stringify(request);
  })

});


$( document ).on( "pageinit", "#page_deliver", function(event) {
  
  $("#progress_bar_deliver").progressbar({
     value: 37.5
  });

  locations=["Young Orchard Ave 010", "Marcy House: Wriston Quad", "Vartan Gregorian Quad A (New Dorm A)", "Richmond St 233", "Graduate Ctr A", "Davol Sq 003", "Young Orchard Ave 002", "Barbour Hall", "Sharpe House", "George St 180", "Peter Green House", "Hegeman Hall", "Brown St 068.5", "Caswell Hall", "Geo-Chem Bldg", "Manning Hall", "Ship St 070", "New Pembroke No. 4", "Bio-Med Grimshaw-Gudewicz", "Brown Stadium", "Perkins Hall", "Jameson-Mead: Keeney Quad", "Littlefield Hall", "University Hall", "List (Albert & Vera) Art Building", "Maddock Alumni Center", "Harkness House: Wriston Quad", "Sears House: Wriston Quad", "Watson Center For Information Tech", "Morrison-Gerard Studio", "Slater Hall", "George St 163", "Blistein House", "Waterman St 133", "Norwood House", "Goddard House: Wriston Quad", "Hope College", "Machado (Antonio) House", "Fones Alley 008", "Charlesfield St 059", "Miller Hall", "Metcalf Hall", "Bio-Med ACF", "Chapin House: Wriston Quad", "Dyer St 200", "Benevolent St 026", "Barus & Holley", "Manning St 029", "Faculty Club", "Giddings House", "Stimson Ave 002", "Emery: Pembroke Quad", "Rhode Island Hall", "Horace Mann House", "Robinson Hall", "Steinert Center", "Brook St 341", "Sciences Library", "Waterman St 094", "Bowen St 219", "Benevolent St 005", "OMAC Athletic Center", "Graduate Ctr D", "Prospect House", "Nelson Fitness Center", "Manning St 037", "Lincoln Field Building", "Lyman Hall", "Barus Building", "Metcalf Research Building", "Kassar (Edward W.) House", "Archibald-Bronson: Keeney Quad", "Granoff Ctr For The Creative Arts", "Walter Hall", "South Main St 121", "Sidney E. Frank Hall Life Sciences", "Meehan Auditorium", "Hoppin (Thomas P.) House", "New Pembroke No. 2", "Haffenreffer Barn", "Wilson Hall", "Diman House: Wriston Quad", "Meiklejohn House", "Graduate Ctr E", "Minden Hall", "Brown St 111", "Benevolent St 020", "West House", "Angell St 195", "Verney-Woolley Hall (VDub)", "Marston Hall", "Broadway 233", "Olney House: Wriston Quad", "George St 067", "Bio-Med Ctr", "MacMillan Hall", "Angell St 169", "Marston Boathouse", "Rochambeau House", "Waterman St 137", "MacFarlane House", "Brown Office Bldg", "Grant Fulton", "John Hay Library", "Morriss Hall: Pembroke Quad", "Arnold Lab", "Salomon Hall (Main Green)", "Medical Research Lab", "Faunce House", "Rockefeller Library", "Brown St 070", "Dyer House", "Urban Environmental Lab", "Gerard House, Samuel N.", "Thayer St 315", "Pizzitola", "Benoni Cooke House", "Orwig Music Hall", "Ladd Observatory", "5th Ave 500", "Andrews Hall", "Brook St 333", "Smith-Buonanno Hall", "King House", "Montgomery St 601", "Young Orchard Ave 004", "Graduate Ctr C", "Alumnae Hall", "Maxcy Hall", "George St 025", "Buxton House: Wriston Quad", "New Pembroke No. 3", "Waterman St 085", "Lippitt House", "Thayer St 135", "Nicholson House", "Graduate Ctr B", "Haffenreffer Outing Reservation Fac", "John St 050", "Pembroke Hall", "J. Walter Wilson Building", "Champlin: Pembroke Quad", "Vartan Gregorian Quad B (New Dorm B)", "Hemisphere Bldg", "T.F. Green Hall","Annmary Brown Memorial Library", "Everett-Poland: Keeney Quad", "Hope St 190", "Elm St 110", "Waterman St 131", "George St 182", "Waterman St 070", "Woolley Hall: Pembroke Quad", "Wayland House: Wriston Quad", "Partridge Hall & Annex", "Shirley Miller House", "Haffenreffer Museum Collections Res", "Churchill House", "John Carter Brown Library", "Sharpe Refectory (Ratty)", "Corliss-Brackett", "Feinstein", "Sayles Hall", "Prince Engineering Lab", "Richmond St 222 (Med Ed)", "Watson Institute", "George St 155", "New Pembroke No. 1", "Mencoff Hall", "Wilbour Hall"];

  $("#autocorrect").autocomplete({
     minLength:3,
     source: locations,
     select:function(){
      $("#address_confirm").css("display","block");
     }
  });

  $("#autocorrect").keyup(function(){
    var text =  $("#autocorrect").val().trim();
    if(locations.indexOf(text)!=-1){
      $("#address_confirm").css("display","block");
    } else{
      $("#address_confirm").css("display","none");
    }
  })

  $('.ui-menu-item').click(function(){
    var text = $('.ui-menu-item').text()
    $("autocorrect").text(text);
    $("#address_confirm").css("display","block");
  })

  $('.ui-autocomplete').css({'fontSize': '1em', 'width': $(window).width()-16*2 ,'height':"auto",'background-color':'none'});

  $('#address_confirm').click(function(){
    request = JSON.parse(localStorage.request);
    request.address = $("#autocorrect").val();  
    localStorage.request = JSON.stringify(request);
  })

});


$( document ).on( "pageinit", "#page_buy_2", function(event) {

  $("#progress_bar_2").progressbar({
    value: 50
  });

  $(".andrews").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "andrews";  
    localStorage.request = JSON.stringify(request);
    //console.log(request);
  });

  $(".blueroom").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "blueroom";  
    localStorage.request = JSON.stringify(request);
    //console.log(request);
  });

  $(".josiahs").click(function(){
    request = JSON.parse(localStorage.request);
    request.eatery = "jos";  
    localStorage.request= JSON.stringify(request);
    //localStorage.request = JSON.stringify(request);
  })


});

$( document ).on( "pageshow", "#page_buy_3", function(event) {

  $("#progress_bar_3").progressbar({
    value: 75
  });

  $("#menu_fieldset").empty();
  
  //$("#menu_fieldset").append("<legend>What do you wanna eat?</legend>");
  //$("#menu_fieldset").append("<legend style='margin-top: 10px;margin-bottom: 10px;''>Total: <span style='color:#9D8189'>$0.00</span></legend>");

  //$('#page_buy_3').append("<p>"+request.eatery+"</p>");
  request = JSON.parse(localStorage.request);
  var eatery = request.eatery;
  var date = new Date();
  var day = date.getDay();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var time = (hour-2)*60+minute;

  request.day=day;
  request.time=time;

  //var map = {eatery:eatery,day:day,time:time}
  localStorage.request = JSON.stringify(request);

  var menu={
       "food-1":{
              "name":"Pho",
              "price":7.30,
              "id":"food-1"
       },
       "food-2":{
              "name":"Cheese Pizza Slice",
              "price": 2.40,
              "id":"food-2"
       },
       "food-3":{
              "name":"MYO Panini",
              "price": 5.95,
              "id":"food-3"
       },
       "food-4":{
              "name":"Fresh Salad",
              "price": 4.00,
              "id":"food-4"
       },
       "food-5":{
              "name":"Sushi",
              "price": 2.40,
              "id":"food-5"
       },
  };



  var items = Object.keys(menu);
  for (var i = 0;i<items.length;i++){
    var food = menu[items[i]];
    var id = food.id;
    var name = food.name;
    var price = food.price;

    var label = "<div class='ui-checkbox'> <label for="+ id + " style='font-weight: 400;'class='ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-right ui-checkbox-off ui-first-child'>"+ name + ": $"+ price+ "</label>";
    var input = "<input type='checkbox' name=" + id + " id=" + id + "></div>";
    $(label+input).appendTo($('#menu_fieldset')).trigger("create");
  }

  var menu_order = {};
  var checked_count = 0;
  var total_price = 0.00;
  $('#price_span').text("$"+total_price);
  
  $('#menu :checkbox').click(function() {
    var $this = $(this);
    var id = $this.attr('name');
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        checked_count +=1;
        $('#menu_confirm').css("display","block");
        menu_order[id]=true;

        total_price += menu[id].price;
        total_price = Math.abs(total_price.toFixed(2));

        
        $('#price_span').text("$"+total_price);

    } else {
         checked_count-=1;
         if(checked_count==0){
          $('#menu_confirm').css("display","none");
         }
         delete menu_order[id];
         
         total_price -= menu[id].price;
         total_price=Math.abs(total_price.toFixed(2));

         $('#price_span').text("$"+ total_price);
    }
  });

  $('#menu_confirm').tap(function(){
    request = JSON.parse(localStorage.request);
    var menu_string = Object.keys(menu_order).join(' ');
    request.menu=menu_string;
    request.price = total_price;
    localStorage.request= JSON.stringify(request);
    console.log(request);
  })


})

$( document ).on( "pageshow", "#page_buy_4", function(event) {
  $("#progress_bar_4").progressbar({
     value: 95
  });

  $('#wrong_number').css("display","none");

  request = JSON.parse(localStorage.request);

  var tap_counter = 0;

  $('#payment_suggestion').tap(function(){
    if (tap_counter%2==0){
      $('#payment_suggestion_detail').css("display","block");
    } else{
      $('#payment_suggestion_detail').css("display","none");
    }
    tap_counter+=1;
  })

  $("#final_confirm").click(function(){
    
    var phone = $('#tel-1').val().trim();
    console.log(phone);
    
    if(phone.match(/\d/g).length===10 && phone.length==10){
      $('#wrong_number').css("display","none");
      request.phone=phone;
      request.duration = $('#duration').val();
      request.bound = $('#bound').val();
      console.log(request);
      localStorage.request = JSON.stringify(request)

      $.post("/placeorder",{user:email,address:request.address,eatery:request.eatery,menu:request.menu,duration:request.duration,price:request.price,priceBound:request.bound,},function(response){
        data = JSON.parse(response);
        console.log(response);
      })
    } else{
      $('#wrong_number').css("display","block");
    }
  })

  request = JSON.stringify(localStorage.request);
});
