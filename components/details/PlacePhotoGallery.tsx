"use client";

import { useState } from "react";

type Photo = {
  id: number;
  url: string;
};

export function PlacePhotoGallery({ photos }: { photos: Photo[] }) {
  const limitedPhotos = photos.slice(0, 5);

  const [selectedPhoto, setSelectedPhoto] = useState(limitedPhotos[0]?.url);

  if (!limitedPhotos.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Foto principal */}
      <div className="h-[320px] overflow-hidden rounded-[24px] border border-white/10 md:col-span-2">
        <img
          src={selectedPhoto}
          alt="Foto principal"
          className="h-full w-full object-cover transition duration-300"
        />
      </div>

      {/* Miniaturas (4 fotos) */}
      <div className="grid grid-cols-2 gap-4">
        {limitedPhotos.slice(1).map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo.url)}
            className={`relative h-[150px] cursor-pointer overflow-hidden rounded-[20px] border transition ${
              selectedPhoto === photo.url
                ? "border-sky-400"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <img
              src={photo.url}
              alt={`Foto ${index + 2}`}
              className="h-full w-full object-cover"
            />

            {index === 3 && photos.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-semibold text-white">
                +{photos.length - 5} fotos
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}