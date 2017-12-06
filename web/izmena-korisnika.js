$(document).ready(function(){
	
	alert(sessionStorage.idUlogovan);
	if (sessionStorage.idCategoryUlogovan != "0") {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	//..prikaz zanrova u kombo boksu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/categories",
		method: "GET",
		dataType: "json",
		success: function(response) {

			alert("prikazi kategoruje");
			for(var i=0; i<response.length; i++) {

				var kategorija = response[i];
				
				var newOption = $("<option id=\"option"+kategorija.id+"\" value=" + kategorija.id + ">" + kategorija.name + "</option>");
				var newOption2 = $("<option value=" + kategorija.id + ">" + kategorija.name + "</option>");
					
				$("#categoryUserSelect").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	
	
	//popuni combo boks sa korisnicima
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/users",
		method: "GET",
		dataType: "json",
		success: function(response) {

			alert("prikazi korisnike");
			for(var i=0; i<response.length; i++) {

				var korisnik = response[i];
				
				var newOption = $("<option id=\"optionUser"+korisnik.id+"\" value=" + korisnik.id + ">" + korisnik.firstName + " " + korisnik.lastName + " |korisnicko ime: "+ korisnik.userName + "</option>");
				var newOption2 = $("<option value=" + korisnik.id + ">" + korisnik.firstName + "</option>");
					
				$("#selectIzaberiKorisnika").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	
	//00 klik na izaberi korisnika
	$("#izaberiKorisnikaSubmit").click(function(){
		alert("izaberi klik");
		var idKorisnika = $("#selectIzaberiKorisnika").val();
		
		alert(idKorisnika);
		
		$.ajax({
	        url: "http://localhost:8080/ProjekatOSA/api/users/"+idKorisnika+"",
	        type: "GET",
	        contentType: 'application/json',
			dataType: "json",
	        success: function(response){
	            alert(response);
	            alert(JSON.stringify(response));
	            
	            var korisnik = response;
	            
	            var lblID = $("#idUser");
	        	var lblFirstName = $("#firstnameInput");
	        	var lblLastName = $("#lastnameInput");
	        	var lblUserName = $("#usernameInput");
	        	var lblPasswordName = $("#passwordInput");
	        	var cbCategory = $("#categoryUserSelect");
	        	
	        	lblID.val(korisnik.id);
	        	lblFirstName.val(korisnik.firstName);
	        	lblLastName.val(korisnik.lastName);
	        	lblUserName.val(korisnik.userName);
	        	lblPasswordName.val(korisnik.passwordName);
	        	
	        	if (korisnik.category.id != null) {
	        		cbCategory.val(korisnik.category.id);
				}
	            
	        },error: function(request, options, error){
	            alert("nije proslo");
	            alert(error);
	            alert("ERRORCINA");
	        }
	    });
	});
	
	
	// izmena korisnika
    $("#izmeniKorisnikaSubmit").click(function(){
       
        var id = $("#idUser");
        var ime = $("#firstnameInput");
        var prezime = $("#lastnameInput");
        var korisnicko = $("#usernameInput");
        var lozinka = $("#passwordInput");
        var kategorija = $("#categoryUserSelect");
       
        
        if (kategorija.val() == 0) {
        	alert("korisnik je admin");
			      
        var korisnik = {
        		"id": id.val(),
                "firstName": ime.val(),
                "lastName": prezime.val(),
                "userName": korisnicko.val(),
                "userPassword": lozinka.val(),
                "category": null
            }
    	}else {
    		alert("Korisnik je moderator");
    		
    		var idkategorija = kategorija.val();
    		var nameKategorija = $("#option"+kategorija.val()+"").text();
    		
    		alert(idkategorija);
    		alert(nameKategorija);
    		alert(JSON.stringify(kategorija));
    		kategorija = { "id": idkategorija, "name": nameKategorija };
    		alert(JSON.stringify(kategorija));


    		
    		var korisnik = {
            		"id": id.val(),
                    "firstName": ime.val(),
                    "lastName": prezime.val(),
                    "userName": korisnicko.val(),
                    "userPassword": lozinka.val(),
                    "category": kategorija
                }
    	}
        
        alert(korisnik);
        alert(JSON.stringify(korisnik));
        
        $.ajax({
            url: "http://localhost:8080/ProjekatOSA/api/users/"+id.val()+"",
            type: "PUT",
            contentType: 'application/json',
			dataType: "json",
            data: JSON.stringify(korisnik),
            success: function(response){
                alert(response);
                alert(JSON.stringify(response));
            },error: function(request, options, error){
                alert("nije proslo");
                alert(error);
                alert("ERRORCINA");
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