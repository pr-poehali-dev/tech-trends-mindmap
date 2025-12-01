import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Branch {
  id: string;
  title: string;
  icon: string;
  color: string;
  subbranches: {
    title: string;
    description: string;
    emoji: string;
  }[];
}

const branches: Branch[] = [
  {
    id: 'ml',
    title: 'Машинное обучение',
    icon: 'BrainCircuit',
    color: '#3498DB',
    subbranches: [
      { title: 'Предиктивная аналитика', description: 'Прогнозирование трендов и поведения', emoji: '📊' },
      { title: 'Рекомендательные системы', description: 'Персонализация опыта пользователей', emoji: '🎯' },
      { title: 'Обработка больших данных', description: 'Анализ массивов информации', emoji: '💾' }
    ]
  },
  {
    id: 'neural',
    title: 'Нейросети',
    icon: 'Network',
    color: '#9B59B6',
    subbranches: [
      { title: 'Распознавание образов', description: 'Компьютерное зрение и идентификация', emoji: '👁️' },
      { title: 'Генеративные модели', description: 'Создание контента и изображений', emoji: '🎨' },
      { title: 'Обработка языка', description: 'NLP и понимание текста', emoji: '💬' }
    ]
  },
  {
    id: 'automation',
    title: 'Автоматизация процессов',
    icon: 'Workflow',
    color: '#E67E22',
    subbranches: [
      { title: 'RPA технологии', description: 'Роботизация рутинных задач', emoji: '🤖' },
      { title: 'Умные документы', description: 'Автоматическая обработка данных', emoji: '📄' },
      { title: 'Workflow системы', description: 'Оптимизация бизнес-процессов', emoji: '⚙️' }
    ]
  },
  {
    id: 'security',
    title: 'Кибербезопасность',
    icon: 'Shield',
    color: '#E74C3C',
    subbranches: [
      { title: 'Защита данных', description: 'Шифрование и безопасное хранение', emoji: '🔐' },
      { title: 'Обнаружение угроз', description: 'Мониторинг и предотвращение атак', emoji: '🛡️' },
      { title: 'Compliance', description: 'Соответствие стандартам GDPR, ISO', emoji: '✅' }
    ]
  },
  {
    id: 'iot',
    title: 'Интернет вещей',
    icon: 'Radio',
    color: '#16A085',
    subbranches: [
      { title: 'Умные устройства', description: 'Подключенные датчики и гаджеты', emoji: '📱' },
      { title: 'Индустрия 4.0', description: 'Цифровые производственные линии', emoji: '🏭' },
      { title: 'Smart City', description: 'Умная городская инфраструктура', emoji: '🌆' }
    ]
  }
];

export default function Index() {
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  const toggleBranch = (id: string) => {
    setExpandedBranches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const angles = [0, 72, 144, 216, 288];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-8 overflow-hidden">
      <div className="relative w-full max-w-7xl h-[800px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[#3498DB] hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <Icon name="Sparkles" size={40} className="text-[#3498DB]" />
              <h1 className="text-2xl font-bold text-[#2C3E50] text-center">
                Цифровизация<br/>экономики
              </h1>
            </div>
          </div>
        </div>

        {branches.map((branch, index) => {
          const angle = angles[index];
          const radian = (angle * Math.PI) / 180;
          const distance = 280;
          const x = Math.cos(radian) * distance;
          const y = Math.sin(radian) * distance;
          const isExpanded = expandedBranches.has(branch.id);

          return (
            <div key={branch.id}>
              <svg
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  width: Math.abs(x) + 100,
                  height: Math.abs(y) + 100,
                  transform: `translate(${x < 0 ? x - 50 : -50}px, ${y < 0 ? y - 50 : -50}px)`
                }}
              >
                <line
                  x1={x < 0 ? Math.abs(x) + 50 : 50}
                  y1={y < 0 ? Math.abs(y) + 50 : 50}
                  x2={x < 0 ? Math.abs(x) : 0}
                  y2={y < 0 ? Math.abs(y) : 0}
                  stroke={branch.color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />
              </svg>

              <div
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
                onClick={() => toggleBranch(branch.id)}
              >
                <div
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 hover:scale-105"
                  style={{ borderColor: branch.color }}
                >
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <Icon name={branch.icon} size={28} style={{ color: branch.color }} />
                    <span className="font-semibold text-[#2C3E50] text-sm">{branch.title}</span>
                    <Icon
                      name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                      size={20}
                      className="ml-auto text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div
                  className="absolute left-1/2 top-1/2 animate-fade-in"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  {branch.subbranches.map((sub, subIndex) => {
                    const subAngle = angle + (subIndex - 1) * 25;
                    const subRadian = (subAngle * Math.PI) / 180;
                    const subDistance = 200;
                    const subX = Math.cos(subRadian) * subDistance;
                    const subY = Math.sin(subRadian) * subDistance;

                    return (
                      <div key={subIndex}>
                        <svg
                          className="absolute pointer-events-none"
                          style={{
                            width: Math.abs(subX) + 20,
                            height: Math.abs(subY) + 20,
                            transform: `translate(${subX < 0 ? subX : 0}px, ${subY < 0 ? subY : 0}px)`
                          }}
                        >
                          <line
                            x1={subX < 0 ? Math.abs(subX) : 0}
                            y1={subY < 0 ? Math.abs(subY) : 0}
                            x2={subX < 0 ? Math.abs(subX) : 0}
                            y2={subY < 0 ? Math.abs(subY) : 0}
                            stroke={branch.color}
                            strokeWidth="1.5"
                            opacity="0.2"
                          />
                        </svg>

                        <div
                          className="absolute bg-[#ECF0F1] rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-200 hover:scale-105"
                          style={{
                            transform: `translate(${subX}px, ${subY}px)`,
                            width: '240px',
                            marginLeft: '-120px',
                            marginTop: '-40px'
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">{sub.emoji}</span>
                            <div>
                              <h3 className="font-semibold text-[#2C3E50] text-sm mb-1">
                                {sub.title}
                              </h3>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {sub.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-md p-4 max-w-xs">
          <p className="text-xs text-gray-600 mb-2 font-medium">
            💡 Кликайте на узлы для раскрытия деталей
          </p>
          <p className="text-xs text-gray-500">
            5 основных направлений, каждое с 3 подразделами
          </p>
        </div>
      </div>
    </div>
  );
}
