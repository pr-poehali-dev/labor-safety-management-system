import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isToday, isBefore, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const EVENTS_API = 'https://functions.poehali.dev/01750521-d47a-4fbc-b622-02c2b57bd583';

interface Event {
  id: number;
  title: string;
  description?: string;
  event_type: string;
  responsible_name?: string;
  planned_date?: string;
  status: string;
}

const EventsCalendar = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadEvents();
    checkUpcomingReminders();
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

  const checkUpcomingReminders = () => {
    const today = startOfDay(new Date());
    const upcomingEvents = events.filter(event => {
      if (!event.planned_date || event.status === 'completed') return false;
      const eventDate = startOfDay(parseISO(event.planned_date));
      const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });

    if (upcomingEvents.length > 0) {
      toast({
        title: 'Напоминание',
        description: `У вас ${upcomingEvents.length} предстоящих мероприятий на этой неделе`,
      });
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array(startDayOfWeek === 0 ? 6 : startDayOfWeek - 1).fill(null);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      if (!event.planned_date) return false;
      return isSameDay(parseISO(event.planned_date), date);
    });
  };

  const eventTypeColors: Record<string, string> = {
    training: 'bg-blue-500',
    inspection: 'bg-yellow-500',
    medical: 'bg-green-500',
    sout: 'bg-purple-500',
    other: 'bg-gray-500',
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

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const isOverdue = (event: Event) => {
    if (!event.planned_date || event.status === 'completed') return false;
    return isBefore(parseISO(event.planned_date), startOfDay(new Date()));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="CalendarDays" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Календарь мероприятий</h1>
                <p className="text-purple-100 text-sm">Планирование и напоминания</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/admin/events')} variant="secondary" size="sm">
                <Icon name="List" size={16} className="mr-2" />
                Список
              </Button>
              <Button onClick={() => navigate('/admin')} variant="secondary" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    {format(currentDate, 'LLLL yyyy', { locale: ru })}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={prevMonth}>
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Сегодня
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}
                  {daysInMonth.map((date) => {
                    const dayEvents = getEventsForDate(date);
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    const hasOverdue = dayEvents.some(isOverdue);

                    return (
                      <button
                        key={date.toString()}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          aspect-square p-1 rounded-lg border transition-all
                          ${isToday(date) ? 'border-purple-500 border-2' : 'border-gray-200'}
                          ${isSelected ? 'bg-purple-100 border-purple-500' : 'hover:bg-gray-50'}
                          ${hasOverdue ? 'bg-red-50' : ''}
                        `}
                      >
                        <div className="text-sm font-medium mb-1">{format(date, 'd')}</div>
                        <div className="flex flex-wrap gap-0.5 justify-center">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className={`w-1.5 h-1.5 rounded-full ${eventTypeColors[event.event_type] || 'bg-gray-500'}`}
                              title={event.title}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[10px] text-gray-500">+{dayEvents.length - 3}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Легенда</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(eventTypeLabels).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${eventTypeColors[type]}`} />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(selectedDate, 'd MMMM', { locale: ru })}
                  </CardTitle>
                  <CardDescription>Мероприятия на выбранную дату</CardDescription>
                </CardHeader>
                <CardContent>
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">Нет мероприятий</p>
                  ) : (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate).map((event) => (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border ${
                            isOverdue(event) ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${eventTypeColors[event.event_type]}`} />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm mb-1 truncate">{event.title}</h4>
                              <p className="text-xs text-gray-500">
                                {eventTypeLabels[event.event_type]}
                              </p>
                              {event.responsible_name && (
                                <p className="text-xs text-gray-500 mt-1">
                                  <Icon name="User" size={12} className="inline mr-1" />
                                  {event.responsible_name}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge variant={isOverdue(event) ? 'destructive' : 'default'} className="text-xs">
                            {isOverdue(event) ? 'Просрочено' : statusLabels[event.status]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={20} />
                  Предстоящие (7 дней)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {events.filter(event => {
                  if (!event.planned_date || event.status === 'completed') return false;
                  const eventDate = startOfDay(parseISO(event.planned_date));
                  const today = startOfDay(new Date());
                  const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  return diffDays >= 0 && diffDays <= 7;
                }).length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">Нет предстоящих мероприятий</p>
                ) : (
                  <div className="space-y-2">
                    {events
                      .filter(event => {
                        if (!event.planned_date || event.status === 'completed') return false;
                        const eventDate = startOfDay(parseISO(event.planned_date));
                        const today = startOfDay(new Date());
                        const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        return diffDays >= 0 && diffDays <= 7;
                      })
                      .map((event) => {
                        const diffDays = Math.ceil(
                          (startOfDay(parseISO(event.planned_date!)).getTime() - startOfDay(new Date()).getTime()) / 
                          (1000 * 60 * 60 * 24)
                        );
                        return (
                          <div key={event.id} className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                            <Icon name="Bell" size={16} className="text-yellow-600" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{event.title}</p>
                              <p className="text-xs text-gray-500">
                                {diffDays === 0 ? 'Сегодня' : diffDays === 1 ? 'Завтра' : `Через ${diffDays} дн.`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsCalendar;
