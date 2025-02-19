'use client'

import { Button } from '@/components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'coverImageUrl' | 'name'>
}

function RestaurantHeader({restaurant}:RestaurantHeaderProps) {
    const router = useRouter()
    const handleBackClick = () => router.back()

    return (
        <div className="relative h-[250px] w-full">
            <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute top-4 left-4 rounded-full z-50"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>
            <Image
                src={restaurant?.coverImageUrl}
                fill
                alt={restaurant.name}
                className="object-cover"
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

export default RestaurantHeader