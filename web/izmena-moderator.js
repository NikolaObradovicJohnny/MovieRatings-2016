$(document).ready(function(){
	alert("RADI IZMENA FILMA,JQUERY");
	if (sessionStorage.idCategoryUlogovan == "0") {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}

	var kategorija;
	   
	 //..preuzmi kategoriju moderatora
		$.ajax({
			url: "http://localhost:8080/ProjekatOSA/api/categories/"+sessionStorage.idCategoryUlogovan+"",
			method: "GET",
			dataType: "json",
			success: function(response) {

				kategorija = response;
				alert(JSON.stringify(kategorija));
				
				$("#categoryInput").val(response.name);
				
			},
			error: function(request, options, error) {
				alert(error);
				alert("erorcina........");
			}
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
	
	//popuni combo boks sa filmovima
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies",
		method: "GET",
		dataType: "json",
		success: function(response) {

			alert("prikazi korisnike");
			for(var i=0; i<response.length; i++) {

				var movie = response[i];
				
				if (movie.category.id == sessionStorage.idCategoryUlogovan) {
					
					var newOption = $("<option id=\"optionUser"+movie.id+"\" value=" + movie.id + ">" + movie.title + " ("+ movie.movieYear + ")</option>");
					var newOption2 = $("<option value=" + movie.id + ">" + movie.title + "</option>");
						
					$("#selectIzaberiFilmModerator").append(newOption);
				}
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	
	
	//00 klik na izaberi korisnika
	$("#selectIzaberiFilmModerator").click(function(){
		alert("izaberi klik");
		var idFilm = $("#selectIzaberiFilmModerator").val();
		
		alert(idFilm);
		
		$.ajax({
	        url: "http://localhost:8080/ProjekatOSA/api/movies/"+idFilm+"",
	        type: "GET",
	        contentType: 'application/json',
			dataType: "json",
	        success: function(response){
	            alert(response);
	            alert(JSON.stringify(response));
	            
	            var film = response;
	            
	            var lblID = $("#idInput");
	        	var lblTitle = $("#titleInput");
	        	var lblDescription = $("#descriptionInput");
	        	var cbCategory = $("#categoryInput");
	        	var lblProducer = $("#producerInput");
	        	var lblDirector = $("#directorInput");
	        	var lblActors = $("#actorsInput");
	        	var lblYear = $("#yearInput");
	        	var cbLaunguage = $("#languageSelect");
	        	var cbCountry = $("#countrySelect");
	        	
	        	
	        	lblID.val(film.id);
	        	lblTitle.val(film.title);
	        	lblDescription.val(film.description);
	        	cbCategory.val(film.category.name);
	        	lblProducer.val(film.producer);
	        	lblDirector.val(film.director);
	        	lblActors.val(film.actors);
	        	lblYear.val(film.movieYear);
	        	cbLaunguage.val(film.movieLanguage.id);
	        	cbCountry.val(film.movieCountry.id);
	        	
	            
	        },error: function(request, options, error){
	            alert("nije proslo");
	            alert(error);
	            alert("ERRORCINA");
	        }
	    });
	});
	
	
	// izmena filma
    $("#dodajFilmModeratorSubmit").click(function(){
    	
    	alert("Klik izmeni");
       
        var id = $("#idInput");
        var title = $("#titleInput");
        var description = $("#descriptionInput");
//        var kategorija = $("#categoryInput");
        var producer = $("#producerInput");
        var director = $("#directorInput");
        var actors = $("#actorsInput");
        var year = $("#yearInput");
        var language = $("#languageSelect");
        var country = $("#countrySelect");
        
        
//        var idkategorija = kategorija.val();
//		var nameKategorija = $("#option"+kategorija.val()+"").text();
		
		var idjezik = language.val();
		var nameJezik = $("#option"+language.val()+"").text();
		
		var iddrzava = country.val();
		var nameDrzava = $("#option"+country.val()+"").text();


//		var kategorijaObj = { "id": idkategorija, "name": nameKategorija };
		var drzava = { "id": iddrzava, "name": nameDrzava };
		var jezik = { "id": idjezik, "name": nameJezik };
//		alert(JSON.stringify(kategorijaObj));
		alert(JSON.stringify(jezik));
		alert(JSON.stringify(drzava));
        
		var film = {
				"id": id.val(),
                "title": title.val(),
                "description": description.val(),
                "director": director.val(),
                	"producer": producer.val(),
                	"actors": actors.val(),
                	"movieYear": year.val(),
                	"category": kategorija,
                	"movieScore": null,
                	"movieCountry": drzava,
                	"movieLanguage": jezik,
                	"avgScore": 0
		};
        
        
        $.ajax({
            url: "http://localhost:8080/ProjekatOSA/api/movies/"+id.val()+"",
            type: "PUT",
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
	
	
    
  //........odjava
	$("#idOdjava").click(function(){
		alert("ODJAVLJIVANJE");
		sessionStorage.removeItem("idUlogovan");
		sessionStorage.removeItem("usernameUlogovan");
		sessionStorage.removeItem("idCategoryUlogovan");
		
		window.location.replace("http://localhost:8080/ProjekatOSA/index.html");
		
	});
    
    
});