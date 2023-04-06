import React from "react";
import { cuponsData } from "../../data/cupons";

export const CuponsGrid = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Tag
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    DÍAS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Sitio web
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cuponsData.map((cupon) => (
                  <tr key={cupon.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {cupon.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {cupon.tag}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {cupon.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {cupon.days}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      <a
                        href={cupon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cupon.url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto sm:hidden">
        <div className="p-1.5 w-full inline-block align-middle">
          {cuponsData.map((cupon) => (
            <div key={cupon.id} className="border rounded-lg my-2">
              <div className="px-6 py-2 font-medium text-gray-800">
                {cupon.title}
              </div>
              <div className="px-6 py-2 text-gray-800">
                <span className="font-bold">Tag:</span> {cupon.tag}
              </div>
              <div className="px-6 py-2 text-gray-800">
                <span className="font-bold">Tag:</span> {cupon.tag}
              </div>
              <div className="px-6 py-2 text-gray-800">
                <span className="font-bold">Descripción:</span>{" "}
                {cupon.description}
              </div>
              <div className="px-6 py-2 text-gray-800">
                <span className="font-bold">Días:</span> {cupon.days}
              </div>
              <div className="px-6 py-2 text-gray-800">
                <a href={cupon.url} target="_blank" rel="noopener noreferrer">
                  {cupon.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
