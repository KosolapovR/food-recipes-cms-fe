import React, { useCallback } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from '@tanstack/react-location';

import { useCategories } from '../../query-hooks';
import { Placeholder } from '../../components/placeholder';

const Categories = () => {
  const navigate = useNavigate();
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const { data } = useCategories();

  const handleView = useCallback((id) => {
    navigate({ to: `/categories/${id.toString()}`, replace: false });
  }, []);

  return (
    <div>
      <div className="flex space-between items-center gap-4 h-6 text-neutral-600 mb-4">
        <div className="text-xl">Categories</div>
        <div className="w-px h-full bg-neutral-400" />
        <div className="text-xl grow">{data?.length}</div>
      </div>
      <div ref={parent} className="max-w-screen-xl">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Parent name
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleView(c.id);
                  }}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {c.name}
                  </th>
                  <td className="px-6 py-4">{c.parentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!data || data.length === 0) && <Placeholder />}
        </div>
      </div>
    </div>
  );
};

export default Categories;
