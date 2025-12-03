import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    pendingEvents: 0,
    activeIncidents: 0,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      toast({
        title: 'Доступ запрещен',
        description: 'У вас нет прав администратора',
        variant: 'destructive',
      });
    }
  }, [isAdmin, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShieldCheck" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Панель администратора АСУБТ</h1>
                <p className="text-purple-100 text-sm mt-1">Управление системой и пользователями</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={goToDashboard} variant="secondary" size="sm">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <div className="text-right">
                <p className="font-medium">{user?.full_name}</p>
                <p className="text-sm text-purple-100">Администратор</p>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
              <Icon name="Users" size={20} className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-500 mt-1">Всего в системе</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Документы</CardTitle>
              <Icon name="FileText" size={20} className="text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
              <p className="text-xs text-gray-500 mt-1">Активных документов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Мероприятия</CardTitle>
              <Icon name="Calendar" size={20} className="text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingEvents}</div>
              <p className="text-xs text-gray-500 mt-1">В ожидании</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Инциденты</CardTitle>
              <Icon name="AlertTriangle" size={20} className="text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeIncidents}</div>
              <p className="text-xs text-gray-500 mt-1">Активных</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Управление пользователями</CardTitle>
              <CardDescription>Добавление, редактирование и управление доступом</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить пользователя
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Users" size={18} className="mr-2" />
                  Список пользователей
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Key" size={18} className="mr-2" />
                  Управление ролями
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Управление документами</CardTitle>
              <CardDescription>Загрузка и организация документов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/documents')}
                >
                  <Icon name="Upload" size={18} className="mr-2" />
                  Управление документами
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="FolderOpen" size={18} className="mr-2" />
                  Архив документов
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки доступа
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Последние действия пользователей</CardTitle>
            <CardDescription>Аудит активности в системе</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Действие</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Иванов И.И.</TableCell>
                  <TableCell>Вход в систему</TableCell>
                  <TableCell>03.12.2025 14:30</TableCell>
                  <TableCell>
                    <Badge variant="default">Успешно</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Петрова А.С.</TableCell>
                  <TableCell>Добавлен документ</TableCell>
                  <TableCell>03.12.2025 13:15</TableCell>
                  <TableCell>
                    <Badge variant="default">Успешно</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Сидоров П.Н.</TableCell>
                  <TableCell>Создание мероприятия</TableCell>
                  <TableCell>03.12.2025 11:45</TableCell>
                  <TableCell>
                    <Badge variant="default">Успешно</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Мероприятия и события</CardTitle>
              <CardDescription>Планирование и контроль</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/events')}
                >
                  <Icon name="CalendarPlus" size={18} className="mr-2" />
                  Управление мероприятиями
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="ListChecks" size={18} className="mr-2" />
                  План мероприятий
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Bell" size={18} className="mr-2" />
                  Напоминания
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Отчетность и аналитика</CardTitle>
              <CardDescription>Формирование отчетов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/reports')}
                >
                  <Icon name="FileDown" size={18} className="mr-2" />
                  Формирование отчётов
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="BarChart" size={18} className="mr-2" />
                  Статистика
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="TrendingUp" size={18} className="mr-2" />
                  Аналитика
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;