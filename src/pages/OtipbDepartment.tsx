import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const OtipbDepartment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShieldCheck" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Отдел охраны труда и промышленной безопасности</h1>
                <p className="text-sm text-slate-200 mt-1">ОТиПБ</p>
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
            onClick={() => navigate('/admin/documents')}
            className="group relative h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="FileText" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Документация ОТ</div>
                <div className="text-sm text-blue-100">Инструкции и положения</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/training')}
            className="group relative h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Обучение</div>
                <div className="text-sm text-green-100">Инструктажи по ОТ</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/sout')}
            className="group relative h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)' }}
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
            style={{ boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="HardHat" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">СИЗ</div>
                <div className="text-sm text-orange-100">Средства защиты</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/incidents')}
            className="group relative h-32 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="AlertTriangle" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Происшествия</div>
                <div className="text-sm text-yellow-100">Учет НС</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/control')}
            className="group relative h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Search" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Контроль</div>
                <div className="text-sm text-teal-100">Проверки ОТ</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Flame" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Пожарная безопасность</div>
                <div className="text-sm text-red-100">Контроль и профилактика</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Система пожаротушения</div>
                <div className="text-sm text-orange-100">Техническое обслуживание</div>
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
                <Icon name="AlertTriangle" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Аварийные ситуации</div>
                <div className="text-sm text-amber-100">Планы ликвидации</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Обучение ПТМ</div>
                <div className="text-sm text-pink-100">Пожарно-технический минимум</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="ClipboardList" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Проверки и учения</div>
                <div className="text-sm text-violet-100">График мероприятий</div>
              </div>
            </div>
          </button>

          <button
            className="group relative h-32 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            style={{ boxShadow: '0 10px 25px rgba(244, 63, 94, 0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full flex items-center gap-4 p-6 text-white">
              <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Icon name="FileText" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1">Документация ПБ</div>
                <div className="text-sm text-rose-100">Инструкции и приказы</div>
              </div>
            </div>
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>О отделе ОТиПБ</CardTitle>
            <CardDescription>Функции и задачи отдела</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Отдел охраны труда и промышленной безопасности обеспечивает соблюдение требований законодательства
                в области охраны труда и промышленной безопасности на предприятии.
              </p>
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Основные функции:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Разработка и актуализация локальных нормативных актов по охране труда</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Организация обучения и проверки знаний требований охраны труда</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Контроль за состоянием условий и охраны труда</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Расследование несчастных случаев на производстве</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Организация специальной оценки условий труда</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OtipbDepartment;