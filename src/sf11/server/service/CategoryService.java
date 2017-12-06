package sf11.server.service;

import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;


import sf11.server.entity.Category;
import sf11.server.session.CategoryDaoLocal;

@Path("/categories")
public class CategoryService {
	
	@EJB
	private CategoryDaoLocal categoryDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public List<Category> findAll() {
		List<Category> retVal = null; 
		try {
			retVal = categoryDao.findAll();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET 
	@Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category findById(@PathParam("id") String id) {
		Category retVal = null;
		try {
			retVal = categoryDao.findById(Integer.parseInt(id));
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Category create(Category kategorija) {
		Category retVal = null;
		try {
			retVal = categoryDao.persist(kategorija);
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
    public Category update(Category kategorija) {
		Category retVal = null;
        try {
        	retVal = categoryDao.merge(kategorija);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 //..................................srediti metodu delete.......................................
    @DELETE 
    @Path("{id}")
    @Produces(MediaType.TEXT_HTML)
    public String remove(@PathParam("id") String id) {
    	Category kategorija = null;
    	try {
    		kategorija = categoryDao.findById(Integer.parseInt(id));
    		List<Category> kategorije = findAll();
    		kategorije.remove(kategorija);
//        	categoryDao.remove(Integer.parseInt(id));
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);		
        }
    	return MessageConstants.RSP_OK;
    }
	
}
