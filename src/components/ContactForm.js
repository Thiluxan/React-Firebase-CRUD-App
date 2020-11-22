import React,{useState, useEffect} from 'react'

export default function ContactForm(props) {

    const initialFieldValues = {
        name: '',
        mobile: '',
        email: '',
        address: ''
    }

    const[values,setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values)

    }

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialFieldValues})
        }
        else {
            setValues({...props.contact[props.currentId]})
        }
    },[props.currentId,props.contact])

    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit} >
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </div>
                    </div>
                    <input 
                        type="text"
                        className="form-control" 
                        placeholder="Name"
                        name="name"
                        value={values.name} 
                        onChange={handleInputChange}
                        />
                </div>
                <div className="form-row">
                    <div className="form-group input-group col-md-6">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i class="fa fa-mobile" aria-hidden="true"></i>
                            </div>
                        </div>
                        <input 
                            type="text"
                            className="form-control" 
                            placeholder="Mobile"
                            name="mobile"
                            value={values.mobile} 
                            onChange = {handleInputChange}
                            />
                    </div>
                    <div className="form-group input-group col-md-6">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </div>
                        </div>
                        <input 
                            type="text"
                            className="form-control" 
                            placeholder="Email"
                            name="email"
                            value={values.email} 
                            onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <textarea 
                        className="form-control" 
                        placeholder="Address"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value={props.currentId == "" ? "Save" : "Update"} className="btn btn-primary btn-block"/>
                </div>
            </form>
        </div>
    )
}
