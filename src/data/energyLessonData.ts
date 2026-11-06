import { EnergyInfo, ActivityCard, QuizQuestion, Badge, LeaderboardEntry } from '../types';

export const ENERGY_SOURCES: Record<string, EnergyInfo> = {
  sun: {
    id: 'sun',
    name: 'Năng lượng Mặt Trời',
    shortName: 'Mặt Trời',
    iconName: 'Sun',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    description: 'Cung cấp ánh sáng và nhiệt vô tận từ tự nhiên, giúp cây xanh quang hợp phát triển, sưởi ấm vạn vật và sạc pin mặt trời.',
    isRenewable: true,
    examples: ['Cây trồng quang hợp lớn lên', 'Phơi quần áo, phơi lúa', 'Pin năng lượng mặt trời', 'Máy nước nóng năng lượng mặt trời']
  },
  wind: {
    id: 'wind',
    name: 'Năng lượng Gió',
    shortName: 'Gió',
    iconName: 'Wind',
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-300',
    description: 'Không khí chuyển động tạo ra lực gió, làm quay chong chóng, đẩy thuyền buồm và quay các cột tua-bin phát điện.',
    isRenewable: true,
    examples: ['Chong chóng quay trong gió', 'Tua-bin điện gió khổng lồ', 'Thuyền buồm lướt sóng', 'Thả diều trên triền đê']
  },
  water: {
    id: 'water',
    name: 'Năng lượng Nước chảy',
    shortName: 'Dòng nước',
    iconName: 'Droplets',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    description: 'Dòng nước chảy xiết từ trên cao xuống tạo ra lực đẩy làm quay cọn nước (guồng nước) và quay tua-bin nhà máy thuỷ điện.',
    isRenewable: true,
    examples: ['Cọn nước (guồng nước) đưa nước lên ruộng', 'Nhà máy thuỷ điện Hòa Bình, Sơn La', 'Thuyền bè xuôi dòng nước']
  },
  food: {
    id: 'food',
    name: 'Năng lượng từ Thức ăn',
    shortName: 'Thức ăn',
    iconName: 'Apple',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    description: 'Thức ăn và nước uống cung cấp calo và dưỡng chất giúp con người và động vật sinh trưởng, hoạt động, suy nghĩ và lao động.',
    isRenewable: true,
    examples: ['Học sinh chạy bộ và vui chơi', 'Trâu bò ăn cỏ để kéo cày', 'Con người suy nghĩ, học bài', 'Chim bay lượn bắt sâu']
  },
  fuel: {
    id: 'fuel',
    name: 'Năng lượng Nhiên liệu (Xăng, Dầu, Than)',
    shortName: 'Xăng dầu & Than',
    iconName: 'Flame',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    description: 'Nhiên liệu hoá thạch khi bị đốt cháy toả ra nhiệt lượng và cơ năng lớn, vận hành xe cộ, máy bay, máy công trình.',
    isRenewable: false,
    examples: ['Xe máy đổ xăng chạy trên đường', 'Máy xúc đất, xe tải thi công công trường', 'Tàu hoả chạy bằng dầu diesel hoặc than đá', 'Bếp gas nấu thức ăn']
  },
  electricity: {
    id: 'electricity',
    name: 'Năng lượng Điện',
    shortName: 'Điện năng',
    iconName: 'Zap',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    description: 'Nguồn năng lượng tiện ích hàng đầu do con người tạo ra và dẫn truyền qua dây điện, phục vụ chiếu sáng và chạy thiết bị gia đình.',
    isRenewable: true,
    examples: ['Nồi cơm điện nấu cơm chín thơm', 'Xe đạp điện di chuyển nhờ ắc quy', 'Máy bơm nước tưới ruộng', 'Bóng đèn chiếu sáng phòng học']
  }
};

export const SGK_ACTIVITIES: ActivityCard[] = [
  {
    id: 'act-1a',
    title: 'Cây rau và hoa màu trên đồng ruộng tươi tốt',
    sgkFigure: '1a',
    sgkLabel: 'Hình 1a - Ruộng rau xanh',
    description: 'Quan sát Hình 1a: Cây trồng dưới ánh nắng mặt trời đang xanh tốt và sinh trưởng mạnh mẽ.',
    correctSource: 'sun',
    explanation: 'Cây cối cần năng lượng ánh sáng và nhiệt từ Mặt Trời để quang hợp, tổng hợp chất diệp lục và lớn lên.',
    category: 'plant_animal',
    energyEffect: 'Giúp cây quang hợp, phát triển và cho hoa thơm trái ngọt'
  },
  {
    id: 'act-1b',
    title: 'Người lái xe máy đang lưu thông trên phố',
    sgkFigure: '1b',
    sgkLabel: 'Hình 1b - Chạy xe máy',
    description: 'Quan sát Hình 1b: Chú lái xe máy tay ga di chuyển nhanh trên đường phố.',
    correctSource: 'fuel',
    explanation: 'Xe máy cần đổ xăng (nhiên liệu). Động cơ đốt trong đốt cháy xăng tạo lực cơ học đẩy bánh xe quay.',
    category: 'machine',
    energyEffect: 'Làm động cơ chuyển động đẩy xe chở người đi lại'
  },
  {
    id: 'act-1c',
    title: 'Con trâu đang gặm cỏ trên bãi đất',
    sgkFigure: '1c',
    sgkLabel: 'Hình 1c - Con trâu ăn cỏ',
    description: 'Quan sát Hình 1c: Chú trâu chăm chỉ gặm từng bụi cỏ non trên bờ cỏ xanh.',
    correctSource: 'food',
    explanation: 'Động vật cần năng lượng từ thức ăn (cỏ non) để nuôi dưỡng cơ thể, sinh trưởng và kéo cày giúp bác nông dân.',
    category: 'plant_animal',
    energyEffect: 'Cung cấp sức lực để sống, đi lại và cày bừa đất'
  },
  {
    id: 'act-1d',
    title: 'Bé gái cầm chong chóng quay tít trên đồi gió',
    sgkFigure: '1d',
    sgkLabel: 'Hình 1d - Chong chóng quay',
    description: 'Quan sát Hình 1d: Em bé giơ cao chong chóng nhiều màu sắc, chong chóng quay tít cạnh cánh đồng tua-bin.',
    correctSource: 'wind',
    explanation: 'Gió thổi tác động lên các cánh chong chóng, truyền động năng làm chong chóng quay tròn.',
    category: 'nature',
    energyEffect: 'Tạo sức đẩy không khí làm quay chong chóng và tua-bin gió'
  },
  {
    id: 'act-1e',
    title: 'Nồi cơm điện đang nấu chín hạt gạo',
    sgkFigure: '1e',
    sgkLabel: 'Hình 1e - Nồi cơm điện',
    description: 'Quan sát Hình 1e: Chiếc nồi cơm điện cắm phích vào ổ tường, đang nấu cơm bốc hơi thơm lừng.',
    correctSource: 'electricity',
    explanation: 'Nồi cơm điện nhận năng lượng điện từ lưới điện, biến điện năng thành nhiệt năng đốt nóng mâm nhiệt làm chín cơm.',
    category: 'machine',
    energyEffect: 'Toả nhiệt độ cao làm chín gạo thành cơm thơm ngon'
  },
  {
    id: 'act-1g',
    title: 'Cọn nước (guồng nước) quay đưa nước lên ruộng',
    sgkFigure: '1g',
    sgkLabel: 'Hình 1g - Cọn nước bên suối',
    description: 'Quan sát Hình 1g: Guồng nước bằng tre gỗ khổng lồ quay đều đặn nhờ dòng sông suối chảy xiết.',
    correctSource: 'water',
    explanation: 'Dòng nước chảy xiết tác dụng lực vào các phên nan, làm quay bánh cọn múc nước đưa lên máng dẫn vào ruộng.',
    category: 'machine',
    energyEffect: 'Dòng chảy tác dụng lực quay guồng múc nước lên cao'
  },
  {
    id: 'act-2a',
    title: 'Bác nông dân vận hành máy bơm nước tưới lúa',
    sgkFigure: '2a',
    sgkLabel: 'Hình 2a - Bơm nước',
    description: 'Quan sát Hình 2a: Máy bơm công suất lớn hút nước từ mương tưới tràn vào ruộng lúa.',
    correctSource: 'electricity',
    explanation: 'Máy bơm dùng năng lượng điện (hoặc nhiên liệu) để làm quay cánh quạt hút và đẩy nước tưới tiêu đồng ruộng.',
    category: 'machine',
    energyEffect: 'Vận hành mô tơ bơm nước tưới tiêu ruộng đồng'
  },
  {
    id: 'act-2b',
    title: 'Máy xúc đất và xe tải thi công công trình',
    sgkFigure: '2b',
    sgkLabel: 'Hình 2b - Máy xúc đất',
    description: 'Quan sát Hình 2b: Máy xúc gầu lớn đang múc đất đá lên thùng xe ben tải nặng.',
    correctSource: 'fuel',
    explanation: 'Máy xúc và xe tải siêu trường cần năng lượng từ dầu diesel (nhiên liệu) để vận hành cánh tay thủy lực và bánh xích.',
    category: 'machine',
    energyEffect: 'Cung cấp sức kéo cực lớn để đào múc và chở hàng tấn đất đá'
  },
  {
    id: 'act-2c',
    title: 'Đoàn tàu hỏa băng qua cầu trên đường ray',
    sgkFigure: '2c',
    sgkLabel: 'Hình 2c - Tàu hoả chạy',
    description: 'Quan sát Hình 2c: Đoàn tàu chở nhiều toa khách và hàng hoá đang lao nhanh trên đường ray.',
    correctSource: 'electricity',
    explanation: 'Tàu hoả hiện đại sử dụng năng lượng điện (hoặc đầu máy diesel) để kéo toàn bộ đoàn tàu di chuyển đường dài.',
    category: 'machine',
    energyEffect: 'Kéo các toa tàu nặng hàng trăm tấn di chuyển khắp đất nước'
  },
  {
    id: 'act-2d',
    title: 'Bạn học sinh đạp xe đạp điện đến trường',
    sgkFigure: '2d',
    sgkLabel: 'Hình 2d - Đi xe đạp điện',
    description: 'Quan sát Hình 2d: Bạn nhỏ đội mũ bảo hiểm đang điều khiển chiếc xe đạp điện êm ái trên đường.',
    correctSource: 'electricity',
    explanation: 'Xe đạp điện sử dụng năng lượng điện được tích trữ sẵn trong ắc quy hoặc pin lithium để động cơ điện vận hành.',
    category: 'machine',
    energyEffect: 'Động cơ điện dẫn động bánh xe lăn bánh nhẹ nhàng'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Khi em dùng tay đẩy một chiếc xe đồ chơi trên sàn, điều gì đã làm cho chiếc xe chuyển động?',
    options: [
      'Tay ta đã cung cấp năng lượng làm xe chuyển động',
      'Chiếc xe tự nhiên có thể tự chạy mà không cần gì',
      'Sàn nhà đẩy chiếc xe đi về phía trước',
      'Không khí xung quanh kéo chiếc xe chạy'
    ],
    correctAnswer: 0,
    explanation: 'Theo SGK: Khi đẩy chiếc xe đồ chơi, cơ bắp tay của ta đã cung cấp năng lượng làm cho xe chuyển động.',
    sgkReference: 'SGK trang đầu Mục 1',
    competency: 'identification'
  },
  {
    id: 'q2',
    question: 'Nguồn năng lượng nào giúp ngọn nến có thể phát sáng và toả nhiệt khi được thắp sáng?',
    options: [
      'Năng lượng từ không khí lạnh trong phòng',
      'Năng lượng dự trữ trong sáp nến khi bị đốt cháy',
      'Năng lượng điện từ dây dẫn ngầm',
      'Năng lượng gió thổi qua cửa sổ'
    ],
    correctAnswer: 1,
    explanation: 'Ngọn nến khi cháy giải phóng năng lượng hoá học dự trữ trong sáp nến, biến đổi thành năng lượng ánh sáng và nhiệt năng toả ra xung quanh.',
    sgkReference: 'SGK Mục 1',
    competency: 'role_analysis'
  },
  {
    id: 'q3',
    question: 'Con người lấy năng lượng chủ yếu từ đâu để sống, học tập, phát triển và chạy nhảy thể thao?',
    options: [
      'Từ việc sạc điện thoại mỗi tối',
      'Từ thức ăn và đồ uống dinh dưỡng hằng ngày',
      'Chỉ cần hít thở không khí mà không cần ăn',
      'Từ các loại than đá và xăng dầu'
    ],
    correctAnswer: 1,
    explanation: 'SGK ghi rõ: Con người sử dụng năng lượng lấy từ thức ăn, đồ uống để sống, phát triển và vận động.',
    sgkReference: 'SGK Mục 2',
    competency: 'role_analysis'
  },
  {
    id: 'q4',
    question: 'Trong các nguồn năng lượng sau, nguồn năng lượng nào là NĂNG LƯỢNG TÁI TẠO (tự nhiên, không bao giờ cạn kiệt)?',
    options: [
      'Dầu mỏ và khí đốt tự nhiên',
      'Than đá ở mỏ Quảng Ninh',
      'Năng lượng Mặt Trời, gió và nước chảy',
      'Xăng chạy xe máy'
    ],
    correctAnswer: 2,
    explanation: 'Mặt Trời, gió và dòng nước là các nguồn năng lượng sạch, có thể tái sinh liên tục từ thiên nhiên.',
    sgkReference: 'Mục Mở rộng SGK',
    competency: 'application_saving'
  },
  {
    id: 'q5',
    question: 'Ở miền núi cao, bà con dùng guồng nước (cọn nước) để làm gì và nhờ nguồn năng lượng nào?',
    options: [
      'Để thắp sáng phòng ngủ nhờ năng lượng gió',
      'Đưa nước từ suối thấp lên ruộng cao nhờ năng lượng dòng nước chảy',
      'Để xay xát lúa mì nhờ năng lượng than đá',
      'Để nấu cơm sôi nhờ năng lượng mặt trời'
    ],
    correctAnswer: 1,
    explanation: 'Cọn nước tận dụng năng lượng nước chảy xiết của dòng suối để múc từng ống nước đổ vào máng dẫn lên ruộng đồng.',
    sgkReference: 'SGK Hình 1g',
    competency: 'identification'
  },
  {
    id: 'q6',
    question: 'Thiết bị nào sau đây biến đổi năng lượng điện thành NHIỆT NĂNG để phục vụ cuộc sống?',
    options: [
      'Nồi cơm điện, bàn là, ấm đun nước siêu tốc',
      'Quạt trần đang quay cánh',
      'Chiếc loa đang phát bài hát',
      'Chiếc gương soi trong phòng ngủ'
    ],
    correctAnswer: 0,
    explanation: 'Nồi cơm điện, bàn là và ấm đun biến đổi điện năng thành nhiệt năng có nhiệt độ cao để nấu ăn, ủi áo quần và đun nước.',
    sgkReference: 'SGK Hình 1e',
    competency: 'role_analysis'
  },
  {
    id: 'q7',
    question: 'Hành động nào sau đây thể hiện việc SỬ DỤNG TIẾT KIỆM VÀ AN TOÀN NĂNG LƯỢNG trong gia đình?',
    options: [
      'Bật máy điều hòa nhiệt độ nhưng lại mở toang cửa sổ',
      'Tắt đèn học và quạt điện khi rời khỏi phòng học',
      'Cắm sạc điện thoại cả ngày lẫn đêm không rút ra',
      'Mở tủ lạnh liên tục để xem có đồ ăn vặt không'
    ],
    correctAnswer: 1,
    explanation: 'Tắt các thiết bị điện khi không sử dụng là hành động thiết thực giúp tiết kiệm điện năng và phòng chống cháy nổ.',
    sgkReference: 'Vận dụng thực tiễn',
    competency: 'application_saving'
  },
  {
    id: 'q8',
    question: 'Máy xúc đất (Hình 2b SGK) cần nguồn năng lượng nào để có thể nâng được hàng tấn đất đá?',
    options: [
      'Năng lượng gió nhẹ mùa thu',
      'Nhiên liệu dầu diesel đốt cháy trong động cơ',
      'Năng lượng từ thức ăn lá cây',
      'Năng lượng nước nhỏ giọt'
    ],
    correctAnswer: 1,
    explanation: 'Máy xúc đất công trường dùng động cơ diesel cực khỏe, đốt cháy nhiên liệu để tạo lực thủy lực nâng đất đá nặng.',
    sgkReference: 'SGK Hình 2b',
    competency: 'identification'
  },
  {
    id: 'q9',
    question: 'Cây lúa trên cánh đồng có thể lớn lên, trổ bông là nhờ nguồn năng lượng chủ yếu nào?',
    options: [
      'Năng lượng từ bình ắc quy điện',
      'Ánh sáng và nhiệt từ Mặt Trời kết hợp nước và chất dinh dưỡng',
      'Khói từ các nhà máy công nghiệp',
      'Năng lượng từ tiếng ồn trên đường xá'
    ],
    correctAnswer: 1,
    explanation: 'Ánh sáng Mặt Trời cung cấp năng lượng cho quá trình quang hợp ở lá cây, giúp cây tạo chất hữu cơ để lớn lên và tạo hạt gạo.',
    sgkReference: 'SGK Hình 1a',
    competency: 'identification'
  },
  {
    id: 'q10',
    question: 'Tại sao việc khuyến khích đi xe đạp, xe đạp điện hoặc đi bộ cự ly gần lại bảo vệ môi trường?',
    options: [
      'Vì xe đạp giúp chạy nhanh hơn máy bay',
      'Vì giảm tiêu thụ xăng dầu và giảm khí thải độc hại ra bầu không khí',
      'Vì xe đạp không cần con người dùng sức',
      'Vì xe đạp phát ra âm thanh rất to'
    ],
    correctAnswer: 1,
    explanation: 'Đi xe đạp dùng năng lượng cơ bắp của người, xe đạp điện dùng điện năng sạch, giúp tiết kiệm nhiên liệu xăng dầu hóa thạch và giữ không khí trong lành.',
    sgkReference: 'SGK Hình 2d & Liên hệ',
    competency: 'application_saving'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-sgk-master',
    title: 'Thám Tử SGK',
    description: 'Khám phá và nối đúng 100% các hình ảnh năng lượng trong bài 7 SGK.',
    icon: 'BookOpen',
    color: 'from-amber-400 to-orange-500',
    isUnlocked: false,
    requirement: 'Hoàn thành Mini-game 1: Ghép Cặp Nguồn Năng Lượng'
  },
  {
    id: 'badge-lab-engineer',
    title: 'Kỹ Sư Tiếp Sức',
    description: 'Nạp đúng nguồn năng lượng cho tất cả người, xe cộ và máy móc trong phòng thí nghiệm.',
    icon: 'BatteryCharging',
    color: 'from-blue-400 to-cyan-500',
    isUnlocked: false,
    requirement: 'Hoàn thành Mini-game 2: Tiếp Sức Cho Máy Móc'
  },
  {
    id: 'badge-speed-genius',
    title: 'Thần Tốc Khoa Học',
    description: 'Trả lời đúng liên tiếp 5 câu đố vui trắc nghiệm siêu tốc không hề sai sót.',
    icon: 'Zap',
    color: 'from-yellow-400 to-amber-500',
    isUnlocked: false,
    requirement: 'Đạt chuỗi Combo 5 câu đúng trong Mini-game 3'
  },
  {
    id: 'badge-green-warrior',
    title: 'Chiến Binh Năng Lượng Xanh',
    description: 'Phân loại xuất sắc nguồn năng lượng tái tạo và giải quyết mọi tình huống tiết kiệm.',
    icon: 'Leaf',
    color: 'from-emerald-400 to-teal-500',
    isUnlocked: false,
    requirement: 'Hoàn thành xuất sắc Mini-game 4: Vệ Sĩ Năng Lượng Xanh'
  },
  {
    id: 'badge-grand-master',
    title: 'Bác Học Nhí Lớp 5',
    description: 'Đạt trên 1,000 điểm tổng kết và làm chủ toàn bộ kiến thức bài 7.',
    icon: 'Award',
    color: 'from-purple-500 to-indigo-600',
    isUnlocked: false,
    requirement: 'Tổng điểm 4 mini game đạt từ 1,000 điểm trở lên'
  },
  {
    id: 'badge-diligent-star',
    title: 'Ngôi Sao Chăm Chỉ',
    description: 'Kiên trì ôn tập và rèn luyện kiến thức nhiều lượt để ghi nhớ sâu sắc.',
    icon: 'Star',
    color: 'from-pink-400 to-rose-500',
    isUnlocked: false,
    requirement: 'Thực hiện ôn tập bài học từ 2 lượt trở lên'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    studentName: 'Nguyễn Minh Anh',
    className: '5A1',
    avatar: '👩‍🔬',
    totalScore: 1420,
    gamesPlayed: 5,
    badgesCount: 6,
    accuracy: 98,
    lastPlayed: '15 phút trước'
  },
  {
    id: 'lb-2',
    studentName: 'Trần Bảo Long',
    className: '5A1',
    avatar: '🚀',
    totalScore: 1350,
    gamesPlayed: 4,
    badgesCount: 5,
    accuracy: 94,
    lastPlayed: '30 phút trước'
  },
  {
    id: 'lb-3',
    studentName: 'Lê Phương Linh',
    className: '5A2',
    avatar: '⭐',
    totalScore: 1280,
    gamesPlayed: 4,
    badgesCount: 5,
    accuracy: 92,
    lastPlayed: '1 giờ trước'
  },
  {
    id: 'lb-4',
    studentName: 'Phạm Gia Huy',
    className: '5A3',
    avatar: '⚡',
    totalScore: 1190,
    gamesPlayed: 3,
    badgesCount: 4,
    accuracy: 88,
    lastPlayed: 'Hôm nay'
  },
  {
    id: 'lb-5',
    studentName: 'Hoàng Mai Chi',
    className: '5A2',
    avatar: '🌱',
    totalScore: 1050,
    gamesPlayed: 3,
    badgesCount: 4,
    accuracy: 85,
    lastPlayed: 'Hôm qua'
  }
];

export const LAB_TARGETS = [
  {
    id: 'lab-boy',
    title: 'Bạn Nam chạy bộ thể dục',
    description: 'Bạn Nam đang cần năng lượng để chạy nhanh và bền sức.',
    neededSource: 'food',
    sourceLabel: 'Bữa ăn dinh dưỡng (Thức ăn & Nước)',
    icon: '🏃‍♂️',
    successAction: 'Bạn Nam tràn đầy năng lượng, sải bước chạy khỏe khoắn!',
    hint: 'Con người lấy năng lượng từ đâu để vận động?'
  },
  {
    id: 'lab-train',
    title: 'Đoàn tàu hỏa liên vận',
    description: 'Đoàn tàu chở khách đang nằm chờ ở ga đường sắt.',
    neededSource: 'fuel',
    sourceLabel: 'Dầu Diesel / Nhiên liệu',
    icon: '🚂',
    successAction: 'Tàu hỏa hú còi Tu Tu xả khói lăn bánh bon bon trên ray!',
    hint: 'Đầu máy xe lửa hạng nặng cần loại nhiên liệu nào?'
  },
  {
    id: 'lab-sunflower',
    title: 'Vườn hoa hướng dương',
    description: 'Những nụ hoa hướng dương đang muốn nở rộ rực rỡ.',
    neededSource: 'sun',
    sourceLabel: 'Ánh nắng Mặt Trời',
    icon: '🌻',
    successAction: 'Ánh nắng rực rỡ làm cả cánh đồng hoa bung nở vàng ươm!',
    hint: 'Cây cối cần nguồn năng lượng tự nhiên nào để quang hợp?'
  },
  {
    id: 'lab-sailboat',
    title: 'Thuyền buồm ra khơi',
    description: 'Cánh buồm trắng đang chờ sức đẩy để lướt trên mặt biển.',
    neededSource: 'wind',
    sourceLabel: 'Năng lượng Gió',
    icon: '⛵',
    successAction: 'Gió căng buồm, con thuyền lướt sóng ra khơi xa!',
    hint: 'Lực nào làm căng cánh buồm đẩy thuyền đi?'
  },
  {
    id: 'lab-scooter',
    title: 'Chiếc xe máy Honda',
    description: 'Kim xăng báo đỏ, xe máy chưa thể khởi động nổ máy.',
    neededSource: 'fuel',
    sourceLabel: 'Xăng A95',
    icon: '🛵',
    successAction: 'Bình xăng đầy ắp, xe máy nổ êm rù bon bon trên phố!',
    hint: 'Động cơ đốt trong xe máy chạy bằng gì?'
  },
  {
    id: 'lab-study-lamp',
    title: 'Đèn bàn học của em',
    description: 'Phòng học buổi tối cần ánh sáng để em ngồi đọc sách.',
    neededSource: 'electricity',
    sourceLabel: 'Năng lượng Điện',
    icon: '💡',
    successAction: 'Cắm điện, đèn bàn bừng sáng rõ trang sách bài tập!',
    hint: 'Thiết bị gia dụng này cắm vào ổ cắm tường gì?'
  },
  {
    id: 'lab-waterwheel',
    title: 'Cọn nước bên dòng suối',
    description: 'Guồng nước tre đang đứng yên giữa dòng suối cạn.',
    neededSource: 'water',
    sourceLabel: 'Dòng nước chảy xiết',
    icon: '🎡',
    successAction: 'Nước chảy cuồn cuộn làm cọn nước quay tít đưa nước lên cao!',
    hint: 'Năng lượng nào làm quay bánh xe cọn nước?'
  },
  {
    id: 'lab-ebike',
    title: 'Xe đạp điện đến trường',
    description: 'Ắc quy xe đạp điện sắp hết điện cần sạc lại.',
    neededSource: 'electricity',
    sourceLabel: 'Điện sạc ắc quy',
    icon: '🚲',
    successAction: 'Ắc quy nạp 100%, bạn học sinh vi vu êm ái đến trường!',
    hint: 'Xe đạp điện cần nạp gì trước khi xuất phát?'
  }
];

export const ECO_ITEMS = [
  // Tái tạo vs Không tái tạo
  { id: 'eco-1', name: 'Ánh sáng Mặt Trời', type: 'renewable', icon: '☀️', explanation: 'Năng lượng Mặt Trời là nguồn vô tận, sạch và không gây ô nhiễm.' },
  { id: 'eco-2', name: 'Gió tự nhiên', type: 'renewable', icon: '💨', explanation: 'Gió là dòng khí chuyển động liên tục trong khí quyển, không bao giờ cạn.' },
  { id: 'eco-3', name: 'Dòng nước sông suối', type: 'renewable', icon: '🌊', explanation: 'Vòng tuần hoàn nước giúp dòng chảy luôn được tái tạo.' },
  { id: 'eco-4', name: 'Than đá mỏ than', type: 'non-renewable', icon: '🪨', explanation: 'Than đá mất hàng triệu năm hình thành, khai thác sẽ cạn kiệt và gây bụi mịn.' },
  { id: 'eco-5', name: 'Dầu mỏ & Xăng', type: 'non-renewable', icon: '🛢️', explanation: 'Nhiên liệu hoá thạch có hạn trên Trái Đất, khi cháy thải ra nhiều CO2.' },
  { id: 'eco-6', name: 'Khí đốt thiên nhiên', type: 'non-renewable', icon: '🔥', explanation: 'Khí gas tự nhiên là khoáng sản có hạn, không thể tái sinh ngay được.' },
  
  // Tình huống hành vi Tiết kiệm
  { id: 'eco-7', name: 'Tắt đèn khi rời khỏi phòng học', isGood: true, category: 'saving', icon: '💡', reason: 'Tiết kiệm điện năng và kéo dài tuổi thọ bóng đèn.' },
  { id: 'eco-8', name: 'Bật máy lạnh nhưng mở toang cửa sổ', isGood: false, category: 'saving', icon: '🚪', reason: 'Khí lạnh thất thoát ra ngoài làm máy nén phải chạy quá tải, lãng phí điện.' },
  { id: 'eco-9', name: 'Mở rèm cửa đón ánh sáng tự nhiên ban ngày', isGood: true, category: 'saving', icon: '🪟', reason: 'Tận dụng ánh sáng tự nhiên của Mặt Trời thay vì bật nhiều bóng đèn.' },
  { id: 'eco-10', name: 'Đi bộ hoặc đi xe đạp khi đi cự ly gần', isGood: true, category: 'saving', icon: '🚲', reason: 'Vừa rèn luyện sức khỏe vừa tiết kiệm xăng dầu và giảm khói bụi.' },
  { id: 'eco-11', name: 'Cắm phích ấm nước sôi nhưng quên rút ra', isGood: false, category: 'saving', icon: '🔌', reason: 'Rất nguy hiểm, dễ gây cháy nổ và hao tổn điện liên tục.' },
  { id: 'eco-12', name: 'Để vòi nước chảy tự do khi đánh răng', isGood: false, category: 'saving', icon: '🚰', reason: 'Lãng phí nước sạch và năng lượng dùng để bơm xử lý nước.' }
];
