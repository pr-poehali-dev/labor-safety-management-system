import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const EVENTS_API = 'https://functions.poehali.dev/01750521-d47a-4fbc-b622-02c2b57bd583';

interface Event {
  id: number;
  title: string;
  description?: string;
  event_type: string;
  responsible_name?: string;
  planned_date?: string;
  completed_date?: string;
  status: string;
  created_at: string;
}

const EventsManager = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'training',
    planned_date: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadEvents();
  }, [isAdmin, navigate]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(EVENTS_API);
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить мероприятия',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(EVENTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          responsible_user_id: user?.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to create event');

      toast({
        title: 'Успешно',
        description: 'Мероприятие создано',
      });

      setIsDialogOpen(false);
      setFormData({ title: '', description: '', event_type: 'training', planned_date: '' });
      loadEvents();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать мероприятие',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(EVENTS_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: newStatus,
          completed_date: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to update');

      toast({
        title: 'Успешно',
        description: 'Статус обновлён',
      });

      loadEvents();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Удалить мероприятие?')) return;

    try {
      const response = await fetch(`${EVENTS_API}?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Успешно',
        description: 'Мероприятие удалено',
      });

      loadEvents();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить мероприятие',
        variant: 'destructive',
      });
    }
  };

  const eventTypeLabels: Record<string, string> = {
    training: 'Обучение',
    inspection: 'Проверка',
    medical: 'Медосмотр',
    sout: 'СОУТ',
    other: 'Другое',
  };

  const statusLabels: Record<string, string> = {
    planned: 'Запланировано',
    in_progress: 'В процессе',
    completed: 'Завершено',
    overdue: 'Просрочено',
  };

  const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    planned: 'default',
    in_progress: 'secondary',
    completed: 'outline',
    overdue: 'destructive',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Calendar" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Управление мероприятиями</h1>
                <p className="text-purple-100 text-sm">Планирование и контроль</p>
              </div>
            </div>
            <Button onClick={() => navigate('/admin')} variant="secondary" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Мероприятия</CardTitle>
                <CardDescription>Управление мероприятиями по ОТ</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить мероприятие
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Новое мероприятие</DialogTitle>
                    <DialogDescription>Создание мероприятия по охране труда</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Инструктаж по ОТ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event_type">Тип мероприятия</Label>
                      <Select
                        value={formData.event_type}
                        onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="training">Обучение</SelectItem>
                          <SelectItem value="inspection">Проверка</SelectItem>
                          <SelectItem value="medical">Медосмотр</SelectItem>
                          <SelectItem value="sout">СОУТ</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        placeholder="Краткое описание мероприятия..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planned_date">Плановая дата</Label>
                      <Input
                        id="planned_date"
                        type="date"
                        value={formData.planned_date}
                        onChange={(e) => setFormData({ ...formData, planned_date: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Создание...' : 'Создать'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {loading && events.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Загрузка...</p>
            ) : events.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Нет мероприятий</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Ответственный</TableHead>
                    <TableHead>Плановая дата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{eventTypeLabels[event.event_type] || event.event_type}</Badge>
                      </TableCell>
                      <TableCell>{event.responsible_name || 'Не назначен'}</TableCell>
                      <TableCell>
                        {event.planned_date
                          ? new Date(event.planned_date).toLocaleDateString('ru-RU')
                          : 'Не указана'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[event.status]}>
                          {statusLabels[event.status] || event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {event.status !== 'completed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateStatus(event.id, 'completed')}
                            >
                              <Icon name="CheckCircle" size={16} className="text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Icon name="Trash2" size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EventsManager;
