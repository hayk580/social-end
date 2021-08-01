import React from 'react';
import { GanttComponent, TaskFieldsModel, ColumnsDirective, ColumnDirective, Edit, Inject, Toolbar, Selection} from "@syncfusion/ej2-react-gantt";
import './Gantt.css';


export default function GanttDisplay() {
  const editOptions = {
    //Properties of Column API in React Gantt API component
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    mode:"Auto"
  };
  
  //Data to be give to dataSource property of GanttComponent
  const Data = [
    {
      Id: 1,
      Name: "Planning",
      StartTime: "4/1/2021", 
      EndTime: "4/15/2021",
      Progress: "Finished",
    },

    {
      Id: 2,
      Name: "Planning",
      StartTime: "6/1/2021", 
      EndTime: "5/15/2021",
      Progress: "Finished",
    },


    {
      Id: 3,
      Name: "Planning",
      StartTime: "4/3/2021", 
      EndTime: "4/11/2021",
      Progress: "Finished",
    },

    {
      Id: 4,
      Name: "Planning",
      StartTime: "4/8/2021", 
      EndTime: "4/17/2021",
      Progress: "Finished",
    },

    {
      Id: 5,
      Name: "Planning",
      StartTime: "4/9/2021", 
      EndTime: "4/10/2021",
      Progress: "Finished",
    },

    {
      Id: 6,
      Name: "Planning",
      StartTime: "4/10/2021", 
      EndTime: "4/10/2021",
      Progress: "Finished",
    },


    {
      Id: 7,
      Name: "Planning",
      StartTime: "4/18/2021", 
      EndTime: "4/15/2021",
      Progress: "Finished",
    },


    {
      Id: 8,
      Name: "Planning",
      StartTime: "4/20/2021", 
      EndTime: "4/25/2021",
      Progress: "Finished",
    },


    {
      Id: 9,
      Name: "Planning",
      StartTime: "4/17/2021", 
      EndTime: "4/19/2021",
      Progress: "Finished",
    },

    

  ];

  const taskValues: TaskFieldsModel = {
    //Properties of TaskFieldsModel API in React Gantt API component
    id: "Id",
    name:"Name",
    startDate: "StartTime",
    endDate: "EndTime"
  }
  return (
    <div>
        {/*GanttChart starts here */}
        <GanttComponent  dataSource={Data} taskFields={taskValues} editSettings={editOptions} toolbar={['Add','Edit','Delete','Update','Cancel']} allowSelection={true}>
            <Inject services={[Edit, Toolbar, Selection]}></Inject>
              <ColumnsDirective>
                  <ColumnDirective field="Id" headerText="Task No."></ColumnDirective>
                  <ColumnDirective field="Name" headerText="Title"></ColumnDirective>
                  <ColumnDirective field="StartTime" format="dd-MMM-yy"></ColumnDirective>
                  <ColumnDirective field="EndTime" format="dd-MMM-yy"></ColumnDirective>
                  <ColumnDirective field="Progress" headerText="Status"></ColumnDirective>
              </ColumnsDirective>
        </GanttComponent>
        {/*GanttChart ends here */}
    </div>
  );
}

