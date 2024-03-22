import React, { useEffect, useState } from "react";
import { Buttons } from "./Components";

const MainPage = () => {
  const [TodoList, setTodoList] = useState([]);
  const [OrignalData, setOrignalData] = useState([]);
  const [Uservalue, setUservalue] = useState("");
  const [EditValue, setEditValue] = useState("");

  const getLocalStorageTodos = () => {
    return localStorage.getItem("MyTodos")
      ? JSON.parse(localStorage.getItem("MyTodos"))
      : [];
  };

  const ListItems = getLocalStorageTodos();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem("MyTodos", JSON.stringify([...TodoList]));
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [TodoList]);

  useEffect(() => {
    setTodoList(ListItems);
    setOrignalData(ListItems);
  }, []);

  let cardStyle = {
    backgroundImage: `linear-gradient(180deg, #130754 0%, #3b2f80 100%)`,
    width: "30 rem",
  };

  const handleCheck = (item_id) => {
    setTodoList(
      [...TodoList].map((item) =>
        item.id === item_id ? { ...item, check: !item.check } : item
      )
    );
  };

  const handleAddKey = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
    if (Uservalue.length < 1) {
      setTodoList(OrignalData);
    }
  };

  const handleAdd = () => {
    if (Uservalue) {
      let newObj = [
        ...TodoList,
        { id: TodoList.length + 1, name: Uservalue, check: false },
      ];
      setTodoList(newObj);
    }
  };

  const handleDelete = (item_id) => {
    setTodoList([...TodoList].filter((item) => item.id !== item_id));
  };

  const handleUpdate = (item_id) => {
    setTodoList(
      [...TodoList].map((item) =>
        item.id === item_id ? { ...item, name: EditValue } : item
      )
    );
    setEditValue("");
  };

  const handleSearch = () => {
    if (Uservalue) {
      let new_obj = [...TodoList].filter((item) => {
        return item.name.toLowerCase().includes(Uservalue.toLowerCase());
      });
      setTodoList(new_obj);
    }
  };

  let PageLayout = (
    <>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
        <div
          className="card p-3 border-0 shadow-sm text-white m-2 rounded-5"
          style={cardStyle}
        >
          <div className="d-flex gap-2 justify-content-center flex-wrap p-2 m-1">
            <input
              type="text"
              placeholder="Enter Item"
              className="shadow-sm p-2 rounded-4 border-0"
              onKeyPress={handleAddKey}
              onChange={(e) => setUservalue(e.target.value)}
            />
            <div>
              <Buttons
                Icon={"plus-circle"}
                innerText={"Add"}
                onClick={() => handleAdd()}
                backgroundColor={"orangered"}
              />
            </div>
            <div className="">
              <Buttons
                Icon={"search"}
                innerText={"Search"}
                onClick={() => handleSearch()}
                backgroundColor={"Teal"}
              />
            </div>
          </div>
          <div className="m-3">
            {TodoList.map((key) => {
              return (
                <div key={key.id}>
                  <div className="d-flex flex-wrap justify-content-center gap-2 text-center bg-light p-2 m-2 rounded-5">
                    <div>
                      <input
                        className="form-check-input border-dark p-3 rounded-5"
                        type="checkbox"
                        value=""
                        defaultChecked={key.check}
                        onChange={() => handleCheck(key.id)}
                      />
                    </div>

                    <div className="w-md-50">
                      <input
                        type="text"
                        className="form-control shadow-sm border-0"
                        defaultValue={
                          key.name.charAt(0).toUpperCase() +
                          key.name.slice(1).toLowerCase()
                        }
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <div>
                        <Buttons
                          Icon={"pen"}
                          onClick={() => handleUpdate(key.id)}
                          btnColor={"primary"}
                          innerText={"Edit"}
                        />
                      </div>
                      <div>
                        <Buttons
                          Icon={"trash"}
                          onClick={() => handleDelete(key.id)}
                          btnColor={"danger"}
                          innerText={"Delete"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
  return PageLayout;
};

export default MainPage;
