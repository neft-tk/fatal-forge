import React, { useState, useEffect } from 'react';
import { Modal, Button, Label, Tooltip } from 'flowbite-react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import DeckView from './DeckView';
import StatsView from './StatsView';
import PastGamesView from './PastGamesView';
import Static from '../../../utils/staticHelper';

function ProfileCard({
  user,
  userId,
  token,
  handleEditUser,
  handleDeleteUser,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editName, setEditName] = useState(user.name);
  const [editMotto, setEditMotto] = useState(user.motto);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditModalClick = (e) => {
    setShowEditModal(true);
  };

  const onEditModalClose = (e) => {
    setShowEditModal(false);
  };

  const onEditUsernameChange = (e) => {
    setEditUsername(e.target.value);
  };

  const onEditEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  const onEditNameChange = (e) => {
    setEditName(e.target.value);
  };

  const onEditMottoChange = (e) => {
    setEditMotto(e.target.value);
  };

  const onDeleteModalClick = (e) => {
    setShowDeleteModal(true);
  };

  const onDeleteModalClose = (e) => {
    setShowDeleteModal(false);
  };

  const handleEdit = (e) => {
    // console.log('Edit clicked.');
    // console.log('Will edit following user: ', user);
    // console.log('With the following ID: ', userId);
    handleEditUser({
      username: editUsername,
      email: editEmail,
      name: editName,
      motto: editMotto,
      userId: userId,
      token: token,
    });
    setShowEditModal(false);
  };

  const handleDelete = (e) => {
    // console.log("Delete clicked.");
    // console.log("Will delete following user: ", user);
    // console.log("With the following ID: ", userId);
    handleDeleteUser({
      userId: userId,
      token: token,
    });
  };

  return (
    <>
      {/* Profile Card, Name + Pic + Motto + Options */}
      <div className="bg-gradient-to-r from-main-bg to-alt-bg border-highlight-blue flex justify-around h-1/3 m-14 my-12 py-10 px-4  border-2 rounded-3xl">
        {/* Pic + Name */}
        <div className="flex justify-around w-auto">
          <img
            className="w-40 h-40 rounded-full border-2 border-highlight-blue my-auto ml-6"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col ml-4 justify-center">
            <h2 className="text-4xl mb-4">{user.username}</h2>
            <h3 className="text-sm mb-2">
              Aka:{' '}
              <span className="italic font-semibold tracking-wide ml-2">
                {user.name}
              </span>
            </h3>
            <h3 className="text-sm">{user.motto}</h3>
          </div>
        </div>
        {/* Motto */}
        {/* <div className=' w-1/3 flex flex-col justify-evenly items-center'>
          <h1 className='text-center'>Motto:</h1>
          <h3 className="text-sm text-center">{user.motto}</h3>
        </div> */}
        {/* Profile Settings */}
        <div className="flex justify-evenly w-1/3 my-auto">
          <button
            type="button"
            className="profile-icon m-4"
            onClick={onEditModalClick}
          >
            <FaUserEdit size="48" />
          </button>
          <Modal
            show={showEditModal}
            size="md"
            popup={true}
            onClose={onEditModalClose}
            className="p-12"
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="text-center">
                <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 justify-center items-center text-center">
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    Looks like your story has changed, Adventurer...
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    Feel free to only change the fields you want updated!
                  </p>
                  <div className="w-full">
                    <div className="block">
                      <Label htmlFor="username" value="New username:" />
                    </div>
                    <input
                      id="edit-username"
                      name="edit-username"
                      placeholder="Adventurer"
                      value={editUsername}
                      onChange={onEditUsernameChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full`}
                    />
                  </div>
                  <div className="w-full">
                    <div className="block">
                      <Label htmlFor="email" value="New email:" />
                    </div>
                    <input
                      id="edit-email"
                      name="edit-email"
                      placeholder="adventurer@mail.com"
                      value={editEmail}
                      onChange={onEditEmailChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full`}
                    />
                  </div>
                  <div className="w-full">
                    <div className="block">
                      <Label htmlFor="name" value="New name:" />
                    </div>
                    <input
                      id="edit-name"
                      name="edit-name"
                      placeholder="Bob Bobson"
                      value={editName}
                      onChange={onEditNameChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full`}
                    />
                  </div>
                  <div className="w-full">
                    <div className="block">
                      <Label htmlFor="motto" value="New motto:" />
                    </div>
                    <input
                      id="edit-motto"
                      name="edit-motto"
                      placeholder="Something lemonade?"
                      value={editMotto}
                      onChange={onEditMottoChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full`}
                    />
                  </div>
                  <h3 className="text-active-blue">Save these edits?</h3>
                  <div className="flex justify-center gap-4">
                    <button
                      className="confirm-button-style"
                      onClick={handleEdit}
                    >
                      Yes, I'm sure
                    </button>
                    <button className="button-style" onClick={onEditModalClose}>
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <button
            type="button"
            className="profile-icon m-4"
            onClick={onDeleteModalClick}
          >
            <MdDelete size="48" className="" />
          </button>
          <Modal
            show={showDeleteModal}
            size="md"
            popup={true}
            onClose={onDeleteModalClose}
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 p-2 h-14 w-14 text-red-900" />
                <h3 className="mb-5 text-lg font-normal">
                  Are you sure you want to delete your profile?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    className="delete-button-style"
                    onClick={handleDelete}
                  >
                    Yes, I'm sure
                  </button>
                  <button className="button-style" onClick={onDeleteModalClose}>
                    No, cancel
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      {/* Decks, Matches, Stats */}
      <div className="flex justify-evenly items-start mb-6">
        {/* Decks */}
        <div className="w-1/4">
          <DeckView decks={user.decks} />
        </div>
        {/* Stats */}
        <div className="w-1/4">
          <StatsView />
        </div>
        {/* Matches */}
        <div className="w-1/4">
          <PastGamesView decks={user.decks} />
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
