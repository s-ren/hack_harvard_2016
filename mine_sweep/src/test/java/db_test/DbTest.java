/*package db_test;


import static org.junit.Assert.assertTrue;
import database.Query;
import database.Database;
import global.Global;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import user.User;



public class DbTest {
	
	  private static final String dbStr = 
			  "creditMe.sqlite3";
	
	  @BeforeClass
	  public static void setUpClass() throws Exception {
	    // (Optional) Code to run before any tests begin goes here.
	  }

	  @AfterClass
	  public static void tearDownClass() throws Exception {
	    // (Optional) Code to run after all tests finish goes here.
	  }

	  @Before
	  public void setUp() {
	    // (Optional) Code to run before each test case goes here.
	  }

	  @After
	  public void tearDown() {
	    // (Optional) Code to run after each test case goes here.
	  }	
	  
	  @Test
	  public void putAndGetTest() {
		 Global.setDb(dbStr);

		 User user = new User("Lucie", "lucile_ackley@brown.edu", "Ack", true);
		 
		 Query.putUser(user, Global.getDb().getConnection());
		 
		 User lucie = null;
		 try {
			lucie = Query.getUser("lucile_ackley@brown.edu", Global.getDb().getConnection());
			assertTrue(lucie.getName().equals("Lucie"));
		} catch (SQLException e) {
			assertTrue(false);
		}
	  }
	  
	  @Test 
	  public void updateActorTest(){
		  DbTest t = new DbTest();
		  t.putAndGetTest();
	  }
	  

	public static void main(String[] args) throws IOException {
		
	}
}*/