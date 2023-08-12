import { useState } from 'react';

const projects = [
  {
    title: 'Card 1',
  },
  {
    title: 'Card 2',
  },
];

function Home() {

  return (
    <>
      <div className="container mx-auto mt-4 flex flex-col px-28">
        <div className="flex justify-end">
          <button className="text-violet-600 hover:bg-slate-800 border-2 border-slate-700 mb-3 px-3 py-2 rounded-md text-base focus:outline-none">
            Add Project
          </button>
        </div>
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-slate-800 border-gray-500 text-gray-300 rounded-lg shadow-md p-6 mb-4"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
