'use client';

import { useState } from 'react';
import { Card, Modal, ModalContent, ModalBody, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export function ImageGallery() {
  const t = useTranslations('campaign.gallery');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const images = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    src: placeholderImage1.src,
    alt: t('image_alt', { index: index + 1 })
  }));

  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
    setZoomLevel(1);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setZoomLevel(1);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
      setZoomLevel(1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
      setZoomLevel(1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <>
      <Card className="p-6 md:p-8 border border-default-200" shadow="none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Icon icon="solar:gallery-bold" width={28} className="text-primary" />
            {t('title')}
          </h2>
          <span className="text-sm text-default-600 font-medium">{t('photos_count', { count: images.length })}</span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleOpenModal(index)}
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

      {/* Image Modal */}
      <Modal 
        isOpen={selectedImageIndex !== null} 
        onClose={handleCloseModal}
        size="full"
        className="bg-black/95"
        classNames={{
          body: "p-0",
          wrapper: "items-center justify-center"
        }}
      >
        <ModalContent>
          <ModalBody className="relative flex items-center justify-center h-screen">
            {selectedImageIndex !== null && (
              <>
                {/* Close Button */}
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute top-4 right-4 z-20 text-white hover:bg-white/10"
                  onPress={handleCloseModal}
                >
                  <Icon icon="solar:close-circle-bold" width={32} />
                </Button>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold">
                  {selectedImageIndex + 1} / {images.length}
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-white hover:bg-white/10"
                    onPress={handleZoomOut}
                    isDisabled={zoomLevel <= 0.5}
                  >
                    <Icon icon="solar:minus-circle-bold" width={28} />
                  </Button>
                  
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-white hover:bg-white/10"
                    onPress={handleResetZoom}
                  >
                    <Icon icon="solar:magnifer-zoom-in-bold" width={28} />
                  </Button>

                  <span className="text-white font-semibold min-w-[60px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-white hover:bg-white/10"
                    onPress={handleZoomIn}
                    isDisabled={zoomLevel >= 3}
                  >
                    <Icon icon="solar:add-circle-bold" width={28} />
                  </Button>
                </div>

                {/* Navigation Buttons */}
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10 w-14 h-14"
                  onPress={handlePrevImage}
                >
                  <Icon icon="solar:alt-arrow-left-bold" width={32} />
                </Button>

                <Button
                  isIconOnly
                  variant="light"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/10 w-14 h-14"
                  onPress={handleNextImage}
                >
                  <Icon icon="solar:alt-arrow-right-bold" width={32} />
                </Button>

                {/* Image Container with Zoom */}
                <div className="w-full h-full flex items-center justify-center overflow-auto p-8">
                  <img
                    src={images[selectedImageIndex].src}
                    alt={images[selectedImageIndex].alt}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 cursor-move"
                    style={{ transform: `scale(${zoomLevel})` }}
                    draggable={false}
                  />
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
