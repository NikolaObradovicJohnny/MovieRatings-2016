$(document).ready(function(){
	alert("RADI");
	alert("JQUERY");
	
	$('#prijavaID').on('click',function(){
		alert("Dugme je pritisnuto!!");
		var $username = $('#username').val();
		var $password = $('#password').val();
		var $repeatPassword = $('#repeatPassword').val();
		
		var $userData = {userName: $username, userPassword: $password};
		
		if ($password == $repeatPassword) {
			alert("lozinke su iste");
			alert($username);
			alert($password);
			alert(JSON.stringify($userData));
			alert('http://localhost:8080/ProjekatOSA/api/users/'+JSON.stringify($username)+'/'+JSON.stringify($password)+'');
			var $urlLogin = 'http://localhost:8080/ProjekatOSA/api/users/'+$username+'/'+$password+'';
			alert($urlLogin);

			$.ajax({
				url: $urlLogin,
				method: 'POST',
				success: function(response) {
					alert("Ulogovan! ");
					alert(JSON.stringify(response));
					sessionStorage.setItem("idUlogovan", response.id);
					sessionStorage.setItem("usernameUlogovan", response.userName);
					if (response.category == null) {
						sessionStorage.setItem("idCategoryUlogovan", "0");
					} else {
						sessionStorage.setItem("idCategoryUlogovan", response.category.id);
					}
					alert(sessionStorage);
					alert(JSON.stringify(sessionStorage.idUlogovan));
					alert(JSON.stringify(sessionStorage.usernameUlogovan));
//					alert(JSON.stringify(sessionStorage.idCategoryUlogovan));
					
					var kategorija = response.category;
					if (kategorija == null) {
						alert("Ulogovao se administrator");
						
					}else {
						alert("Ulogovao se moderator zanra");
					}
					
					if (sessionStorage.idCategoryUlogovan != "0") {
						alert("Korisnik je moderator zanra");
						window.location.replace("http://localhost:8080/ProjekatOSA/moderator.html");
					} else {
						alert("Korisnik ja administrator");
						window.location.replace("http://localhost:8080/ProjekatOSA/administrator.html");
					}
					
				},
				error: function(request, options, error) {
					alert(request);
					alert(options);
					alert(error);
					alert("erorcina........");
				}
			});
		}else {
			alert("Lozinka i ponovljena lozinka se ne poklapaju!!");
		}
		
	});
	
	
	function ulogujKorisnika(){
		alert("funkcija uloguj korisnika");
		var username = $('#username').val();
		var password = $('#password').val();
		alert("AJAX FUNKCIJE ULOGUJ");
		$.get('api/users/'+username+'/'+password+'', function(response){

			alert("ulogovan");
			

		});
	}
	
	function testPrimer2(username,password){
		$.ajax({

		    type: "POST",
		    url: "http://localhost:8080/ProjekatOSA/api/users",
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify({ userName: username, userPassword: password }),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data){alert(data); alert("ULOGOVAN TEST 2...........")},
		    failure: function(errMsg) {
		        alert(errMsg);
		    }
		});
	}
	
	function testPrimer(username,password){
		$.ajax({

		    type: "POST",
		    url: "http://localhost:8080/ProjekatOSA/api/users",
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify({ userName: username, userPassword: password }),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(data){alert(data); alert("ULUGOVAN TEST 1")},
		    failure: function(errMsg) {
		        alert(errMsg);
		    }
		});
	}
	
});