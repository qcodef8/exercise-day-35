import { useState, useEffect } from "react";
import styles from "./CommentSystem.module.css";

function CommentSystem() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        body: "",
    });

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/comments?postId=1"
                );
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !newComment.name.trim() ||
            !newComment.email.trim() ||
            !newComment.body.trim()
        ) {
            return;
        }

        const comment = {
            id: Date.now(), // Fake ID for local state
            postId: 1,
            name: newComment.name,
            email: newComment.email,
            body: newComment.body,
        };

        setComments((prev) => [comment, ...prev]);
        setNewComment({ name: "", email: "", body: "" });
    };

    const getTimeAgo = (id) => {
        const times = [
            "2 giờ trước",
            "1 ngày trước",
            "3 ngày trước",
            "1 tuần trước",
            "2 tuần trước",
        ];
        return times[id % times.length];
    };

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    if (loading) {
        return (
            <div className={styles.commentContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentCard}>
                {/* Header */}
                <div className={styles.commentHeader}>
                    <h2 className={styles.commentTitle}>
                        Comments ({comments.length})
                    </h2>
                    <div className={styles.sortOptions}>
                        <button
                            className={`${styles.sortButton} ${styles.active}`}>
                            <span className={styles.sortIcon}>↑</span>
                            Popular
                        </button>
                        <button className={styles.sortButton}>
                            <span className={styles.sortIcon}>📅</span>
                            Newest
                        </button>
                    </div>
                </div>

                {/* Comment Input Form */}
                <div className={styles.commentInputSection}>
                    <div className={styles.userAvatar}>
                        <img
                            src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff"
                            alt="Current User"
                            className={styles.avatarImage}
                        />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.commentForm}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên của bạn"
                                value={newComment.name}
                                onChange={handleInputChange}
                                className={styles.nameInput}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email của bạn"
                                value={newComment.email}
                                onChange={handleInputChange}
                                className={styles.emailInput}
                                required
                            />
                        </div>
                        <div className={styles.commentInputContainer}>
                            <textarea
                                name="body"
                                placeholder="Viết comment của bạn..."
                                value={newComment.body}
                                onChange={handleInputChange}
                                className={styles.commentInput}
                                rows="3"
                                required
                            />
                            <div className={styles.inputActions}>
                                <span className={styles.emojiIcon}>😊</span>
                                <button
                                    type="submit"
                                    className={styles.sendButton}>
                                    <span className={styles.sendIcon}>📩</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className={styles.commentsList}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentAvatar}>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        comment.name
                                    )}&background=random`}
                                    alt={comment.name}
                                    className={styles.avatarImage}
                                />
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <h4 className={styles.commentAuthor}>
                                        {formatName(comment.name)}
                                    </h4>
                                    <span className={styles.commentTime}>
                                        {getTimeAgo(comment.id)}
                                    </span>
                                </div>
                                <p className={styles.commentEmail}>
                                    {comment.email}
                                </p>
                                <p className={styles.commentBody}>
                                    {comment.body}
                                </p>

                                <div className={styles.commentActions}>
                                    <button className={styles.actionButton}>
                                        <span className={styles.actionIcon}>
                                            👍
                                        </span>
                                        <span className={styles.actionCount}>
                                            {Math.floor(Math.random() * 100) +
                                                1}
                                        </span>
                                    </button>
                                    <button className={styles.actionButton}>
                                        <span className={styles.actionIcon}>
                                            👎
                                        </span>
                                        <span className={styles.actionCount}>
                                            {Math.floor(Math.random() * 20) + 1}
                                        </span>
                                    </button>
                                    <button className={styles.actionButton}>
                                        <span className={styles.actionIcon}>
                                            💬
                                        </span>
                                        <span>Reply</span>
                                    </button>
                                </div>

                                <div className={styles.repliesSection}>
                                    <a href="#" className={styles.repliesLink}>
                                        See{" "}
                                        {Math.floor(Math.random() * 50) + 10}{" "}
                                        Replies
                                        <span className={styles.repliesIcon}>
                                            ↓
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.commentOptions}>
                                <button className={styles.optionsButton}>
                                    <span className={styles.optionsIcon}>
                                        ⋯
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentSystem;
