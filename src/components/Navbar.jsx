import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

const SingleNavItems = [
    {name: "Orders", LinkTo: "/orders", icon: "bi bi-box"},
]

const NavItems = [
    {name: "Orders", LinkTo: "/orders", icon: "bi bi-box"},
    {name: "Menu", icon: "bi bi-menu-app", subPages: [
    {name: "Showcase Items", LinkTo: "/page1"},
    {name: "Edit Menu", LinkTo: "/page2"},
    {name: "Edit Categories", LinkTo: "/page3"},
    {name: "Edit Items", LinkTo: "/page4"},
    ]},
    {name: "Reviews", LinkTo: "/reviews", icon: "bi bi-chat-left-quote", subPages: [
        {name: "View All Reviews", LinkTo: "/reviews"},
        {name: "Submit Review", LinkTo: "/customer"},
    ]},
    {name: "Anaylitcs", LinkTo: "/analytics", icon: "bi bi-pie-chart"},
    {name: "Settings", icon: "bi bi-gear-wide-connected", subPages: [
    {name: "Social Media", LinkTo: "/socialmedia"},
    {name: "Store Design", LinkTo: "/storedesign"},
    {name: "Moduel Settings", LinkTo: "/modulesettings"},
    ]},
]

return (
<nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar"
    id="sidebar">
    <div className="container-fluid"><button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
            aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button> 
            <a className="navbar-brand d-inline-block py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
                {/* <img src="/assets/img/logos/clever-primary.svg" alt="..." /> */}
                <h2>HUNGRY</h2>
            </a>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
            <ul className="navbar-nav">
                {NavItems.map((item, index)=>(
                    !item.subPages ? (
                        <li key={index} className="nav-item"><Link className="nav-link" to={item.LinkTo}><i className={item.icon}></i> {item.name}</Link>
                        </li>
                    ) : (
                        <li key={index} className="nav-item">
                            <a className="nav-link" href={`#sidebar-project${index}`} data-bs-toggle="collapse"role="button" aria-expanded="false" aria-controls="sidebar-projects">
                                <i className={item.icon}></i>
                                {item.name}
                            </a>
                            <div className="collapse" id={`sidebar-project${index}`}>
                                <ul className="nav nav-sm flex-column">
                                    {item.subPages.map((item, index)=>(
                                        <li key={index} className="nav-item"><Link to={item.LinkTo} className="nav-link">{item.name}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    )
                ))}

            </ul>
            <hr className="navbar-divider my-4 opacity-70" />
            <div className="mt-auto">
                <ul className="navbar-nav">
                    <li><span className="nav-link text-xs font-semibold text-muted ls-wide text-wrap">©2022 All rights reserved. Hungry</span>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</nav>
)
}

export default Navbar