package sf11.server.session;

import java.util.List;

import sf11.server.entity.Movie;

public interface MovieDaoLocal extends GenericDaoLocal<Movie, Integer> {

	public List<Movie> findAllWithScore();
	
	public List<Movie> findAllWithScore7Days();
	
	public List<Movie> findAllWithScore30Days();
}
