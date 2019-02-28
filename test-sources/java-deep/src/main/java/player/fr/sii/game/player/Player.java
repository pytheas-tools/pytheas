package main.java.player.fr.sii.game.player;

import main.java.player.fr.sii.game.weapon.Weapon;

public class Player {

    private String name;
    private int power;
    private PlayerType type;
    private Weapon weapon;

    public Player(String pName) {
        this.name = pName;
        this.type = PlayerType.SOLDIER;
        this.weapon = new Weapon("wa");
    }

    public void init(int pPower){
        this.power = pPower;
    }
}
