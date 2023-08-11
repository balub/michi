import { useState } from 'react'
import "./App.css";

const projects = [
  {
    title: 'Card 1',
  },
  {
    title: 'Card 2',
  },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <nav className="bg-indigo-600 p-4 py-6 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Michi</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Sign Out</button>
      </nav>
      <div className="container mx-auto mt-4 px-4 flex flex-col">
        {projects.map((project, index) => (
          <div key={index} className="bg-white text-black rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
