import React, { useState } from 'react';
import { Modal, Label } from 'flowbite-react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import DeckView from './decks/DeckView';
import StatsView from './stats/StatsView';
import PastGamesView from './gamehistory/PastGamesView';
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
    handleDeleteUser({
      userId: userId,
      token: token,
    });
  };

  return (
    <>
      {/* Profile Card, Name + Pic + Motto + Options */}
      <div className="card-background flex justify-around h-1/3 mx-14 my-12 py-4 md:py-10 px-4 border-2 rounded-3xl">
        {/* Pic + Name */}
        <div className="flex justify-around w-auto gap-6">
          <img
            className="w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-full border-2 border-highlight-blue my-auto ml-6 object-cover"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl lg:text-4xl mb-4">{user.username}</h2>
            <h3 className="text-xs md:text-sm mb-2">
              Aka:{' '}
              <span className="italic font-semibold tracking-wide ml-2">
                {user.name}
              </span>
            </h3>
            <h3 className="text-xs md:text-sm">{user.motto}</h3>
          </div>
        </div>
        {/* Motto */}
        {/* <div className=' w-1/3 flex flex-col justify-evenly items-center'>
          <h1 className='text-center'>Motto:</h1>
          <h3 className="text-sm text-center">{user.motto}</h3>
        </div> */}
        {/* Profile Settings */}
        <div className="flex flex-col md:flex-row justify-evenly w-1/3 my-auto">
          <button
            type="button"
            className="profile-button m-4"
            onClick={onEditModalClick}
          >
            <FaUserEdit className='profile-icon' />
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
                <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 center-all">
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
            className="profile-button m-4"
            onClick={onDeleteModalClick}
          >
            <MdDelete className="profile-icon" />
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
      <div className="card-flex center-all md:flex-row md:justify-evenly md:items-start mx-14 mb-6 gap-6">
        {/* Decks */}
        <div className="w-4/5 md:w-1/3">
          <DeckView decks={user.decks} />
        </div>
        {/* Stats */}
        <div className="w-4/5 md:w-1/3">
          <StatsView />
        </div>
        {/* Matches */}
        <div className="w-4/5 md:w-1/3">
          <PastGamesView decks={user.decks} />
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
