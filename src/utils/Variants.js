export const linkVariants = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
            yoyo: 7,
        }
    }
}

export const containerVariants = {
    hidden: {
        y: '100vw'
    },
    visible: {
        y: 0,
        transition: { type: 'spring', stiffness: 30 },
    },
    exit: {
        transition: { ease: 'easeInOut' }
    }
};

export const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
        rotate: 0,
        transition: { duration: 1 }
    },
}

export const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: "easeInOut",
        }
    }
};