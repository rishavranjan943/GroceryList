import './Header.css'
const Header = ({title}) => {
    // const headerstyle={
    //     backgroundColor : 'royalblue',
    //     color : '#fff'
    // }
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}
Header.defaultProps={
    title : "Default title"
}
export default Header
