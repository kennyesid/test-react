import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Modal from "./ModalPopup";
import UserForm from "./UserEdit";
import UserList from "./UserList";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  const addUser = (user) => {
    UserService.create(user.name, user.email, user.type, user.password)
      .then((res) => {
        if (res.status) {
          localStorage.setItem("isAuthenticated", "true");
          window.location.reload();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err);
      });
  };

  const updateUser = (updatedUser) => {
    setUserToEdit(updatedUser);
    setIsModalOpen(true);
  };

  const updateUserService = (user) => {
    UserService.update(user.id, user.name, user.email, user.type, user.password)
      .then((res) => {
        if (res.status) {
          localStorage.setItem("isAuthenticated", "true");
          window.location.reload();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err);
      });
  };

  const deleteUser = (index) => {
    UserService.delete(index)
      .then((res) => {
        if (res.status) {
          window.location.reload();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err);
      });
  };

  const handleSubmit = (user) => {
    if (userToEdit) {
      updateUserService(user);
    } else {
      addUser(user);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        UserService.list()
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.error("Error al obtener los usuarios:", err);
            alert(err.response.data.message);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">CRUD de Usuarios</h1>
      <div>
        <button
          onClick={openModal}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          style={{ marginRight: "10px" }}
        >
          Registrar
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Este es un Modal">
        <UserForm
          onSubmit={handleSubmit}
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
        />
      </Modal>

      <UserList users={users} onEdit={updateUser} onDelete={deleteUser} />
    </div>
  );
}

export default Users;
