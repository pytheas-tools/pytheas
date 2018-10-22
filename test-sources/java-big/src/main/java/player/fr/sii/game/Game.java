package main.java.player.fr.sii.game;

import main.java.player.fr.sii.game.player.Player;
import main.java.player.fr.sii.game.rule.Rule;

public class Game {
    private Player player1;
    private Player player2;
    private Rule rule;

    public void start(){
        this.player1 = new Player("Eric");
        this.player2 = new Player("Henry");
        this.rule = new Rule("An important rule");
        this.clearUI();
    }

    private void clearUI(){}
}
