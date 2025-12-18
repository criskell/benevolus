'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit2, Plus, Loader2 } from 'lucide-react';
import { VITE_API_URL } from '@/config/env';
import type { ICategory } from '@/types/ICategory';



export const Categoria = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/categories`);
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
  };


  const handleNewCategory = () => {
    resetForm();
    setIsOpen(true);
  };

  
  const handleEditCategory = (category: ICategory) => {
    setFormData({ name: category.name, description: category.description || '' });
    setEditingId(category.id);
    setIsOpen(true);
  };


  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      toast.error('Nome da categoria é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${VITE_API_URL}/categories/${editingId}` : `${VITE_API_URL}/categories`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao salvar categoria');

      await loadCategories();
      setIsOpen(false);
      resetForm();
      toast.success(editingId ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/categories/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar categoria');

      await loadCategories();
      setIsDeleteOpen(false);
      setDeleteId(null);
      toast.success('Categoria deletada com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao deletar categoria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie as categorias de campanhas
          </p>
        </div>
        <Button onClick={handleNewCategory} className="gap-2">
          <Plus size={18} />
          Nova Categoria
        </Button>
      </div>

      <div>
            <Card>
              <CardHeader>
                <CardTitle>Lista de Categorias</CardTitle>
                <CardDescription>
                  {categories.length} categoria{categories.length !== 1 ? 's' : ''} encontrada{categories.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead className="text-center w-20">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading && categories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex justify-center items-center gap-2">
                              <Loader2 size={18} className="animate-spin" />
                              Carregando...
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : categories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Nenhuma categoria encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {category.description || '-'}
                            </TableCell>
                            <TableCell>
                              {category.created_at
                                ? new Date(category.created_at).toLocaleDateString('pt-BR')
                                : '-'}
                            </TableCell>
                            <TableCell className="flex justify-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditCategory(category)}
                                      disabled={loading}
                                    >
                                      <Edit2 size={16} className="text-blue-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Editar</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setDeleteId(category.id);
                                        setIsDeleteOpen(true);
                                      }}
                                      disabled={loading}
                                    >
                                      <Trash2 size={16} className="text-red-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Deletar</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Atualize os dados da categoria'
                : 'Crie uma nova categoria para campanhas'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex: Saúde"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                placeholder="Descrição da categoria"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={loading}
                rows={4}
                className="w-full px-3 py-2 border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveCategory} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Salvando...
                </>
              ) : editingId ? (
                'Atualizar'
              ) : (
                'Criar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Categoria</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta categoria? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={handleDeleteCategory}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Deletando...
              </>
            ) : (
              'Deletar'
            )}
          </AlertDialogAction>
          <AlertDialogCancel disabled={loading}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};