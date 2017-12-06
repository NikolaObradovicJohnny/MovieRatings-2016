package sf11.server.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.jaxrs.json.annotation.JSONP;

@Entity
@Table(name = "score")
public class Score implements Serializable {

//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = -1810889002748130923L;

	@Id
	@GeneratedValue(strategy=IDENTITY)
	@Column(name="id",unique=true,nullable=false)
	private int id;
	
	@Column(name="score",unique=false,nullable=false)
	private int score;
	
	@Column(name="date",unique=false,nullable=false)
	private Calendar date;
	
	@ManyToOne
	@JoinColumn(name="movie_id",referencedColumnName="id",unique=false,nullable=false)
	private Movie movie;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public Calendar getDate() {
		return date;
	}
	public void setDate(Calendar date) {
		this.date = date;
	}
	public Movie getMovie() {
		return movie;
	}
	public void setMovie(Movie movie) {
		this.movie = movie;
	}
	public Score(int id, int score, Calendar date) {
		super();
		this.id = id;
		this.score = score;
		this.date = date;
	}
	public Score(int id, int score) {
		super();
		this.id = id;
		this.score = score;
		this.date = new GregorianCalendar();
	}
	public Score(int score) {
		super();
		this.score = score;
		this.date = new GregorianCalendar();
	}
	public Score() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Score [id=" + id + ", score=" + score + ", date=" + date + "]";
	}
	
	
	
	
}
