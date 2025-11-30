import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import { DOCTORS } from './constants';
import { CATEGORIES, Category } from './types';
import { DoctorCard } from './components/DoctorCard';
import { SymptomChecker } from './components/SymptomChecker';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Filter doctors based on search query and selected category
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      const matchesCategory = selectedCategory === 'All' || doctor.category === selectedCategory;
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.affiliation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAiRecommendation = (recommendedCategory: Category) => {
    // Check if the returned category exists in our list, otherwise default to Physician or All
    if (CATEGORIES.includes(recommendedCategory)) {
      setSelectedCategory(recommendedCategory);
    } else {
      setSelectedCategory('Physician'); // Fallback safe match
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">DocFinder</span>
            </div>
            
            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
              <input 
                type="text"
                placeholder="Search doctors, clinics, hospitals, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAiModalOpen(true)}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-full transition-colors border border-purple-200"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Assistant</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Search Bar (visible only on small screens) */}
      <div className="md:hidden px-4 pt-4 pb-2 bg-white border-b border-slate-100">
        <div className="relative">
             <input 
                type="text"
                placeholder="Search your doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filters */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
             <h1 className="text-2xl font-bold text-slate-800">Find Your Specialist</h1>
             <button 
                onClick={() => setIsAiModalOpen(true)}
                className="sm:hidden flex items-center gap-1.5 text-xs font-bold text-white bg-purple-600 px-3 py-1.5 rounded-full shadow-sm"
              >
                <Sparkles className="w-3 h-3" />
                ASK AI
              </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 transform scale-105' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
               <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No doctors found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any doctors matching "{searchQuery}" in the {selectedCategory} category.
              <br />
              <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="text-blue-600 font-medium hover:underline mt-2">
                Clear all filters
              </button>
            </p>
          </div>
        )}
      </main>

      <SymptomChecker 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)}
        onRecommendation={handleAiRecommendation}
      />
    </div>
  );
};

export default App;