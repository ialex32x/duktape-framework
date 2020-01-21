
export interface IGame {
    init();
    restart();
    update(dt: number);
    destroy();
}
