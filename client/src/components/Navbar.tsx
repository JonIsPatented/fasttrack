import '../styles/Navbar.css'
import { useState } from "react";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navLocations = [
        {
            Name: "Home",
            Link: "/#Home",
        },
        {
            Name: "About",
            Link: "/#About",
        },

        {
            Name: "Coasters",
            Link: "/#Coasters",
        },
        {
            Name: "SignIn",
            Link: "/#",
        },
    ]

    const navItems = navLocations.map((item, index) => {
        return(
        <li key={index} >
            <a href={item.Link} onClick={(e) => {hideNav()}}>
                <p>{item.Name}</p>
            </a>
        </li>
        );
    })

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }
    const hideNav = () => {
        setIsOpen(false);
    }




    return (
        <>
            <header>
                <div className={`hamburger ${isOpen ? "change" : ""}`} onClick={toggleNav}>
                    <div className="bar1"/>
                    <div className="bar2"/>
                    <div className="bar3"/>
                </div>
            </header>

            
            <div className={`navbar ${isOpen ? "show" : ""}`}>
              <div className="headerLogo">
                <h1>FT</h1>
              </div>

                <ul>
                    {navItems}
                </ul>
            </div>
        </>
    )
}

export default Navbar;
