import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


export class Group extends Component {

  
  render () {
    return (
      <div>

           <div className="row">
          <div className="col-sm-4 grid-margin">

            <div className="card">
              <div className="card-body">
              <Link to="/GroupPage">
   <h5>King Cobra</h5>
   </Link>

                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">55</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">ուսանող</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">խբմի ավարտելուն մնացել է 2 ամիս</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <img width="100" height="100" src='https://play-lh.googleusercontent.com/NVvBB2-65UjNdlyFg2Cv-DJqWe54yMfbG3rxAP2tRHInA-NLX61MCiUr0F_hrDINZpA=h1024-no-tmp_cobra_kai_wallpaper_apk.jpg' alt="face" />
                  </div>
                </div>
              </div>
            </div>
          </div>
         


          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Hummingbird</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">16</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">ուսանող</p>
                    </div>
                    <h6 className="text-muted font-weight-normal">խբմի ավարտելուն մնացել է 2 ամիս</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <img width="100" height="100" src='https://play-lh.googleusercontent.com/NVvBB2-65UjNdlyFg2Cv-DJqWe54yMfbG3rxAP2tRHInA-NLX61MCiUr0F_hrDINZpA=h1024-no-tmp_cobra_kai_wallpaper_apk.jpg' alt="face" />
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

export default Group;