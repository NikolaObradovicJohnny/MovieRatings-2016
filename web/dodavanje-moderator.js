$(document).ready(function(){
   alert("It's working!!"); 
   alert(sessionStorage.idUlogovan);
	if (sessionStorage.idCategoryUlogovan == "0") {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	

	var kategorija;
   
 //..prikaz zanrova u kombo boksu
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
    
    
    
    
    
    //----dodavanje filma
	$("#dodajFilmModeratorSubmit").click(function(){
       alert("DODAJ FILM MODERATOR");
       alert(kategorija);
       alert(JSON.stringify(kategorija));
        
        var title = $("#titleInput");
        var description = $("#descriptionInput");
//        var kategorija = $("#categorySelect");
        var producer = $("#producerInput");
        var director = $("#directorInput");
        var actors = $("#actorsInput");
        var year = $("#yearInput");
        var language = $("#languageSelect");
        var country = $("#countrySelect");
        
        
//        var idkategorija = kategorija.val();
//		var nameKategorija = $("#option"+kategorija.val()+"").text();
		
		var idjezik = language.val();
		var nameJezik = $("#optionLanguage"+language.val()+"").text();
		
		var iddrzava = country.val();
		var nameDrzava = $("#optionCountry"+country.val()+"").text();


//		var kategorijaObj = { "id": idkategorija, "name": nameKategorija };
		var drzava = { "id": iddrzava, "name": nameDrzava };
		var jezik = { "id": idjezik, "name": nameJezik };
//		alert(JSON.stringify(kategorijaObj));
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
                	"category": kategorija,
                	"movieScore": null,
                	"movieCountry": drzava,
                	"movieLanguage": jezik,
                	"avgScore": 0
		};
        
		alert(JSON.stringify(film));
        
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
				
				var newOption = $("<option id=\"optionLanguage"+jezik.id+"\" value=" + jezik.id + ">" + jezik.name + "</option>");
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
				
				var newOption = $("<option id=\"optionCountry"+drzava.id+"\" value=" + drzava.id + ">" + drzava.name + "</option>");
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