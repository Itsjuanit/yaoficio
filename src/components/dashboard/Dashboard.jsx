import React from "react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow py-6 px-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Card 1</h2>
            <p>Content for card 1</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Card 2</h2>
            <p>Content for card 2</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Card 3</h2>
            <p>Content for card 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};
