import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type TabType = 'introduction' | 'functions' | 'modules' | 'workflow' | 'reports' | 'security' | 'support';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('introduction');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'introduction' as TabType, label: 'Введение', icon: 'Home' },
    { id: 'functions' as TabType, label: 'Функции', icon: 'Settings' },
    { id: 'modules' as TabType, label: 'Модули', icon: 'Package' },
    { id: 'workflow' as TabType, label: 'Рабочий процесс', icon: 'GitBranch' },
    { id: 'reports' as TabType, label: 'Отчетность', icon: 'FileText' },
    { id: 'security' as TabType, label: 'Безопасность', icon: 'Shield' },
    { id: 'support' as TabType, label: 'Поддержка', icon: 'HelpCircle' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={32} />
              <div>
                <h1 className="text-2xl font-bold">
                  Автоматизированная система управления безопасностью труда (АСУБТ)
                </h1>
                <p className="text-blue-100 text-sm mt-1">Руководство пользователя в формате вкладок</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Button onClick={() => navigate('/admin')} variant="secondary" size="sm">
                  <Icon name="ShieldCheck" size={16} className="mr-2" />
                  Панель админа
                </Button>
              )}
              {user?.role === 'superadmin' && (
                <Button onClick={() => navigate('/superadmin')} variant="secondary" size="sm">
                  <Icon name="Crown" size={16} className="mr-2" />
                  Панель главного админа
                </Button>
              )}
              <div className="text-right">
                <p className="font-medium">{user?.full_name}</p>
                <p className="text-sm text-blue-100">{user?.role === 'superadmin' ? 'Главный администратор' : user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Выйти
              </Button>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'introduction' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Введение в АСУБТ</h2>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Автоматизированная система управления безопасностью труда (АСУБТ) — это комплекс программных средств,
                предназначенных для автоматизации процессов управления охраной труда и промышленной безопасностью на
                предприятии.
              </p>

              <p className="mb-6">
                Система разработана в соответствии с требованиями законодательства Российской Федерации в области охраны труда и
                промышленной безопасности и предназначена для использования на предприятиях различных отраслей промышленности.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Цель внедрения АСУБТ:</h3>
                <p className="text-gray-700">
                  повышение эффективности управления охраной труда, снижение производственного
                  травматизма и профессиональной заболеваемости, обеспечение соответствия деятельности предприятия требованиям
                  нормативных правовых актов.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mt-8 mb-4">Преимущества системы</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Централизация данных по охране труда</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Автоматизация процессов планирования и контроля</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Снижение временных затрат на подготовку отчетности</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Повышение прозрачности процессов управления охраной труда</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Своевременное оповещение о необходимости выполнения мероприятий</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'functions' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Основные функции системы</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Управление документацией</h3>
                <p className="text-gray-700 mb-4">
                  Система позволяет вести электронный архив документов по охране труда, включая локальные нормативные акты,
                  инструкции по охране труда, положения, приказы и распоряжения.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Планирование мероприятий</h3>
                <p className="text-gray-700 mb-4">
                  АСУБТ обеспечивает планирование и контроль выполнения мероприятий по охране труда, включая специальную оценку
                  условий труда, обучение и инструктажи, медицинские осмотры, приобретение средств индивидуальной защиты.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Учет и анализ происшествий</h3>
                <p className="text-gray-700 mb-4">
                  Система предоставляет инструменты для регистрации и расследования несчастных случаев, профессиональных заболеваний,
                  аварий и инцидентов, а также для анализа их причин и разработки профилактических мероприятий.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Контроль выполнения требований</h3>
                <p className="text-gray-700 mb-4">
                  АСУБТ позволяет осуществлять контроль за соблюдением требований охраны труда, включая проведение проверок,
                  оформление предписаний и контроль их выполнения.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Модули системы</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => navigate('/admin/documents')}
                className="group relative h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="FileText" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Управление документацией</div>
                    <div className="text-sm text-blue-100">Электронный архив</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/training')}
                className="group relative h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="GraduationCap" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Обучение и инструктажи</div>
                    <div className="text-sm text-green-100">Контроль обучения</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/sout')}
                className="group relative h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="ClipboardCheck" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">СОУТ</div>
                    <div className="text-sm text-purple-100">Оценка условий труда</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/siz')}
                className="group relative h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="HardHat" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Средства защиты (СИЗ)</div>
                    <div className="text-sm text-orange-100">Учет и выдача</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/medical')}
                className="group relative h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Stethoscope" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Медицинские осмотры</div>
                    <div className="text-sm text-red-100">Планирование медосмотров</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/calendar')}
                className="group relative h-32 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="CalendarDays" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Календарь мероприятий</div>
                    <div className="text-sm text-cyan-100">Планирование и контроль</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/reports')}
                className="group relative h-32 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="FileBarChart" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Отчетность</div>
                    <div className="text-sm text-indigo-100">Формирование отчетов</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/incidents')}
                className="group relative h-32 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="AlertTriangle" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Учет происшествий</div>
                    <div className="text-sm text-yellow-100">Регистрация и расследование</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/admin/control')}
                className="group relative h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full flex items-center gap-4 p-6 text-white">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Search" size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg mb-1">Контроль требований</div>
                    <div className="text-sm text-teal-100">Проверки и предписания</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Подробное описание модулей</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Модуль управления документацией</h4>
                  <p className="text-gray-700">
                    Обеспечивает создание, хранение, актуализацию и распространение документов по охране труда. Поддерживает
                    версионность документов и разграничение прав доступа.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Модуль обучения и инструктажей</h4>
                  <p className="text-gray-700">
                    Позволяет вести учет работников, подлежащих обучению и проверке знаний требований охраны труда, планировать и
                    контролировать проведение инструктажей, формировать программы обучения.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Модуль специальной оценки условий труда</h4>
                  <p className="text-gray-700">
                    Обеспечивает ведение базы данных результатов специальной оценки условий труда, формирование перечней рабочих мест,
                    подлежащих специальной оценке, контроль выполнения ее результатов.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Модуль средств индивидуальной защиты</h4>
                  <p className="text-gray-700">
                    Позволяет вести учет выдачи средств индивидуальной защиты, норм бесплатной выдачи СИЗ, контролировать
                    своевременность замены и обслуживания СИЗ.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Модуль медицинских осмотров</h4>
                  <p className="text-gray-700">
                    Обеспечивает планирование и контроль проведения обязательных предварительных и периодических медицинских
                    осмотров работников, ведение соответствующих журналов и отчетов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Рабочий процесс в системе</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Регистрация и авторизация</h3>
                <p className="text-gray-700 mb-4">
                  Каждый пользователь системы проходит процедуру регистрации с присвоением уникального логина и пароля. Система
                  поддерживает разграничение прав доступа в зависимости от должности и функциональных обязанностей пользователя.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Основные операции</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Ввод и актуализация данных</li>
                  <li>Формирование планов и графиков</li>
                  <li>Контроль выполнения мероприятий</li>
                  <li>Формирование отчетов и аналитических справок</li>
                  <li>Обмен информацией между подразделениями</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Уведомления и оповещения</h3>
                <p className="text-gray-700 mb-4">
                  Система автоматически формирует уведомления о наступлении сроков выполнения мероприятий, необходимости продления
                  документов, поступлении новых задач и изменении статуса существующих.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Отчетность в системе</h2>

            <p className="text-gray-700 mb-6">
              АСУБТ предоставляет широкие возможности для формирования различных видов отчетности:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="FileText" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Статистические отчеты по форме 7-травматизм</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FileText" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Отчеты о проведении специальной оценки условий труда</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FileText" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Отчеты о состоянии условий и охраны труда</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FileText" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Аналитические отчеты по результатам проверок</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FileText" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Отчеты о выполнении плановых мероприятий</span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <p className="text-gray-700">
                <strong className="text-blue-800">Важно:</strong> Все отчеты могут быть экспортированы в форматы PDF, Excel или Word для дальнейшего использования или
                предоставления в контролирующие органы.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Безопасность в системе</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Защита данных</h3>
                <p className="text-gray-700 mb-4">
                  Система обеспечивает надежную защиту персональных данных работников и конфиденциальной информации предприятия
                  в соответствии с требованиями законодательства о защите персональных данных.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Разграничение прав доступа</h3>
                <p className="text-gray-700 mb-4">
                  Реализован механизм ролевого разграничения прав доступа, позволяющий настраивать индивидуальные права для каждого
                  пользователя или группы пользователей.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Аудит действий</h3>
                <p className="text-gray-700 mb-4">
                  Все действия пользователей в системе фиксируются в журнале аудита, что позволяет отследить историю изменений и
                  выявить несанкционированный доступ.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Резервное копирование</h3>
                <p className="text-gray-700 mb-4">
                  Предусмотрено регулярное резервное копирование данных для обеспечения их сохранности и возможности восстановления
                  в случае технических сбоев.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Поддержка пользователей</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Техническая поддержка</h3>
                <p className="text-gray-700 mb-4">
                  Для пользователей системы организована техническая поддержка, которая помогает решать возникающие вопросы и
                  проблемы при работе с системой.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Обучение пользователей</h3>
                <p className="text-gray-700 mb-4">
                  Проводится обучение сотрудников работе с системой, включая базовые функции и расширенные возможности для
                  администраторов и специалистов по охране труда.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">Обновления системы</h3>
                <p className="text-gray-700 mb-4">
                  Система регулярно обновляется с учетом изменений законодательства и пожеланий пользователей. Все обновления
                  устанавливаются автоматически или с минимальным участием администратора.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 mt-8">
                <h4 className="font-semibold text-green-800 mb-2">Контакты службы поддержки:</h4>
                <p className="text-gray-700">Email: support@asubt.ru</p>
                <p className="text-gray-700">Телефон: 8-800-XXX-XX-XX</p>
                <p className="text-gray-700">Время работы: Пн-Пт 9:00-18:00 (МСК)</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;