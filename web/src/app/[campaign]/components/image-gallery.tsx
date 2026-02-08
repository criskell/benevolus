import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export function ImageGallery() {
  const images = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    src: placeholderImage1.src,
    alt: `Imagem ${index + 1}`
  }));

  return (
    <Card className="p-6 md:p-8 border border-default-200" shadow="none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon icon="solar:gallery-bold" width={28} className="text-primary" />
          Galeria de imagens
        </h2>
        <span className="text-sm text-default-600 font-medium">{images.length} fotos</span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-default-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Icon icon="solar:eye-bold" width={24} className="text-primary" />
              </div>
            </div>

            {/* Image number badge */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg">
              {index + 1}/{images.length}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
