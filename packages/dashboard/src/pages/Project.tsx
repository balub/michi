import { useState } from 'react';

export default function Project() {
  const [activeTab, setActiveTab] = useState('features');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="flex justify-between px-28 py-4">
          <div className="flex justify-start space-x-4">
            <button
              onClick={() => handleTabClick('features')}
              className={`${
                activeTab === 'features' ? 'bg-indigo-600 text-white' : 'text-indigo-600'
              } px-3 py-2 rounded-md font-medium focus:outline-none`}
            >
              View Features
            </button>
            <button
              onClick={() => handleTabClick('submission')}
              className={`${
                activeTab === 'submission' ? 'bg-indigo-600 text-white' : 'text-indigo-600'
              } px-3 py-2 rounded-md font-medium focus:outline-none`}
            >
              User Submission
            </button>
          </div>
          <button className='bg-indigo-200 text-indigo-600  px-3 py-2 rounded-md font-medium focus:outline-none'>Project ID</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {activeTab === 'features' && (
          <div>
            <p>Here you can see all the available features.</p>
          </div>
        )}

        {activeTab === 'submission' && (
          <div>
            <p>Users can submit their suggestions here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
