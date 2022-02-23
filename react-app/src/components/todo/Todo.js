import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const [listView, setListView] = useState(null);
    useEffect(() => {
        getTodoList();
    }, []);
    const gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const getTodoList = async () => {
        const res = await axios.get(`http://localhost:3000/api/todo`);
        setTodoList(res.data)
    }
    useEffect(() => {
        const groupByData = {};
        todoList.map(item => {
            const d = new Date(item.due);
            let day = d.getDay();
            if (groupByData[day]) {
                groupByData[day].push(item)
            } else {
                groupByData[day] = [item];
            }
        });
        const viewData = Object.entries(groupByData).map(([index, item]) => {
            // console.log(`${key}: ${item}`);
            return (
                <div key={index} className="column">
                    <h2>{gsDayNames[index]}</h2>
                    <ol>
                        {Object.entries(item).map(([i, todo]) => {
                            return <li key={todo._id}>{todo.name}</li>
                        })
                        }
                    </ol>
                </div>
            )
        })
        setListView(viewData)
    }, [todoList]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        var { name, description, due, status } = document.forms[0];

        try {
            await axios.post(`http://localhost:3000/api/todo`, { name: name.value, description: description.value, due: due.value, status: status.value })
            getTodoList();
        } catch (err) {
            console.log(err)
        };
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text" name="name" required />
                </div>
                <div className="input-container">
                    <label>Description </label>
                    <input type="text" name="description" required />
                </div>
                <div className="input-container">
                    <label>Due </label>
                    <input type="Date" name="due" required min="2022-02-01" max="2022-02-07" />
                </div>
                <div className="input-container">
                    <label>Status </label>
                    <select name="status">
                        <option value="pendding">Pendding</option>
                        <option value="progress">Progress</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="todo-form">
                <div className="title">Sign In</div>
                {renderForm}
            </div>
            {listView}
        </div>
    );
};
