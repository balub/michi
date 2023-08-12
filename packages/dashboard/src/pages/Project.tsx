import { useState } from 'react';

export default function Project() {
  const [activeTab, setActiveTab] = useState('features');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="bg-slate-800 shadow border-b border-slate-700">
        <div className="flex justify-between px-28 pt-4">
          <div className="flex justify-start space-x-1">
            <button
              onClick={() => handleTabClick('features')}
              className={`${
                activeTab === 'features' ? 'bg-slate-800 text-violet-600 border-b-2 border-violet-600' : 'text-gray-400'
              } px-3 py-2 font-medium focus:outline-none`}
            >
              View Features
            </button>
            <button
              onClick={() => handleTabClick('submission')}
              className={`${
                activeTab === 'submission' ? 'bg-slate-800 text-violet-600 border-b-2 border-violet-600' : 'text-gray-400'
              } px-3 py-2 font-medium focus:outline-none`}
            >
              User Submission
            </button>
          </div>
          <div className='bg-slate-700 text-gray-300 mb-4 px-8 py-2 rounded-md text-xl focus:outline-none'>Project ID</div>
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
