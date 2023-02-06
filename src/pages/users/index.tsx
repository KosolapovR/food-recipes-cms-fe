import React, { useCallback, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from '@tanstack/react-location';

import { Tabs } from '../../components';
import { ActivationUnionStatusType } from '../../interfaces';
import { useUsers } from '../../query-hooks';
import Status from '../../components/status';

const Users = () => {
  const navigate = useNavigate();
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const [tab, setTab] = useState<ActivationUnionStatusType>();

  const { data } = useUsers({ status: tab });

  const handleChangeTab = useCallback((v) => {
    setTab(v);
  }, []);

  const handleView = useCallback((id) => {
    navigate({ to: `/users/${id.toString()}`, replace: false });
  }, []);

  return (
    <div>
      <div className="flex space-between items-center gap-4 h-6 text-neutral-600 mb-4">
        <div className="text-xl">Users</div>
        <div className="w-px h-full bg-neutral-400" />
        <div className="text-xl grow">{data?.length}</div>
      </div>
      <Tabs
        options={[
          { value: undefined, label: 'ALL USERS' },
          { value: 'active', label: 'ACTIVE', badgeFill: 'success' },
          { value: 'inactive', label: 'INACTIVE', badgeFill: 'critic' },
        ]}
        value={tab}
        onChange={handleChangeTab}
        className="mb-4 bg-slate-50 sticky top-16 z-10 -ml-1 -mr-1 px-1"
      />
      <div ref={parent} className="max-w-screen-xl">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 flex space-x-1 justify-end align-middle"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((u) => (
                <tr
                  key={u.id}
                  className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleView(u.id);
                  }}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {u.email}
                  </th>
                  <td className="px-6 py-4">{u.isAdmin ? 'admin' : 'user'}</td>
                  <td className="px-6 py-4 flex space-x-1 justify-end items-center">
                    <Status status={u.status} />{' '}
                    <span className={'inline-block ml-2'}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
