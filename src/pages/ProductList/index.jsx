import { useState, useEffect } from "react";
import styles from "./ProductList.module.css";

function ProductList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=12"
                );
                const postsData = await response.json();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleViewDetails = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPost(null);
    };

    const formatTitle = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

    const truncateBody = (body, maxLength = 100) => {
        if (body.length <= maxLength) return body;
        return body.substring(0, maxLength) + "...";
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className={styles.productContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.productContent}>
                <h1 className={styles.productTitle}>Product List</h1>

                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchInput}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchField}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.productTable}>
                        <thead>
                            <tr>
                                <th className={styles.checkboxHeader}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                    />
                                </th>
                                <th>Product</th>
                                <th>Create at</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post) => (
                                <tr key={post.id} className={styles.tableRow}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                        />
                                    </td>
                                    <td className={styles.productCell}>
                                        <div className={styles.productInfo}>
                                            <div
                                                className={styles.productImage}>
                                                <span
                                                    className={
                                                        styles.imagePlaceholder
                                                    }>
                                                    {post.id}
                                                </span>
                                            </div>
                                            <div
                                                className={
                                                    styles.productDetails
                                                }>
                                                <h4
                                                    className={
                                                        styles.productTitle
                                                    }>
                                                    {formatTitle(post.title)}
                                                </h4>
                                                <p
                                                    className={
                                                        styles.productDescription
                                                    }>
                                                    {truncateBody(post.body)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.dateCell}>
                                        {new Date(
                                            2020 + post.id,
                                            post.id % 12,
                                            (post.id % 28) + 1
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${
                                                styles[getStatusClass(post.id)]
                                            }`}>
                                            {getStatusText(post.id)}
                                        </span>
                                    </td>
                                    <td className={styles.amountCell}>
                                        ${(post.id * 2.34).toFixed(2)}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.viewButton}
                                            onClick={() =>
                                                handleViewDetails(post)
                                            }>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className={styles.paginationContainer}>
                    <div className={styles.densityToggle}>
                        <label className={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                defaultChecked
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                            Dense
                        </label>
                    </div>

                    <div className={styles.paginationControls}>
                        <span className={styles.rowsPerPage}>
                            Rows per page:
                            <select
                                value={rowsPerPage}
                                onChange={(e) =>
                                    setRowsPerPage(Number(e.target.value))
                                }
                                className={styles.rowsSelect}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={12}>12</option>
                            </select>
                        </span>

                        <span className={styles.pageInfo}>
                            {startIndex + 1}-
                            {Math.min(endIndex, filteredPosts.length)} of{" "}
                            {filteredPosts.length}
                        </span>

                        <div className={styles.pageNavigation}>
                            <button
                                className={styles.navButton}
                                onClick={() =>
                                    setCurrentPage(Math.max(1, currentPage - 1))
                                }
                                disabled={currentPage === 1}>
                                ←
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={() =>
                                    setCurrentPage(
                                        Math.min(totalPages, currentPage + 1)
                                    )
                                }
                                disabled={currentPage === totalPages}>
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedPost && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Chi tiết bài viết #{selectedPost.id}</h2>
                            <button
                                className={styles.closeButton}
                                onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalSection}>
                                <h3>Tiêu đề:</h3>
                                <p>{formatTitle(selectedPost.title)}</p>
                            </div>
                            <div className={styles.modalSection}>
                                <h3>Nội dung:</h3>
                                <p>{selectedPost.body}</p>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                className={styles.modalCloseButton}
                                onClick={closeModal}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper functions
function getStatusText(id) {
    const statuses = ["In stock", "Out of stock", "Low stock"];
    return statuses[id % 3];
}

function getStatusClass(id) {
    const classes = ["inStock", "outOfStock", "lowStock"];
    return classes[id % 3];
}

export default ProductList;
