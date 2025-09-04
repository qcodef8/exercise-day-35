import { useState } from "react";

import styles from "./CounterApp.module.css";

function CounterApp() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    const getStatusText = () => {
        if (count > 0) return "Dương";
        if (count < 0) return "Âm";
        return "Bằng không";
    };

    const getStatusColor = () => {
        if (count > 0) return "#22c55e"; // xanh lá
        if (count < 0) return "#ef4444"; // đỏ
        return "#6b7280"; // xám
    };

    return (
        <div className={styles.counterContainer}>
            <h1 className={styles.counterTitle}>Counter App</h1>

            <div className={styles.counterCard}>
                <div
                    className={styles.counterDisplay}
                    style={{
                        background: `linear-gradient(135deg, ${getStatusColor()}20 0%, ${getStatusColor()}40 100%)`,
                    }}>
                    <span
                        className={styles.counterNumber}
                        style={{ color: getStatusColor() }}>
                        {count}
                    </span>
                </div>

                <div className={styles.statusText}>
                    Trạng thái:{" "}
                    <span style={{ color: getStatusColor() }}>
                        {getStatusText()}
                    </span>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.counterButton}
                        onClick={decrement}
                        aria-label="Giảm">
                        <span className={styles.buttonIcon}>−</span>
                    </button>

                    <button
                        className={styles.counterButton}
                        onClick={reset}
                        aria-label="Reset">
                        <span className={styles.buttonIcon}>0</span>
                    </button>

                    <button
                        className={styles.counterButton}
                        onClick={increment}
                        aria-label="Tăng">
                        <span className={styles.buttonIcon}>+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CounterApp;
