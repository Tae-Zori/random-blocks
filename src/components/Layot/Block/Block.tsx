import { motion } from "framer-motion";
import cl from "./Block.module.scss";

interface BlockProps {
    id: number;
    color: string;
    timeLeft: number;
    onClick: (id: number) => void;
}

const Block: React.FC<BlockProps> = ({ id, color, timeLeft, onClick }) => {
    const handleClick = () => {
        onClick(id);
    };

    return (
        <motion.div
            onClick={handleClick}
            className={cl.block}
            style={{
                backgroundColor: color,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
        >
            <div className={cl.block__timer}>{timeLeft}</div>
        </motion.div>
    );
};

export default Block;
