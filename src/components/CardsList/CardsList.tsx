import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ICards } from "../../interface/interface";
import { setEqualToTrue } from "../../redux/slice";
import { Card } from "../Card/Card";
import styles from './cardsList.module.css';

interface ICardsList {
    cards: ICards[];
}

export function CardsList({cards}: ICardsList ) {
    const dispatch = useDispatch();

    const [ currentState, setCurrentState ] = useState<ICards | null>();
    const [ prevState, setPrevState ] = useState<ICards | null>();

    const [ disabledCards, setDisabledCards ] = useState(false);

    const handleClick = (val: ICards) => {
        if (disabledCards) return;
        prevState ? setCurrentState(val) : setPrevState(val);
    }

    const resetState = () => {
        setPrevState(null);
        setCurrentState(null);
        setDisabledCards(false);
    }

    useEffect(() => {
        if (prevState && currentState) {

            setDisabledCards(true);

            if (prevState.title === currentState.title) {

                const timeoutId = setTimeout(() => {
                    dispatch(setEqualToTrue(prevState));
                    resetState();
                }, 1000)

                return () => clearTimeout(timeoutId);
            } else {
                const timeoutId = setTimeout(() => {
                    resetState()
                }, 1000)

                return () => clearTimeout(timeoutId);
            }
            
        }
        if (prevState && !currentState) {
            
            const timeoutId = setTimeout(() => {
                resetState();
            }, 5000)

            return () => clearTimeout(timeoutId);
        }
    }, [prevState, currentState])

    return (
        <ul className={styles.list}>
            {cards.map((card) => {
                return  <Card 
                            key={card.id}
                            card={card}
                            handleClick={handleClick}
                            flipped={(card === prevState) || (card === currentState)}
                            disabled={disabledCards}
                        />
            })}
        </ul>
    )
}
