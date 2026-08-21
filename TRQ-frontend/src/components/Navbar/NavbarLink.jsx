import { NavLink } from 'react-router-dom';

/**
 * Formatted NavBarLink button
 * 
 * @param {Object} props
 * @param {string} [props.className=""] 
 * @param {string} [text=""] 
 */
export default function NavbarLink({className="", children, ...props}) {


    return(
        <NavLink className={({ isActive }) =>
            `${isActive ? 
                'text-accent font-bold text-text-primary px-8 py-2 bg-surface hover:bg-surface-hover content-center border-b border-border pb-2 theme-transition' :
                'text-text-primary px-8 py-2 bg-surface hover:bg-surface-hover content-center theme-transition'}
            ${className}
        `}
        {...props}
        >{children}</NavLink>
    )
}