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
      <div className="container mx-auto mt-4 px-4 flex flex-col px-28">
        <div className="flex justify-end">
          <button className="bg-indigo-200 text-indigo-600  px-3 py-2 rounded-md font-medium focus:outline-none">
            Add Project
          </button>
        </div>
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg shadow-md p-6 mb-4"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
