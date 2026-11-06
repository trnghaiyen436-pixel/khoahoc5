import React, { useState } from 'react';
import { X, Printer, Send, MessageCircle, Mail, Check, Sparkles, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { ParentReport } from '../types';
import { sounds } from '../utils/soundEffects';

interface ParentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ParentReport;
  onUpdateProfileRequest: () => void;
}

export const ParentReportModal: React.FC<ParentReportModalProps> = ({
  isOpen,
  onClose,
  report,
  onUpdateProfileRequest
}) => {
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'preview' | 'send'>('preview');

  if (!isOpen) return null;

  const summaryTextMessage = `[BÁO CÁO HỌC TẬP KHOA HỌC LỚP 5]
Kính gửi Quý Phụ huynh em: ${report.studentName} (Lớp ${report.className})
Bài học: Bài 7 - VAI TRÒ CỦA NĂNG LƯỢNG (SGK Kết nối tri thức)

🌟 ĐIỂM SỐ: ${report.totalScore}/${report.maxScore} điểm
🏆 XẾP LOẠI: ${report.gradeEvaluation}
🎖️ HUY HIỆU ĐẠT ĐƯỢC: ${report.badgesEarned.map(b => b.title).join(', ') || 'Đang rèn luyện'}

📊 ĐÁNH GIÁ NĂNG LỰC:
- Nhận biết các nguồn năng lượng: ${report.competencies.identification}%
- Hiểu vai trò của năng lượng: ${report.competencies.roleAnalysis}%
- Ý thức tiết kiệm & an toàn năng lượng: ${report.competencies.energySaving}%
- Tốc độ & độ tập trung: ${report.competencies.speedAndFocus}%

📝 NHẬN XÉT:
${report.teacherNote}

💡 LỜI KHUYÊN CHO GIA ĐÌNH:
${report.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Thời gian hoàn thành: ${report.completedAt}`;

  const handleCopyZalo = () => {
    sounds.playClick();
    navigator.clipboard.writeText(summaryTextMessage);
    setCopyStatus('zalo');
    setTimeout(() => setCopyStatus(''), 2500);
  };

  const handleSendEmail = () => {
    sounds.playClick();
    const subject = encodeURIComponent(`[Báo cáo học tập] Kết quả ôn tập Khoa học lớp 5 - Em ${report.studentName}`);
    const body = encodeURIComponent(summaryTextMessage);
    window.location.href = `mailto:${report.parentEmail}?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Hệ Thống Báo Cáo Kết Quả Học Tập Cho Phụ Huynh
              </h3>
              <p className="text-xs text-slate-500">
                Khoa học lớp 5 · Bài 7: Vai trò của năng lượng · Báo cáo chuẩn đánh giá học sinh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Xem Phiếu Đánh Giá
              </button>
              <button
                onClick={() => setActiveTab('send')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'send' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-amber-500" />
                Gửi Báo Cáo
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50">
          {activeTab === 'preview' ? (
            /* PRINTABLE REPORT SHEET */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6 print:m-0 print:border-none print:shadow-none print:p-0">
              
              {/* Header Letterhead */}
              <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    Trường Tiểu Học · Ban Chuyên Môn Khoa Học Lớp 5
                  </span>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                    PHIẾU ĐÁNH GIÁ NĂNG LỰC ÔN TẬP
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Bài 7: VAI TRÒ CỦA NĂNG LƯỢNG (Sách Kết nối tri thức với cuộc sống)
                  </p>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500">
                  <p>Ngày thực hiện: <span className="font-semibold text-slate-800">{report.completedAt}</span></p>
                  <p>Mã hồ sơ: <span className="font-mono text-slate-700">KH5-B7-{report.studentName.replace(/\s+/g, '').substring(0, 6)}</span></p>
                </div>
              </div>

              {/* Student and Parent Details Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Họ và tên học sinh:</span>
                  <span className="font-bold text-sm text-slate-900">{report.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lớp học:</span>
                  <span className="font-bold text-sm text-slate-900">{report.className}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phụ huynh nhận:</span>
                  <span className="font-bold text-sm text-slate-900">{report.parentName || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Số điện thoại/Zalo:</span>
                  <span className="font-bold text-sm text-slate-900 font-mono">{report.parentPhone || 'Chưa cập nhật'}</span>
                </div>
              </div>

              {/* Overall Score & Rating Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-100">
                    Kết Quả Tổng Thể
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono">
                      {report.totalScore}
                    </span>
                    <span className="text-amber-200 text-sm">/ {report.maxScore} điểm tối đa</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-100">
                    Xếp Loại Đạt Được
                  </span>
                  <div className="text-xl sm:text-2xl font-black mt-1 bg-white/20 px-3.5 py-1 rounded-xl inline-block backdrop-blur-xs">
                    {report.gradeEvaluation}
                  </div>
                </div>
              </div>

              {/* Competency Matrix Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Đánh Giá Ma Trận Năng Lực Theo Yêu Cầu Cần Đạt (SGK Lớp 5)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-700">1. Nhận biết các nguồn năng lượng</span>
                      <span className="font-mono text-amber-700 font-bold">{report.competencies.identification}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.competencies.identification}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Mặt Trời, Gió, Nước chảy, Thức ăn, Nhiên liệu hoá thạch, Điện
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-700">2. Hiểu vai trò của năng lượng</span>
                      <span className="font-mono text-emerald-700 font-bold">{report.competencies.roleAnalysis}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.competencies.roleAnalysis}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Cung cấp cho con người, động vật, thực vật và máy móc hoạt động
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-700">3. Sử dụng tiết kiệm & Năng lượng tái tạo</span>
                      <span className="font-mono text-cyan-700 font-bold">{report.competencies.energySaving}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.competencies.energySaving}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Ý thức tắt thiết bị điện khi không dùng, ủng hộ năng lượng sạch
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-700">4. Tốc độ tư duy & Độ tập trung</span>
                      <span className="font-mono text-purple-700 font-bold">{report.competencies.speedAndFocus}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${report.competencies.speedAndFocus}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Phản xạ trả lời câu hỏi trắc nghiệm và chuỗi combo liên tiếp
                    </p>
                  </div>
                </div>
              </div>

              {/* Teacher's Pedagogical Note */}
              <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/40">
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-2">
                  Nhận Xét Sư Phạm Dành Cho Học Sinh:
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{report.teacherNote}"
                </p>
              </div>

              {/* Recommendations for Parents at Home */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Gợi Ý Đồng Hành Cùng Con Tại Nhà:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badges Earned Section */}
              {report.badgesEarned.length > 0 && (
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2.5">
                    Huy Hiệu Học Sinh Đã Đạt ({report.badgesEarned.length}):
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {report.badgesEarned.map(b => (
                      <div key={b.id} className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signatures for Print */}
              <div className="hidden print:grid grid-cols-2 pt-8 text-center text-xs">
                <div>
                  <p className="font-bold text-slate-800">Ý KIẾN PHỤ HUYNH HỌC SINH</p>
                  <p className="text-slate-400 italic mt-12">(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">GIÁO VIÊN BỘ MÔN KHOA HỌC</p>
                  <p className="text-slate-400 italic mt-12">(Đã ký duyệt điện tử)</p>
                </div>
              </div>
            </div>
          ) : (
            /* SEND REPORT VIEW */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900">
                    Gửi Báo Cáo Trực Tiếp Đến Phụ Huynh
                  </h4>
                  <button
                    onClick={onUpdateProfileRequest}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
                  >
                    Đổi thông tin liên hệ
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="text-slate-600">
                    Phụ huynh: <strong className="text-slate-900">{report.parentName || 'Chưa đặt tên'}</strong>
                  </p>
                  <p className="text-slate-600">
                    Số điện thoại/Zalo: <strong className="text-slate-900 font-mono">{report.parentPhone || 'Chưa có SĐT'}</strong>
                  </p>
                  <p className="text-slate-600">
                    Email nhận: <strong className="text-slate-900 font-mono">{report.parentEmail || 'Chưa có Email'}</strong>
                  </p>
                </div>

                {/* Direct Action Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Zalo / SMS Copy Button */}
                  <button
                    onClick={handleCopyZalo}
                    className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-50 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-blue-600 text-white">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      {copyStatus === 'zalo' ? (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Đã sao chép!
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-900">Sao Chép Gửi Zalo / Tin Nhắn</div>
                    <p className="text-xs text-slate-500 mt-1">
                      Tự động sao chép toàn bộ bản báo cáo tóm tắt để dán gửi Zalo cho bố mẹ.
                    </p>
                  </button>

                  {/* Send Email Button */}
                  <button
                    onClick={handleSendEmail}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-amber-600 text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Mở Soạn Email Cho Bố Mẹ</div>
                    <p className="text-xs text-slate-500 mt-1">
                      Mở ứng dụng email với tiêu đề và nội dung phiếu đánh giá chuẩn bị sẵn.
                    </p>
                  </button>
                </div>

                {/* Message Preview Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nội dung tin nhắn mẫu gửi phụ huynh:
                  </label>
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed">
                    {summaryTextMessage}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>💡 Bố mẹ có thể xem lại kết quả này bất kỳ lúc nào để theo dõi tiến độ của con.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>In Phiếu (Xuất PDF)</span>
            </button>

            <button
              onClick={handleCopyZalo}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              {copyStatus === 'zalo' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span>Sao Chép Gửi Zalo</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
