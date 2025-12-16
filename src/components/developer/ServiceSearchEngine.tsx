/**
 * محرك البحث الذكي للخدمات
 * Smart Service Search Engine
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Clock, TrendingUp, X, Filter, Sparkles, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SearchSuggestion {
  name: string;
  nameAr: string;
  category: string;
  type?: 'service' | 'category' | 'tag' | 'recent' | 'trending';
}

interface ServiceSearchEngineProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
}

const ServiceSearchEngine: React.FC<ServiceSearchEngineProps> = ({
  onSearch,
  placeholder = 'ابحث عن أي خدمة...',
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // تحديث الاقتراحات المفلترة
  useEffect(() => {
    if (query.trim() === '') {
      // عرض البحثات الأخيرة والمتداولة عند عدم وجود استعلام
      const recent = searchHistory.slice(0, 3).map(search => ({
        name: search,
        nameAr: search,
        category: 'recent',
        type: 'recent' as const,
      }));

      const trending = (trendingSearches || []).slice(0, 5).map(search => ({
        name: search,
        nameAr: search,
        category: 'trending',
        type: 'trending' as const,
      }));

      setFilteredSuggestions([...recent, ...trending]);
    } else {
      // فلترة الاقتراحات بناءً على الاستعلام
      const filtered = suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.nameAr.includes(query) ||
          suggestion.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8));
    }
    setSelectedIndex(-1);
  }, [query, suggestions, searchHistory, trendingSearches]);

  // التعامل مع التغيير في النص
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  // التعامل مع مفاتيح لوحة المفاتيح
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          selectSuggestion(filteredSuggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // تطبيق البحث
  const handleSearch = () => {
    if (query.trim()) {
      // إضافة للتاريخ
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
      setSearchHistory(newHistory);

      onSearch(query);
      setIsOpen(false);
    }
  };

  // اختيار اقتراح
  const selectSuggestion = (suggestion: SearchSuggestion) => {
    const searchTerm = suggestion.name || suggestion.nameAr;
    setQuery(searchTerm);
    onSearch(searchTerm);

    // إضافة للتاريخ
    const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(
      0,
      10
    );
    setSearchHistory(newHistory);

    setIsOpen(false);
    inputRef.current?.blur();
  };

  // مسح الاستعلام
  const clearQuery = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent':
        return <Clock className="w-4 h-4 text-slate-500" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-orange-400" />;
      default:
        return <Search className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* حاوية البحث الرئيسية */}
      <div className="relative">
        {/* خلفية مضيئة */}
        <motion.div
          animate={{
            opacity: isOpen ? 0.8 : 0.4,
            scale: isOpen ? 1.02 : 1,
          }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl blur-md"
        />

        {/* حقل البحث */}
        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            {/* أيقونة البحث */}
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            </motion.div>

            {/* حقل الإدخال */}
            <Input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-lg focus:ring-0 focus:outline-none"
            />

            {/* إجراءات */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {query && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearQuery}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}

              <div className="w-px h-6 bg-slate-600" />

              <Button size="sm" variant="ghost" className="p-2 text-slate-400 hover:text-cyan-400">
                <Filter className="w-4 h-4" />
              </Button>

              {/* اختصار لوحة المفاتيح */}
              <div className="hidden md:flex items-center gap-1 text-xs text-slate-500 bg-slate-700/50 rounded px-2 py-1">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
          </div>

          {/* شريط التقدم للبحث */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: query ? 1 : 0 }}
            className="h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 origin-left"
          />
        </div>
      </div>

      {/* قائمة الاقتراحات */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl shadow-2xl overflow-hidden">
              {/* عنوان الاقتراحات */}
              {query === '' && (
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Sparkles className="w-4 h-4" />
                    <span>بحثات أخيرة ومتداولة</span>
                  </div>
                </div>
              )}

              {/* قائمة الاقتراحات */}
              <div className="max-h-80 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-slate-700/80 border-r-2 border-cyan-400'
                        : 'hover:bg-slate-700/50'
                    }`}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {/* أيقونة نوع الاقتراح */}
                    {getSuggestionIcon(suggestion.type || 'service')}

                    {/* محتوى الاقتراح */}
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">
                        {suggestion.nameAr || suggestion.name}
                      </div>
                      {suggestion.category && (
                        <div className="text-slate-400 text-xs">{suggestion.category}</div>
                      )}
                    </div>

                    {/* علامة نوع النتيجة */}
                    {suggestion.type === 'trending' && (
                      <Badge
                        variant="outline"
                        className="text-xs border-orange-400 text-orange-400"
                      >
                        متداول
                      </Badge>
                    )}
                    {suggestion.type === 'recent' && (
                      <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">
                        أخير
                      </Badge>
                    )}

                    {/* أيقونة سريعة */}
                    <motion.div
                      animate={{
                        x: index === selectedIndex ? 0 : 10,
                        opacity: index === selectedIndex ? 1 : 0,
                      }}
                      className="text-cyan-400"
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* تذييل الاقتراحات */}
              <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>استخدم ↑↓ للتنقل، Enter للاختيار</span>
                  <span>Esc للإغلاق</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* رسالة عدم وجود نتائج */}
      <AnimatePresence>
        {isOpen && query && filteredSuggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl p-6 text-center">
              <div className="text-slate-400 mb-2">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              </div>
              <div className="text-white font-medium mb-1">لم يتم العثور على نتائج</div>
              <div className="text-slate-400 text-sm">جرب استخدام كلمات مفتاحية مختلفة</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSearchEngine;
