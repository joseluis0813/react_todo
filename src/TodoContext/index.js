import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {

    const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    /*console.log('log 1');
    React.useEffect(() =>{
      console.log('log 2');
    },[totalTodos]);
  
    console.log('log 3');*/

    const searchedTodos = todos.filter(todo => (todo.text.toLowerCase().includes(searchValue.toLowerCase())));

    //console.log('los usuarios buscan ' + searchValue);
    const addTodo = (text)=>{
        const newTodos = [...todos];
        newTodos.push({text, completed:false});
        saveTodos(newTodos);
    }

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );

        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);

    }

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos)
    }



    return (
        <TodoContext.Provider value={
            {
                loading,
                error,
                completedTodos,
                totalTodos,
                searchValue,
                setSearchValue,
                searchedTodos,
                completeTodo,
                deleteTodo,
                openModal,
                setOpenModal,
                addTodo
            }
        }>
            {children}
        </TodoContext.Provider>
     
    )

}


export { TodoContext, TodoProvider };