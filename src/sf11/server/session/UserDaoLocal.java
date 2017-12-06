package sf11.server.session;

import sf11.server.entity.User;

public interface UserDaoLocal extends GenericDaoLocal<User, Integer> {

	public User findUserByUsernameAndPassword(String username, String password);
	
	public boolean changeUserPassword(User ulogovan,String password, String repeatPassword);
	
}
