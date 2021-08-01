import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"

const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

export class Payment extends Component {

  transactionHistoryData =  {
    labels: ["c++", "java","node.js"],
    datasets: [{
        data: [55, 25, 20],
        backgroundColor: [
          "#111111","#00d25b","#ffab00"
        ]
      }
    ]
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
          borderWidth: 0
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Դասընթացներ</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">55</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">+ 3 այս ամիս</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">11.38% Անցյալ ամիսվանից</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Ուսանողներ</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">45850</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">+8 այս ամիս</p>
                    </div>
                    <h6 className="text-muted font-weight-normal"> 9.61% Անցյալ ամիսվանից</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Աշխատակիցներ</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">2039</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">-2 այս ամիս </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">2.27% Անցյալ ամիսվանից</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ինչ֊որ բանի վերլուծություն</h4>
                <div className="aligner-wrapper">
                  <Doughnut data={this.transactionHistoryData} options={this.transactionHistoryOptions} />
                  <div className="absolute center-content">
                    <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">1200</h5>
                    <p className="text-small text-muted text-center mb-0">Total</p>
                  </div>
                </div>  
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">արդյունք Ինչ֊որ բանի 1</h6>
                    <p className="text-muted mb-0">07 Jan 2021, 09:12AM</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">2360</h6>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">արդյունք Ինչ֊որ բանի 1</h6>
                    <p className="text-muted mb-0">07 Jan 2021, 09:12AM</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">5934</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Առկա դասընթացներ</h4>
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
                            <h6 className="preview-subject">Մաթեմատիկա արհեստական բանականության և մեքենայական ուսուցման համար</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
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
                            <h6 className="preview-subject">ԱԹՍ նախագծում և ծրագրավորում դասընթացի ծրագիրը</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
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
                            <h6 className="preview-subject">Դիսկրետ մաթեմատիկայի առցանց դասընթաց</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
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
                            <h6 className="preview-subject">Algorithms by Cormen</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
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
                            <h6 className="preview-subject">Python և նրա կիրառությունները տվյալների գիտությունում և մեքենայական ուսուցումում,հավանականության և մաթեմատիկական վիճակագրության տեսության տարրերը։</h6>
                            <p className="text-muted mb-0"><span className="">Դասախոս: </span> Գրիգոր Կիրակոսյան</p>
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
          {/* <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Portfolio Slide</h4>
                <Slider className="portfolio-slider" {...this.sliderSettings}>
                  <div className="item">
                    <img src={require('../../assets/images/dashboard/Rectangle.jpg')} alt="carousel-item" />
                  </div>
                  <div className="item">
                    <img src={require('../../assets/images/dashboard/Img_5.jpg')} alt="carousel-item" />
                  </div>
                  <div className="item">
                    <img src={require('../../assets/images/dashboard/img_6.jpg')} alt="carousel-item" />
                  </div>
                </Slider>
                <div className="d-flex py-4">
                  <div className="preview-list w-100">
                    <div className="preview-item p-0">
                      <div className="preview-thumbnail">
                        <img src={require('../../assets/images/faces/face12.jpg')} className="rounded-circle" alt="face" />
                      </div>
                      <div className="preview-item-content d-flex flex-grow">
                        <div className="flex-grow">
                          <div className="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 className="preview-subject">CeeCee Bass</h6>
                            <p className="text-muted text-small">4 Hours Ago</p>
                          </div>
                          <p className="text-muted">Well, it seems to be working now.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted">Well, it seems to be working now. </p>
                <div className="progress progress-md portfolio-progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-12 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Անելիքների ցանկ</h4>
                <TodoListComponent />
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
                        <th> Վճարման կարգավիճակ </th>
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
                        <td> King Cobra </td>
                        <td> good </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-warning">Վճարված չէ</div>
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
                          <div className="badge badge-outline-danger">ՈՒշացված</div>
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
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ուսանողներ արտերկրից</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium"> 56.35% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium"> 33.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium"> 15.45% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium"> 25.00% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium"> 10.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium"> 75.00% </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" //change it to ocean blue: #0077be
                    panOnDrag={true}
                    containerClassName="dashboard-vector-map"
                    focusOn= { {
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true
                    }}
                    series={{
                      regions: [{
                        scale: ['#3d3c3c', '#f2f2f2'],
                        normalizeFunction: 'polynomial',
                        values: mapData
                      }]
                    }}
                  />
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

export default Payment;