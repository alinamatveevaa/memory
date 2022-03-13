import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interface/interface';
import { fetchIcons, setEqualToFalse } from '../../redux/slice';
import { useEffect, useState } from 'react';
import { CardsList } from '../CardsList/CardsList';
import { StartGame } from '../StartGame/StartGame';
import { players } from '../Results/players';
import { Results } from '../Results/Results';

export default function Main() {
    const cardsFromStore = useSelector((state: IState) => state.cards);
    const loading = useSelector((state: IState) => state.loading);
    const error = useSelector((state: IState) => state.error);
	const dispatch = useDispatch();

    const [ started, setStarted ] = useState(false);
    const [ finished, setFinished ] = useState(false);
    const [ timer, setTimer ] = useState(0);

    useEffect(() => {
        dispatch(fetchIcons());
    }, [])

    useEffect(() => {
        if (finished) {
            players.push({name: 'You', time: timer.toString(), id: `${timer}You`})
            dispatch(setEqualToFalse());
        }
    }, [finished])

    useEffect(() => {

        let comparedCards = cardsFromStore.filter((item) => {
            return item.equal === true;
        })

        if (comparedCards.length === 36) {
            setStarted(false);
            setFinished(true);
        };

    }, [cardsFromStore])

    useEffect(() => {
        if (started && !finished) {
            if (timer) setTimer(0);
            
            let timerId = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000)
            
            return () => clearInterval(timerId);
        }
    }, [started, finished])

    if (loading) return <p className={styles.serviceMsg}>Loading...</p>
    if (error) return <p className={styles.serviceMsg}>Something wrong. Try again later.</p>

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Memory game</h1>
            <p className={styles.descr}>Try yourself!</p>
            {finished &&
                <p className={styles.serviceFinished}>Awesome! Play again?</p>
            }
            <StartGame 
                started={started}
                cardsFromStore={cardsFromStore}
                setStarted={setStarted}
                setFinished={setFinished}
            />
            {finished &&
                <Results />
            }
            {started && <div className={styles.timer}>{timer} sec</div>}
            {cardsFromStore && started && !finished && <CardsList cards={cardsFromStore} />}
        </main>
    )
}