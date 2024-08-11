import "./style/App.scss";
import Main from "./components/Layot/Main/Main";
import BlockManager from "./components/blockManager/BlockManager";
import BlockBox from "./components/blocks/Blocks";
import GlobalProvider from "./providers/GlobalProvider";

function App() {
    return (
        <GlobalProvider>
            <Main>
                <BlockManager />
                <BlockBox />
            </Main>
        </GlobalProvider>
    );
}

export default App;
