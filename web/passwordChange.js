$(document).ready(function(){
	alert(sessionStorage.idCategoryUlogovan);
	if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	alert("promeni password");
	
	var pass1 = $("#passwordID");
	
	var repPass2 = $("#repeatPasswordID");
	
	alert(sessionStorage.getItem("idUlogovan"));
	
	var idUlogovan = sessionStorage.getItem("idUlogovan");
	
	if (idUlogovan) {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	var ulogovan;
	
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/users/"+idUlogovan+"",
		method: "GET",
		dataType: "json",
		success: function(response) {
			alert(JSON.stringify(response));
			ulogovan = response;
			alert(JSON.stringify(ulogovan));

		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina...ss.....");
			window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
		}
	});
	
	$("#promenaLozinkeSubmitFormBtn").click(function(){
		alert(pass1.val());
		alert(repPass2.val());
		
		alert("ulogovan je: "+JSON.stringify(ulogovan) + "");
		
		if(pass1.val() == repPass2.val()){
			alert("lozinke su iste");
			
			ulogovan.userPassword = pass1.val();
			
			alert(JSON.stringify(ulogovan));
			
			$.ajax({
				url: "http://localhost:8080/ProjekatOSA/api/users/"+idUlogovan+"",
				method: "PUT",
				contentType: 'application/json',
				dataType: "json",
				data: JSON.stringify(ulogovan),
				success: function(response) {
					alert(JSON.stringify(response));
					ulogovan = response;
					alert(JSON.stringify(ulogovan));

				},
				error: function(request, options, error) {
					alert(error);
					alert("erorcina...ss.....");
				}
			});
			
		}else{
			alert("lozinke se ne podudaraju");
		}
	});
	
	
	
	//........odjava
	$("#idOdjava").click(function(){
		alert("ODJAVLJIVANJE");
		sessionStorage.removeItem("idUlogovan");
		sessionStorage.removeItem("usernameUlogovan");
		sessionStorage.removeItem("idCategoryUlogovan");
		
		window.location.replace("http://localhost:8080/ProjekatOSA/index.html");
		
	});
	
	
});