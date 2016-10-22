offer = JSON.parse(localStorage.offer||'{}');
localStorage.offer = JSON.stringify(offer);

$( document ).on( "pageinit", "#page_sell_1", function(event) {
  $("#progress_bar").progressbar({
     value: 35
  });

  $(".meet_up_confirm").tap(function(){
    offer = JSON.parse(localStorage.offer);
    offer.method="meet";
    offer.north_deliver = false;
    offer.south_deliver = false;
    offer.center_deliver = false;

    localStorage.offer = JSON.stringify(offer);

    console.log(offer)
  })

  $(".deliver_confirm").tap(function(){
    offer = JSON.parse(localStorage.offer);
    offer.method="meet_deliver";
    localStorage.offer = JSON.stringify(offer);

    console.log(offer)
  })

});

$( document ).on( "pageshow", "#page_sell_deliver", function(event) {
  
  offer = JSON.parse(localStorage.offer);

  offer.south_deliver = false;
  offer.north_deliver = false;
  offer.center_deliver=false;

  localStorage.offer = JSON.stringify(offer);


  $('#address_confirm').css('display','none');

  $("#progress_bar_deliver").progressbar({
     value: 60
  });

  var width = $(window).width()-16*2;

  var north_height = 360*width/564.0 + "px";
  var center_height = 335*width/564.0 +"px";
  var south_height = 299*width/564.0 +"px";

  $('#north_shadow').css("height",north_height);
  $('#center_shadow').css("height",center_height);
  $('#south_shadow').css("height",south_height);



  var north_counter = 0;
  var south_counter = 0;
  var center_counter =0;

  $('#north_shadow').click(function(){
  	if(north_counter%2==0){
  		$('#north_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/north_new.jpeg')");
  		$('#north_shadow').css("background-size","100%");

  		$('#north_click').attr('src','../image/confirm.png');
  		//$('#north_check').css('display','block');
  	} else{
  		$('#north_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/north_new.jpeg')");
		$('#north_shadow').css("background-size","100%");

		$('#north_click').attr('src','../image/click.png');

		//$('#north_check').css('display','none');
  		//$('#north_des').css('display','block');
  	}

  	north_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm').css('display','none');
  	} else{
  		  $('#address_confirm').css('display','block');
  	}
  });

  $('#center_shadow').click(function(){
  	if(center_counter%2==0){
  		$('#center_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/center_new.jpeg')");
  		$('#center_shadow').css("background-size","100%");

  		$('#center_click').attr('src','../image/confirm.png');

  		//$('#center_des').css('display','none');
  		//$('#center_check').css('display','block');
  	} else{
  		$('#center_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/center_new.jpeg')");
	  	$('#center_shadow').css("background-size","100%");

		$('#center_click').attr('src','../image/click.png');
		//$('#center_check').css('display','none');
  		//$('#center_des').css('display','block');
  	}
  	center_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm').css('display','none');
  	} else{
  		  $('#address_confirm').css('display','block');
  	}
  });

  $('#south_shadow').click(function(){
  	if(south_counter%2==0){
  		$('#south_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0), rgba(240, 240, 240, 0)),url('../image/south_new.jpeg')");
    	$('#south_shadow').css("background-size","100%");

      	$('#south_click').attr('src','../image/confirm.png');

  		//$('#south_des').css('display','none');
  		//$('#south_check').css('display','block');
  	} else{
  		$('#south_shadow').css("background","linear-gradient(rgba(240, 240, 240, 0.5), rgba(240, 240, 240, 0.5)),url('../image/south_new.jpeg')");
		$('#south_shadow').css("background-size","100%");

		$('#south_click').attr('src','../image/click.png');
		//$('#south_check').css('display','none');
  		//$('#south_des').css('display','block');
  	}
  	south_counter+=1;

  	if(north_counter%2==0 && south_counter%2 == 0 && center_counter%2 == 0){
  		  $('#address_confirm').css('display','none');
  	} else{
  		  $('#address_confirm').css('display','block');
  	}
  });


  $('#address_confirm').click(function(){
    offer = JSON.parse(localStorage.offer);
    if (north_counter % 2==1){
    	offer.north_deliver = true;
    } else{
    	offer.north_deliver = false;
    };

    if (south_counter % 2==1){
    	offer.south_deliver = true;
    } else{
    	offer.south_deliver = false;
    };

    if (center_counter % 2==1){
    	offer.center_deliver = true;
    } else{
    	offer.center_deliver = false;
    };

    localStorage.offer = JSON.stringify(offer);

    console.log(offer);
  });

});


$( document ).on( "pageshow", "#page_sell_2", function(event) {

  $("#progress_bar_2").progressbar({
    value: 70
  });

  var eateries = {};
  var checked_count = 0;

  $('#menu :checkbox').click(function() {
    var $this = $(this);
    var id = $this.attr('name');

    if ($this.is(':checked')) {

    	checked_count +=1;
        $('#menu_confirm').css("display","block");

        eateries[id]=true;

    } else{

    	checked_count-=1;
        
        if(checked_count==0){
          $('#menu_confirm').css("display","none");
        }
    }

   });

  $('#menu_confirm').tap(function(){
    offer = JSON.parse(localStorage.offer);
    var eatery_string = Object.keys(eateries).join(',');
    offer.eatery=eatery_string;
    localStorage.offer= JSON.stringify(offer);
    console.log(offer);
  })

});

$( document ).on( "pageshow", "#page_sell_3", function(event) {
	$("#progress_bar_3").progressbar({
	    value: 90
	 });

	$('#wrong_number').css("display","none");

	

	var tap_counter = 0;

	$('#payment_suggestion').tap(function(){
	  if (tap_counter%2==0){
	    $('#payment_suggestion_detail').css("display","block");
	  } else{
	    $('#payment_suggestion_detail').css("display","none");
	  }
	  tap_counter+=1;
	});

	$("#final_confirm").click(function(){
    
	    var phone = $('#tel-1').val().trim();
	    console.log(phone);
	    
	    if(phone.match(/\d/g).length===10 && phone.length==10){
	      offer = JSON.parse(localStorage.offer);
	      $('#wrong_number').css("display","none");
	      offer.phone=phone;
        var creditNum = $('input[name="creditNum"]:checked').val();
        offer.creditNum = creditNum;
	      offer.duration = $('#duration').val();
	      offer.bound = $('#bound').val();
	      console.log(offer);
	      localStorage.offer = JSON.stringify(offer)

	      //$(location).attr('href', 'http://stackoverflow.com')
	      
	     $.post("/placeoffer",{user:"silei_ren@brown.edu",address:offer.address,eatery:offer.eatery,menu:offer.menu,duration:offer.duration,price:offer.price,bound:offer.bound,creditNum:offer.creditNum},function(response){
	         data = JSON.parse(response);
	         console.log(response);
	      })
    } else{
      		$('#wrong_number').css("display","block");
    };
  })

})

