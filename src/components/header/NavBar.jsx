import { NavLink } from "react-router-dom"

const links = [
    {
        name: "home",
        url: "/",
    },
    {
        name: "posts",
        url: "/posts",
    },
]
export default function(){
    return(<>
        <header>
            <nav className="p-4">
                <ul className="flex items-center gap-x-5">
                    {links.map((link,index) => (
                        <NavLink to={link.url}>{link.name}</NavLink>
                    ))}
                </ul>
            </nav>
        </header>
    </>)
}