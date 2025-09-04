import { Link } from "react-router";

import styles from "./Home.module.css";

function Home() {
    const features = [
        {
            path: "/exercise-day-35/counter-app",
            title: "🚀 Counter App",
            description:
                "Simple counter application with increment/decrement functionality",
        },
        {
            path: "/exercise-day-35/todo-list-app",
            title: "📝 Todo List",
            description:
                "Manage your tasks with a beautiful todo list application",
        },
        {
            path: "/exercise-day-35/profile-card",
            title: "👤 Profile Card",
            description:
                "Display user information in an attractive profile card",
        },
        {
            path: "/exercise-day-35/product-list",
            title: "🛍️ Product List",
            description:
                "Browse through a collection of products with filtering",
        },
        {
            path: "/exercise-day-35/comment-system",
            title: "💬 Comment System",
            description: "Interactive comment system for user engagement",
        },
        {
            path: "/exercise-day-35/weather-app",
            title: "🌤️ Weather App",
            description: "Check weather information for different locations",
        },
        {
            path: "/exercise-day-35/button-demo",
            title: "🔘 Button Demo",
            description:
                "Comprehensive button component showcase with various variants, sizes, and states",
        },
    ];

    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>Welcome to My App</h1>
                <p className={styles.subtitle}>
                    Explore our collection of interactive applications and
                    components
                </p>
                <div className={styles.featureGrid}>
                    {features.map((feature) => (
                        <Link
                            key={feature.path}
                            to={feature.path}
                            className={styles.featureCard}>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
