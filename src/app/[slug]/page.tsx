import { db } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import ConsumptionMethodOption from './components/consumption-method-option'

interface RestaurantPageProps {
    params: Promise<{slug: string}>
}

async function RestaurantPage({params}:RestaurantPageProps) {
    const {slug} = await params
    const restaurant = await db.restaurant.findUnique({
           where: {
               slug
           }
       })
       if (!restaurant){
        return notFound()
       }

    return (
        <div className='h-screen flex flex-col items-center justify-center px-6 pt-24'>
            {/* bem vindo */}
            <div className="flex flex-col items-center gap-2">
                <Image 
                    src={restaurant?.avatarImageUrl}
                    alt={restaurant?.name}
                    width={82}
                    height={82}
                />
                <h2 className="font-semibold">
                    {restaurant.name}
                </h2>
            </div>
            {/* logo e title */}
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo!
                </h3>
                <p className='opacity-55'>
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            {/* metodo consumo */}
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption 
                    slug={restaurant.slug}
                    option='DINE_IN'
                    buttonText='Para comer aqui' 
                    imageAlt='para comer aqui'
                    imageUrl='/dine_in.svg'
                />
                <ConsumptionMethodOption 
                    slug={restaurant.slug}
                    option='TAKEAWAY'
                    buttonText='Para levar' 
                    imageAlt='para levar'
                    imageUrl='/take_away.svg'
                />
            </div>
        </div>
    )
}

export default RestaurantPage