package sf11.server.session;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.Query;

import sf11.server.entity.User;

@Stateless
@Local(UserDaoLocal.class)
public class UserDaoBean extends GenericDaoBean<User, Integer> implements UserDaoLocal {

	@Override
	public User findUserByUsernameAndPassword(String username, String password) {
		Query q = em
				.createNamedQuery("findUserByUsernameAndPassword");
		q.setParameter("korisnickoIme", username);
		q.setParameter("lozinka", password);
		User result = (User) q.getSingleResult();
		return result;
	}
	
	@Override
	public boolean changeUserPassword(User ulogovan,String password, String repeatPassword) {
		if (password.equals(repeatPassword)) {
			ulogovan.setUserPassword(password);
			em.merge(ulogovan);
			return true;
		}
		return false;
	}

}
