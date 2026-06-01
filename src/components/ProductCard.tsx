import { useState, useEffect, useCallback } from "react";
import { Product } from "../data/products";
import { buildWhatsAppLink } from "../config";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ProductCardProps {
  product: Product & { units: number; extraImages?: string[] };
  index: number;
}

function ImagePlaceholder({ id }: { id: string }) {
  return (
    <div className="w-full aspect-[3/4] bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <span className="text-xs font-mono">COD {id}</span>
    </div>
  );
}

function GalleryImage({
  images,
  currentIdx,
  alt,
  onError,
  hasError,
  productId,
}: {
  images: string[];
  currentIdx: number;
  alt: string;
  onError: () => void;
  hasError: boolean;
  productId: string;
}) {
  if (hasError || !images[currentIdx])
    return <ImagePlaceholder id={productId} />;
  return (
    <img
      src={images[currentIdx]}
      alt={alt}
      className="w-full aspect-[3/4] object-cover object-top transition-transform duration-300"
      loading="lazy"
      onError={onError}
    />
  );
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(0);

  const images = [
    ...(product.image ? [product.image] : []),
    ...(product.extraImages ?? []),
  ];

  const pretSet = product.units * product.unitPrice;
  const delayStyle: React.CSSProperties = {
    animationDelay: `${Math.min(index * 40, 400)}ms`,
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((i) => (i - 1 + images.length) % images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((i) => (i + 1) % images.length);
  };

  const openModal = () => {
    setModalImg(currentImg);
    setModalOpen(true);
  };

  // Close on Escape & switch images with arrows
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft")
        setModalImg((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setModalImg((i) => (i + 1) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (modalOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, handleKey]);

  return (
    <>
      <article
        className="product-card card-animate cursor-pointer"
        style={delayStyle}
        onClick={openModal}
      >
        {/* Image with nav */}
        <div className="relative overflow-hidden bg-gray-50 group">
          <GalleryImage
            images={images}
            currentIdx={currentImg}
            alt={`Jeans Cod ${product.id}`}
            onError={() => setImgError(true)}
            hasError={imgError}
            productId={product.id}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/30 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none"
                aria-label="Imaginea anterioară"
              >
                ‹
              </button>
              <button
                onClick={nextImg}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/30 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none"
                aria-label="Imaginea următoare"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImg(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full border-none transition-colors ${
                      i === currentImg ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Imaginea ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-3 space-y-1.5">
          <p className="font-heading font-700 text-base tracking-wide">
            Cod: {product.id}
          </p>
          <div className="text-sm text-gray-600 space-y-0.5">
            <p>
              Mărimi:{" "}
              <span className="font-medium text-gray-800">{product.sizes}</span>
            </p>
            <p>
              Bucăți / set:{" "}
              <span className="font-medium text-gray-800">
                {product.units} buc
              </span>
            </p>
          </div>
          <div className="flex items-end justify-between gap-2 pt-0.5">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">
                Preț / buc
              </p>
              <p className="font-heading font-800 text-lg text-red-600 tracking-wide leading-none">
                {product.unitPrice}{" "}
                <span className="text-xs font-body font-normal text-gray-500">
                  LEI
                </span>
              </p>
            </div>
            <div className="w-px h-8 bg-gray-200 self-center" />
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">
                Preț set
              </p>
              <p className="font-heading font-800 text-lg text-red-700 tracking-wide leading-none">
                {pretSet}{" "}
                <span className="text-xs font-body font-normal text-gray-500">
                  LEI
                </span>
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(product.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn mt-2"
            aria-label={`Comandă Cod ${product.id} pe WhatsApp`}
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon size={14} />
            SCRIE PE WHATSAPP
          </a>
        </div>
      </article>

      {/* Expanded Modal - Now strictly showing only the enlarged centered image */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={() => setModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-colors border-none cursor-pointer z-52"
            aria-label="Închide"
          >
            ×
          </button>

          {/* Centered Image Container */}
          <div
            className="relative max-w-full max-h-[90vh] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {images[modalImg] ? (
              <img
                src={images[modalImg]}
                alt={`Jeans Cod ${product.id}`}
                className="w-auto h-full max-w-full max-h-[90vh] object-contain mx-auto"
              />
            ) : (
              <div className="w-80 bg-white p-4 rounded-xl">
                <ImagePlaceholder id={product.id} />
              </div>
            )}

            {/* Left/Right controls inside the image preview if there are multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImg((i) => (i - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl border-none cursor-pointer"
                  aria-label="Anterioară"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImg((i) => (i + 1) % images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl border-none cursor-pointer"
                  aria-label="Următoarea"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
