package sf11.server.entity;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "movie")
public class Movie implements Serializable,Comparable<Movie> {

//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 8530452706309716826L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id",unique = true, nullable = false)
	private int id;
	
	@Column(name = "title",unique = false, nullable = false,length=80)
	private String title;
	
	@Column(name = "description",unique = false, nullable = false)
	private String description;
	
	@Column(name = "director",unique = false, nullable = false,length=120)
	private String director;
	
	@Column(name = "producer",unique = false, nullable = false,length=120)
	private String producer;
	
	@Column(name = "actors",unique = false, nullable = false)
	private String actors;
	
	@Column(name = "movie_year",unique = false, nullable = false)
	private int movieYear;
	
	@ManyToOne
	@JoinColumn(name = "category_id",referencedColumnName = "id",unique = false,nullable = false)
	private Category category;
	
	@OneToMany(cascade = { ALL }, fetch = LAZY, mappedBy = "movie")
	private Set<Score> movieScore = new HashSet<Score>();
	
	@ManyToOne
	@JoinColumn(name = "country_id",referencedColumnName="id",unique=false,nullable=true)
	private Country movieCountry;
	
	@ManyToOne
	@JoinColumn(name="language_id",referencedColumnName="id",unique = false, nullable = true)
	private Language movieLanguage;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDirector() {
		return director;
	}
	public void setDirector(String director) {
		this.director = director;
	}
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public String getActors() {
		return actors;
	}
	public void setActors(String actors) {
		this.actors = actors;
	}
	public int getMovieYear() {
		return movieYear;
	}
	public void setMovieYear(int movieYear) {
		this.movieYear = movieYear;
	}
	public Movie(int id, String title, String description, String director, String producer, String actors,
			int movieYear) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.director = director;
		this.producer = producer;
		this.actors = actors;
		this.movieYear = movieYear;
	}
	public Movie(String title, String description, String director, String producer, String actors,
			int movieYear) {
		super();
		this.title = title;
		this.description = description;
		this.director = director;
		this.producer = producer;
		this.actors = actors;
		this.movieYear = movieYear;
	}
	public Movie() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", description=" + description + ", director=" + director
				+ ", producer=" + producer + ", actors=" + actors + ", movieYear=" + movieYear + "]";
	}
	
	@Transient
	private int avgScore;
	
	public int getAvgScore(){
		return avgScore;
	}
	public void setAvgScore(int avgScore){
		this.avgScore = avgScore;
	}
	
	public int avgScore(){
		int count = 0;
		int sum = 0;
		for (Score score : this.movieScore) {
			sum += score.getScore();
			count++;
		}
		return sum/count;
	}
	public int avgScore7days(){
		int count = 0;
		int sum = 0;
		Calendar danas = new GregorianCalendar();
		for (Score score : this.movieScore) {
			if (score.getDate().get(Calendar.DATE) >= (danas.get(Calendar.DATE)-7)) {
				sum += score.getScore();
				count++;
			}
//			sum += score.getScore();
//			count++;
		}
		return sum/count;
	}
	public int avgScore30days(){
		int count = 0;
		int sum = 0;
		Calendar danas = new GregorianCalendar();
		for (Score score : this.movieScore) {
			if (score.getDate().get(Calendar.DATE) >= (danas.get(Calendar.DATE)-30)) {
				sum += score.getScore();
				count++;
			}
//			sum += score.getScore();
//			count++;
		}
		return sum/count;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category zanr) {
		this.category = zanr;
	}
	public Set<Score> getMovieScore() {
		return movieScore;
	}
	public void setMovieScore(Set<Score> movieScore) {
		this.movieScore = movieScore;
	}
	public Country getMovieCountry() {
		return movieCountry;
	}
	public void setMovieCountry(Country movieCountry) {
		this.movieCountry = movieCountry;
	}
	public Language getMovieLanguage() {
		return movieLanguage;
	}
	public void setMovieLanguage(Language movieLanguage) {
		this.movieLanguage = movieLanguage;
	}
	@Override
	public int compareTo(Movie movie) {
		
//		if (this.avgScore > movie.avgScore) {
//			return 1;
//		} else if (this.avgScore < movie.avgScore) {
//			return -1;
//		}	
		if (this.getAvgScore() > movie.getAvgScore()) {
			return 1;
		} else if (this.getAvgScore() < movie.getAvgScore()) {
			return -1;
		}	
		
		return 0;
	}
	
	
}
