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

import sf11.server.entity.Country;
import sf11.server.session.CountryDaoLocal;

@Path("/countries")
public class CountryService {
	
	@EJB
	private CountryDaoLocal countryDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Country> findAll(){
		List<Country> retVal = null; 
		try {
			retVal = countryDao.findAll();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Country findById(@PathParam("id") String id){
		Country retVal = null;
		try {
			retVal = countryDao.findById(Integer.parseInt(id));
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
	}
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Country create(Country country) {
		Country retVal = null;
		try {
			retVal = countryDao.persist(country);
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
    public Country update(Country country) {
		Country retVal = null;
        try {
        	retVal = countryDao.merge(country);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 //..................................srediti metodu delete.......................................
	

}
