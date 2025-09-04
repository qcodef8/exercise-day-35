import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Welcome to My App</h1>
                <p className={styles.subtitle}>
                    Explore our collection of interactive applications and
                    components
                </p>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <h3>🚀 Counter App</h3>
                        <p>
                            Simple counter application with increment/decrement
                            functionality
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>📝 Todo List</h3>
                        <p>
                            Manage your tasks with a beautiful todo list
                            application
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>👤 Profile Card</h3>
                        <p>
                            Display user information in an attractive profile
                            card
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>🛍️ Product List</h3>
                        <p>
                            Browse through a collection of products with
                            filtering
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>💬 Comment System</h3>
                        <p>Interactive comment system for user engagement</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>🌤️ Weather App</h3>
                        <p>Check weather information for different locations</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
