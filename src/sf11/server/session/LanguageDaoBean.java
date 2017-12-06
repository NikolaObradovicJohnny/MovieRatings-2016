package sf11.server.session;

import javax.ejb.Local;
import javax.ejb.Stateless;

import sf11.server.entity.Language;

@Stateless
@Local(LanguageDaoLocal.class)
public class LanguageDaoBean extends GenericDaoBean<Language, Integer> implements LanguageDaoLocal {

	public void remove(Language language) {
		language = em.merge(language);

//		language.getMovies().remove(language);

		em.remove(language);
	}
}
