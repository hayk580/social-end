import React from 'react';

import Gantt, { Tasks, Dependencies, Resources, ResourceAssignments, Column, Editing, Toolbar, Item, Validation } from 'devextreme-react/gantt';

import { tasks, dependencies, resources, resourceAssignments } from './data.js';

import axios from 'axios';

class App extends React.Component {

  state = {
    datas: []
  }



     savechanges = () => {
     
      this.state.datas.map(task => {
         console.log(task)

           axios.post("http://localhost:3001/api/course/create", task)
       })
    
      }


      componentDidMount()

      {

        axios.get("http://localhost:3001/api/getcourses/all")
        .then(res => {
          const datas = res.data;
          this.setState({ datas });
        })
    }      

    


  render() {
    const {savechanges} = this;
    return (
<div>      
      <Gantt
        taskListWidth={500}
        scaleType="months"
        height={700}>

        <Tasks dataSource={this.state.datas} />
        <Dependencies dataSource={dependencies} />
        <Resources dataSource={resources} />
        <ResourceAssignments dataSource={resourceAssignments} />

        <Toolbar>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item name="collapseAll" />
          <Item name="expandAll" />
          <Item name="separator" />
          <Item name="addTask" />
          <Item name="deleteTask" />
          <Item name="separator" />
          <Item name="zoomIn" />
          <Item name="zoomOut" />

        </Toolbar>

        <Column dataField="title" caption="Subject" width={300} />
        <Column dataField="start" caption="Start Date" />
        <Column dataField="end" caption="End Date" />

        <Validation autoUpdateParentTasks={true} />
        <Editing enabled={true} />
      </Gantt>
      <button onClick={savechanges}>save</button>

</div>
    
    );
  }
}

export default App;
