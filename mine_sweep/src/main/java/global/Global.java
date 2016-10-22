package global;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import user.User;

public class Global {
  public static final String brownDiningApi = 
  		"https://api.students.brown.edu/dining/menu?client_id=f523d9c0-2ef2-4d2e-bd84-9a8f27a66b01";
  public static final String linkHead = "localhost:4000/";
  private static Random random = new Random();
  private static String charStorage = 
  		"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  private static int linklength = 20;
  private static Map<String, String> forgetPwd = new ConcurrentHashMap<>();
  private static Map<String, User> registeringUsers = new ConcurrentHashMap<>();
  private static List<Object> ratty = new CopyOnWriteArrayList<>();
  private static List<Object> vDub = new CopyOnWriteArrayList<>();
  
  public static void refreshRattyVdubFood() {
  	List<String> food = new ArrayList<>();
  	Date date = new Date();
  	int day = date.getDate();
  	int hour = date.getHours();
  	// ratty
    URL url;
		try {
			url = new URL(brownDiningApi + "&eatery=ratty&day=" + day + "&hour=" + hour);
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
			return;
		}
    System.out.println(url);
    
    StringBuilder sb = new StringBuilder();
    BufferedReader server;
		try {
			server = new BufferedReader(new InputStreamReader(url.openStream()));
	    String line = server.readLine();
	    while (line != null) {
	    	sb.append(line + "\n");
	      line = server.readLine();
	    }
	    server.close();
	    System.out.println(sb);
	    Type listType = new TypeToken<Map<String, Object>>() {}.getType();
	    Map<String, Object> result = new Gson().fromJson(sb.toString(), listType);
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("bistro")) {
      	food.add(s);
      }
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("chef's corner")) {
      	food.add(s);
      }
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("daily sidebars")) {
      	food.add(s);
      }
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("grill")) {
      	food.add(s);
      }
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("roots & shoots")) {
      	food.add(s);
      }
      ratty.clear();
      ratty.addAll(food);
      food.clear();
		} catch (IOException e) {
			ratty = new CopyOnWriteArrayList<>();
			//e.printStackTrace();
		}
    // vdub
		try {
	    url = new URL(brownDiningApi + "&eatery=vdub&day=" + day + "&hour=" + hour);
	    System.out.println(url);
	    sb = new StringBuilder();
	    server = new BufferedReader(new InputStreamReader(url.openStream()));
	    String line = server.readLine();
	    while (line != null) {
	    	sb.append(line + "\n");
	      line = server.readLine();
	    }
	    server.close();
	    Type listType = new TypeToken<Map<String, Object>>() {}.getType();
	    Map<String, Object> result = new Gson().fromJson(sb.toString(), listType);
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("daily sidebars")) {
      	food.add(s);
      }
      for (String s : (ArrayList<String>) ((Map) ((ArrayList) result.get("menus")).get(0)).get("main menu")) {
      	food.add(s);
      }
      vDub.clear();
      vDub.addAll(food);
      food.clear();
		} catch (IOException e) {
			vDub = new CopyOnWriteArrayList<>();
			//e.printStackTrace();
		}
  }
  
  public synchronized static List<Object> getRatty() {
  	return ratty;
  }
  
  public synchronized static List<Object> getVDub() {
  	return vDub;
  }
  

  public synchronized static Map<String, User> getRegisteringUsers() {
  	return registeringUsers;
  }
  
  public synchronized static Map<String, String> getForgetPwds() {
  	return forgetPwd;
  }
  
  public static String md5(String password) {
  	MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("md5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
  	md5.update(password.getBytes());
    byte[] pwd = md5.digest();
  	StringBuffer sb = new StringBuffer();
  	for (int i = 0; i < pwd.length; i++) {
  		byte b = pwd[i];
  		sb.append(String.format("%02x", b & 0xff));
  	}
  	return sb.toString();
  }
  
  public static String randomLink(String page) {
	    char[] text = new char[linklength];
	    for (int i = 0; i < linklength; i++) {
        text[i] = charStorage.charAt(random.nextInt(charStorage.length()));
	    }
	    String linkTail = new String(text);
	    return linkHead + page + linkTail;
	}
}
