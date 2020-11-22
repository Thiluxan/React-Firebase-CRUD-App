import React,{useState,useEffect} from 'react'
import ContactForm from './ContactForm'
import firebaseDb from '../firebase'

export default function Contact() {

    const[contact,setContact] = useState({})
    const[currentId, setCurrentId] = useState('')

    useEffect(() =>{
        firebaseDb.child('contacts').on('value',snapshot => {
            if(snapshot.val() !== null){
                setContact({
                    ...snapshot.val()
                })
            }
            else{
                setContact({})
            }
        })
    },[])

    const addOrEdit = (obj) => {
        if(currentId==""){
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        setCurrentId("")
                    }
                }
            )
        }
        else{
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        setCurrentId("")
                    }
                }
            )
        }
        
    }

    const deleteCurrent = id => {
        if(window.confirm(`Are you sure you want to delete`)){
            firebaseDb.child(`contacts/${id}`).remove(
                err => {
                    if(err) {
                        console.log(err)
                    }
                    else{
                        window.location.replace('/')
                    }
                }
            )
        }
    }

    return (
        <React.Fragment>
            <div class="jumbotron jumbotron-fluid bg-warning">
                <div class="container">
                    <h1 class="display-4 text-center">Contact Application</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({addOrEdit,currentId,contact})} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr >
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contact).map(id => (
                                    <tr key={id}>
                                        <td>{contact[id].name}</td>
                                        <td>{contact[id].mobile}</td>
                                        <td>{contact[id].email}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => setCurrentId(id)}>EDIT</button>
                                            <button className="btn btn-danger" onClick={() => deleteCurrent(id)}>DELETE</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}
