import { Button } from '@heroui/react';

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2">Nenhuma campanha encontrada</h3>
      <p className="text-gray-500 mb-4">
        Tente ajustar os filtros ou buscar por outros termos.
      </p>
      <Button color="primary">Explorar campanhas</Button>
    </div>
  );
};