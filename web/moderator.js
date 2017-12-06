$(document).ready(function(){
	alert("MODERATOR");
	alert("RADI");
	alert("JQUERY");
	
	alert(sessionStorage.idUlogovan);
	if (sessionStorage.idCategoryUlogovan <= 0) {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == null){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	alert(sessionStorage.getItem("idCategoryUlogovan"));
//	
	var idKategorije = sessionStorage.getItem("idCategoryUlogovan");
	
	// Kada se ucita stranica, pokupimo listu filmova sa servera i popunimo tabelu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies",
		method: "GET",
		dataType: "json",
		success: function(response) {

			for(var i=0; i<response.length; i++) {

				movie = response[i];
//				alert(movie);
				if (movie.category.id == idKategorije) {
					
					// Za svaki film kreiramo po jedan <tr> element u tebeli
					var movieTr = $("<tr></tr>");
					// <td>  sa klasom 'orderNumber' za redni broj kategorije
					var idTd = $("<td></td>");
					idTd.addClass("orderNumber");
					idTd.text(movie.id);
					movieTr.append(idTd);
	
					var titleTd = $("<td></td>");
					titleTd.text(movie.title);
					movieTr.append(titleTd);
					
					var descTd = $("<td></td>");
					descTd.text(movie.description);
					movieTr.append(descTd);
					
	
					var actorsTd = $("<td></td>");
					actorsTd.text(movie.actors);
					movieTr.append(actorsTd);
					
	
					var zanrTd = $("<td></td>");
					zanrTd.text(movie.category.name);
					movieTr.append(zanrTd);
					
					var yearTd = $("<td></td>");
					yearTd.text(movie.movieYear);
					movieTr.append(yearTd);
					
					
					var directorTd = $("<td></td>");
					directorTd.text(movie.director);
					movieTr.append(directorTd);
					
					
					var countryTd = $("<td></td>");
					countryTd.text(movie.movieCountry.name);
					movieTr.append(countryTd);
					
					
					var languageTd = $("<td></td>");
					languageTd.text(movie.movieLanguage.name);
					movieTr.append(languageTd);
					
					var avgScoreTd = $("<td></td>");
					avgScoreTd.text(movie.avgScore);
					movieTr.append(avgScoreTd);
					
					var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
					movieTr.append(izmeniTd);
					
					var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
					movieTr.append(obrisiTd);
					
					$("#movieTable").append(movieTr);
				}
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	alert("KRAJ");	
	
	//........odjava
	$("#idOdjava").click(function(){
		alert("ODJAVLJIVANJE");
		sessionStorage.removeItem("idUlogovan");
		sessionStorage.removeItem("usernameUlogovan");
		sessionStorage.removeItem("idCategoryUlogovan");
		
		
	});
	
});