import React from 'react';
import CreateUser from './CreateUser';
import UsersList from './UsersList';


const Parent = () => {
  
  return (
    <div>
        <CreateUser />
        <UsersList />
    </div>
  );
};

export default Parent;