import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  critical: boolean;
}

interface IncidentReport {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  status: 'open' | 'investigating' | 'resolved';
}

const Index = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Проверка средств индивидуальной защиты',
      description: 'Убедитесь, что все сотрудники используют СИЗ согласно требованиям',
      completed: true,
      critical: true
    },
    {
      id: '2',
      title: 'Состояние аварийных выходов',
      description: 'Проверить доступность и освещение путей эвакуации',
      completed: false,
      critical: true
    },
    {
      id: '3',
      title: 'Исправность оборудования',
      description: 'Осмотр рабочего оборудования на предмет повреждений',
      completed: true,
      critical: false
    },
    {
      id: '4',
      title: 'Чистота рабочих мест',
      description: 'Проверка порядка и отсутствия посторонних предметов',
      completed: false,
      critical: false
    }
  ]);

  const [incidents] = useState<IncidentReport[]>([
    {
      id: '1',
      title: 'Незначительная травма руки',
      severity: 'low',
      date: '2024-01-15',
      status: 'resolved'
    },
    {
      id: '2',
      title: 'Утечка химикатов в цехе №3',
      severity: 'high',
      date: '2024-01-10',
      status: 'investigating'
    },
    {
      id: '3',
      title: 'Неисправность защитного экрана',
      severity: 'medium',
      date: '2024-01-08',
      status: 'open'
    }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedItems = checklistItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedItems / checklistItems.length) * 100);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-gray-900">
                Система управления охраной труда
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Пользователь: Иванов И.И.
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общий уровень безопасности</CardTitle>
              <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
              <Progress value={completionPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Выполнено {completedItems} из {checklistItems.length} проверок
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные инциденты</CardTitle>
              <Icon name="AlertTriangle" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {incidents.filter(i => i.status !== 'resolved').length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Требуют внимания
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Критические нарушения</CardTitle>
              <Icon name="AlertCircle" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {checklistItems.filter(item => item.critical && !item.completed).length}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Требуют немедленного устранения
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checklist" className="flex items-center space-x-2">
              <Icon name="CheckSquare" className="h-4 w-4" />
              <span>Чек-листы</span>
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center space-x-2">
              <Icon name="FileText" className="h-4 w-4" />
              <span>Инциденты</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Icon name="BarChart3" className="h-4 w-4" />
              <span>Аналитика</span>
            </TabsTrigger>
          </TabsList>

          {/* Interactive Checklist */}
          <TabsContent value="checklist" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Интерактивные чек-листы безопасности
              </h2>
              <Button>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новая проверка
              </Button>
            </div>

            <Alert>
              <Icon name="Info" className="h-4 w-4" />
              <AlertDescription>
                Выполните ежедневные проверки безопасности рабочих мест. 
                Критические пункты отмечены красным индикатором.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {checklistItems.map((item) => (
                <Card key={item.id} className={`transition-all duration-200 ${
                  item.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <label
                            htmlFor={item.id}
                            className={`text-sm font-medium cursor-pointer ${
                              item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                          >
                            {item.title}
                          </label>
                          {item.critical && (
                            <Badge variant="destructive" className="text-xs">
                              Критично
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.completed ? (
                          <Icon name="CheckCircle2" className="h-5 w-5 text-green-600" />
                        ) : (
                          <Icon name="Circle" className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Отчеты об инцидентах
              </h2>
              <Button>
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новый отчет
              </Button>
            </div>

            <div className="grid gap-4">
              {incidents.map((incident) => (
                <Card key={incident.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Дата: {new Date(incident.date).toLocaleDateString('ru-RU')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Eye" className="h-4 w-4 mr-2" />
                        Просмотр
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Аналитика и отчеты
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Январь 2024</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Декабрь 2023</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ноябрь 2023</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Типы инцидентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Травмы</span>
                      <Badge variant="outline">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Технические неисправности</span>
                      <Badge variant="outline">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Нарушения процедур</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Экологические</span>
                      <Badge variant="outline">3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;