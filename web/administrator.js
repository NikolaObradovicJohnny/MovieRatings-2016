$(document).ready(function(){
	alert("ADMINISTRATOR");
	alert("RADI");
	alert("JQUERY");
	alert(sessionStorage.idUlogovan);
	if (sessionStorage.idCategoryUlogovan != "0") {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	// Kada se ucita stranica, pokupimo listu filmova sa servera i popunimo tabelu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies",
		method: "GET",
		dataType: "json",
		success: function(response) {

			for(var i=0; i<response.length; i++) {

				movie = response[i];
//				alert(movie);
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
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	alert("KRAJ");	
	

	//.,prikaz zanrova
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/categories",
		method: "GET",
		dataType: "json",
		success: function(response) {

//			alert("prikazi kategoruje");
			for(var i=0; i<response.length; i++) {

				category = response[i];
//				alert(category);

				// Za svaki film kreiramo po jedan <tr> element u tebeli
				var categoryTr = $("<tr></tr>");
				// <td>  sa klasom 'orderNumber' za redni broj kategorije
				var idTd = $("<td></td>");
				idTd.addClass("orderNumber");
				idTd.text(i);
				categoryTr.append(idTd);

				var nameTd = $("<td></td>");
				nameTd.text(category.name);
				categoryTr.append(nameTd);
				
				var dodajTd = $("<td><a href='#' >Dodaj</a></td>");
				categoryTr.append(dodajTd);
				
				var izmeniTd = $("<td><a href='#' >Izmeni</a></td>");
				categoryTr.append(izmeniTd);
				
				$("#categoryTable").append(categoryTr);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	//.,prikaz liste korisnika
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/users",
		method: "GET",
		dataType: "json",
		success: function(response) {

//			alert("prikazi korisnike");
			for(var i=0; i<response.length; i++) {

				user = response[i];
//				alert(user);

				// Za svaki film kreiramo po jedan <tr> element u tebeli
				var userTr = $("<tr></tr>");
				// <td>  sa klasom 'orderNumber' za redni broj kategorije
				var idTd = $("<td></td>");
				idTd.addClass("orderNumber");
				idTd.text(i);
				userTr.append(idTd);

				var fnameTd = $("<td></td>");
				fnameTd.text(user.firstName);
				userTr.append(fnameTd);
				
				var lnameTd = $("<td></td>");
				lnameTd.text(user.lastName);
				userTr.append(lnameTd);
				
				var unameTd = $("<td></td>");
				unameTd.text(user.userName);
				userTr.append(unameTd);
				
				
				var categoryTd = $("<td></td>");
				if (user.category == null) {
					categoryTd.text("");
				} else { categoryTd.text(user.category.name);}
				
				userTr.append(categoryTd);
				
				var dodajTd = $("<td><a href='#' >Dodaj</a></td>");
				userTr.append(dodajTd);
				
				var izmeniTd = $("<td><a href='#' >Izmeni</a></td>");
				userTr.append(izmeniTd);
				
				$("#userTable").append(userTr);
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