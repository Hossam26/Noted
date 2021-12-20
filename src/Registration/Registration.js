import { useEffect, useState } from 'react/cjs/react.development';
import { Link, useHistory } from 'react-router-dom';
import './registration.scss';

const Registration = () => {

    let [Fname, setFname] = useState("")
    let [Lname, setLname] = useState("")
    let [Mail, setMail] = useState("")
    let [Password, setPassword] = useState("")
    let [FnameAlert, setFnameAlert] = useState(false)
    let [LnameAlert, setLnameAlert] = useState(false)
    let [MailAlert, setMailAlert] = useState(false)
    let [MailExist, setMailExist] = useState(false)

    let [PasswordAlert, setPasswordAlert] = useState(false)
    let [users, setUsers] = useState(null)
    let mailRejex = /[@]{1}[a-z0-9]{2,}[.][a-z]{2,}/
    let pass_phase1Rejex = /[a-zA-Z]+[0-9]+/
    let pass_phase2Rejex = /[a-zA-Z0-9]{8,}/
    let FnameRejex = /^[A-Za-z]{3,10}$/
    let LnameRejex = /^[A-Za-z]{3,10}$/

    let history = useHistory()

    useEffect(() => {
        var check = localStorage.getItem("myUsers");
        if (check != null) {
            setUsers(JSON.parse(localStorage.getItem("myUsers")))
        }
        else {
            setUsers([])
        }
    }, [])

    function validateFname() {
        if (!FnameRejex.test(Fname)) {
            setFnameAlert(true)
            return false
        }

        else {
            setFnameAlert(false)
            return true
        }

    } function validateLname() {
        if (!LnameRejex.test(Lname)) {
            setLnameAlert(true)
            return false
        }

        else {
            setLnameAlert(false)
            return true
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
            setPasswordAlert(true)
            return false
        }

        else if (pass_phase1Rejex.test(Password)) {
            if (pass_phase2Rejex.test(Password)) {
                setPasswordAlert(false)
                return true
            }
            else {
                setPasswordAlert(true)
                return false
            }
        }
    }
    const checkUser = () => {
        let Account = users.filter((user) => user.mail == Mail)
        if (Account != "" && Mail != "") {
            setMailExist(true)
            return true
        }
        setMailExist(false)
        return false
    }
    function addUser() {
        var user =
        {
            Fname: Fname,
            Lname: Lname,
            mail: Mail,
            pass: Password,
        };
        let newUsers = users.filter(() => true)
        newUsers.push(user)
        localStorage.setItem("myUsers", JSON.stringify(newUsers));
    }
    const testInputs = () => {
        let Mail_flag = validateMail();
        let Pass_flag = validatePass();
        let Fname_flag = validateFname();
        let Lname_flag = validateLname();
        let CheckUserFlag = checkUser()


        if (Mail_flag && Pass_flag && Fname_flag && Lname_flag && !CheckUserFlag) {
            addUser()
            history.push('/login')

        }



    }
    return (
        <div className="Registration">
            <div className="px-4 my-2">
                <h1 className="my-5 text-center">Registeration Form</h1>
                <div className="col-md-9 offset-md-2 mt-5">

                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className=" form-control mt-1 rounded"
                            onChange={(e) => setFname(e.target.value)}
                        />
                        {FnameAlert && <div className="alert my-2 ml-2 ">
                            Your first name is not valid, no space, special chars or numbers allowed
                        </div>}
                    </div>
                </div>
                <div className="col-md-9 offset-md-2 mt-5">

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control mt-1 rounded"
                            onChange={(e) => setLname(e.target.value)}
                        />
                        {LnameAlert && <div className="alert my-2 ml-2 ">
                            Your last name is not valid, no space, special chars or numbers allowed
                        </div>}
                    </div>
                </div>
                <div className="col-md-9 offset-md-2 mt-5">

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control mt-1 rounded"
                            onChange={(e) => setMail(e.target.value)}
                        />
                        {MailAlert && <div className="alert my-2 ml-2 ">
                            Your mail is not valid
                        </div>}
                        {MailExist && <div className="alert my-2 ml-2 ">
                            Your mail is already registered
                        </div>}
                    </div>
                </div >

                <div className="col-md-9 offset-md-2 mt-5">

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control mt-1 rounded"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {PasswordAlert && <div className="alert my-2 ml-2 ">
                            Your password is not valid, length must be 8 at least containing char and number
                        </div>}
                    </div>
                </div >
                <div className="col-md-9 offset-md-2 mt-2">
                    <button className="btn btn-info" onClick={() => testInputs()}>Register</button>

                </div>
                <p className="text-center mt-3 pb-5">Have an account? <Link to="/Login" className="text-primary text-decoration-none" >Sign In</Link></p>
            </div >
        </div>
    );
}

export default Registration;