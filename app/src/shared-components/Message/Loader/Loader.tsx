import {useEffect, useRef} from 'react';
import styles from './styles.module.css';

const Loader = ({duration, type}) => {
    const progressBarRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        progressBarRef.current.style.animationDuration = `${duration / 1000}s`;
    }, [duration]);


    const color = (): string => {
        if (type == 'success') {
            return '#00501B';
        }

        if (type == 'error') {
            return '#632525';
        }

        return '#1177B0';
    }

    return (
        <div className={styles.loader}>
            <div className={styles.progressBar} ref={progressBarRef} style={{backgroundColor: color()}}></div>
        </div>
    );
}

export default Loader;