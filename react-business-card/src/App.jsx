import "./App.css"
import { Header } from "./components/header";
import { About } from "./components/About";
import { Interests } from "./components/Interests";
import { Footer } from "./components/Footer";

export function App() {
    return (
        <>
            <Header />
            <About />
            <Interests />
            <Footer />
        </>
    );
}