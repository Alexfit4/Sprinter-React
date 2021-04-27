import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData';
import './Navbar.css';
import {IconContext} from 'react-icons';
import * as GiIcons from 'react-icons/gi'

function Navbar() {
    // Setting sidebar state to be false, when false it minimizes, if true it expands. 
    const [sidebar, setSidebar] = useState(false)

    // Function to toggle from true to false for the sidebar. 
    const showSidebar = () => setSidebar(!sidebar)

    const goHome = () => {
        let url = window.location.replace("/")
        return url;
        }

	return (
		<div>
            <IconContext.Provider value={{ color: 'white'}}>
			<div className="navbar">
				<Link to={window.location.pathname} className="menu-bars">
					<FaIcons.FaBars onClick={showSidebar} />
				</Link>
                <IconContext.Provider value={{ color: 'white', size: "50px"}}>
                <GiIcons.GiSprint className="nav-icon" />
                <span className="nav-title" onClick={goHome}>Sprinter</span>
                </IconContext.Provider>
			</div>
            </IconContext.Provider>
            <IconContext.Provider value={{color: 'white'}}>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
		</div>
	);
}

export default Navbar;
