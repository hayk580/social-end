import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import { Link, withRouter } from 'react-router-dom';

import { Form } from 'react-bootstrap';

import axios from 'axios';
export class CoursePage extends Component {
  state =  {
    datas: []
  }

componentDidMount()
 {
  axios.get("http://localhost:3001/api/getcourses/all")
  .then(res => {
    const datas = res.data;
    this.setState({ datas });
    console.log(JSON.stringify(datas))

  })

}

  render () {
    return (
      <div>
{/*  
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">1420</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Number of students</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$17.34</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Revenue current</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$12.34</h3>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-danger">
                      <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Daily Income</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$31.53</h3>
                      <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">Expense current</h6>
              </div>
            </div>
          </div>
        </div> */}

             

           <div className="row">
          <div className="col-sm-4 grid-margin" style={{border: '1px solid red'}}>
            <div className="card">
              <div className="card-body">
                <h5>Լսարան համար 1</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">55</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">ուսանողի համար նախատեսված</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">100% զբաղվածություն  </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin" >
            <div className="card">
              <div className="card-body">
              <h5>Լսարան համար 2</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">25</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">ուսանողի համար նախատեսված</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">30% զբաղվածություն  </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto" ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
              <h5>Լսարան համար 3</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">36</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">ուսանողի համար նախատեսված</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">50.27% զբաղվածություն  </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
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
            <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" " />

          </Form.Group>

          
          <Form.Group>
            <label htmlFor="exampleInput 1">Նկարագրություն</label>
            <Form.Control type="text" className ="form-control" id="exampleInput 1" placeholder=" " />

          </Form.Group>

          <button  className ="btn btn-primary mr-2">Պահպանել</button>
      </div>
    </div>
  </div>


</div>
        <div className="row">
        
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Առկա դասընթացներ</h4>
                  {/* <p className="text-muted mb-1">Your data status</p> */}
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
{this.state.datas.map(data => (data.parentId == "") ? 
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                        <Link to={ "/SingleCoursePage/" + data.id}>

                          <div className="flex-grow">
                            <h6 className="preview-subject">{data.title }</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
                          </div>
                         </Link>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            {/* <p className="text-muted"><span className="">Դասախոս: </span> Գ․Կիրակոսայան</p> */}
                            {/* <p className="text-muted mb-0">30 tasks, 5 issues </p> */}
                          </div>
                        </div>


                        
                      </div>

                      : ""


)}



                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     


      </div> 
    );
  }
}

export default CoursePage;