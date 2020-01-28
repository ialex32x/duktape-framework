import Input = UnityEngine.Input;
import KeyCode = UnityEngine.KeyCode;
import GameObject = UnityEngine.GameObject;
import { IGame } from "./game/common/game";

let GameDefs = {
    shot: "./game/shot/shot_game", 
};

export class MyBridge {
    private _game: IGame

    Awake() {
        let proto = require(GameDefs["shot"]);
        this._game = new proto.default();
        this._game.init(() => {
            this._game.restart();
        });
    }

    Update(deltaTime: number) {
        this._game.update(deltaTime);
    }

    OnApplicationQuit() {
        console.log("byebye!");
    }
}
