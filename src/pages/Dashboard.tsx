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

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Модуль управления документацией</h3>
                <p className="text-gray-700">
                  Обеспечивает создание, хранение, актуализацию и распространение документов по охране труда. Поддерживает
                  версионность документов и разграничение прав доступа.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Модуль обучения и инструктажей</h3>
                <p className="text-gray-700">
                  Позволяет вести учет работников, подлежащих обучению и проверке знаний требований охраны труда, планировать и
                  контролировать проведение инструктажей, формировать программы обучения.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Модуль специальной оценки условий труда</h3>
                <p className="text-gray-700">
                  Обеспечивает ведение базы данных результатов специальной оценки условий труда, формирование перечней рабочих мест,
                  подлежащих специальной оценке, контроль выполнения ее результатов.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Модуль средств индивидуальной защиты</h3>
                <p className="text-gray-700">
                  Позволяет вести учет выдачи средств индивидуальной защиты, норм бесплатной выдачи СИЗ, контролировать
                  своевременность замены и обслуживания СИЗ.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Модуль медицинских осмотров</h3>
                <p className="text-gray-700">
                  Обеспечивает планирование и контроль проведения обязательных предварительных и периодических медицинских
                  осмотров работников, ведение соответствующих журналов и отчетов.
                </p>
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