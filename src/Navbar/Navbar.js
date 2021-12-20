import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    let Show = props.show
    return (<div className="Navbar">
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" ><i className="fas fa-book-open"></i> NoteX</a>
            <button className="navbar-toggler text-white d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">Menu</button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                </ul>

                <ul className="navbar-nav mt-2 mt-lg-0">

                    {!Show && <li className="nav-item">
                        <Link className="nav-link" to="/login" >Login<span className="sr-only">(current)</span></Link>
                    </li>}
                    {!Show && <li className="nav-item">
                        <Link className="nav-link" to="/registration">Register<span className="sr-only">(current)</span></Link>
                    </li>}
                    {Show && <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={() => localStorage.setItem("token", null)} >Logout<span className="sr-only">(current)</span></Link>
                    </li>}

                </ul >
            </div >
        </nav >


    </div>);
}

export default Navbar;