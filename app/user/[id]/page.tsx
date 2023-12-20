'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../[id]/User.css';
import Link from 'next/link';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

const User = () => {
    const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [editedPicture, setEditedPicture] = useState(user?.picture || '');
  const [editedPictureFile, setEditedPictureFile] = useState<File | null>(null);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    
    closeEditModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditedPictureFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Header />
    <div className="user-container">
    <img src={user?.picture || ''} alt="user-profile" className="user-profile" />
      <div className="user-info">
        <p className="user-name">{user?.name}</p>
        <p className="user-email">{user?.email}</p>
        <button onClick={openEditModal} className="edit-button">
          Edit
        </button>
        <Link href="/home">
            <button className="go-back-button">Go Back</button>
          </Link>
      </div>

      <Modal show={isEditing} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="editedName">Name:</label>
          <input
            type="text"
            id="editedName"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
            <br />
            <br />
          <label htmlFor="editedEmail">Email:</label>
          <input
            type="email"
            id="editedEmail"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="editedPicture">Picture:</label>
            <input
                type="file"
                id="editedPicture"
                value={editedPicture}
                onChange={handleFileChange}
            />
            {editedPictureFile && <p>Selected file: {editedPictureFile.name}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Footer />
    </div>
  );
};

export default User;
