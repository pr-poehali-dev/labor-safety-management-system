import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const SuperAdminPanel = () => {
  const { user, logout, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [systemStats, setSystemStats] = useState({
    totalOrganizations: 0,
    totalUsers: 0,
    systemUptime: '99.9%',
    storageUsed: '45%',
  });

  useEffect(() => {
    if (!isSuperAdmin) {
      navigate('/dashboard');
      toast({
        title: 'Доступ запрещен',
        description: 'У вас нет прав главного администратора',
        variant: 'destructive',
      });
    }
  }, [isSuperAdmin, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Crown" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Панель главного администратора АСУБТ</h1>
                <p className="text-red-100 text-sm mt-1">Полный контроль системы и администраторов</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={goToDashboard} variant="secondary" size="sm">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <div className="text-right">
                <p className="font-medium">{user?.full_name}</p>
                <p className="text-sm text-red-100">Главный администратор</p>
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
              <CardTitle className="text-sm font-medium">Организации</CardTitle>
              <Icon name="Building" size={20} className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalOrganizations}</div>
              <p className="text-xs text-gray-500 mt-1">Подключено</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
              <Icon name="Users" size={20} className="text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-gray-500 mt-1">Всего в системе</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Доступность</CardTitle>
              <Icon name="Activity" size={20} className="text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
              <p className="text-xs text-gray-500 mt-1">Uptime за месяц</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Хранилище</CardTitle>
              <Icon name="HardDrive" size={20} className="text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.storageUsed}</div>
              <p className="text-xs text-gray-500 mt-1">Использовано</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Управление системой</CardTitle>
              <CardDescription>Глобальные настройки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки системы
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Database" size={18} className="mr-2" />
                  База данных
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Shield" size={18} className="mr-2" />
                  Безопасность
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Server" size={18} className="mr-2" />
                  Серверы
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Управление администраторами</CardTitle>
              <CardDescription>Назначение прав доступа</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="UserCog" size={18} className="mr-2" />
                  Список админов
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="ShieldPlus" size={18} className="mr-2" />
                  Назначить админа
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="ShieldAlert" size={18} className="mr-2" />
                  Отозвать права
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="History" size={18} className="mr-2" />
                  Журнал действий
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Мониторинг и логи</CardTitle>
              <CardDescription>Анализ работы системы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Activity" size={18} className="mr-2" />
                  Системный монитор
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Логи системы
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="AlertTriangle" size={18} className="mr-2" />
                  Ошибки и предупреждения
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="BarChart" size={18} className="mr-2" />
                  Статистика
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Администраторы системы</CardTitle>
            <CardDescription>Управление правами администраторов</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Организация</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Иванов Иван Иванович</TableCell>
                  <TableCell>ivanov@company.ru</TableCell>
                  <TableCell>
                    <Badge>Администратор</Badge>
                  </TableCell>
                  <TableCell>ООО "Предприятие 1"</TableCell>
                  <TableCell>
                    <Badge variant="default">Активен</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Петрова Анна Сергеевна</TableCell>
                  <TableCell>petrova@company2.ru</TableCell>
                  <TableCell>
                    <Badge>Администратор</Badge>
                  </TableCell>
                  <TableCell>АО "Предприятие 2"</TableCell>
                  <TableCell>
                    <Badge variant="default">Активен</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Резервное копирование</CardTitle>
              <CardDescription>Управление бэкапами</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Последний бэкап:</span>
                  <span className="text-sm font-medium">03.12.2025 02:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Следующий бэкап:</span>
                  <span className="text-sm font-medium">04.12.2025 02:00</span>
                </div>
                <Button className="w-full">
                  <Icon name="Download" size={18} className="mr-2" />
                  Создать резервную копию
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Обновления системы</CardTitle>
              <CardDescription>Версия и обновления</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Текущая версия:</span>
                  <span className="text-sm font-medium">2.5.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Статус:</span>
                  <Badge variant="default">Актуальная</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  <Icon name="RefreshCw" size={18} className="mr-2" />
                  Проверить обновления
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminPanel;
