import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faCodeBranch,
    faCheck,
    faInfo,
    faExclamationTriangle,
    faQuestion,
    faTimes,
    faEye,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import styles from "./ButtonDemo.module.css";

function ButtonDemo() {
    const [loading, setLoading] = useState(false);

    const handleLoadingTest = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    };

    return (
        <div className={styles.container}>
            <h1>Button Component Demo (Shadcn Clone)</h1>

            <div className={styles.section}>
                <h2>Basic Variants</h2>
                <div className={styles.buttonGroup}>
                    <Button variant="default">Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Severity Variants</h2>
                <div className={styles.buttonGroup}>
                    <Button variant="success">Success</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="warn">Warn</Button>
                    <Button variant="help">Help</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="contrast">Contrast</Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Severity with Icons</h2>
                <div className={styles.buttonGroup}>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faCheck} />
                        Success
                    </Button>
                    <Button variant="info">
                        <FontAwesomeIcon icon={faInfo} />
                        Info
                    </Button>
                    <Button variant="warn">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        Warning
                    </Button>
                    <Button variant="help">
                        <FontAwesomeIcon icon={faQuestion} />
                        Help
                    </Button>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTimes} />
                        Delete
                    </Button>
                    <Button variant="contrast">
                        <FontAwesomeIcon icon={faEye} />
                        View
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Icon Variants</h2>
                <div className={styles.buttonGroup}>
                    <Button>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                    <Button variant="outline">
                        <FontAwesomeIcon icon={faCodeBranch} />
                        New Branch
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Loading State</h2>
                <div className={styles.buttonGroup}>
                    <Button loading={loading} onClick={handleLoadingTest}>
                        Click to test loading
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Disabled State</h2>
                <div className={styles.buttonGroup}>
                    <Button disabled>Disabled Button</Button>
                    <Button variant="secondary" disabled>
                        Disabled Secondary
                    </Button>
                    <Button variant="success" disabled>
                        Disabled Success
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Rounded Variants</h2>
                <div className={styles.buttonGroup}>
                    <Button variant="default" rounded>
                        Rounded Default
                    </Button>
                    <Button variant="secondary" rounded>
                        Rounded Secondary
                    </Button>
                    <Button variant="outline" rounded>
                        Rounded Outline
                    </Button>
                    <Button variant="success" rounded>
                        Rounded Success
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Different Sizes</h2>
                <div className={styles.buttonGroup}>
                    <Button size="sm">Small</Button>
                    <Button>Normal</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Size with Severity</h2>
                <div className={styles.buttonGroup}>
                    <Button variant="success" size="sm">
                        <FontAwesomeIcon icon={faCheck} />
                        Small Success
                    </Button>
                    <Button variant="danger" size="lg">
                        <FontAwesomeIcon icon={faTimes} />
                        Large Danger
                    </Button>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Custom Styles</h2>
                <div className={styles.buttonGroup}>
                    <Button
                        style={{ backgroundColor: "#8b5cf6", color: "white" }}
                        onClick={() => alert("Custom styled button clicked!")}>
                        Custom Style
                    </Button>
                    <Button
                        className={styles.customButton}
                        onClick={() => alert("Custom class button clicked!")}>
                        Custom Class
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ButtonDemo;
