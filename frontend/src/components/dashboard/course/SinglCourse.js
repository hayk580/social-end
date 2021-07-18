import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeworks } from "../../../redux/actions"
import { BACKEND_SERVER_DOMAIN } from '../../../settings'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { useParams, Link } from 'react-router-dom';

import { setCourse_modules } from "../../../redux/actions"
import { setPosts } from "../../../redux/actions"


export default function Course_modulesSingle({userposts}) {


    const user = useSelector((state) => state.user);
    const homeworks = useSelector((state) => state.course_module.course_module);
    const dispatch = useDispatch();
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const posts = useSelector((state) => state.course_module.course_module);
  const   [itemsFromBackend, setitemsFromBackend] = React.useState([]);
  const [result, setResult] = React.useState();
    // const [course_modules, setCourse_modules] = React.useState();
    const {course_id} = useParams();


    const [isLoading, setIsLoading] = React.useState(true)
    const [count, setCount] = useState();




  useEffect(() => {
 
    let config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' +  Token,   
      },
  };
  axios
      .get(BACKEND_SERVER_DOMAIN + "/getcourse_modules/all/", config)
      .then(function (response) {
        setResult(response.data.reverse())
        // dispatch(setCourse_modules(response.data.reverse()));
    })
    .catch(function (err) {
        console.log(err);
        dispatch(setCourse_modules([]));
    });

 
},[])

 
if (result) {
  
  result.map(res => {
  
    console.log("sss" + res)
    itemsFromBackend.push(res)
  
  })
  
} 



let  columnsFromBackend = {
    [uuid()]: {
      name: "Առկա Կուրսեր",
      items: itemsFromBackend
    },
    ["uuid"]: {
      name: "Ավելացնել Կուրս",
      items: []
    },
    [uuid()]: {
      name: "Սկսված Կուրսեր",
      items: []

    }
  };



  const [columns, setColumns] = useState(columnsFromBackend);


  const saveData = () => {

   const a =  columns.uuid.items;
   for(let i = 0; i < a.length; i++)
  {
 
   console.log("to do list" + a[i]._id)
   let config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' +  Token,   
    },
};
axios
    .post(BACKEND_SERVER_DOMAIN + "/course/addcoursemodule/" + course_id + "/" + a[i]._id , config)
    .then(function (response) {
      setResult(response.data.reverse())
      // dispatch(setCourse_modules(response.data.reverse()));
  })
  .catch(function (err) {
      console.log(err);
      dispatch(setCourse_modules([]));
  });

 
  }


}



  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

return (
    <div style={{ display: "flex",  height: "40%", marginTop: "10%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 200,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                     
                                    }}
                                  >
                                    {item.title}
                                      </div>
                                      
                                );


                                
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>

      <div>
           <button onClick= {saveData}>Save</button>

    </div>


    </div>

  );
}
