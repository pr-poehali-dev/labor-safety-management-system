import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const REPORTS_API = 'https://functions.poehali.dev/ebb81c72-3e10-4e18-a859-4257bfd0c0cc';

interface ReportData {
  type: string;
  generated_at: string;
  statistics?: any;
  documents?: any[];
  events?: any[];
  training?: any[];
  incidents?: any[];
  assessments?: any[];
}

const ReportsPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportType, setReportType] = useState('summary');
  const [exportFormat, setExportFormat] = useState('json');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const reportTypes = [
    { value: 'summary', label: 'Сводный отчёт' },
    { value: 'documents', label: 'Отчёт по документам' },
    { value: 'events', label: 'Отчёт по мероприятиям' },
    { value: 'training', label: 'Отчёт по обучению' },
    { value: 'incidents', label: 'Отчёт по инцидентам' },
    { value: 'sout', label: 'Отчёт по СОУТ' },
    { value: 'form7', label: 'Форма 7-травматизм' },
  ];

  const exportFormats = [
    { value: 'json', label: 'JSON (Просмотр)' },
    { value: 'csv', label: 'CSV (Excel)' },
    { value: 'pdf', label: 'PDF' },
  ];

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${REPORTS_API}?type=${reportType}`);
      if (!response.ok) throw new Error('Failed to generate report');

      const data = await response.json();
      setReportData(data);

      toast({
        title: 'Успешно',
        description: 'Отчёт сформирован',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сформировать отчёт',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(REPORTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: reportType,
          format: exportFormat,
        }),
      });

      if (!response.ok) throw new Error('Failed to export');

      const data = await response.json();

      if (exportFormat === 'json') {
        const blob = new Blob([JSON.stringify(data.report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${reportType}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'csv') {
        const csvData = convertToCSV(reportData);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }

      toast({
        title: 'Успешно',
        description: data.message || 'Отчёт экспортирован',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось экспортировать отчёт',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (data: ReportData | null): string => {
    if (!data) return '';

    let csv = '';

    if (data.statistics) {
      csv += 'Статистика\n';
      csv += Object.keys(data.statistics).join(',') + '\n';
      csv += Object.values(data.statistics).join(',') + '\n\n';
    }

    if (data.documents && data.documents.length > 0) {
      csv += 'Документы\n';
      const headers = Object.keys(data.documents[0]).join(',');
      csv += headers + '\n';
      data.documents.forEach((doc: any) => {
        csv += Object.values(doc).map(v => `"${v}"`).join(',') + '\n';
      });
    }

    if (data.events && data.events.length > 0) {
      csv += 'Мероприятия\n';
      const headers = Object.keys(data.events[0]).join(',');
      csv += headers + '\n';
      data.events.forEach((evt: any) => {
        csv += Object.values(evt).map(v => `"${v}"`).join(',') + '\n';
      });
    }

    return csv || 'Нет данных для экспорта';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Отчётность АСУБТ</h1>
                <p className="text-purple-100 text-sm">Формирование и экспорт отчётов</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Параметры отчёта</CardTitle>
              <CardDescription>Выберите тип и формат</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Тип отчёта</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exportFormat">Формат экспорта</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="exportFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleGenerateReport}
                  disabled={loading}
                  className="w-full"
                >
                  <Icon name="FileSearch" size={18} className="mr-2" />
                  {loading ? 'Формирование...' : 'Сформировать отчёт'}
                </Button>

                <Button
                  onClick={handleExportReport}
                  disabled={loading || !reportData}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Экспортировать
                </Button>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Совет:</strong> Сначала сформируйте отчёт для просмотра, затем экспортируйте в нужном формате.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Предварительный просмотр</CardTitle>
              <CardDescription>
                {reportData ? `Сформировано: ${new Date(reportData.generated_at).toLocaleString('ru-RU')}` : 'Отчёт не сформирован'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!reportData ? (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Выберите параметры и нажмите "Сформировать отчёт"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reportData.statistics && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Статистика</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(reportData.statistics).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                              {key === 'total_users' && 'Пользователи'}
                              {key === 'total_documents' && 'Документы'}
                              {key === 'pending_events' && 'Мероприятия'}
                              {key === 'active_incidents' && 'Инциденты'}
                            </p>
                            <p className="text-2xl font-bold">{String(value)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {reportData.documents && reportData.documents.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Документы ({reportData.documents.length})</h3>
                      <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                        <pre className="text-xs">{JSON.stringify(reportData.documents.slice(0, 5), null, 2)}</pre>
                        {reportData.documents.length > 5 && (
                          <p className="text-sm text-gray-600 mt-2">... и ещё {reportData.documents.length - 5}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {reportData.events && reportData.events.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Мероприятия ({reportData.events.length})</h3>
                      <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                        <pre className="text-xs">{JSON.stringify(reportData.events.slice(0, 5), null, 2)}</pre>
                        {reportData.events.length > 5 && (
                          <p className="text-sm text-gray-600 mt-2">... и ещё {reportData.events.length - 5}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Доступные типы отчётов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Сводный отчёт</h4>
                <p className="text-sm text-gray-600">Общая статистика по всем модулям системы</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Отчёт по документам</h4>
                <p className="text-sm text-gray-600">Список всех активных документов по ОТ</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Отчёт по мероприятиям</h4>
                <p className="text-sm text-gray-600">Запланированные и выполненные мероприятия</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Отчёт по обучению</h4>
                <p className="text-sm text-gray-600">Инструктажи и обучение сотрудников</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Отчёт по инцидентам</h4>
                <p className="text-sm text-gray-600">Несчастные случаи и происшествия</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Форма 7-травматизм</h4>
                <p className="text-sm text-gray-600">Статистический отчёт по травматизму</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportsPage;
