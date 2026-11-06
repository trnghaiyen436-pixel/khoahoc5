import React, { useState } from 'react';
import { X, User, Check, Sparkles } from 'lucide-react';
import { getStudentProfile, saveStudentProfile } from '../utils/storage';
import { sounds } from '../utils/soundEffects';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}

const AVATARS = ['🚀', '👩‍🔬', '👨‍🔬', '⚡', '⭐', '🌱', '🦁', '🦉', '🤖', '🏆'];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileUpdated
}) => {
  const current = getStudentProfile();
  const [name, setName] = useState(current.name);
  const [className, setClassName] = useState(current.className);
  const [avatar, setAvatar] = useState(current.avatar);
  const [parentName, setParentName] = useState(current.parentName);
  const [parentPhone, setParentPhone] = useState(current.parentPhone);
  const [parentEmail, setParentEmail] = useState(current.parentEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStudentProfile({
      name: name.trim() || 'Học sinh lớp 5',
      className: className.trim() || '5A1',
      avatar,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim()
    });
    sounds.playCorrect();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onProfileUpdated();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hồ Sơ Học Sinh & Phụ Huynh</h3>
              <p className="text-xs text-slate-500">Cá nhân hoá bảng xếp hạng và phiếu báo cáo gửi về nhà</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Chọn Biểu Tượng Của Em:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map(av => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setAvatar(av);
                  }}
                  className={`w-11 h-11 text-2xl rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    avatar === av
                      ? 'bg-amber-100 border-2 border-amber-500 scale-105 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Họ và Tên Học Sinh
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Tuấn Kiệt"
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lớp Học
              </label>
              <select
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="5A1">Lớp 5A1</option>
                <option value="5A2">Lớp 5A2</option>
                <option value="5A3">Lớp 5A3</option>
                <option value="5B1">Lớp 5B1</option>
                <option value="5B2">Lớp 5B2</option>
              </select>
            </div>
          </div>

          {/* Parent Info for Reporting */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Thông Tin Nhận Báo Cáo Của Phụ Huynh</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Họ tên Bố / Mẹ
              </label>
              <input
                type="text"
                value={parentName}
                onChange={e => setParentName(e.target.value)}
                placeholder="Ví dụ: Bố Tuấn Kiệt"
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Số Zalo / Điện thoại
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={e => setParentPhone(e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Email Phụ Huynh
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={e => setParentEmail(e.target.value)}
                  placeholder="phuhuynh@gmail.com"
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã lưu!
                </>
              ) : (
                'Lưu Hồ Sơ'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
