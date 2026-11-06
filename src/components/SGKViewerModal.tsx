import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Info, BookOpen } from 'lucide-react';
import { SGK_ACTIVITIES, ENERGY_SOURCES } from '../data/energyLessonData';

interface SGKViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SGKViewerModal: React.FC<SGKViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedFigure, setSelectedFigure] = useState<string>('1a');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  const activeActivity = SGK_ACTIVITIES.find(a => a.sgkFigure === selectedFigure) || SGK_ACTIVITIES[0];
  const sourceInfo = ENERGY_SOURCES[activeActivity.correctSource];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Sách Giáo Khoa: Bài 7 - Vai Trò Của Năng Lượng
              </h3>
              <p className="text-xs text-slate-500">
                Khoa học lớp 5 · Chủ đề 2: Năng lượng · Bộ sách Kết nối tri thức với cuộc sống
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Left: Book Page Image Viewer (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col bg-slate-100/70">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Trang sách gốc (Hình 1 & Hình 2)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                  className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-slate-500 w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.2))}
                  className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  title="Phóng to"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-xl border border-slate-300 bg-white shadow-inner flex items-center justify-center p-2 min-h-[350px]">
              <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}
                className="relative inline-block"
              >
                <img
                  src="/assets/aistudio/image_79283844.png"
                  alt="Sách Giáo Khoa Khoa Học Lớp 5 - Bài 7: Vai trò của năng lượng"
                  className="max-w-full h-auto rounded-lg shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-slate-500">
              💡 Bấm vào các thẻ hình ảnh bên phải để xem phân tích chi tiết nguồn năng lượng từng mục trong SGK.
            </p>
          </div>

          {/* Right: Interactive Fig List & Deep Dive (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col bg-white overflow-y-auto">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Danh Sách Hình Ảnh Trong Bài Học
            </h4>
            
            {/* Quick Filter buttons */}
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {SGK_ACTIVITIES.map(act => (
                <button
                  key={act.id}
                  onClick={() => setSelectedFigure(act.sgkFigure)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    selectedFigure === act.sgkFigure
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {act.sgkFigure.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Active Detail View */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold text-xs rounded-md">
                    {activeActivity.sgkLabel}
                  </span>
                  <span className="text-xs text-slate-500">
                    {activeActivity.category === 'machine' ? 'Máy móc & Phương tiện' : activeActivity.category === 'plant_animal' ? 'Thực vật & Động vật' : 'Hiện tượng tự nhiên'}
                  </span>
                </div>

                <h5 className="font-bold text-base text-slate-900 mb-2">
                  {activeActivity.title}
                </h5>

                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {activeActivity.description}
                </p>

                <div className="p-3 bg-white rounded-lg border border-slate-200 mb-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Nguồn năng lượng cung cấp:</span>
                    <span className="text-amber-700 font-bold">{sourceInfo.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Loại năng lượng:</span>
                    <span className={sourceInfo.isRenewable ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                      {sourceInfo.isRenewable ? 'Năng lượng Tái tạo (Sạch)' : 'Nhiên liệu hoá thạch (Có hạn)'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-100/80 p-3 rounded-lg leading-relaxed">
                  <strong className="text-slate-900 font-semibold block mb-1">
                    🔍 Ý nghĩa & Vai trò trong cuộc sống:
                  </strong>
                  {activeActivity.explanation}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
                <Info className="w-4 h-4 shrink-0" />
                <span>Hoạt động: {activeActivity.energyEffect}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Ghi nhớ: Mọi hoạt động sống của con người, động vật, thực vật và máy móc đều cần năng lượng.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium cursor-pointer transition-colors"
          >
            Đã hiểu bài
          </button>
        </div>
      </div>
    </div>
  );
};
