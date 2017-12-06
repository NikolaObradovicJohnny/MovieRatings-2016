package sf11.server.session;

import javax.ejb.Local;
import javax.ejb.Stateless;

import sf11.server.entity.Score;

@Stateless
@Local(ScoreDaoLocal.class)
public class ScoreDaoBean extends GenericDaoBean<Score, Integer> implements ScoreDaoLocal {

	public void remove(Score score) {
		score = em.merge(score);

		score.getMovie().getMovieScore().remove(score);

		em.remove(score);
	}
	
}
