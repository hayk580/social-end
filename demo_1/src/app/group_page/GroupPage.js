import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"

import { Link, withRouter } from 'react-router-dom';

export class GroupPage extends Component {

  render () {
    return (
      <div>

       
        <div className="row">
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title">Նամակներ</h4>
                  <p className="text-muted mb-1 small">View all</p>
                </div>
                <div className="preview-list">
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img src={require('../../assets/images/faces/face6.jpg')} alt="face" className="rounded-circle" />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Leonard</h6>
                          <p className="text-muted text-small">5 minutes ago</p>
                        </div>
                        <p className="text-muted">Դե, կարծես թե հիմա աշխատում է.</p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img src={require('../../assets/images/faces/face8.jpg')} alt="face" className="rounded-circle" />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Luella Mills</h6>
                          <p className="text-muted text-small">10 Minutes Ago</p>
                        </div>
                        <p className="text-muted">Դե, կարծես թե հիմա աշխատում է:.</p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img src={require('../../assets/images/faces/face9.jpg')} alt="face" className="rounded-circle" />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Ethel Kelly</h6>
                          <p className="text-muted text-small">2 Hours Ago</p>
                        </div>
                        <p className="text-muted">քիչմ օպտիմիզացնեք բալասները</p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img src={require('../../assets/images/faces/face11.jpg')} alt="face" className="rounded-circle" />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Herman May</h6>
                          <p className="text-muted text-small">4 Hours Ago</p>
                        </div>
                        <p className="text-muted">Շատ շնորհակալություն. Դա հեշտ էր շտկել:.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Ընթացիկ դասեր</h4>
                  {/* <p className="text-muted mb-1">Your data status</p> */}
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                          <Link to="/LessonPage">  <h6 className="preview-subject">Դաս 1</h6></Link>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Վարդան Գրիգորյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <div className="badge -outline-success">ավարտված</div>

                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>


                        
                      </div>





                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                          <h6 className="preview-subject">Դաս 2</h6>
                          <p className="text-muted mb-0"><span className="">Դասախոս: </span> Վարդան Գրիգորյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <div className="badge -outline-success">ավարտված</div>

                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>


                        
                      </div>




                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                          <h6 className="preview-subject">Դաս 3</h6>
                          <p className="text-muted mb-0"><span className="">Դասախոս: </span> Վարդան Գրիգորյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <div className="badge -outline-success">ավարտված</div>

                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>
                        
                      </div>



                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                          <h6 className="preview-subject">Դաս 4</h6>
                          <p className="text-muted mb-0"><span className="">Դասախոս: </span> Վարդան Գրիգորյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <div className="badge -outline-success">հետաձգված</div>

                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>
                        
                      </div>







                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                          <h6 className="preview-subject">Դաս 5</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Վարդան Գրիգորյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>
                        
                      </div>




                
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
              <div className="card-body">
                <h4 className="card-title">Ոսանողներ</h4>
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
                        <th> Խումբը </th>
                        <th> Առաջադիմությունը </th>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
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
}

export default GroupPage;