"use client"

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ProductHeaderProps {
    product: Pick<Product, 'name' | 'imageUrl'>
}

function ProductHeader({ product }: ProductHeaderProps) {
    const router = useRouter()
    const handleBackClick = () => router.back()

    return (
        <div className="relative w-full h-[300px]">
            <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute top-4 left-4 rounded-full z-50"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
            />
            <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute top-4 right-4 rounded-full z-50"
            >
                <ScrollTextIcon />
            </Button>

        </div>
    )
}

export default ProductHeader