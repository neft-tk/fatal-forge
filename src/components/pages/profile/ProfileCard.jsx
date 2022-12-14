import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
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
  const [showModal, setShowModal] = useState(false);

  const onModalClick = (e) => {
    setShowModal(true);
  };

  const onModalClose = (e) => {
    setShowModal(false);
  };

  const handleEdit = (e) => {
    console.log('Edit clicked.');
    console.log('Will edit following user: ', user);
    console.log('With the following ID: ', userId);
    handleEditUser({
      userObj: {},
      userId: userId,
      token: token,
    });
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
      <div className="bg-gradient-to-r from-main-bg to-alt-bg flex justify-around h-1/3 my-8 mx-14 border-highlight-orange border-2 rounded-3xl">
        {/* Pic + Name */}
        <div className="flex justify-around w-auto">
          <img
            className="w-40 h-40 rounded-full border-2 border-main-orange my-auto ml-6"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col ml-4 justify-center">
            <h2 className="text-4xl mb-4">{user.username}</h2>
            <h3 className="text-sm mb-2">Aka: <span className='italic font-semibold tracking-wide ml-2'>{user.name}</span></h3>
            <h3 className="text-sm">{user.motto}</h3>
          </div>
        </div>
        {/* Motto */}
        {/* <div className=' w-1/3 flex flex-col justify-evenly items-center'>
          <h1 className='text-center'>Motto:</h1>
          <h3 className="text-sm text-center">{user.motto}</h3>
        </div> */}
        {/* Profile Settings */}
        <div className='flex justify-evenly w-1/3 my-auto'>
          <button
            type="button"
            className="profile-icon m-4"
            onClick={handleEdit}
          >
            <FaUserEdit size="48" />
          </button>
          <button
            type="button"
            className="profile-icon m-4"
            onClick={onModalClick}
          >
            <MdDelete size="48" className='' />
          </button>
          <Modal show={showModal} size="md" popup={true} onClose={onModalClose}>
            <Modal.Header className="bg-slate-600"/>
            <Modal.Body className="bg-slate-500">
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-white dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                  Are you sure you want to delete your profile?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDelete}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={onModalClose}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      {/* Decks, Matches, Stats */}
      <div className="flex justify-evenly items-center h-full">
        {/* Decks */}
        <div className="w-1/4 h-4/5">
          <DeckView decks={user.decks} />
        </div>
        {/* Stats */}
        <div className="w-1/4 h-4/5">
          <StatsView />
        </div>
        {/* Matches */}
        <div className="w-1/4 h-4/5">
          <PastGamesView decks={user.decks} />
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
