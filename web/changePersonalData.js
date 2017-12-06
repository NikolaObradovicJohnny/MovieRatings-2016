$(document).ready(function(){
	alert(sessionStorage.idCategoryUlogovan);
	if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	alert("promeni licne podatke");
	
	var fName = $("#fNameID");
	
	var lName = $("#lNameID");
	
	alert(sessionStorage.getItem("idUlogovan"));
	
	var idUlogovan = sessionStorage.getItem("idUlogovan");
	
	if (idUlogovan == null) {
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
		}
	});
	
	$("#promenaLicnihPodatakaSubmitBtn").click(function(){
		alert(fName.val());
		alert(lName.val());
		
		alert("ulogovan je: "+JSON.stringify(ulogovan) + "");
		
			
		ulogovan.firstName = fName.val();
		ulogovan.lastName = lName.val();
			
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