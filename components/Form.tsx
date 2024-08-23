
'use client'

import * as React from "react"
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { BedDouble, Search } from 'lucide-react';

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export default function Form({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 21),
    })

    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    //MARK: Function to calculate the total price
    useEffect(() => {
        if (date?.from && date?.to && selectedPrice) {
            const days = (date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24);
            setTotalPrice(days * selectedPrice);
        }
    }, [date, selectedPrice]);

    return (
        <div className='text-center mx-4'>
            <div className='flex flex-col lg:flex-row items-center justify-center lg:border rounded-full max-w-5xl mx-auto lg:space-x-4 my-6 lg:shadow-lg lg:px-10'>
                <div className="flex-col my-4 lg:flex-1 border lg:border-transparent shadow-lg lg:shadow-none rounded-full px-6 py-3 lg:px-0 lg:py-0">

                    {/* MARK: Select  
 */}
                    <Select onValueChange={(value) => setSelectedPrice(Number(value))}>
                        <SelectTrigger className="w-[260px] lg:w-full">
                            <SelectValue placeholder={<div className="flex items-center space-x-2"><BedDouble /><span>Where are you going?</span></div>} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>North America</SelectLabel>
                                <SelectItem value="149">Beach Villa - £149/night</SelectItem>
                                <SelectItem value="179">Mountain Cabin - £179/night</SelectItem>
                                <SelectItem value="329">Mountain Standard - £329/night</SelectItem>
                                <SelectItem value="129">Texas Village - £129/night</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Europe & Africa</SelectLabel>
                                <SelectItem value="199">French Countryside Cottage - £199/night</SelectItem>
                                <SelectItem value="239">Italian Vineyard Estate - £239/night</SelectItem>
                                <SelectItem value="279">Greek Island Villa - £279/night</SelectItem>
                                <SelectItem value="189">Spanish Beachfront Apartment - £189/night</SelectItem>
                                <SelectItem value="149">Moroccan Riad - £149/night</SelectItem>
                                <SelectItem value="129">South African Safari Lodge - £129/night</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Asia</SelectLabel>
                                <SelectItem value="179">Japanese Ryokan - £179/night</SelectItem>
                                <SelectItem value="159">Thai Beach Bungalow - £159/night</SelectItem>
                                <SelectItem value="199">Balinese Villa - £199/night</SelectItem>
                                <SelectItem value="189">Chinese Courtyard House - £189/night</SelectItem>
                                <SelectItem value="169">Korean Hanok - £169/night</SelectItem>
                                <SelectItem value="139">Indonesian Treehouse - £139/night</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Australia & Pacific</SelectLabel>
                                <SelectItem value="219">Sydney Harbour Apartment - £219/night</SelectItem>
                                <SelectItem value="249">Great Barrier Reef Resort - £249/night</SelectItem>
                                <SelectItem value="199">Melbourne City Loft - £199/night</SelectItem>
                                <SelectItem value="229">New Zealand Mountain Lodge - £229/night</SelectItem>
                                <SelectItem value="179">Fijian Beach House - £179/night</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>South America</SelectLabel>
                                <SelectItem value="159">Brazilian Rainforest Cabin - £159/night</SelectItem>
                                <SelectItem value="139">Argentinian Wine Estate - £139/night</SelectItem>
                                <SelectItem value="149">Chilean Lake House - £149/night</SelectItem>
                                <SelectItem value="169">Peruvian Mountain Retreat - £169/night</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/*MARK: divider
  */}
                <div className="hidden lg:flex h-12 w-[1px] bg-gray-300"></div>


                {/*MARK: date picker
 */}
                <div className="flex-col my-4 lg:flex-1 border lg:border-transparent shadow-lg lg:shadow-none rounded-full px-6 py-3 lg:px-0 lg:py-0">

                    <div className={cn("grid", className)}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[260px] lg:w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}

                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* MARK: divider
  */}
                <div className="hidden lg:flex h-12 w-[1px] bg-gray-300"></div>


                {/* MARK: search 
 */}
                <Button className='rounded-full flex-1 lg:flex-[0.2] px-7 mt-4 lg:mt-0 shadow-xl'><Search className='mr-3' />Search</Button>
            </div>

            {totalPrice && (
                <div className="text-gray-800 mt-4 lg:mt-10">Total Price: £ {totalPrice}</div>
            )}

        </div>
    );
}







