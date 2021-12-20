
import { useState, useEffect } from 'react/cjs/react.development';
import './login.scss'
import { Link, useHistory } from 'react-router-dom';
const Login = () => {
    let history = useHistory()
    let [Mail, setMail] = useState("")
    let [Password, setPassword] = useState("")
    let [AlertCheck, setAlert] = useState(false)
    let [MailAlert, setMailAlert] = useState(false);
    let [PassAlert, setPassAlert] = useState(false);
    let mailRejex = /[@]{1}[a-z0-9]{2,}[.][a-z]{2,}/
    let pass_phase1Rejex = /[a-zA-Z]+[0-9]+/
    let pass_phase2Rejex = /[a-zA-Z0-9]{8,}/
    let [users, setUsers] = useState(null)
    useEffect(() => {
        var check = localStorage.getItem("myUsers");
        if (check != null) {
            setUsers(JSON.parse(localStorage.getItem("myUsers")))
        }
        else {
            setUsers([])
        }
    }, [])
    function checkUser() {

        if (users.length != 0) {
            let Account = users.filter((user, i) => {

                if (user.mail == Mail && user.pass == Password) {
                    localStorage.setItem("lastIndex", i);
                    return true
                }
            })

            if (Account != "" && Mail != "") {
                return true
            }
            return false

        }
    }
    function validateMail() {
        if (!mailRejex.test(Mail)) {
            setMailAlert(true)
            return false
        }

        else {
            setMailAlert(false)
            return true
        }
    }
    function validatePass() {

        if (!pass_phase1Rejex.test(Password)) {
            setPassAlert(true)
            return false
        }

        else if (pass_phase1Rejex.test(Password)) {
            if (pass_phase2Rejex.test(Password)) {
                setPassAlert(false)
                return true
            }
            else {
                setPassAlert(true)
                return false
            }
        }
    }
    const testInputs = () => {
        let Mail_flag = validateMail();
        let Pass_flag = validatePass();
        let checkAcc = checkUser()

        if (Mail_flag && Pass_flag) {
            if (checkAcc) {
                setAlert(false)
                localStorage.setItem("token", "true");

                history.push('/profile')

            }
            else {
                setAlert(true)

            }
        }


    }
    return (
        <div className="login">
            <div className="px-4 my-2">
                <h1 className="my-5 text-center text-white">Login</h1>

                <div className="col-md-9 offset-md-2 mt-5">

                    <div >
                        <label className='text-white' >Email</label>
                        <input type="email" onChange={(e) => setMail(e.target.value)} className="form-control mt-1 rounded" />
                        {MailAlert && <div className="alert my-2 ml-2 ">
                            Your mail is not valid
                        </div>}
                    </div>
                </div>

                <div className="col-md-9 offset-md-2 mt-5">

                    <div >
                        <label className='text-white'>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className=" mt-1 rounded form-control" />
                        {PassAlert && <div className="alert my-2 ml-2 ">
                            Your password is not valid, length must be 8 at least containing char and number
                        </div>}
                    </div>
                </div>
                {AlertCheck && <div className="alert text-center my-2 ml-2 ">
                    Password or Mail is incorrect
                </div>}
                <div className="col-md-9 offset-md-2 mt-2" onClick={() => testInputs()}>
                    <button className="btn btn-info">login</button>

                </div>
                <p className="text-center my-3 text-white">Don't have an account? <Link to="/registration" className="text-primary text-decoration-none">Sign Up</Link></p>

            </div >
        </div>


    );
}

export default Login;