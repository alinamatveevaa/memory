import { useDispatch } from 'react-redux';
import { ICards } from '../../interface/interface';
import { shuffleCards } from '../../redux/slice';
import styles from './startGame.module.css';

interface IStartGame {
    started: boolean,
    cardsFromStore: ICards[],
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
}

export function StartGame({started, cardsFromStore, setStarted, setFinished}: IStartGame) {
    const dispatch = useDispatch();
    
    return (
        <button
            className={styles.button}
            disabled={started === true ? true : false}
            onClick={() => {
                setFinished(false);
                setStarted(true);
                if (cardsFromStore) dispatch(shuffleCards());
            }}
        >
            Start Game
        </button>
    )
}
