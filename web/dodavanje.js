$(document).ready(function(){
   alert("It's working!!"); 
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
			$("#categoryUserSelectAdmin").append('<option value="0">Korisnik nije moderator</option>');
			for(var i=0; i<response.length; i++) {

				var kategorija = response[i];
				
				var newOption = $("<option id=\"option"+kategorija.id+"\" value=\"" + kategorija.id + "\">" + kategorija.name + "</option>");
				var newOption2 = $("<option value=" + kategorija.id + ">" + kategorija.name + "</option>");
					
				$("#categoryUserSelectAdmin").append(newOption2);
				$("#categorySelect").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
    
    // dodavanje korisnika
    $("#dodajIzmeniKorisnikaSubmit").click(function(){
       
        
        var ime = $("#firstnameInput");
        var prezime = $("#lastnameInput");
        var korisnicko = $("#usernameInput");
        var lozinka = $("#passwordInput");
        var kategorija = $("#categoryUserSelectAdmin");
       
        
        if (kategorija.val() == 0) {
        	alert("korisnik je admin");
			      
        var korisnik = {
        		"id": null,
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
    		
//    		$.ajax({
//    			url: "http://localhost:8080/ProjekatOSA/api/categories/"+ idkategorija+"",
//    			method: "GET",
//    			dataType: "json",
//    			success: function(response) {
//
//    				var kategorijaObject = response;
//    				alert(JSON.stringify(kategorijaObject));
//    				alert(kategorijaObject.name);
//    				kategorija.name = kategorijaObject.name;
//    				alert(JSON.stringify(kategorija));
//    			},
//    			error: function(request, options, error) {
//    				alert(error);
//    				alert("erorcina........");
//    			}
//    		});
//    		
//    		alert("posle ajaxa");
//    		alert(JSON.stringify(kategorija));
    		
    		var korisnik = {
            		"id": null,
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
            url: "http://localhost:8080/ProjekatOSA/api/users",
            type: "POST",
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
    
    
    // dodavanje kategorije
    $("#dodajIzmeniKategorijuSubmit").click(function(){
       
        
        var naziv = $("#nameCategoryInput");
        
        var zanr = {
        		"id": null,
                "name": naziv.val()
            }
        alert(zanr);
        alert(JSON.stringify(zanr));
        
        $.ajax({
            url: "http://localhost:8080/ProjekatOSA/api/categories",
            type: "POST",
            contentType: 'application/json',
			dataType: "json",
            data: JSON.stringify(zanr),
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
    
    
    
    //----dodavanje filma
$("#dodajIzmeniFilmSubmit").click(function(){
       
        
        var title = $("#titleInput");
        var description = $("#descriptionInput");
        var kategorija = $("#categorySelect");
        var producer = $("#producerInput");
        var director = $("#directorInput");
        var actors = $("#actorsInput");
        var year = $("#yearInput");
        var language = $("#languageSelect");
        var country = $("#countrySelect");
        
        
        var idkategorija = kategorija.val();
		var nameKategorija = $("#option"+kategorija.val()+"").text();
		
		var idjezik = language.val();
		var nameJezik = $("#option"+language.val()+"").text();
		
		var iddrzava = country.val();
		var nameDrzava = $("#option"+country.val()+"").text();


		var kategorijaObj = { "id": idkategorija, "name": nameKategorija };
		var drzava = { "id": iddrzava, "name": nameDrzava };
		var jezik = { "id": idjezik, "name": nameJezik };
		alert(JSON.stringify(kategorijaObj));
		alert(JSON.stringify(jezik));
		alert(JSON.stringify(drzava));
        
		var film = {
				"id": null,
                "title": title.val(),
                "description": description.val(),
                "director": director.val(),
                	"producer": producer.val(),
                	"actors": actors.val(),
                	"movieYear": year.val(),
                	"category": kategorijaObj,
                	"movieScore": null,
                	"movieCountry": drzava,
                	"movieLanguage": jezik,
                	"avgScore": 0
		};
        
        
        $.ajax({
            url: "http://localhost:8080/ProjekatOSA/api/movies",
            type: "POST",
            contentType: 'application/json',
			dataType: "json",
            data: JSON.stringify(film),
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



	//..prikaz jezika u kombo boksu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/languages",
		method: "GET",
		dataType: "json",
		success: function(response) {
	
			alert("prikazi jezika");
			for(var i=0; i<response.length; i++) {
	
				var jezik = response[i];
				
				var newOption = $("<option id=\"option"+jezik.id+"\" value=" + jezik.id + ">" + jezik.name + "</option>");
				var newOption2 = $("<option value=" + jezik.id + ">" + jezik.name + "</option>");
					
				$("#languageSelect").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	
	//..prikaz drzava u kombo boksu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/countries",
		method: "GET",
		dataType: "json",
		success: function(response) {
	
			alert("prikazi drzava");
			for(var i=0; i<response.length; i++) {
	
				var drzava = response[i];
				
				var newOption = $("<option id=\"option"+drzava.id+"\" value=" + drzava.id + ">" + drzava.name + "</option>");
				var newOption2 = $("<option value=" + drzava.id + ">" + drzava.name + "</option>");
					
				$("#countrySelect").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
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