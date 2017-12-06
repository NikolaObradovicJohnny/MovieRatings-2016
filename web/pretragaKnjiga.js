$(document).ready(function(){
	alert("WELCOME");
	
	$("#fuzzyByTitleSubmitBtn").submit(function(){
		alert("click");
		var query = $("#fuzzyTitle").val();
		
		$.ajax({
			url: "http://localhost:8080/ProjekatUES/api/ebooks/fuzzy/searchByTitle="+query,
			method: "GET",
			dataType: "json",
			success: function(response) {

				for(var i=0; i<response.length; i++) {

					var ebook = response[i];
					
					ebook = response[i];
					alert(JSON.stringify(ebook));
					
					var ebookTr = $("<tr></tr>");

					var titleTd = $("<td></td>");
					titleTd.text(ebook.title);
					ebookTr.append(titleTd);

					var authorTd = $("<td></td>");
					authorTd.text(ebook.author);
					ebookTr.append(authorTd);

					var keywordsTd = $("<td></td>");
					keywordsTd.text(ebook.keywords);
					ebookTr.append(keywordsTd);

					var fileNameTd = $("<td></td>");
					fileNameTd.append("<a href='localhost:8080/ProjekatUES/api/ebooks/download/"+ebook.fileName+"' >download</a>");
					ebookTr.append(fileNameTd);
						
					$("#eBookTableByTitleFuzzy").append(ebookTr);
				}
			},
			error: function(request, options, error) {
				alert(error);
				alert("erorcina........");
			}
		});
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//----TOOGLE BUTTON
	$("div#fuzzyByTitle").hide();
	$("div#phraseByTitle").hide();
	
	$("div#fuzzyByAuthor").hide();
	$("div#phraseByAuthor").hide();
	
	$("div#fuzzyByKeywords").hide();
	$("div#phraseByKeywords").hide();
	
	$("div#fuzzyByFullText").hide();
	$("div#phraseByFullText").hide();
	
	$("div#searchByLanguage").hide();


	$("button#btnFuzzyByTitle").click(function(){
        $("div#fuzzyByTitle").slideToggle();
    });
	$("button#btnPhraseByTitle").click(function(){
        $("div#phraseByTitle").slideToggle();
    });
	
	$("button#btnFuzzyByAuthor").click(function(){
        $("div#fuzzyByAuthor").slideToggle();
    });
	$("button#btnPhraseByAuthor").click(function(){
        $("div#phraseByAuthor").slideToggle();
    });
	
	$("button#btnFuzzyByKeywords").click(function(){
        $("div#fuzzyByKeywords").slideToggle();
    });
	$("button#btnPhraseByKeywords").click(function(){
        $("div#phraseByKeywords").slideToggle();
    });
	
	$("button#btnFuzzyByFullText").click(function(){
        $("div#fuzzyByFullText").slideToggle();
    });
	$("button#btnPhraseByFullText").click(function(){
        $("div#phraseByFullText").slideToggle();
    });
	
	$("button#btnSearchByLanguage").click(function(){
        $("div#searchByLanguage").slideToggle();
    });

});