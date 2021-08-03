import React, { Component, useState } from 'react';

import axios from 'axios';
import { useParams, Link } from "react-router-dom";

import { Modal, Button, Form } from 'react-bootstrap';
export default function SingleCoursePage() {

  
  const {slug} = useParams();
  const [modelesdata, setModulesdata] = useState([]); 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [handeluser, sethandeluser] = useState([]);

       
React.useEffect(() => {

  // axios.get("http://localhost:3001/api/getcourses/course_modules/" + slug)
  //    .then(res => {
  //      const datas = res.data;
  //      setModulesdata(datas)
  //    })

     axios.get("http://localhost:3001/api/admin/users")
     .then(res => {
       const data = res.data
        setUsers(data)
      })

 
});

console.log(handeluser)

const handelUser = ({target}) =>{
  sethandeluser(target)

}
       



    return (

      
      <div>

<>
      <Modal show={show} onHide={handleClose}       size="lg"  >
        <Modal.Header closeButton>
          <Modal.Title>ավելացնել ուսանողներ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-12 grid-margin">
            <div className="card">
              

              <div className="card-body">

                <h4 className="card-title">ուսանողներ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                       <th>հ/հ</th>
                        <th>
                         նշել
                        </th>
                        <th>  անուն  </th>
                        <th> ազգանուն </th>
                        <th> Էլեկտրոնային հասցե </th>
                      </tr>
                    </thead>
                    <tbody>
                    {  users.map(user => 
                      <tr>
                        <td></td>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" value={user._id}  checked={handelUser} />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                           {user.firstname}
                        </td>
                        <td>{user.lastname} </td>
                        <td>{user.email} </td>
                     
                      </tr>
          )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    









        <div className="row">
        
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Դասընթացում առկա մոդուլներ</h4>
                  {/* <p className="text-muted mb-1">Your data status</p> */}
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      {modelesdata.map( data =>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-lightbulb-on-outline"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                         <Link to="/CourseModule">
                          <div className="flex-grow">
                            <h6 className="preview-subject">{data.title}</h6>
                            {/* <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p> */}
                          
                          </div>
                          </Link>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>
             
                      </div>
                      )}




                    




                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
     
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              
            <Button onClick={handleShow}>ավելացնել ուսանողներ</Button>

              <div className="card-body">

                <h4 className="card-title">Դասընթացում գրանցված ուսանողներ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> ուսանողի անուն  </th>
                        <th> համարը </th>
                        <th> Ընդուվելու տարեթիվը </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face2.jpg')} alt="face" />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face5.jpg')} alt="face" />
                            <span className="pl-2">Lucy Abbott</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face3.jpg')} alt="face" />
                            <span className="pl-2">Peter Gill</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face4.jpg')} alt="face" />
                            <span className="pl-2">Sallie Reyes</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Դասընթացին մասնակից աշխատակազմ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> ուսանողի անուն  </th>
                        <th> Մասնագիտությունը </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> դասախոս  </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face2.jpg')} alt="face" />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> դասախոս </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
               
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>













      </div> 
    );
  }

