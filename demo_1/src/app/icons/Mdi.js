import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective, RowDD } from '@syncfusion/ej2-react-gantt';
import { resourcesData, resourceCollection } from './data';
export default class Mdi extends React.Component {
  constructor() {
    super(...arguments);
    this.resourceData = [
      {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('03/29/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
          {
            TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2019'), Duration: 2,
            Progress: 30, work: 16, resources: [{ resourceId: 1, unit: 70 }, 6]
          },
          {
            TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('03/29/2019'), Duration: 4,
            resources: [2, 3, 5], work: 96
          },
          {
            TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('03/29/2019'), Duration: 1,
            work: 16, resources: [8, { resourceId: 9, unit: 50 }], Progress: 30
          },
        ]
      },
      {
        TaskID: 5,
        TaskName: 'Project estimation', StartDate: new Date('03/29/2019'), EndDate: new Date('04/21/2019'),
        subtasks: [
          {
            TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('03/29/2019'),
            Duration: 3, Progress: 30, resources: [{ resourceId: 4, unit: 50 }], work: 30
          },
          {
            TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/01/2019'), Duration: 3,
            work: 48, resources: [4, 8]
          },
          {
            TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/01/2019'),
            Duration: 2, work: 60, resources: [12, { resourceId: 5, unit: 70 }]
          }
        ]
      },
      {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/01/2019'), Duration: 1,
        Progress: 30, resources: [12], work: 24
      }
    ];
    this.resourceResources = [
      { resourceId: 1, resourceName: 'Martin Tamer' },
      { resourceId: 2, resourceName: 'Rose Fuller' },
      { resourceId: 3, resourceName: 'Margaret Buchanan' },
      { resourceId: 4, resourceName: 'Fuller King' },
      { resourceId: 5, resourceName: 'Davolio Fuller' },
      { resourceId: 6, resourceName: 'Van Jack' },
      { resourceId: 7, resourceName: 'Fuller Buchanan' },
      { resourceId: 8, resourceName: 'Jack Davolio' },
      { resourceId: 9, resourceName: 'Tamer Vinet' },
      { resourceId: 10, resourceName: 'Vinet Fuller' },
      { resourceId: 11, resourceName: 'Bergs Anton' },
      { resourceId: 12, resourceName: 'Construction Supervisor' }
    ];
    this.taskFields = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      
      resourceInfo: 'resources',
      work: 'work',
      child: 'subtasks',
      expandState: 'isExpand',
    };
    this.resourceFields = {
      id: 'resourceId',
      name: 'resourceName',      
      group: 'resourceGroup'
    };
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
    };
    this.templateTaskbar = this.taskbarTooltip;
    this.tooltipSettings = {
      showTooltip: true,
      taskbar: this.templateTaskbar.bind(this)
    };
    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
      { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }];
    this.splitterSettings = {
      columnIndex: 3
    };
    this.projectStartDate = new Date('03/28/2019');
    this.projectEndDate = new Date('05/18/2019');
    this.labelSettings = {      
      taskLabel: 'Progress'
    };
  }
  taskbarTooltip(props) {
    var src = 'images/' + props.ganttProperties.taskName + '.png';
    return (    
    <table>
      {props.hasChildRecords && props.TaskName &&   
        <tr>
          <td rowSpan={3} style={{ padding: '3px' }}><img src={src} height='40px' /></td>
          <td style={{ padding: '3px' }}>Task done By:</td>
          <td style={{ padding: '3px' }}>{props.ganttProperties.taskName}</td>
        </tr>}        
      <tr>
        <td style={{ padding: '3px' }}>Starts On:</td>
        <td style={{ padding: '3px' }}>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
      </tr>
      <tr>
        <td style={{ padding: '3px' }}>Ends On:</td>
        <td style={{ padding: '3px' }}>{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
      </tr>
    </table>);
  };
  toolbarClick(args) {
    if (args.item.id === 'showhidebar') {
      this.ganttInstance.showOverAllocation = this.ganttInstance.showOverAllocation ? false : true;
    }
  };
  render() {
    return (
      <GanttComponent id='ResourceView' dataSource={resourcesData} treeColumnIndex={1} viewType='ResourceView'
        allowSelection={true} allowResizing={true} highlightWeekends={true} toolbar={this.toolbar}
        toolbarClick={this.toolbarClick.bind(this)} editSettings={this.editSettings}
        enableMultiTaskbar= {true}
        projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
        allowRowDragAndDrop={true} resourceFields={this.resourceFields} taskFields={this.taskFields}
        tooltipSettings={this.tooltipSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
        height='410px' resources={resourceCollection} showOverAllocation={true} ref={gantt => this.ganttInstance = gantt}>
        <ColumnsDirective>
          <ColumnDirective field='TaskID' visible={false}></ColumnDirective>
          <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
          <ColumnDirective field='work' headerText='Work'></ColumnDirective>
          <ColumnDirective field='Progress'></ColumnDirective>
          <ColumnDirective field='resourceGroup' headerText='Group'></ColumnDirective>
          <ColumnDirective field='StartDate'></ColumnDirective>
          <ColumnDirective field='Duration'></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Selection, DayMarkers, Toolbar, Edit, Resize, RowDD]} />
      </GanttComponent>
    );
  }
};