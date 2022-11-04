import React from 'react';

export interface IUserPageProps {
  id?: string;
}
const User = ({ id }: IUserPageProps) => {
  return <div>User {id}</div>;
};

export default User;
