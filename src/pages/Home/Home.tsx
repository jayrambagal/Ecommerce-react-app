import SearchBar from "../../components/searchBar/SearchBar";
import "./style.css";
//@ts-ignore
import image from '../../assets/images/HomeBackground.png'
//@ts-ignore
import Logo from '../../assets/images/ZiviLogo.png'

function Home() {
    return (
        <>
            <img src={Logo} alt="logo" className="ziviLogo" />
            <div className="homeContainer">
                <img src={image} className="backgroundImage" alt="" />
                <SearchBar onSearch={() => console.log("hello")} />
            </div>
        </>

    );
}

export default Home;
