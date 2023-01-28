import React, { useCallback, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from '@tanstack/react-location';

import { Tabs } from '../../components';
import { ActivationUnionStatusType } from '../../interfaces';
import { useUsers } from '../../query-hooks';

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
        <div className="text-xl grow">{data.length}</div>
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
        {data.map((u) => (
          <div
            key={u.id}
            className="flex space-between items-center gap-2 border border-b-2 border-t-2 border-b-gray-500"
            onClick={() => {
              handleView(u.id);
            }}
          >
            <span>{u.email}</span>
            <span>{u.isAdmin ? 'admin' : 'user'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
