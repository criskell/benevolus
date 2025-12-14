import { Card } from '@heroui/react';

import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export function ImageGallery() {
  return (
    <Card className="p-12 border border-divider" shadow="none">
      <p className="text-lg font-semibold mb-6">Imagens</p>

      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 10 }, (_, index) => (
          <img
            src={placeholderImage1.src}
            alt="Imagem"
            className="rounded-lg w-80 object-cover mt-4"
            key={index}
          />
        ))}
      </div>
    </Card>
  );
}
