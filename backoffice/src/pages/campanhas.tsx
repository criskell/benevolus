"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VITE_API_URL } from "@/config/env";
import type { ICampaign, CampaignStatus } from "@/types/ICampaign";

const STATUS_CONFIG: Record<
  CampaignStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }
> = {
  in_review: {
    label: "Em Revisão",
    variant: "outline",
    className: "border-yellow-500 text-yellow-600 bg-yellow-50",
  },
  open: {
    label: "Aberta",
    variant: "outline",
    className: "border-green-500 text-green-600 bg-green-50",
  },
  closed: { label: "Fechada", variant: "secondary" },
  rejected: { label: "Rejeitada", variant: "destructive" },
  finished: {
    label: "Finalizada",
    variant: "outline",
    className: "border-blue-500 text-blue-600 bg-blue-50",
  },
};

const TABS = [
  { value: "all", label: "Todas" },
  { value: "in_review", label: "Em Revisão" },
  { value: "open", label: "Abertas" },
  { value: "closed", label: "Fechadas" },
  { value: "rejected", label: "Rejeitadas" },
  { value: "finished", label: "Finalizadas" },
] as const;

const formatCurrency = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );

export const Campanhas = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject">(
    "approve",
  );

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/campaigns`);
      const data = await response.json();
      setCampaigns(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const filteredCampaigns =
    activeTab === "all"
      ? campaigns
      : campaigns.filter((c) => c.status === activeTab);

  const handleStatusChange = async (campaignId: number, newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/campaigns/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status");

      await loadCampaigns();
      setIsConfirmOpen(false);
      setIsDetailOpen(false);
      setSelectedCampaign(null);
      toast.success(
        newStatus === "open"
          ? "Campanha aprovada com sucesso!"
          : "Campanha rejeitada.",
      );
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao atualizar status da campanha");
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (action: "approve" | "reject") => {
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedCampaign) return;
    const newStatus = confirmAction === "approve" ? "open" : "rejected";
    handleStatusChange(selectedCampaign.id, newStatus);
  };

  const renderStatusBadge = (status: CampaignStatus) => {
    const config = STATUS_CONFIG[status] || {
      label: status,
      variant: "outline" as const,
    };
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Campanhas</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie e revise as campanhas da plataforma
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Campanhas</CardTitle>
            <CardDescription>
              {filteredCampaigns.length} campanha
              {filteredCampaigns.length !== 1 ? "s" : ""} encontrada
              {filteredCampaigns.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Meta</TableHead>
                    <TableHead>Arrecadado</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-center w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center gap-2">
                          <Loader2 size={18} className="animate-spin" />
                          Carregando...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredCampaigns.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Nenhuma campanha encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {campaign.title}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(campaign.status)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(campaign.goalCents)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(campaign.amountRaisedCents)}
                        </TableCell>
                        <TableCell>
                          {campaign.createdAt
                            ? new Date(campaign.createdAt).toLocaleDateString(
                                "pt-BR",
                              )
                            : "-"}
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCampaign(campaign);
                                    setIsDetailOpen(true);
                                  }}
                                  disabled={loading}
                                >
                                  <Eye size={16} className="text-blue-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Ver detalhes</TooltipContent>
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Campanha</DialogTitle>
            <DialogDescription>
              Informações completas da campanha
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Título</p>
                <p className="font-medium">{selectedCampaign.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="text-sm">{selectedCampaign.description || "-"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {renderStatusBadge(selectedCampaign.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Favoritos</p>
                  <p className="font-medium">
                    {selectedCampaign.favoriteCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="font-medium">
                    {formatCurrency(selectedCampaign.goalCents)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Arrecadado</p>
                  <p className="font-medium">
                    {formatCurrency(selectedCampaign.amountRaisedCents)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Data de Criação
                  </p>
                  <p className="font-medium">
                    {selectedCampaign.createdAt
                      ? new Date(selectedCampaign.createdAt).toLocaleDateString(
                          "pt-BR",
                        )
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expira em</p>
                  <p className="font-medium">
                    {selectedCampaign.expiresAt
                      ? new Date(selectedCampaign.expiresAt).toLocaleDateString(
                          "pt-BR",
                        )
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {selectedCampaign?.status === "in_review" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => openConfirm("reject")}
                  disabled={loading}
                >
                  Rejeitar
                </Button>
                <Button
                  onClick={() => openConfirm("approve")}
                  disabled={loading}
                >
                  Aprovar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === "approve"
                ? "Aprovar Campanha"
                : "Rejeitar Campanha"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === "approve"
                ? "Tem certeza que deseja aprovar esta campanha? Ela ficará visível para todos os usuários."
                : "Tem certeza que deseja rejeitar esta campanha? O criador será notificado."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={
              confirmAction === "reject"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : ""
            }
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Processando...
              </>
            ) : confirmAction === "approve" ? (
              "Aprovar"
            ) : (
              "Rejeitar"
            )}
          </AlertDialogAction>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
