import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Block from "../Layot/Block/Block";
import cl from "./Blocks.module.scss";
import { BlockType, useBlocks } from "../../providers/BlockProvider";
import { useSort } from "../../providers/SortProvider";

const BlockBox = () => {
    const { blocks, setBlocks } = useBlocks();
    const { sortOrder } = useSort();
    const [sortedBlocks, setSortedBlocks] = useState<BlockType[]>(blocks);
    const handleBlockClick = (id: number) => {
        setBlocks((blocks) =>
            blocks.map((block) =>
                block.id === id ? { ...block, timeLeft: 20 } : block
            )
        );
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setBlocks((blocks) => {
                const updatedBlocks = blocks
                    .map((block) =>
                        block.timeLeft > 0
                            ? { ...block, timeLeft: block.timeLeft - 1 }
                            : null
                    )
                    .filter((block) => block !== null);

                if (updatedBlocks.length === 0) {
                    clearInterval(interval);
                }

                return updatedBlocks;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [blocks]);

    useEffect(() => {
        switch (sortOrder) {
            case "incr":
                setSortedBlocks(
                    [...blocks].sort((a, b) => a.timeLeft - b.timeLeft)
                );
                break;
            case "desc":
                setSortedBlocks(
                    [...blocks].sort((a, b) => b.timeLeft - a.timeLeft)
                );
                break;
            case "none":
                setSortedBlocks(blocks);
                break;
            default:
                setSortedBlocks(blocks);
                break;
        }
    }, [blocks, sortOrder]);

    return (
        <div className={cl.blocks}>
            <AnimatePresence>
                {sortedBlocks.map((block) => (
                    <Block
                        key={block.id}
                        id={block.id}
                        color={block.color}
                        timeLeft={block.timeLeft}
                        onClick={handleBlockClick}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default BlockBox;
