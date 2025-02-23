'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { ConsumptionMethod } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { PatternFormat } from 'react-number-format'
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { createOrder } from "../actions/create-order"
import { CartContext } from "../contexts/cart"
import { isValidCpf } from "../helpers/cpf"

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório.",
    }),
    cpf: z.string().trim().min(1, {
        message: "O CPF é obrigatório."
    }).refine((value) => isValidCpf(value), {
        message: "CPF inválido."
    })
})

type FormSchema = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function FinishOrderDialog({ open, onOpenChange }: FinishOrderDialogProps) {
    const { slug } = useParams<{ slug: string }>()
    const [isLoading, setIsLoading] = useState(false)
    const { products } = useContext(CartContext)
    const searchParams = useSearchParams()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: ""
        },
        shouldUnregister: true
    })

    const onSubmit = async (data: FormSchema) => {
        try {
            setIsLoading(true)
            const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod
            await createOrder({
                consumptionMethod,
                customerCpf: data.cpf,
                customerName: data.name,
                products,
                slug,
            })
            onOpenChange(false)
            toast.success("Pedido finalizado com sucesso! 🎉")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar pedido</DrawerTitle>
                    <DrawerDescription>Insira suas informações abaixo para finalizar o seu pedido.</DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF"
                                                format="###.###.###-##"
                                                customInput={Input}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                {isLoading ? (
                                    <Button disabled className="w-full rounded-full">
                                        <Loader2 className="animate-spin" />
                                        Finalizando
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full rounded-full">
                                        Finalizar
                                    </Button>
                                )}

                                <DrawerClose asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-full"
                                    >
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>

                    </Form>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default FinishOrderDialog