package sf11.server.entity;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "language")
public class Language implements Serializable{

//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 6146848128595123675L;

	@Id
	@GeneratedValue(strategy=IDENTITY)
	@Column(name="id",unique=true,nullable=false)
	private Integer id;
	
	@Column(name="name",unique=true,nullable=false,length=30)
	private String name;
	
	@OneToMany(cascade = { ALL }, fetch = LAZY, mappedBy = "movieLanguage")
	private Set<Movie> movies = new HashSet<Movie>();
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<Movie> getMovies() {
		return movies;
	}
	public void setMovies(Set<Movie> movies) {
		this.movies = movies;
	}
	public Language(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public Language() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Language [id=" + id + ", name=" + name + "]";
	}
	
	
}
