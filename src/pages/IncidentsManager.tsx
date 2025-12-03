import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const IncidentsManager = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="AlertTriangle" size={32} />
              <h1 className="text-2xl font-bold">Учет происшествий</h1>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Модуль учета происшествий</CardTitle>
            <CardDescription>Регистрация и расследование несчастных случаев</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon name="AlertTriangle" size={64} className="mx-auto text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Модуль в разработке</h3>
              <p className="text-gray-600">Функционал будет доступен в ближайшее время</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IncidentsManager;
