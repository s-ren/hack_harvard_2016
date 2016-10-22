package user;

/**
 * represents a class for containing information about a user
 * @author lucieackley
 *
 */
public class User {
	private boolean isBrownUser = false;
	private String name = "";
	private String email = "";
	private int totalRating = 0;
	private int ratingNum = 0;
	private String gender = "Not disclose";
	private String contact = "0000000000";
	private boolean subscribe = false;
	private String password = "";
	private String lastComment = "No last comment";
	
	enum title {
	}
	
	/**
	 *  a user takes in a name, email, id and rating
	 * @param name - the name of the user
	 * @param email - the email of the user
	 * @param id - the id of the user
	 * @param rating - the rating of the user
	 */
	public User(String name, String email, String password, boolean subscribe, String gen){
		this.name = name;
		this.email = email;
		this.password = password;
		this.subscribe = subscribe;
		gender = gen;
		if (email.endsWith("@brown.edu")) {
			isBrownUser = true;
		}
	}
	
	public User(String name, String email, String password, int totalRating, int ratingNum, String gender, String contact, boolean subscribe, String lastComment){
		this.name = name;
		this.email = email;
		this.password = password;
		this.subscribe = subscribe;
		this.totalRating = totalRating;
		this.ratingNum = ratingNum;
		this.contact = contact;
		this.gender = gender;
		this.lastComment = lastComment;
		if (email.endsWith("@brown.edu")) {
			isBrownUser = true;
		}
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setSubsribe(boolean s) {
		subscribe = s;
	}
	
	public boolean getSubscribe() {
		return subscribe;
	}
	
	public void setContact(String con) {
		contact = con;
	}
	
	public String getContact() {
	  return contact;
	}
	
	public void setName(String newName) {
		name = newName;
	}
	
	/**
	 * returns the user's name
	 * @return name
	 */
	public String getName(){
		return name;
	}
	
	/**
	 * returns the user's email 
	 * @return email
	 */
	public String getEmail(){
		return email;
	}
	
	/**
	 * returns the users rating
	 * @return rating
	 */
	public double getRating(){
		if (ratingNum == 0) {
			return -1;
		}
		return (double) totalRating/ (double) ratingNum;
	}
	
	public void addRating(int r) {
		totalRating += r;
		ratingNum++;
	}
	
	public int getTotalRating() {
		return totalRating;
	}
	
	public int getRatingNum() {
		return ratingNum;
	}

	/**
	 * gets the user's password
	 * @return
	 */
	public String getPassword() {
		return password;
	}

	public void setPassword(String pwd) {
		password = pwd;
	}
	
	public String getLatsComment() {
		return lastComment;
	}
	
	@Override
	public boolean equals(Object o) {
		if(! (o instanceof User)){
			return false;
		}
		User that = (User) o;
		return that.email.equals(this.email);
	}
	
	@Override
	public String toString() {
	  return "user:\nemail: " + email + "\nname: " + name + "\npassword: " 
	+ password + "\nsubscribe: " + subscribe + "\ncontact: " + contact + "\n";
	}
}
