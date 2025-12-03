import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const EcologyDepartment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Sprout" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Отдел экологии</h1>
                <p className="text-sm text-emerald-200 mt-1">Экологический контроль и мониторинг</p>
              </div>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <button
            className="group relative h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Wind" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Выбросы в атмосферу</div>
                <div className="text-sm text-green-100">Контроль загрязнений</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Droplets" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Водные ресурсы</div>
                <div className="text-sm text-blue-100">Сбросы сточных вод</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Trash2" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Обращение с отходами</div>
                <div className="text-sm text-amber-100">Учет и утилизация</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="FileText" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Экологическая отчетность</div>
                <div className="text-sm text-teal-100">Отчеты и статистика</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-lime-500 to-lime-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(132, 204, 22, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Leaf" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Экологический мониторинг</div>
                <div className="text-sm text-lime-100">Наблюдения и измерения</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/documents')}
            className="group relative h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="FolderOpen" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Документация</div>
                <div className="text-sm text-emerald-100">Нормативные акты</div>
              </div>
            </div>
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>О отделе экологии</CardTitle>
            <CardDescription>Функции и задачи отдела</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Отдел экологии обеспечивает соблюдение природоохранного законодательства, организует и контролирует
                природоохранную деятельность предприятия.
              </p>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Основные функции:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Контроль за соблюдением природоохранного законодательства</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Организация производственного экологического контроля</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Ведение учета и отчетности в области охраны окружающей среды</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Разработка мероприятий по снижению негативного воздействия</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Организация обращения с отходами производства</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EcologyDepartment;
