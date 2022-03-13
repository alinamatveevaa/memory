export interface IState {
    cards: ICards[],
    loading: boolean,
    error: boolean,
}

export interface ICards {
    id: string,
    url: string,
    title: string,
    equal: boolean,
}

export interface IPlayers {
    id: string,
    name: string,
    time: string,
}