import { useState, useEffect } from "react";
import styles from "./ProfileCard.module.css";

function ProfileCard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users/1"
                );
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>
                        Không thể tải thông tin user
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileAvatar}>
                        <div className={styles.avatarPlaceholder}>
                            {user.name.charAt(0)}
                        </div>
                    </div>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.profileName}>{user.name}</h2>
                        <p className={styles.profileUsername}>
                            @{user.username}
                        </p>
                        <p className={styles.profileDescription}>
                            Frontend Developer passionate about creating
                            beautiful user experiences
                        </p>
                    </div>
                </div>

                <div className={styles.profileStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>5+</span>
                        <span className={styles.statLabel}>Years Exp</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>50+</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>100%</span>
                        <span className={styles.statLabel}>Success</span>
                    </div>
                </div>

                <div className={styles.profileDetails}>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span className={styles.detailValue}>{user.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Phone:</span>
                        <span className={styles.detailValue}>{user.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Website:</span>
                        <span className={styles.detailValue}>
                            {user.website}
                        </span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Address:</span>
                        <span className={styles.detailValue}>
                            {user.address.street}, {user.address.city}
                        </span>
                    </div>
                </div>

                <div className={styles.profileActions}>
                    <button className={styles.followButton}>Follow</button>
                    <button className={styles.viewProfileButton}>
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
