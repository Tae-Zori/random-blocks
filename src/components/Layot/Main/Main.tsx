import cl from "./Main.module.scss";

interface IMainProps {
    children: React.ReactNode;
}

const Main = ({ children }: IMainProps) => {
    return <main className={cl.main}>{children}</main>;
};

export default Main;
