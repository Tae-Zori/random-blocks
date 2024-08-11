import { useState } from "react";
import cl from "./BlockManager.module.scss";
import { useBlocks } from "../../providers/BlockProvider";
import { useSort } from "../../providers/SortProvider";

const BlockManager = () => {
    const [newColor, setNewColor] = useState<string>("");
    const { sortOrder, setSortOrder } = useSort();
    const { blocks, setBlocks } = useBlocks();

    const addBlock = () => {
        let colorNewBlock = newColor.startsWith("#")
            ? newColor
            : "#" + newColor;

        if (!newColor || colorNewBlock.length !== 7) {
            alert("Пожалуйста, укажите цвет для нового блока");
            return;
        }

        const hexPattern = /^#[0-9A-Fa-f]{6}$/;

        if (!hexPattern.test(colorNewBlock)) {
            alert("Пожалуйста, укажите валидный цвет (например, #RRGGBB)");
            return;
        }

        const newBlock = { id: Date.now(), color: colorNewBlock, timeLeft: 20 };
        const randomIndex = Math.floor(Math.random() * blocks.length);
        setBlocks((blocks) => [
            ...blocks.slice(0, randomIndex),
            newBlock,
            ...blocks.slice(randomIndex),
        ]);
        setNewColor("");
    };

    const toggleSort = () => {
        switch (sortOrder) {
            case "none":
                setSortOrder("incr");
                break;
            case "incr":
                setSortOrder("desc");
                break;
            case "desc":
                setSortOrder("none");
                break;
            default:
                setSortOrder("none");
                break;
        }
    };

    const shuffleBlocks = () => {
        setSortOrder("none");
        setBlocks((blocks) => [...blocks].sort(() => Math.random() - 0.5));
    };

    const getSortButtonText = () => {
        switch (sortOrder) {
            case "none":
                return "Без сортировки";
            case "incr":
                return "По увелечению";
            case "desc":
                return "По уменьшению";
            default:
                return "Без сортировки";
        }
    };

    return (
        <div className={cl.manager}>
            <div className={cl.manager_shuffle}>
                <button onClick={shuffleBlocks}>Перемешать блоки</button>
            </div>

            <div className={cl.manager__addBlock}>
                <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="#FFFFFF"
                />
                <button onClick={addBlock}>Добавить блок</button>
            </div>
            <div className={cl.manager__sorting}>
                <button
                    style={{
                        backgroundColor:
                            sortOrder === "incr"
                                ? "blue"
                                : sortOrder === "desc"
                                ? "red"
                                : "white",
                        color: sortOrder === "incr" ? "white" : "black",
                    }}
                    onClick={toggleSort}
                >
                    {getSortButtonText()}
                </button>
            </div>
        </div>
    );
};

export default BlockManager;
