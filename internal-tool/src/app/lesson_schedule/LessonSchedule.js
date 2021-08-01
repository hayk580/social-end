import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
export default function() 
{
    return(
 
        <div>
  
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0"></h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0"></h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"> </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0"></h3>
                      <p className="text-danger ml-2 mb-0 font-weight-medium"></p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-danger">
                      <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"> </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0"></h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
            </div>
          </div>
        </div> 
       
        

       
        <div className="row ">





  
        <div className ="col-12 grid-margin stretch-card">
            <div className ="card">
              <div className ="card-body">
                <h4 className ="card-title">Ստեղծել նոր դասընթաց</h4>
                  
                <Form.Group>
                    <label htmlFor="exampleInput 1">Վերնագիր</label>
                    <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" "  />

                  </Form.Group>
       
                  <Form.Group>
                    <label htmlFor="exampleInput 1">Վերնագիր</label>
                    
                    <Form.Control type="checkbox" className ="form-control checkbox" id="exampleInput 1" placeholder=" "   />

                  </Form.Group>


                  
                  <Form.Group>
                    <label htmlFor="exampleInput 1">Նկարագրություն</label>
                    <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" "   />

                  </Form.Group>

                  <button  className ="btn btn-primary mr-2"  >Պահպանել</button>
              </div>
            </div>
          </div>






          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">դասընթացների ցանկ</h4>
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
                        <th> դասընթացի Վերնագիր  </th>
                        <th> համարը </th>
                        <th> Խումբը </th>
                        <th> Վիճակը </th>
                        <th> սկսվելու տարեթիվը </th>
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
                            <span className="pl-2"></span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> King Cobra </td>
                        <td> good </td>
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
      </div> 
    )
}