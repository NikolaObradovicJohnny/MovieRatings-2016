package sf11.server.session;


import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.Query;

import sf11.server.entity.Movie;
import sf11.server.entity.Score;

@Stateless
@Local(MovieDaoLocal.class)
public class MovieDaoBean extends GenericDaoBean< Movie, Integer> implements MovieDaoLocal {

	public void remove(Movie movie) {
		movie = em.merge(movie);

		movie.getCategory().getMovies().remove(movie);
		movie.getMovieCountry().getMovies().remove(movie);
		movie.getMovieLanguage().getMovies().remove(movie);

		em.remove(movie);
	}
//	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Movie> findAll() {
//		// TODO Auto-generated method stub
////		return super.findAll();
//		Query q = em.createQuery("SELECT x FROM Movie x");
//		List<Movie> result = q.getResultList();
//		for (Movie movie : result) {
//			movie.avgScore();
//		}
//		return result;
//	}
	
	@SuppressWarnings("unchecked")
	public List<Movie> findAllWithScore() {
		Query q = em.createQuery("SELECT x FROM Movie x");
		List<Movie> result = q.getResultList();
		for (Movie movie : result) {
			if (movie.getMovieScore().size() != 0) {
				for (Score score : movie.getMovieScore()) {
					score.setMovie(null);
				}
				movie.setAvgScore(movie.avgScore());
			}
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<Movie> findAllWithScore7Days() {
		Query q = em.createQuery("SELECT x FROM Movie x");
		List<Movie> result = q.getResultList();
		for (Movie movie : result) {
			if (movie.getMovieScore().size() != 0) {
				for (Score score : movie.getMovieScore()) {
					score.setMovie(null);
				}
				movie.setAvgScore(movie.avgScore7days());
			}
		}
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<Movie> findAllWithScore30Days() {
		Query q = em.createQuery("SELECT x FROM Movie x");
		List<Movie> result = q.getResultList();
		for (Movie movie : result) {
			if (movie.getMovieScore().size() != 0) {
				for (Score score : movie.getMovieScore()) {
					score.setMovie(null);
				}
				movie.setAvgScore(movie.avgScore30days());
			}
		}
		
		return result;
	}
	
}
