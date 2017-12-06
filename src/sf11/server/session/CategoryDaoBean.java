package sf11.server.session;

import javax.ejb.Local;
import javax.ejb.Stateless;

import sf11.server.entity.Category;

@Stateless
@Local(CategoryDaoLocal.class)
public class CategoryDaoBean extends GenericDaoBean<Category, Integer> implements CategoryDaoLocal {

	public void remove(Category category) {
		category = em.merge(category);

//		category.getMovies().remove(category);
//		category.getUsers().remove(category);

		em.remove(category);
	}
}
