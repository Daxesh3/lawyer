import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLetterContext } from '../../LetterCreation/context/LetterContext';
import { CURRENCIES } from '../../LetterCreation/constants/Letter.constants';
import { formatToUSD } from '../../../shared/constants/constant';
import LetterIndex from './LetterIndex';

interface ICoverForm {
  borrowerName: string;
  globalCoordinatorName: string;
  bookrunnerNames: string;
  facilityAgentName: string;
  currency: string;
  amount: string;
  facilityType: 'Single Currency' | 'Multicurrency';
  termType: 'Revolving' | 'Term';
}

const Cover = () => {
  const [activeTab, setActiveTab] = useState('cover');
  const { coverFormData, setCoverFormData } = useLetterContext();
  const [form, setForm] = useState<ICoverForm>({
    borrowerName: '',
    globalCoordinatorName: '',
    bookrunnerNames: '',
    facilityAgentName: '',
    currency: 'USD',
    amount: '',
    facilityType: 'Single Currency',
    termType: 'Term',
  });

  useEffect(() => {
    // Check if any data exists in context
    if (
      coverFormData.borrowerName ||
      coverFormData.globalCoordinatorName ||
      coverFormData.bookrunnerNames ||
      coverFormData.facilityAgentName ||
      coverFormData.currency ||
      coverFormData.amount
    ) {
      setForm(coverFormData);
    }
  }, [coverFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? formatToUSD(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCoverFormData(form);
    setActiveTab('index');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-[calc(100vh-220px)]">
      <div className="w-full max-w-5xl bg-[#3b3b3b] rounded-xl p-8 shadow-lg mt-12">
        <h2 className="text-xl font-bold mb-12 text-white text-center">Facility Agreement</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'cover' && (
            <>
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
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                  >
                    {CURRENCIES.map((cur) => (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    What is the quantum of the Facility? {form.currency ? `(in ${form.currency})` : ''}
                    <span className="text-red-500 text-xs align-super ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="amount"
                    value={form.amount}
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
                    name="facilityType"
                    value={form.facilityType}
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
                    name="termType"
                    value={form.termType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#454545] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#191919] text-[#FBFBFB]"
                  >
                    <option value="Term">Term</option>
                    <option value="Revolving">Revolving</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div className={`flex mt-8 ${activeTab === 'cover' ? 'justify-end' : 'justify-start'}`}>
            {activeTab === 'cover' && (
              <button
                type="submit"
                className="bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </form>
        {activeTab === 'index' && <LetterIndex />}
        {activeTab === 'index' && (
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              className="bg-black text-white px-8 py-2 rounded-lg font-semibold"
              onClick={() => setActiveTab('cover')}
            >
              Back
            </button>
            <Link
              className="block bg-blue-400 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              to={'/home'}
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;
