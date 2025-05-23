import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';

interface ICoverForm {
  borrowerName: string;
  globalCoordinatorName: string;
  bookrunnerNames: string;
  facilityAgentName: string;
  currency: string;
  quantum: string;
  currencyType: 'Single Currency' | 'Multicurrency';
  facilityType: 'Revolving' | 'Term';
}

const Cover = () => {
  const navigate = useNavigate();
  const { coverFormData, setCoverFormData } = useLetterContext();
  const [form, setForm] = useState<ICoverForm>({
    borrowerName: '',
    globalCoordinatorName: '',
    bookrunnerNames: '',
    facilityAgentName: '',
    currency: '',
    quantum: '',
    currencyType: 'Single Currency',
    facilityType: 'Term',
  });

  useEffect(() => {
    // Check if any data exists in context
    if (
      coverFormData.borrowerName ||
      coverFormData.globalCoordinatorName ||
      coverFormData.bookrunnerNames ||
      coverFormData.facilityAgentName ||
      coverFormData.currency ||
      coverFormData.quantum
    ) {
      setForm(coverFormData);
    }
  }, [coverFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCoverFormData(form);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-[calc(100vh-220px)]">
      <div className="w-full max-w-5xl bg-[#3b3b3b] rounded-xl p-8 shadow-lg mt-12">
        <h2 className="text-xl font-bold mb-12 text-white text-center">Facility Agreement</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What is the name of the Borrower?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="borrowerName"
                value={form.borrowerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter borrower name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What is the name of the Global Coordinator?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="globalCoordinatorName"
                value={form.globalCoordinatorName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter global coordinator name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What are the names of the Bookrunner Mandated Lead Arrangers?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="bookrunnerNames"
                value={form.bookrunnerNames}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter bookrunner names"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What is the name of the Facility Agent?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="facilityAgentName"
                value={form.facilityAgentName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter facility agent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What is the currency of the Facility?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter currency"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                What is the quantum of the Facility?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <input
                type="text"
                name="quantum"
                value={form.quantum}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                placeholder="Enter quantum"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Multicurrency or Single Currency?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <select
                name="currencyType"
                value={form.currencyType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
              >
                <option value="Single Currency">Single Currency</option>
                <option value="Multi Currency">Multi Currency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Revolving or Term?
                <span className="text-red-500 text-xs align-super ml-1">*</span>
              </label>
              <select
                name="facilityType"
                value={form.facilityType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
              >
                <option value="Term">Term</option>
                <option value="Revolving">Revolving</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cover;
