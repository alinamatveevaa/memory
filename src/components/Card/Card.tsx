
import { ICards } from '../../interface/interface';
import styles from './card.module.css';

interface ICardProps {
    card: ICards;
    handleClick: (value: ICards) => void;
    flipped: boolean;
    disabled: boolean;
}

export function Card({card, handleClick, flipped, disabled} : ICardProps) {
    return (
       <li className={disabled ? styles.disabledItem : styles.item}>
            {card.equal
                ? null 
                : <div className={flipped ? styles.flippedCard : styles.card}>
                        <img
                            className={styles.image}
                            src={card.url}
                            title={card.title}
                            alt={card.title}
                        />
                        <div
                            onClick={() => handleClick(card)}
                            className={styles.backOfCard} 
                        />
                </div>
            }
       </li>
    )
}
