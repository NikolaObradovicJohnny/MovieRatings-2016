package sf11.server.session;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import sf11.server.entity.Category;
import sf11.server.entity.Country;
import sf11.server.entity.Gorivo;
import sf11.server.entity.Language;
import sf11.server.entity.Movie;
import sf11.server.entity.User;

@Stateless
@Remote(Init.class)
public class InitBean implements Init {

	@PersistenceContext(unitName = "ProjekatOSA")
	EntityManager em;
	
	@Override
	public void init() {
		User admin = new User(null,"Pera","Peric","admin","admin");
		em.persist(admin);
		
		Gorivo g=new Gorivo();
		g.setTipGoriva("novo");
		em.persist(g);
		
		Language engleski = new Language();
		engleski.setName("english");
		em.persist(engleski);
		
		System.out.println(g);
		
		Category zanr = new Category();
		zanr.setName("Action");
		System.out.println(zanr);
		em.persist(zanr);
		System.out.println("uspeo");
		
		User moderatorZanra = new User("Steva","Peric","steva","steva",zanr);
		em.persist(moderatorZanra);
		
		Category fantasy = new Category();
		fantasy.setName("Fantasy");
		em.persist(fantasy);
		
		Category comedy = new Category();
		comedy.setName("Comedy");
		em.persist(comedy);
		
		Category sciFi = new Category();
		sciFi.setName("Science Fiction");
		em.persist(sciFi);
		
		Category horror = new Category();
		horror.setName("Horror");
		em.persist(horror);
		
		Category adventure = new Category();
		adventure.setName("Adventure");
		em.persist(adventure);
		
		Category crime = new Category();
		crime.setName("Crime");
		em.persist(crime);
		
		Category drama = new Category();
		drama.setName("Drama");
		em.persist(drama);
		
		Category historical = new Category();
		historical.setName("Historical");
		em.persist(historical);
		
		Category mystery = new Category();
		mystery.setName("Mystery");
		em.persist(mystery);
		
		Category romance = new Category();
		romance.setName("Romance");
		em.persist(romance);
		
		Category thriller = new Category();
		thriller.setName("Thriller");
		em.persist(thriller);
		
		Category western = new Category();
		western.setName("Western");
		em.persist(western);
		
		Country usa = new Country();
		usa.setName("United States of America");
		em.persist(usa);
		
		Country uk = new Country();
		uk.setName("United Kingdom");
		em.persist(uk);
		
		Country newZealand = new Country();
		newZealand.setName("New Zealand");
		em.persist(newZealand);
		
		Country serbia = new Country();
		serbia.setName("Serbia");
		em.persist(serbia);
		
		Movie film = new Movie();
		film.setActors("Elijah Wood, Ian McKellen, Viggo Mortensen, Orlando Bloom, Sean Bean, Liv Tyler, Christophen Lee");
		film.setCategory(fantasy);
		film.setDescription("Fantasy tale about the J.R.R. Tolkein\'s book");
		film.setDirector("Peter Jackson");
		film.setMovieCountry(newZealand);
		film.setMovieLanguage(engleski);
		film.setMovieYear(2001);
		film.setProducer(film.getDirector());
		film.setTitle("Lord Of The Rings - Fellowship of the ring");
		em.persist(film);
		
		Movie film2 = new Movie();
		film2.setActors("Brad Pitt, Anthony Hopkins, Aidan Quinn, Julia Ormond, Henry Thomas");
		film2.setCategory(drama);
		film2.setDescription("Epic tale of three brothers and their father living in the remote wilderness of 1900s USA and how their lives are affected by nature, history, war, love and betrayal.");
		film2.setDirector("Edward Zwick");
		film2.setMovieCountry(usa);
		film2.setMovieLanguage(engleski);
		film2.setMovieYear(1994);
		film2.setProducer(film.getDirector());
		film2.setTitle("Legends of the Fall");
		em.persist(film2);
		
		Movie film3 = new Movie();
		film3.setActors("Mark Wahlberg, Tyrese Gibson, 	André Benjamin, Garrett Hedlund");
		film3.setCategory(crime);
		film3.setDescription("Four adopted brothers come to avenge their mother's death in what appears to be a random killing in a grocery store robbery.");
		film3.setDirector("John Singleton");
		film3.setMovieCountry(usa);
		film3.setMovieLanguage(engleski);
		film3.setMovieYear(2005);
		film3.setProducer(film.getDirector());
		film3.setTitle("Four brothers");
		em.persist(film3);
		
		Movie yesMan = new Movie();
		yesMan.setActors("Jim Carrey");
		yesMan.setCategory(comedy);
		yesMan.setDescription("A guy challenges himself to say \"yes\" to everything for an entire year.");
		yesMan.setDirector(" Peyton Reed");
		yesMan.setMovieCountry(usa);
		yesMan.setMovieLanguage(engleski);
		yesMan.setMovieYear(2008);
		yesMan.setProducer(film.getDirector());
		yesMan.setTitle("Yes Man");
		em.persist(yesMan);
		
		Movie starWarsE1 = new Movie();
		starWarsE1.setActors("Liam Neeson, Ewan McGregor, Natalie Portman, Jake Lloyd, 	Ian McDiarmid, Pernilla August, Anthony Daniels");
		starWarsE1.setCategory(sciFi);
		starWarsE1.setDescription("Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to reclaim their old glory.");
		starWarsE1.setDirector("George Lucas");
		starWarsE1.setMovieCountry(usa);
		starWarsE1.setMovieLanguage(engleski);
		starWarsE1.setMovieYear(1999);
		starWarsE1.setProducer(film.getDirector());
		starWarsE1.setTitle("Star Wars: Episode I - The Phantom Menace");
		em.persist(starWarsE1);
		
		Movie avengers = new Movie();
		avengers.setActors("Robert Downey Jr., Chris Evans, Scarlett Johansson, Mark Ruffalo, Chris Hemsworth, Jeremy Renner, 	Tom Hiddleston, Samuel L. Jackson");
		avengers.setCategory(zanr);
		avengers.setDescription("Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.");
		avengers.setDirector("Joss Whedon");
		avengers.setMovieCountry(usa);
		avengers.setMovieLanguage(engleski);
		avengers.setMovieYear(2012);
		avengers.setProducer(film.getDirector());
		avengers.setTitle("The Avengers");
		em.persist(avengers);
		
//		Category zanr = new Category();
//		zanr.setName("Novi zanr");
//		em.persist(zanr);
//		
//		Language spanski = new Language();
//		spanski.setName("Spanski");
//		em.persist(spanski);
//		
//		Country madj = new Country();
//		madj.setName("Madjarska");
//		em.persist(madj);
//		
//		Movie avengers = new Movie();
//		avengers.setActors("Robert Downey Jr., Chris Evans, Scarlett Johansson, Mark Ruffalo, Chris Hemsworth, Jeremy Renner, 	Tom Hiddleston, Samuel L. Jackson");
//		avengers.setCategory(zanr);
//		avengers.setDescription("Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.");
//		avengers.setDirector("Joss Whedon");
//		avengers.setMovieCountry(madj);
//		avengers.setMovieLanguage(spanski);
//		avengers.setMovieYear(2012);
//		avengers.setProducer("Joss Whedon");
//		avengers.setTitle("The Avengers 2");
//		em.persist(avengers);
//		
//		Score score = new Score(99);
//		score.setMovie(avengers);
//		em.persist(score);
	}

}
