'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Wind, 
  Mic, 
  MicOff, 
  Sparkles, 
  ShoppingBag, 
  Shirt, 
  Hat, 
  Heart, 
  Briefcase, 
  PartyPopper, 
  Calendar, 
  User, 
  X, 
  Plus, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClothingType = 'top' | 'bottom' | 'outerwear' | 'accessory' | 'shoes' | 'dress';
type Occasion = 'casual' | 'work' | 'date' | 'business' | 'party' | 'festival' | 'travel';
type Weather = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

interface ClothingItem {
  id: string;
  name: string;
  type: ClothingType;
  color: string;
  image: string;
  tags: string[];
}

interface Outfit {
  id: string;
  items: ClothingItem[];
  occasion: Occasion;
  weather: Weather;
  score: number;
}

const SAMPLE_WARDROBE: ClothingItem[] = [
  { id: '1', name: '白色T恤', type: 'top', color: '#FFFFFF', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80', tags: ['casual', 'summer'] },
  { id: '2', name: '蓝色牛仔裤', type: 'bottom', color: '#3B82F6', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80', tags: ['casual', 'all-season'] },
  { id: '3', name: '黑色西装', type: 'outerwear', color: '#1F2937', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80', tags: ['business', 'formal'] },
  { id: '4', name: '运动鞋', type: 'shoes', color: '#EF4444', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80', tags: ['casual', 'sport'] },
  { id: '5', name: '花裙子', type: 'dress', color: '#EC4899', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80', tags: ['date', 'summer'] },
  { id: '6', name: '毛线帽', type: 'accessory', color: '#10B981', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&q=80', tags: ['winter', 'warm'] },
  { id: '7', name: '白衬衫', type: 'top', color: '#F3F4F6', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80', tags: ['work', 'formal'] },
  { id: '8', name: '休闲裤', type: 'bottom', color: '#8B5CF6', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80', tags: ['work', 'spring'] },
];

const OCCASIONS: { id: Occasion; label: string; icon: React.ReactNode }[] = [
  { id: 'casual', label: '日常休闲', icon: <Shirt className="w-5 h-5" /> },
  { id: 'work', label: '上班', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'date', label: '约会', icon: <Heart className="w-5 h-5" /> },
  { id: 'business', label: '商务', icon: <User className="w-5 h-5" /> },
  { id: 'party', label: '聚会', icon: <PartyPopper className="w-5 h-5" /> },
  { id: 'festival', label: '节日', icon: <Calendar className="w-5 h-5" /> },
  { id: 'travel', label: '旅行', icon: <ShoppingBag className="w-5 h-5" /> },
];

export default function FashionApp() {
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'outfit' | 'profile'>('outfit');
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(SAMPLE_WARDROBE);
  const [currentWeather, setCurrentWeather] = useState<Weather>('sunny');
  const [currentTemp, setCurrentTemp] = useState(24);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('casual');
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  
  useEffect(() => {
    generateRecommendations();
  }, [currentWeather, selectedOccasion]);

  const generateRecommendations = () => {
    const filteredItems = wardrobe.filter(item => {
      const weatherMatch = (currentWeather === 'snowy' || currentWeather === 'rainy') 
        ? item.tags.includes('winter') 
        : true;
      return weatherMatch;
    });

    const tops = filteredItems.filter(i => i.type === 'top' || i.type === 'dress');
    const bottoms = filteredItems.filter(i => i.type === 'bottom');
    const outerwear = filteredItems.filter(i => i.type === 'outerwear');
    const accessories = filteredItems.filter(i => i.type === 'accessory');
    const shoes = filteredItems.filter(i => i.type === 'shoes');

    const newRecs: Outfit[] = [];
    
    if (tops.length > 0) {
      for(let i = 0; i < 3; i++) {
        const items: ClothingItem[] = [];
        const top = tops[Math.floor(Math.random() * tops.length)];
        if (top) items.push(top);
        
        if (top.type !== 'dress' && bottoms.length > 0) {
          items.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
        }
        
        if (shoes.length > 0) items.push(shoes[Math.floor(Math.random() * shoes.length)]);
        if ((currentWeather === 'rainy' || currentWeather === 'snowy') && outerwear.length > 0) {
          items.push(outerwear[0]);
        }
        if (Math.random() > 0.5 && accessories.length > 0) items.push(accessories[0]);

        newRecs.push({
          id: Math.random().toString(36).substr(2, 9),
          items,
          occasion: selectedOccasion,
          weather: currentWeather,
          score: Math.floor(Math.random() * 20) + 80
        });
      }
    }
    setRecommendations(newRecs);
  };

  const toggleListening = () => {
    if (isRecording) {
      setIsRecording(false);
      if (transcript.includes('上班')) setSelectedOccasion('work');
      if (transcript.includes('约会')) setSelectedOccasion('date');
      if (transcript.includes('聚会')) setSelectedOccasion('party');
      if (transcript.includes('冷') || transcript.includes('下雪')) setCurrentWeather('snowy');
      if (transcript.includes('热')) setCurrentWeather('sunny');
    } else {
      setIsRecording(true);
      setTranscript('正在听... "今天约会穿什么"');
      setTimeout(() => {
        setTranscript('好的，明白了！为您找到约会穿搭...');
      }, 2000);
    }
  };

  const addToWardrobe = (item: ClothingItem) => {
    setWardrobe([...wardrobe, item]);
    setShowAddItem(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-200">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 pt-10 flex justify-between items-center sticky top-0 z-30 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI 穿搭助手</h1>
            <p className="text-indigo-100 text-sm">让每天的穿搭更简单</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleListening}
              className={cn(
                "p-3 rounded-full transition-all duration-300",
                isRecording ? "bg-red-500 animate-pulse shadow-lg shadow-red-500/50" : "bg-white/20 hover:bg-white/30"
              )}
            >
              {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {isRecording && (
          <div className="absolute top-24 left-0 right-0 z-40 px-4">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-pink-100 flex items-center gap-4 animate-in slide-in-from-top-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">语音识别中...</p>
                <p className="text-slate-800 font-medium">{transcript}</p>
              </div>
            </div>
          </div>
        )}

        <main className="pb-24">
          {activeTab === 'wardrobe' && (
            <div className="p-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">我的衣橱</h2>
                <button 
                  onClick={() => setShowAddItem(true)}
                  className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {['全部', '上衣', '裤子', '外套', '鞋包', '配饰'].map((cat) => (
                  <button key={cat} className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium whitespace-nowrap hover:bg-slate-200 active:bg-indigo-100 active:text-indigo-700">
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {wardrobe.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-slate-500 capitalize">{item.type}</p>
                    </div>
                    <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outfit' && (
            <div className="space-y-6">
              <div className="px-4 pt-4">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50" />
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">今日天气</p>
                      <div className="flex items-center gap-2">
                        <span className="text-5xl font-light text-slate-800">{currentTemp}°</span>
                        <span className="text-slate-400">/ 16°</span>
                      </div>
                      <p className="text-indigo-600 font-medium mt-1">北京市 · 晴转多云</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-200">
                      <Sun className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6">
                     {[ 
                       { icon: <Sun className="w-5 h-5 text-amber-500" />, label: '晴天', val: 'sunny' },
                       { icon: <CloudRain className="w-5 h-5 text-blue-500" />, label: '雨天', val: 'rainy' },
                       { icon: <Snowflake className="w-5 h-5 text-slate-400" />, label: '雪天', val: 'snowy' },
                       { icon: <Wind className="w-5 h-5 text-cyan-500" />, label: '大风', val: 'windy' }
                     ].map((w) => (
                       <button 
                        key={w.val}
                        onClick={() => setCurrentWeather(w.val as Weather)}
                        className={cn(
                          "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                          currentWeather === w.val ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"
                        )}
                       >
                         {w.icon}
                         <span className="text-xs">{w.label}</span>
                       </button>
                     ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-3">选择今日场合</p>
                    <div className="flex gap-2 flex-wrap">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ.id}
                          onClick={() => setSelectedOccasion(occ.id)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                            selectedOccasion === occ.id 
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
                          )}
                        >
                          {occ.icon}
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">为您推荐</h2>
                    <p className="text-slate-500 text-sm">基于 {OCCASIONS.find(o => o.id === selectedOccasion)?.label} · {currentTemp}°C</p>
                  </div>
                  <button onClick={generateRecommendations} className="flex items-center gap-1 text-indigo-600 text-sm font-medium">
                    <RotateCcw className="w-4 h-4" /> 换一批
                  </button>
                </div>

                <div className="space-y-6">
                  {recommendations.map((outfit) => (
                    <div key={outfit.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                      <div className="flex gap-3 mb-4">
                         <div className="flex-1 grid grid-cols-3 gap-2">
                            {outfit.items.slice(0, 3).map((item, i) => (
                              <div key={item.id} className={cn("aspect-square rounded-2xl overflow-hidden bg-slate-100", i === 0 && "row-span-2 aspect-auto")}>
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {outfit.items.length > 3 && (
                               <div className="aspect-square rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
                                 <span className="text-slate-400 font-bold">+{outfit.items.length - 3}</span>
                               </div>
                            )}
                         </div>
                         <div className="w-[100px] bg-gradient-to-b from-indigo-50 to-purple-50 rounded-2xl flex flex-col items-center justify-center p-2">
                            <Sparkles className="w-6 h-6 text-indigo-500 mb-1" />
                            <span className="text-2xl font-bold text-indigo-700">{outfit.score}</span>
                            <span className="text-xs text-indigo-400">搭配指数</span>
                         </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all">
                           <CheckCircle2 className="w-5 h-5" /> 就穿这套
                        </button>
                        <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
                           <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
             <div className="p-6 text-center pt-12">
                <div className="w-24 h-24 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                   <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">时尚达人</h2>
                <p className="text-slate-500 mb-8">穿搭记录 · 数据统计</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="text-2xl font-bold text-indigo-600">{wardrobe.length}</div>
                      <div className="text-xs text-slate-500">件衣物</div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="text-2xl font-bold text-pink-600">24</div>
                      <div className="text-xs text-slate-500">次穿搭</div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="text-2xl font-bold text-amber-600">12</div>
                      <div className="text-xs text-slate-500">天连续</div>
                   </div>
                </div>

                <div className="space-y-3">
                   {['偏好设置', '穿搭历史', '帮助中心'].map((item) => (
                      <div key={item} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:bg-slate-50">
                         <span className="font-medium">{item}</span>
                         <X className="w-4 h-4 text-slate-300 rotate-45" />
                      </div>
                   ))}
                </div>
             </div>
          )}
        </main>

        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-30 pb-8">
           {[ 
             { id: 'wardrobe', icon: <ShoppingBag className="w-6 h-6" />, label: '衣橱' },
             { id: 'outfit', icon: <Sparkles className="w-6 h-6" />, label: '推荐' },
             { id: 'profile', icon: <User className="w-6 h-6" />, label: '我的' },
           ].map((tab) => (
             <button 
               key={tab.id} 
               onClick={() => setActiveTab(tab.id as any)}
               className="flex flex-col items-center gap-1 transition-colors"
             >
               <div className={cn(
                 "transition-all duration-300",
                 activeTab === tab.id ? "text-indigo-600 scale-110" : "text-slate-400"
               )}>
                 {tab.icon}
               </div>
               <span className={cn(
                 "text-xs font-medium",
                 activeTab === tab.id ? "text-indigo-600" : "text-slate-400"
               )}>
                 {tab.label}
               </span>
             </button>
           ))}
        </nav>

        {showAddItem && (
          <AddItemModal 
            onClose={() => setShowAddItem(false)} 
            onSave={addToWardrobe} 
          />
        )}
      </div>
    </div>
  );
}

function AddItemModal({ onClose, onSave }: { onClose: () => void, onSave: (item: ClothingItem) => void }) {
  const [step, setStep] = useState<'camera' | 'details'>('camera');
  const [type, setType] = useState<ClothingType>('top');
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 'camera') setStep('details');
    else {
      onSave({
        id: Math.random().toString(36),
        name,
        type,
        color: '#FFF',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80',
        tags: ['new']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold">{step === 'camera' ? '添加新衣物' : '衣物详情'}</h3>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
             <X className="w-5 h-5" />
           </button>
        </div>

        {step === 'camera' ? (
          <div className="space-y-6">
             <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
                <Camera className="w-12 h-12 text-slate-400 mb-4" />
                <p className="text-slate-500 font-medium">点击拍摄或上传照片</p>
                <div className="flex gap-4 mt-6">
                   <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                     拍照
                   </button>
                   <button onClick={() => setStep('details')} className="bg-white text-slate-700 px-6 py-2 rounded-full font-medium border border-slate-300 hover:bg-slate-50 transition-colors">
                     从相册选择
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                   <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3">
                   <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">名称</label>
                      <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="例如：蓝色牛仔外套"
                        className="w-full border-b-2 border-slate-200 py-2 focus:border-indigo-500 outline-none font-medium"
                      />
                   </div>
                </div>
             </div>

             <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">分类</label>
                <div className="grid grid-cols-4 gap-2">
                   {[ 
                     { id: 'top', icon: <Shirt className="w-5 h-5" />, label: '上衣' },
                     { id: 'bottom', icon: <ShoppingBag className="w-5 h-5" />, label: '下装' },
                     { id: 'shoes', icon: <ShoppingBag className="w-5 h-5" />, label: '鞋子' },
                     { id: 'accessory', icon: <Hat className="w-5 h-5" />, label: '配饰' }
                   ].map((t) => (
                     <button 
                       key={t.id} 
                       onClick={() => setType(t.id as ClothingType)}
                       className={cn(
                         "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all",
                         type === t.id ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-100 bg-white text-slate-500"
                       )}
                     >
                        {t.icon}
                        <span className="text-xs font-medium">{t.label}</span>
                     </button>
                   ))}
                </div>
             </div>

             <button 
               onClick={handleNext}
               className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
             >
               保存到衣橱
             </button>
          </div>
        )}
      </div>
    </div>
  );
}