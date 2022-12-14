import React, { useState, useEffect } from 'react';
import { Modal, Button, Label, Tooltip } from 'flowbite-react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import DeckView from './DeckView';
import StatsView from './StatsView';
import PastGamesView from './PastGamesView';
import API from '../../../utils/API';
import Static from '../../../utils/staticHelper';

function ProfileCard({
  user,
  userId,
  token,
  handleEditUser,
  handleDeleteUser,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // TODO: FIX BUG FOR GETTING PROFILE IMAGE AND USING DEFAULT IF NO PROFILE PIC ON BACKEND.
  useEffect(() => {
    async function fetchUserProfilePicture() {
      console.log('Current User');
      console.log(user);
      const data = await API.getUserPicture(user.imagePath);
      console.log('Data from API call:');
      console.log(data);
      // console.log(data.username);
      // console.log(data.FavoriteUser);
      // console.log(friends);
      // const friendsData = data.FavoriteUser;
      // for (let i = 0; i < friendsData.length; i++) {
      //   const friend = friendsData[i];
      //   console.log(friend);
      //   console.log(friend.username);
      // }
      // user = {
      //   username: data.username,
      //   email: data.email,
      //   name: data.name,
      //   motto: data.motto,
      //   decks: data.Decks,
      //   friends: data.FavoriteUser,
      //   imagePath: data.imagePath,
      //   decks: data.Decks,
      //   friends: data.FavoriteUser,
      // };
      // setFriends(data.FavoriteUser);
    }

    fetchUserProfilePicture();
  }, []);

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

  const onDeleteModalClick = (e) => {
    setShowDeleteModal(true);
  };

  const onDeleteModalClose = (e) => {
    setShowDeleteModal(false);
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
      <div className="bg-gradient-to-r from-main-bg to-alt-bg flex justify-around h-1/3 my-8 mx-auto border-highlight-orange border-2 rounded-3xl w-4/5">
        {/* Pic + Name */}
        <div className="flex justify-around w-auto">
          <img
            className="w-40 h-40 rounded-full border-2 border-main-orange my-auto ml-6"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col ml-4 justify-center">
            <h2 className="text-4xl mb-4 font-display-text-f">{user.username}</h2>
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
          >
            <Modal.Header className="bg-slate-600" />
            <Modal.Body className="bg-slate-500">
              <div className="text-center">
                <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 justify-center items-center text-center">
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    Looks like your story has changed, Adventurer...
                  </h3>
                  <div className="w-full flex justify-center">
                    <Tooltip content="Can't be blank." placement="bottom">
                      <div className="mb-2 block">
                        <Label htmlFor="username" value="Your username:" />
                      </div>

                      <input
                        id="edit-username"
                        name="edit-username"
                        placeholder="Adventurer"
                        required={true}
                        value={editUsername}
                        onChange={onEditUsernameChange}
                        className={`text-black p-2 mt-4 rounded text-center w-full`}
                      />
                    </Tooltip>
                  </div>
                  <div className="w-full flex justify-center">
                    <Tooltip
                      content="Must be a valid email."
                      placement="bottom"
                    >
                      <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email:" />
                      </div>
                      <input
                        id="edit-email"
                        name="edit-email"
                        placeholder="adventurer@mail.com"
                        required={true}
                        value={editEmail}
                        onChange={onEditEmailChange}
                        className={`text-black p-2 mt-4 rounded text-center w-full`}
                      />
                    </Tooltip>
                  </div>
                  <h3>Save these edits?</h3>
                  <div className="flex justify-center gap-4">
                    <Button color="success" onClick={handleEdit}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={onEditModalClose}>
                      No, cancel
                    </Button>
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
            <Modal.Header className="bg-slate-600" />
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
                  <Button color="gray" onClick={onDeleteModalClose}>
                    No, cancel
                  </Button>
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
