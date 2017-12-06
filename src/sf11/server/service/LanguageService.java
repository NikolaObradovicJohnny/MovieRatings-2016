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

import sf11.server.entity.Language;
import sf11.server.session.LanguageDaoLocal;


@Path("/languages")
public class LanguageService {
	
	@EJB
	private LanguageDaoLocal languageDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Language> findAll(){
		List<Language> retVal = null; 
		try {
			retVal = languageDao.findAll();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Language findById(@PathParam("id") String id){
		Language retVal = null;
		try {
			retVal = languageDao.findById(Integer.parseInt(id));
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
	}
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Language create(Language language) {
		Language retVal = null;
		try {
			retVal = languageDao.persist(language);
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
    public Language update(Language language) {
		Language retVal = null;
        try {
        	retVal = languageDao.merge(language);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 //..................................srediti metodu delete.......................................

}
