import { IPlayers } from '../../interface/interface';
import { players } from './players';
import { formatTime } from '../../utils/formatTime';
import styles from './results.module.css';

export function Results() {
    return (
        <>
            <h4 className={styles.title}>Results</h4>
            <ul className={styles.results}>
                {players
                    .sort((a: IPlayers, b: IPlayers) => { return Number(a.time) - Number(b.time) })
                    .map((player, index) => {
                        return <li 
                                    key={player.id}
                                    className={player.name === 'You' ? styles.playerYou : styles.player}
                                >
                                    <span className={styles.rateNumber}>{index + 1}</span>
                                    <span className={styles.playerName}>{player.name}</span>
                                    <span className={styles.time}>{formatTime(player.time)}</span>
                            </li>
                })}
            </ul>
        </>
    )
}
