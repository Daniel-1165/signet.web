'use client';

import { useState } from 'react';
import { Play, Clock, User, Headphones, Music, X, SkipBack, SkipForward, Pause, Volume2, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioLecture {
  _id: string;
  title: string;
  duration: string;
  description: string;
  author: string;
  audioUrl: string;
  coverImageUrl: string;
}

export function AudioLecturesSection({ lectures = [] }: { lectures: AudioLecture[] }) {
  const [currentLecture, setCurrentLecture] = useState<AudioLecture | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLectureClick = (lecture: AudioLecture) => {
    setCurrentLecture(lecture);
    setIsMaximized(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.length > 0 ? (
          lectures.map((lecture, index) => (
            <div 
              key={lecture._id}
              onClick={() => handleLectureClick(lecture)}
              className="bg-white rounded-[2rem] p-6 border border-[#D8CEBE]/30 hover:shadow-xl hover:border-[#6E7A67]/30 transition-all group cursor-pointer flex gap-5 items-center"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 shadow-lg">
                <img 
                  src={lecture.coverImageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={lecture.title}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={24} className="text-white fill-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-[18px] font-bold text-[#1D1914] truncate mb-1" >
                  <span className="text-[#6E7A67] mr-2">{index + 1}.</span> {lecture.title}
                </h3>
                <div className="flex items-center gap-3 text-[#6E7A67]/60 text-[11px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Clock size={12} /> {lecture.duration}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {lecture.author}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-[#D8CEBE]/20 border-dashed">
            <Music className="w-12 h-12 text-[#D8CEBE] mx-auto mb-4 opacity-40" />
            <p className="text-[#6E7A67] italic font-medium">The auditory library is currently being curated.</p>
          </div>
        )}
      </div>

      {/* Persistent Mini Player Bar */}
      <AnimatePresence>
        {currentLecture && !isMaximized && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[360px] z-[90]"
          >
            <div className="bg-[#1D1914] rounded-2xl p-3 flex items-center gap-4 shadow-2xl border border-white/10 group">
              <div 
                className="w-12 h-12 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setIsMaximized(true)}
              >
                <img src={currentLecture.coverImageUrl} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsMaximized(true)}>
                <p className="text-white text-sm font-bold truncate">{currentLecture.title}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Playing Now</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                >
                  {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-1" />}
                </button>
                <button 
                  onClick={() => setCurrentLecture(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Audio Player - PlayStation Style */}
      <AnimatePresence>
        {currentLecture && isMaximized && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:flex md:items-center md:justify-center"
          >
            <div className="bg-[#1D1914] text-white h-full md:h-auto md:max-w-[480px] w-full p-8 md:rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col">
               {/* Animated Background Pulse */}
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6E7A67]/20 rounded-full blur-[80px] animate-pulse" />
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#D8CEBF]/10 rounded-full blur-[80px]" />

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 md:mb-12">
                     <button 
                       onClick={() => setIsMaximized(false)}
                       className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors"
                     >
                       <Minimize2 size={16} /> Minimize
                     </button>
                     <button 
                       onClick={() => {
                         setCurrentLecture(null);
                         setIsMaximized(false);
                       }}
                       className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                     >
                       <X size={20} />
                     </button>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12 mb-12">
                     <motion.div 
                       layoutId={`img-${currentLecture._id}`}
                       className="w-64 h-64 md:w-72 md:h-72 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] ring-8 ring-white/5"
                     >
                        <img 
                          src={currentLecture.coverImageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop'} 
                          className="w-full h-full object-cover" 
                          alt={currentLecture.title}
                        />
                     </motion.div>
                     
                     <div className="text-center px-4">
                        <h4 className="text-[32px] md:text-[38px] font-bold mb-3 leading-tight" >
                          {currentLecture.title}
                        </h4>
                        <p className="text-[#6E7A67] text-[16px] font-medium tracking-wide">
                          Lecture by {currentLecture.author}
                        </p>
                     </div>
                  </div>

                  {/* Player Controls */}
                  <div className="space-y-12 pb-10">
                     {/* Progress Bar */}
                     <div className="space-y-3">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative cursor-pointer group">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: isPlaying ? '65%' : '65%' }}
                             className="h-full bg-[#6E7A67] rounded-full relative"
                           >
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-125 transition-transform" />
                           </motion.div>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold text-white/30 uppercase tracking-widest">
                           <span>12:45</span>
                           <span>{currentLecture.duration}</span>
                        </div>
                     </div>

                     {/* Main Actions */}
                     <div className="flex items-center justify-between px-2">
                        <Volume2 size={24} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                        
                        <div className="flex items-center gap-10">
                           <SkipBack size={32} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                           <button 
                             onClick={() => setIsPlaying(!isPlaying)}
                             className="w-20 h-20 rounded-full bg-white text-[#1D1914] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                           >
                             {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
                           </button>
                           <SkipForward size={32} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                        </div>

                        <Maximize2 size={24} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                     </div>
                  </div>
               </div>

               {/* Audio Element (Hidden) */}
               {currentLecture.audioUrl && (
                 <audio 
                    autoPlay 
                    src={currentLecture.audioUrl} 
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                 />
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
