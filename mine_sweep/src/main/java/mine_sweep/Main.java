package mine_sweep;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;

import global.Global;
import gui.Gui;

public class Main {
  public static void main(String[] args) throws FileNotFoundException, SQLException {
  	new Main().run();
  }
  
  private Main() {
  }

  private void run() {
  	new Gui().run();
  }
}
