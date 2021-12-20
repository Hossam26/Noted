import './Profile.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEllipsisV } from 'react-icons/fa';
const Profile = () => {
    const [notes, setNotes] = useState(null)
    const [Id, setId] = useState(null)
    let history = useHistory("")
    let last = JSON.parse(localStorage.getItem("lastIndex"));
    let users = JSON.parse(localStorage.getItem("myUsers"));
    useEffect(() => {
        var valid = localStorage.getItem("token");
        if (valid != "true") {
            history.push("/login")
        }
        var check = localStorage.getItem(users[last].mail);
        if (check != null) {
            setNotes(JSON.parse(localStorage.getItem(users[last].mail)))
        }
        else {
            setNotes([])
        }

    }, [])
    const addNote = () => {
        let newNotes = notes.filter(() => true)
        let newNote = {
            title: document.getElementById("newTitle").value,
            desc: document.getElementById("newDesc").value,
        }
        newNotes.push(newNote)
        setNotes(newNotes)
        resetAddModal();
        localStorage.setItem(users[last].mail, JSON.stringify(newNotes));
    }
    const DeleteNote = (id) => {
        const newNotes = notes.filter(note => note !== notes.at(id))
        setNotes(newNotes);
        localStorage.setItem(users[last].mail, JSON.stringify(newNotes));

    }
    const updateNote = () => {
        const newNotes = notes.filter(note => note !== notes.at(Id))
        let newNote = {
            title: document.getElementById("currentTitle").value,
            desc: document.getElementById("currentDesc").value,
        }
        newNotes.splice(Id, 0, newNote)
        setNotes(newNotes)
        localStorage.setItem(users[last].mail, JSON.stringify(newNotes));

    }
    const resetEditModal = () => {
        document.getElementById("currentTitle").value = "";
        document.getElementById("currentDesc").value = "";
    }

    const resetAddModal = () => {
        document.getElementById("newTitle").value = "";
        document.getElementById("newDesc").value = "";
    }
    const setCurNote = (id, title, desc) => {
        setId(id)
        document.getElementById("currentTitle").value = title;
        document.getElementById("currentDesc").value = desc;
    }
    return (

        <div className="profile">

            <div className="container">
                <div className="row justify-content-center">

                    <input type="button" value="Add New Note..." className="p-2 pl-4 mt-3 w-75 font-weight-bold text-left bg-transparent add_btn" data-toggle="modal" data-target="#addNote" />


                </div>
                <div className="row " >
                    {notes && notes.map((note, i) => (

                        <div className="col-md-4 my-5" key={i} >
                            <div className="note shadow p-3 text-center"  >
                                <div className="row">
                                    <div className="col-12">

                                        <div className="dropdown">
                                            <FaEllipsisV className="float-right" color='white' role="button" id="dropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <a className="dropdown-item d-flex justify-content-between" onClick={() => setCurNote(i, note.title, note.desc)} data-toggle="modal"
                                                    data-target="#editNote">
                                                    <span className="text-left text-white"  >Edit Note</span>
                                                    <FaEdit className=" text-right text-white"></FaEdit>

                                                </a>
                                                <a className="dropdown-item d-flex justify-content-between " onClick={() => DeleteNote(i)}>
                                                    <span className="text-left text-white "  >delete Note</span>
                                                    <FaTrashAlt className="far fa-trash-alt text-right text-white " />
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-left font-weight-bold ">{note.title}</h3>
                                <p className="text-left">{note.desc}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="modal fade" id="addNote" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form >
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">Hi {users[last].Fname},</h3>
                                <button type="button" className="close text-white" data-dismiss="modal" onClick={() => resetAddModal()} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control mb-2" id='newTitle' placeholder="Title" />
                                <textarea className="form-control" id='newDesc' cols="50" rows="10" placeholder="Add your note..."
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => addNote()} >Add</button>
                                <button type="button" className="btn btn-danger" onClick={() => resetAddModal()} data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div >
                </div >
            </div >




            <div className="modal fade" id="editNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">Edit Your Note</h3>
                                <button type="button" className="close text-white" data-dismiss="modal" onClick={() => resetEditModal()} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control mb-2" id='currentTitle' placeholder="Title" />
                                <textarea className="form-control" id='currentDesc' cols="50" rows="10" placeholder="Edit Your Note"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => updateNote()} data-dismiss="modal">Update</button>
                                <button type="button" className="btn btn-secondary" onClick={() => resetEditModal()} data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
        </div>

    );
}

export default Profile;