import { createContext, ReactNode, useContext, useState } from "react";

interface SortContextType {
    sortOrder: "none" | "incr" | "desc";
    setSortOrder: React.Dispatch<
        React.SetStateAction<"none" | "incr" | "desc">
    >;
}

const SortContext = createContext<SortContextType | null>(null);

export const SortProvider = ({ children }: { children: ReactNode }) => {
    const [sortOrder, setSortOrder] = useState<"none" | "incr" | "desc">(
        "none"
    );
    return (
        <SortContext.Provider value={{ sortOrder, setSortOrder }}>
            {children}
        </SortContext.Provider>
    );
};

export const useSort = () => {
    const context = useContext(SortContext);
    if (!context) {
        throw new Error("useSort must be used within a SortProvider");
    }
    return context;
};
