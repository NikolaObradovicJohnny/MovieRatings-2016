package sf11.server.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@NamedQuery(name = "findUserByUsernameAndPassword", query = "SELECT k FROM User k WHERE k.userName like :korisnickoIme AND k.userPassword LIKE :lozinka")
public class User implements Serializable {

//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 4453066128794785488L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "user_id",unique = true,nullable = false)
	private Integer id;
	
	@Column(name = "first_name",unique = false,nullable = false,length=30)
	private String firstName;
	
	@Column(name = "last_name",unique = false,nullable = false,length=30)
	private String lastName;
	
	@Column(name = "username",unique = true,nullable = false,length=10)
	private String userName;
	
	@Column(name = "user_password",unique = false, nullable = false,length=10)
	private String userPassword;
	
	@ManyToOne
	@JoinColumn(name = "category_id",referencedColumnName = "id",unique = false, nullable = true)
	private Category category;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category zanr) {
		this.category = zanr;
	}
	public User(Integer id, String firstName, String lastName, String userName, String userPassword) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.userPassword = userPassword;
	}
	public User(Integer id, String firstName, String lastName, String userName, String userPassword,Category zanr) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.userPassword = userPassword;
		this.category = zanr;
	}
	public User(String firstName, String lastName, String userName, String userPassword,Category zanr) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.userPassword = userPassword;
		this.category = zanr;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", userName=" + userName
				+ ", userPassword=" + userPassword + "]";
	}
	
	
	
}
