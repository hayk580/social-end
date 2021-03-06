import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import { ProgressBar } from 'react-bootstrap';
import GanttDisplay from '../gantt/Gantt'
import { Navbar, Card} from "react-bootstrap";
import axios from 'axios';


export class BasicElements extends Component {
  
  state = {
    startDate: new Date(),

    username: "",
    firstname:"",
    lastname: "",
    email: "",
    gender: "",
    course: "",
    city: "",
    phone: "",
    address: "",
    users:[],

    

  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()

    axios.get("http://localhost:5000/admin/users")
    .then(res=> {
      const user = res.data;
      this.setState({
        users: user
      })
    })


  }


  handelName  = ({target}) => {
    this.setState({
      firstname: target.value
    });
  }

  handelLastName = ({target}) => {
    this.setState({
      lastname: target.value
    });  }

  handelEmail = ({target}) => {
    this.setState({
      email: target.value
    });  }

  handelGender = ({target}) => {
    this.setState({
      gender: target.value
    });  }
 
  handelCourse = ({target}) => {
    this.setState({
      course: target.value
    });  }
  
 
  handelCity = ({target}) => {
      this.setState({
        city: target.value
      });  }
 
  handelPhone = ({target}) => {
        this.setState({
          phone: target.value
        });  }
      
  handelAddress = ({target}) => {
      this.setState({
       address: target.value
       });  }        
      
       handelUsername = ({target}) => {
        this.setState({
         username: target.value
         });  }        

    makeUser = () => {
      const firstname = this.state.firstname
      const lastname = this.state.lastname 
      const email = this.state.email
      const username  = this.state.username
      const userData =  {
        full_name: firstname + " " + lastname,
        email: email,
        username: username
     }
      
     axios.post("http://localhost:5000/auth/reg", userData)
     .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {

      console.log(err)
    })
    }   

  render() {
    const {handelName} = this;
    const {handelLastName} = this;
    const {handelEmail} = this;
    const {handelGender} = this;
    const {handelCity} = this;
    const {handelCourse} = this;
    const {handelPhone} = this;
    const {handelAddress} = this;
    const {makeUser} = this;
    const {handelUsername} = this;
    return (
      <div>
       
        <div className ="row">
        
            <div className ="col-12 grid-margin stretch-card">
            <div className ="card">
              <div className ="card-body">
                <h4 className ="card-title">?????????????? ????????????????</h4>
                  
                <Form.Group>
                    <label htmlFor="exampleInput 1">????????????????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" "   onChange={handelUsername}/>

                  </Form.Group>


                  
                  <Form.Group>
                    <label htmlFor="exampleInput 1">??????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" "   onChange={handelName}/>

                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInput 1">????????????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" "   onChange={handelLastName}/>
                  </Form.Group>


                  <Form.Group>
                    <label htmlFor="exampleInput 3">???????????????????????? ??????????</label>
                    <Form.Control type="email" className ="form-control" id="exampleInput 3" placeholder=" " onChange={handelEmail} />
                  </Form.Group>
       
                    <Form.Group>
                    <label htmlFor="exampleSelectGender">??????</label>
                    <select className ="form-control" id="exampleSelectGender"  onChange={handelGender}>
                      <option value="male">????????????</option>
                      <option value ="famel">????????????</option>
                    </select>
                  </Form.Group>


                  <Form.Group>
                    <label htmlFor="exampleSelectGender">??????????????????</label>
                    <select className ="form-control" id="exampleSelectGender" onChange={handelCourse}>
                      <option value="d1">???????????????? 1</option>
                      <option value="d2">???????????????? 2</option>
                    </select>
                  </Form.Group>




                  <Form.Group>
                    <label>???????? ????????</label>
                    <div className ="custom-file">
                      <Form.Control type="file" className ="form-control visibility-hidden" id="customFileLang" lang="es"/>
                      <label className ="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputCity1">??????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInputCity1" placeholder=" " onChange={handelCity}  />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputCity1">??????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInputCity1" placeholder=" "  onChange={handelAddress}/>
                  </Form.Group>
                
                  <Form.Group>
                    <label htmlFor="exampleInputCity1">??????????????????????????</label>
                    <Form.Control type="text" className ="form-control" id="exampleInputCity1" placeholder=" " onChange={handelPhone} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleTextarea1">????????????????????????????</label>
                    <textarea className ="form-control" id="exampleTextarea1" rows="4"></textarea>
                  </Form.Group>
                  <button  className ="btn btn-primary mr-2" onClick={makeUser}>????????????????</button>
              </div>
            </div>
          </div>

        <div className ="col-lg-12 grid-margin stretch-card">
            <div className ="card">
              <div className ="card-body">
                <h4 className ="card-title">?????????????????????? ????????</h4>

                <div className ="table-responsive">
                  <table className ="table table-striped">
                    <thead>
                      <tr>
                        <th>  </th>
                        <th> ?????????? ???????????????? </th>
                        <th> ?????????????????? </th>
                        <th> ?????????????????? </th>
                        <th> ?????????????????????? ?????????????? </th>
                      </tr>
                    </thead>
                    <tbody>


                     {this.state.users.map(user=>                       <tr>
                        <td className ="py-1">
                          <img src={require("../../assets/images/faces/face1.jpg")} alt="user icon" />
                        </td>
                        <td>{user.full_name}</td>
                        <td>
                          <ProgressBar variant="success" now={25} />
                        </td>
                        <td>  </td>
                        <td> May 15, 2015 </td>
                      </tr>
                     )  
                  }



                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    )
  }
}

export default BasicElements
