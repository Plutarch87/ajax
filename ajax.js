function getContent(id){
	$('#' + id).html(function() {
		$.ajax({
			method: "POST",
			url: 'resources/views/'+ id +'.view.php',
			success: function(data, status){
				if(status === 'success') {
					console.log(data);
					$('#'+ id +'-field').html(data);
				}
			}
		});
	});
}

// cart

$(function(){
	if(document.cookie.search('item') == 0) {
		checkout();
	}
})

function itemName(arg) {

	return '<li>Hello '+ arg +'&nbsp;&nbsp;<a href="#" class="item">(x)</a></li>';

}

function setCookie(name, date) {	
    var d = new Date();
    d.setTime(d.getTime() + (date*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "item" + name + "=" + name + ";" + expires + ";path=/";
}

function deleteCookie(name) {
	var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
	document.cookie = "item" + name + "=" + name + ";" + expires + ";path=/";
}

function deleteAllCookies() {
	var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
	var cname = "item";
	var carr = document.cookie.split(';');
	for(i = 0; i < carr.length; i++) {
		document.cookie = carr[i].trim() + ";" + expires + ";path=/";		
	}
	document.cookie = "item" + name + "=" + name + ";" + expires + ";path=/";	
}

function getCookie(name) {
	var cname = "item" + name + "=";
	var carr = document.cookie.split(';');
	for (var i = 0; i < carr.length; i++) {
		var c = carr[i].trim();
		if (c.search(cname) == 0){
			
			return c.substring(cname.length);
		}
	}		

	return "";
}

function getAllCookies() {
	var cname = "item";
	var carr = document.cookie.split(';');
	var arr = new Array();
	var sumt = new Array();
	for (var i = 0; i < carr.length; i++) {
		var c = carr[i].trim();
		if (c.search(cname) == 0) {
			var cid = c.match(/[0-9][0-9]|[0-9]/);
			sumt += cid;
			arr += itemName(cid);
		}
	}

	$('#cart').html(arr);
}

function countItems() {
	var rand = Math.floor(Math.random() * 100);
	if (rand != 0 ) {
		$('#counter').append(itemName(rand));
	}
	var count = $('li').length;
	var counted = $('#counted').html('(' + count + ')');
	$('#total').attr('hidden', false);
	setCookie(rand, 1);
	$('#sumtotal').html(rand);

	// delete function
	removeItem('#counter');

	
}

function removeItem(divId) {
	$('a.item').click(function(e){
		e.preventDefault();
		var li = $(this.closest('li'));					
		var cid = li.html().match(/[0-9][0-9]|[0-99]/);
		deleteCookie(cid);
		li.remove();
		if(divId == '#counter') {			
			$('#counted').html('(' + $('li').length + ')');		
			if($('li').length === 0) {			
				$('#total').attr('hidden', true);
				$('#counted').html('');
			}
		}
	});
}

function checkout() {
	getAllCookies();
	$('#counter').children().remove();
	$('#counted').html('');
	$('#cart').append('<hr><button id="cancel" onclick="cancel();">Cancel</button><button id="proceed" onclick="proceed();">Proceed</button>');
	$('a.item').attr('hidden', true);
	removeItem('#cart');
}

function cancel() {
	if(confirm('Are you sure?')) {
		deleteAllCookies();
		$('#cart').children().remove();
	}
}

function proceed() {
	if(confirm('Are you sure?')) {
		deleteAllCookies();
		$('#cart').children().remove();
		alert('Narudzbina uspesna');
	}
}