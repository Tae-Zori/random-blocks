import React, { createContext, ReactNode, useContext, useState } from "react";
import { getRandomColor, getRandomNumber } from "../utils/randomForBlock";

interface BlockContextType {
    blocks: BlockType[];
    setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
}

export type BlockType = {
    id: number;
    color: string;
    timeLeft: number;
};

const BlockContext = createContext<BlockContextType | null>(null);

export const BlockProvider = ({ children }: { children: ReactNode }) => {
    const [blocks, setBlocks] = useState<BlockType[]>(() =>
        Array.from(
            { length: Math.floor(Math.random() * 10) + 5 },
            (_, index) => ({
                id: index,
                color: getRandomColor(),
                timeLeft: getRandomNumber(),
            })
        )
    );

    return (
        <BlockContext.Provider value={{ blocks, setBlocks }}>
            {children}
        </BlockContext.Provider>
    );
};

export const useBlocks = () => {
    const context = useContext(BlockContext);
    if (!context) {
        throw new Error("useBlocks must be used within a BlockProvider");
    }
    return context;
};
