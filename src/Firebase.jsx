import React, { useState } from "react";

const Firebase = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
    setEditingContact(null);
    setNewContact({ name: "", email: "" });
  };

  const handleInputChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const handleUpdate = (contact, index) => {
    setEditingContact(index);
    setNewContact(contact);
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.email) {
      if (editingContact !== null) {
        const updatedContacts = contacts.map((contact, index) =>
          index === editingContact ? newContact : contact
        );
        setContacts(updatedContacts);
        setEditingContact(null);
      } else {
        setContacts([...contacts, newContact]);
      }
      setNewContact({ name: "", email: "" });
      setShowAddForm(false);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      {/* Header */}
      <header className="max-w-lg w-full mx-auto bg-white rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12"
            src="https://www.gstatic.com/devrel-devsite/prod/v63a7e59e7b93b62eb99aa3751cce206090432f0c0d09ff73f0d3636dcec4ab60/firebase/images/touchicon-180.png"
            alt="Firebase logo"
          />
          <h1 className="text-black text-xl font-semibold">
            Firebase Contact App
          </h1>
        </div>
      </header>

      {/* Search and Add Button */}
      <div className="max-w-lg w-full mx-auto bg-white rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 pl-11 focus:outline-none focus:border-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add/Edit Contact Form */}
      {showAddForm && (
        <div className="max-w-lg w-full mx-auto bg-white rounded-2xl p-4 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Name"
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                name="email"
                value={newContact.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Email"
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingContact(null);
                  setNewContact({ name: "", email: "" });
                }}
                className="bg-gray-500 text-white rounded-xl px-6 py-2 hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  editingContact !== null
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-xl px-6 py-2 transition-colors cursor-pointer`}
              >
                {editingContact !== null ? "Update Contact" : "Add Contact"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contacts List */}
      {contacts.length > 0 && (
        <div className="max-w-lg w-full mx-auto space-y-4">
          {filteredContacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* User Icon */}
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdate(contact, index)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredContacts.length === 0 && (
            <div className="bg-white rounded-2xl p-4 text-center text-gray-500">
              No contacts found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* No Contacts Found */}
      {!showAddForm && contacts.length === 0 && (
        <div className="max-w-lg w-full mx-auto text-center mt-20">
          <div className="rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="mb-4 text-gray-400">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No contacts found
            </h3>
            <p className="text-white">
              Start by adding new contacts using the + button above
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Firebase;
