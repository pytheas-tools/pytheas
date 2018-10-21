package main.java.player.fr.sii.game.player;

public class Player {

    private String name;
    private int power;
    private PlayerType type;

    public Player(String pName) {
        this.name = pName;
        this.type = PlayerType.SOLDIER;
    }

    public void init(int pPower){
        this.power = pPower;
    }
}
