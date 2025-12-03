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

const DOCUMENTS_API = 'https://functions.poehali.dev/d940a7a8-1b92-42cb-bd0e-91edd2859dbb';

interface Document {
  id: number;
  title: string;
  doc_type: string;
  content?: string;
  file_url?: string;
  creator_name?: string;
  created_at: string;
  status: string;
}

const DocumentsManager = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    doc_type: 'instruction',
    content: '',
    file_url: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    loadDocuments();
  }, [isAdmin, navigate]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(DOCUMENTS_API);
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить документы',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(DOCUMENTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          created_by: user?.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to create document');

      toast({
        title: 'Успешно',
        description: 'Документ создан',
      });

      setIsDialogOpen(false);
      setFormData({ title: '', doc_type: 'instruction', content: '', file_url: '' });
      loadDocuments();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать документ',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (!confirm('Удалить документ?')) return;

    try {
      const response = await fetch(`${DOCUMENTS_API}?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Успешно',
        description: 'Документ удалён',
      });

      loadDocuments();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить документ',
        variant: 'destructive',
      });
    }
  };

  const docTypeLabels: Record<string, string> = {
    instruction: 'Инструкция',
    regulation: 'Положение',
    order: 'Приказ',
    protocol: 'Протокол',
    other: 'Другое',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white shadow-lg py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={32} />
              <div>
                <h1 className="text-2xl font-bold">Управление документами</h1>
                <p className="text-purple-100 text-sm">Документы по охране труда</p>
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
                <CardTitle>Документы</CardTitle>
                <CardDescription>Управление документацией по ОТ</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить документ
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Новый документ</DialogTitle>
                    <DialogDescription>Создание документа по охране труда</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateDocument} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Инструкция по охране труда №1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc_type">Тип документа</Label>
                      <Select
                        value={formData.doc_type}
                        onValueChange={(value) => setFormData({ ...formData, doc_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instruction">Инструкция</SelectItem>
                          <SelectItem value="regulation">Положение</SelectItem>
                          <SelectItem value="order">Приказ</SelectItem>
                          <SelectItem value="protocol">Протокол</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Содержание</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={5}
                        placeholder="Текст документа..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file_url">Ссылка на файл (опционально)</Label>
                      <Input
                        id="file_url"
                        type="url"
                        value={formData.file_url}
                        onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                        placeholder="https://example.com/document.pdf"
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
            {loading && documents.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Загрузка...</p>
            ) : documents.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Нет документов</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{docTypeLabels[doc.doc_type] || doc.doc_type}</Badge>
                      </TableCell>
                      <TableCell>{doc.creator_name || 'Не указан'}</TableCell>
                      <TableCell>{new Date(doc.created_at).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>
                        <Badge>{doc.status === 'active' ? 'Активен' : 'Архив'}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {doc.file_url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                <Icon name="ExternalLink" size={16} />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
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

export default DocumentsManager;
