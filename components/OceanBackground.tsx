"use client"
import Image from "next/image"

export default function OceanBackground() {
  return (
    <Image
      src="/images/Background.png"
      alt="Fundo do mar"
      fill
      className="object-cover z-0"
      priority
    />
  )
}
