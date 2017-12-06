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

import sf11.server.entity.User;
import sf11.server.session.UserDaoLocal;

@Path("/users")
public class UserService {

	@EJB
	private UserDaoLocal userDao;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> findAll(){
		List<User> retVal = null; 
		try {
			retVal = userDao.findAll();
			
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR, 
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findById(@PathParam("id") String id){
		User retVal = null;
		try {
			retVal = userDao.findById(Integer.parseInt(id));
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
    public User create(User u) {
		User retVal = null;
		try {
			retVal = userDao.persist(u);
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
	@JSONP
    public User update(User u) {
		User retVal = null;
        try {
        	retVal = userDao.merge(u);
        } catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 //..................................srediti metodu delete.......................................
	
//	@PUT 
//    @Path("{password}/{repeatPassword}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public User changePassword(User u,String password,String repeatPassword) {
//		User retVal = null;
//        try {
////        	if (password.equals(repeatPassword)) {
////				userDao.changeUserPassword(u, password, repeatPassword);
////			}
//        	if (userDao.changeUserPassword(u, password, repeatPassword)) {
//        		retVal = userDao.merge(u);
//			}
////        	retVal = userDao.merge(u);
////        	retVal = userDao.changeUserPassword(u, password, repeatPassword);
//        } catch (Exception e) {
//			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
//					Status.INTERNAL_SERVER_ERROR);			
//		}
//		return retVal;
//    }
	
	@POST
	@Path("{userName}/{userPassword}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public User findByUsernameAndPassword(@PathParam("userName") String username,@PathParam("userPassword") String password){
		User retVal = null;
		try {
//			retVal = userDao.findById(Integer.parseInt(id));
			retVal = userDao.findUserByUsernameAndPassword(username, password);
		} catch (Exception e) {
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
	}
	
}
