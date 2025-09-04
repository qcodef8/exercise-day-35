import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({
    children,
    className,
    style,
    variant = "default",
    size = "normal",
    disabled = false,
    loading = false,
    rounded = false,
    onClick,
    ...props
}) {
    const isDisabled = disabled || loading;

    const handleClick = (e) => {
        if (isDisabled) return;
        onClick?.(e);
    };

    // ? Helper function to check if element is an icon
    const isIconElement = (element) => {
        if (!element) return false;

        // ? Check for FontAwesome icons
        if (element.type?.displayName === "FontAwesomeIcon") return true;
        if (element.type?.name === "FontAwesomeIcon") return true;

        // ? Check for SVG elements
        if (element.type === "svg") return true;

        // ? Check for elements with icon-related class names
        if (element.props?.className?.includes("icon")) return true;
        if (element.props?.className?.includes("fa-")) return true;

        return false;
    };

    // ? Check if children contain any icon
    const hasIcon = () => {
        if (!children) return false;

        if (Array.isArray(children)) {
            return children.some((child) => isIconElement(child));
        }

        return isIconElement(children);
    };

    // ? Check if it's icon-only button (only icon, no text)
    const isIconOnly = () => {
        if (!children) return false;

        if (Array.isArray(children)) {
            // ? If array has only 1 element and it's an icon
            return children.length === 1 && isIconElement(children[0]);
        }

        // ? If single element and it's an icon
        return isIconElement(children);
    };

    const buttonClasses = clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
            [styles.disabled]: isDisabled,
            [styles.loading]: loading,
            [styles.rounded]: rounded,
            [styles.iconOnly]: isIconOnly(),
            [styles.withIcon]: hasIcon() && !isIconOnly(),
        },
        className
    );

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <span className={styles.spinner} />
                    <span>Please wait</span>
                </>
            );
        }

        return children;
    };

    return (
        <button
            className={buttonClasses}
            style={style}
            disabled={isDisabled}
            onClick={handleClick}
            {...props}>
            {renderContent()}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    variant: PropTypes.oneOf([
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "success",
        "info",
        "warn",
        "help",
        "danger",
        "contrast",
    ]),
    size: PropTypes.oneOf(["sm", "normal", "lg"]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    rounded: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
