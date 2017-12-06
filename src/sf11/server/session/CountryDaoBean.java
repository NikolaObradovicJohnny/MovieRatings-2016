package sf11.server.session;

import javax.ejb.Local;
import javax.ejb.Stateless;

import sf11.server.entity.Country;

@Stateless
@Local(CountryDaoLocal.class)
public class CountryDaoBean extends GenericDaoBean<Country, Integer> implements CountryDaoLocal {

}
