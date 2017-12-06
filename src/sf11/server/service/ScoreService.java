package sf11.server.service;


import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import com.fasterxml.jackson.jaxrs.json.annotation.JSONP;

import sf11.server.entity.Movie;
import sf11.server.entity.Score;
import sf11.server.session.MovieDaoLocal;
import sf11.server.session.ScoreDaoLocal;

@Path("/scores")
public class ScoreService {

	@EJB
	private ScoreDaoLocal scoreDao;
	
	@EJB
	private MovieDaoLocal movieDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Score> findAll(){
		List<Score> retVal = null; 
		try {
			retVal = scoreDao.findAll();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Score findById(@PathParam("id") String id){
		Score retVal = null;
		try {
			retVal = scoreDao.findById(Integer.parseInt(id));
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
	}
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//	@JSONP
    public Score create(Score s) {
		Score retVal = null;
		try {
			retVal = scoreDao.persist(s);
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }

	@PUT 
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Score update(Score s) {
		Score retVal = null;
        try {
        	retVal = scoreDao.merge(s);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
	
	//-----unos ocene 2. nacin
	@POST
	@Path("{movie_id}/{score}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@JSONP
    public Score create(@PathParam("movie_id") String id,@PathParam("score") String score1) {
		Score retVal = null;
		try {
//			MovieDaoLocal movieDao = null;
			int score = Integer.parseInt(score1);
			Score s = new Score(score);
			Movie movie = movieDao.findById(Integer.parseInt(id));
			
			s.setMovie(movie);
//			movie.getMovieScore().add(s);
//			if (movie.getMovieScore()==null) {
//				movie.setMovieScore(new HashSet<Score>());
//				movie.getMovieScore().add(s);
//			}else{
//				movie.getMovieScore().add(s);
//			}
			
//			movieDao.merge(movie);
			retVal = scoreDao.persist(s);
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
	
 //..................................srediti metodu delete.......................................
	
	
	
}
