import React, { ReactNode } from "react";
import { BlockProvider } from "./BlockProvider";
import { SortProvider } from "./SortProvider";
interface GlobalProviderProps {
    children: ReactNode;
}
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    return (
        <SortProvider>
            <BlockProvider>{children}</BlockProvider>
        </SortProvider>
    );
};

export default GlobalProvider;
