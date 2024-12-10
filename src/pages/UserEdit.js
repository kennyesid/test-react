import React, { useEffect, useState } from "react";

function EditUser({ onSubmit, userToEdit, setUserToEdit }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setId(userToEdit._id);
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setType(userToEdit.type);
      setPassword(userToEdit.password);
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id, name, email, password, type };
    onSubmit(newUser);
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setType("");
    setUserToEdit(null);
  };

  return (
    <form className="p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4" style={{ display: "none" }}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          id
        </label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo
        </label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {userToEdit ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}

export default EditUser;
