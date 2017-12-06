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

import sf11.server.entity.Movie;
import sf11.server.session.MovieDaoLocal;

@Path("/movies")
public class MovieService {
	
	@EJB
	private MovieDaoLocal movieDao;
	
//	@EJB
//	private ScoreDaoLocal scoreDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Movie> findAll(){
		List<Movie> retVal = null; 
		try {
//			retVal = movieDao.findAll();
			retVal = movieDao.findAllWithScore();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("sort/7days")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Movie> findAll7Days(){
		List<Movie> retVal = null; 
		try {
//			retVal = movieDao.findAll();
			retVal = movieDao.findAllWithScore7Days();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("sort/30days")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Movie> findAll30Days(){
		List<Movie> retVal = null; 
		try {
//			retVal = movieDao.findAll();
			retVal = movieDao.findAllWithScore30Days();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Movie findById(@PathParam("id") String id){
		Movie retVal = null;
		try {
			retVal = movieDao.findById(Integer.parseInt(id));
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
	}
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Movie create(Movie movie) {
		Movie retVal = null;
		try {
			retVal = movieDao.persist(movie);
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
    public Movie update(Movie movie) {
		Movie retVal = null;
        try {
        	retVal = movieDao.merge(movie);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 //..................................srediti metodu delete.......................................

}
