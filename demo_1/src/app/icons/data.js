/**
 * Gantt DataSource
 */
 Object.defineProperty(exports, "__esModule", { value: true });

 exports.resourcesData = [
     {
         TaskID: 1,
         TaskName: 'Devops Course',
         StartDate: new Date('03/29/2019'),
         EndDate: new Date('04/21/2019'),
         subtasks: [
             {
                 TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2019'), Duration: 3,
                 Progress: 30, work: 10, resources: [{ resourceId: 1, resourceUnit: 50 }]
             },
             {
                 TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/03/2019'), Duration: 4,
                 resources: [{ resourceId: 1, resourceUnit: 70 }], Predecessor: 2, Progress: 30, work: 20
             },
             {
                 TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/09/2019'), Duration: 4,
                 resources: [{ resourceId: 1, resourceUnit: 25 }], Predecessor: 3, Progress: 30, work: 10,
             },
         ]
     },


 ];
 exports.resourceCollection = [
     { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team', isExpand: false },
 ];