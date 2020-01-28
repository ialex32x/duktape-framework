
export interface IGame {
    init(onfinish: () => void);
    restart();
    update(dt: number);
    destroy();
}
