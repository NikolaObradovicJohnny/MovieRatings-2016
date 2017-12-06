package sf11.server.service;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;


@ApplicationPath("/api")
public class RestApplication extends Application {

	@Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(CountryService.class);
        classes.add(LanguageService.class);
        classes.add(ScoreService.class);
        classes.add(UserService.class);
        classes.add(CategoryService.class);
        classes.add(MovieService.class);
        return classes;
    }   
}
