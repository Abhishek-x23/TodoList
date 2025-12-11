import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [index1,setindex1]=useState(0)
  const [editOn,seteditOn]=useState(0)
  const [hide,setHide]=useState(0)
  const saveTodos = (params) => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }

// Load once when component mounts
useEffect(() => {
  const newTodos = JSON.parse(localStorage.getItem("Todos")) || [];
  setTodos(newTodos);
}, []);

// Save every time Todos changes
useEffect(() => {
  localStorage.setItem("Todos", JSON.stringify(Todos));
}, [Todos]);

  

  const handleAdd = () => {
    const newTodo = {
      id: Date.now(),
      text: Todo,
      isCompleted: false,
    };
    if (Todo.trim() === "") return;
    setTodos([...Todos, newTodo]);
    setTodo("");
    saveTodos()
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      editOn==0 ?  handleAdd() : handleUpdate()
    }
    saveTodos()
  };

  const handleCheck = (e) => {
    let id = Number(e.target.name);
   const updatedTodos = Todos.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  setTodos(updatedTodos);

  };



  const handleEdit = (e) =>
     {
      seteditOn(1)
      let id= Number(e.target.name)
      const editTodo=Todos.find((Todo)=>
        Todo.id == id 
      )
      if(editTodo != ""){
        setTodo(editTodo.text) 
      }else{ 
        setTodo("")
      }
      setindex1(id)
      saveTodos()

     };
     const handleUpdate = ()=>{
        const newTodos = Todos.map(item=>{
          return  index1 == item.id ? {...item,text:Todo} : item
        })
        setTodos(newTodos)
        seteditOn(0)
        setTodo("")
        saveTodos()
     }

  const toggleHide = ()=>{
    hide == 0 ? setHide(1):setHide(0)
  }

  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };


  const handleDelete = (e) => {
      let id = Number(e.target.name)
      
      const newTodos=Todos.filter(e=>{
        return e.id != id
      })
      setTodos(newTodos)
      saveTodos()
  };

  const handleClear =()=>{
  let res= confirm("Are you sure you want to delete all Todo Tasks")
  console.log(res)
  if(res){
   localStorage.removeItem("Todos");
   window.location.reload();
  }
};
  

  return (
    <>
      <Navbar onClear={handleClear} />
      {/* <div className="box h-25 w-25 bg-amber-300 border-black border-2 font-bold ">hi </div> */}
      <div className="yourTodods mx-12 h-[80vh] my-5 rounded-2xl bg-[#decff0] p-5 pl-8 overflow-y-scroll   ">
        <div className="addTodo">
          <h2 className="font-bold text-xl ">Add Todo</h2>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={Todo}
            className="bg-white w-[50vw]  rounded-xl mx-4 my-3 px-4 py-1 "
            placeholder="write here"
          />
          {editOn==0 && <button
            onClick={handleAdd}
            className="bg-blue-800 cursor-pointer text-md px-2 py-1 font-semibold text-white rounded-xl"
          >
            Add
          </button>}
          {editOn==1 && <button
            onClick={handleUpdate}
            className="bg-blue-800 cursor-pointer text-md px-2 py-1 font-semibold text-white rounded-xl"
          >
            update
          </button>}
        </div>
        <div className="hideCheckbox flex gap-5">
          <input type="checkbox" className="hideCompleted" onChange={toggleHide}/>
            <div>Hide completed Todos</div>
        </div>
        <div className="YourTodo"></div>
        <h2 className="font-bold text-xl ">Your Todos</h2>
        {Todos.length==0 && <div className="m-5">No Todos to display </div>}
        <div className="checkTodo flex flex-col gap-2  items-center">
          
          
          
       
          {(hide==0?Todos:Todos.filter(e=>e.isCompleted == false)).map((item) => {
            return (
              <div key={item.id} className="todo flex justify-between mx-5">
                <div className="w-[60vw] flex  flex-wrap wrap-anywhere ">
                  <div className="w-[5vw]">

                  <input name={item.id} className="" onChange={handleCheck} checked={item.isCompleted} type="checkbox" />
                  </div>

                  <div className={item.isCompleted ? "line-through text-gray-600" : ""}>
                    {item.text}
                  </div>
                </div>
                <div className="buttons w-[20vw] flex h-fit  justify-center">
                  <button
                    onClick={handleEdit} name={item.id}
                    className="bg-blue-800 cursor-pointer text-md mx-2 px-2 py-1 font-semibold text-white rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete} name={item.id}
                    className="bg-blue-800 cursor-pointer text-md mx-2 px-2 py-1 font-semibold text-white rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
