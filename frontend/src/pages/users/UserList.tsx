import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonForm from '../../components/common/CommonForm';
import { userFields, userSchema, userTableColumns, type User, type UserModalState } from './UserSchemas';
import CommonTable from "../../components/common/CommonTable";
import deleteIcon from "../../assets/images/trash_1.svg";
import editIcon from "../../assets/images/edit_img.svg";
import CommonButton from '../../components/common/CommonButton';
import ConfirmModal from '../../components/common/ConfirmationPopUp';
import { createUser, deleteUser, getUsers, updateUser } from '../../services/UserServices';

function UserList() {
  const [data, setData] = useState<User[]>([]);
  const [userModalState, setUserModalState] = useState<UserModalState>({ show: false, mode: "" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const actions = [
    {
      key: "edit",
      label: "Edit",
      icon: editIcon,
      alt: "Edit User",
      className: "edit",
      onClick: (row: any) => {
        setSelectedUser(row);
        setUserModalState({ show: true, mode: "edit" });
      }
    },
    {
      key: "delete",
      label: "Delete",
      icon: deleteIcon,
      alt: "Delete User",
      className: "delete",
      onClick: (row: any) => {
        setSelectedUser(row);
        setUserModalState({ show: true, mode: "delete" });
      },
    },
  ];

  useEffect(() => {
    getUsers().then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this runs once on mount      
  
  const refreshUsers = () => {
    getUsers().then(res => setData(res.data));
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id)
        .then(() => {
          refreshUsers();
          setSelectedUser(null);
          setUserModalState({ show: false, mode: "" });
        })
      .catch(err => {
        console.error('Error deleting user:', err);
        setUserModalState({ show: false, mode: "" });
      });
    }
  }
            
  return (
    <>
      {
        <ConfirmModal
          show={userModalState.show && userModalState.mode === "delete"}
          title="Delete User"
          message={`Are you sure you want to delete delete this user?`}
          onConfirm={handleDelete}
          onClose={() => setUserModalState({ show: false, mode: "" })}
        />
      }
      {userModalState.show && !(userModalState.mode === "delete") && (
        <CommonForm
            title= {userModalState.mode === "create" ? "Create User" : userModalState.mode === "edit" ? "Edit User" : "Delete User"}
            fields={userFields}
            onSubmit={(formData: any) => {
              if (userModalState.mode === "edit") {
                updateUser(selectedUser?.id || "", formData)
                  .then(() => {
                    refreshUsers()
                    setSelectedUser(null);
                  })
                  .catch(err => console.error('Error updating user:', err));
              } else {
                createUser(formData)
                  .then(() => refreshUsers())
                  .catch(err => console.error('Error creating user:', err));
              }
              setUserModalState({ show: false, mode: "" });
              }
            }
          schema={userSchema}
          show={userModalState.show}
          onClose={() => setUserModalState({ show: false, mode: "" })}
          defaultValues={userModalState.mode === "edit" ? selectedUser : {}}
          />
      )}

      <div className='d-flex justify-content-between mr-5'>
        <h3>User Management</h3>
        <CommonButton variant="primary" buttonText='Create User' onClick={() => setUserModalState({ show: true, mode: "create" })} />
      </div>

      <CommonTable
        columns={userTableColumns}
        data={data}
        actions={actions}
      />
    </>
  );
}

export default UserList;