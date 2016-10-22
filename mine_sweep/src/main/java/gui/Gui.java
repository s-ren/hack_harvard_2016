package gui;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import freemarker.template.Configuration;
import spark.ModelAndView;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Spark;
import spark.TemplateViewRoute;
import spark.template.freemarker.FreeMarkerEngine;

public class Gui {
  /**
   * GSON to create json object.
   */
  private static final Gson GSON = new Gson();
  /**
   * port number.
   */
	int PORTNUMBER = 4000;
	
	/**
	 * constructor.
	 */
  public Gui() {
  }

  /**
   * Starts the spark server. Initializes different handlers to manage
   * REST and generate web page templates with autocorrect.
   */
  public void run() {    
    (new Thread() {
      public void run() {
        
      }
    }).start();
    runSparkServer();
  }

  /**
   * FreeMarkerEngine builder.
   * @return New Freemarker engine.
   */
  private static FreeMarkerEngine createEngine() {
    Configuration config = new Configuration();
    File templates = new File(
        "src/main/resources/spark/template/freemarker");
    try {
      config.setDirectoryForTemplateLoading(templates);
    } catch (IOException ioe) {
      System.out.printf(
          "ERROR: Unable use %s for template loading.\n", templates);
      System.exit(1);
    }
    return new FreeMarkerEngine(config);
  }

  /** Initial spark server setup. */
  private void runSparkServer() {
    Spark.setPort(PORTNUMBER);
    Spark.externalStaticFileLocation("src/main/resources");
    FreeMarkerEngine freeMarker = createEngine();
    // Setup Spark Routes
    Spark.get("/home", new LandingPage(), freeMarker);
    Spark.get("/newUser", new LoadingPage(), freeMarker);
    //Spark.post("/userforgetpwd", new UserForgetPwdHandler());
  }

  /** The main view of the GUI. */
  private class LandingPage implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables;
      variables = ImmutableMap.of();
      return new ModelAndView(variables, "mine.html");
    }
  }
  
  /** The main view of the GUI. */
  private class LoadingPage implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      QueryParamsMap qm = req.queryMap();
      String userID = qm.value("userID");
      String roomID = qm.value("roomID");
      System.out.println(" " + userID + " " + roomID);
      Map<String, Object> variables = new ImmutableMap.Builder()
      		.put("message1", userID + "!")
      		.put("message2", roomID + "!")
      		.build();
      return new ModelAndView(variables, "loading.html");
    }
  }
/*
  private class UserForgetPwdHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();
      String email = qm.value("email");
      String password = qm.value("pwd");
      Map<String, Object> variables = new ImmutableMap.Builder().build();
      return GSON.toJson(variables);
    }
  }*/
}
