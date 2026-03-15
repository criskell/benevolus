import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Icon
        icon="solar:magnifer-outline"
        width={48}
        className="text-default-300 mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">
        Nenhuma campanha encontrada
      </h3>
      <p className="text-gray-500 mb-4">
        Tente ajustar os filtros ou buscar por outros termos.
      </p>
      <Button color="primary">Explorar campanhas</Button>
    </div>
  );
};
