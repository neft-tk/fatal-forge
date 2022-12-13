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
      <div className="flex m-4 p-8 items-center bg-alt-bg border-4 rounded border-gray-300 justify-between ">
        <div className="flex ">
          <img
            className="w-48 h-48 rounded-full border-2 border-main-orange"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col justify-center ml-12 mr-20">
            <h2 className="text-4xl mb-4">{user.username}</h2>
            <h3 className="text-sm mb-2">Aka: {user.name}</h3>
            <h3 className="text-sm">{user.motto}</h3>
          </div>
        </div>
        <div>
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
            <MdDelete size="48" className="" />
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
      <div className="m-4 grid grid-cols-2 grid-rows-2 gap-6">
        <div className="flex flex-col col-span-1 row-span-1 gap-4">
          <DeckView decks={user.decks} />
          <StatsView />
        </div>
        <div className="col-span-1 row-span-2">
          <PastGamesView decks={user.decks} />
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
