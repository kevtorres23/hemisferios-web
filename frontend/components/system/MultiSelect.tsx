import { Label } from '@/components/ui/label';
import React from 'react';
import type { Option } from '@/components/ui/multi-select';
import MultipleSelector from '@/components/ui/multi-select';

type MultiSelectProps = {
    label: string;
    value: Option[];
    onChange: (options: Option[]) => void;
    isEmpty: boolean;
};

// Filtrar categories 

const categories: Option[] = [
    {
        value: '10:00',
        label: '10:00 a.m.'
    },
    {
        value: '11:00',
        label: '11:00 a.m.'
    },
    {
        value: '12:00',
        label: '12:00 p.m.'
    },
    {
        value: '13:00',
        label: '01:00 p.m.'
    },
    {
        value: '14:00',
        label: '02:00 p.m.'
    },
    {
        value: '15:00',
        label: '03:00 p.m.'
    },
    {
        value: '16:00',
        label: '04:00 p.m.'
    },
    {
        value: '17:00',
        label: '05:00 p.m.'
    },
    {
        value: '18:00',
        label: '06:00 p.m.'
    },
    {
        value: '19:00',
        label: '07:00 p.m.'
    },
    {
        value: '20:00',
        label: '08:00 p.m.'
    },
];

function MultiSelect(props: MultiSelectProps) {

    return (
        <div className='w-full space-y-2'>
            <Label>{props.label}</Label>
            <MultipleSelector
                value={props.value}
                onChange={props.onChange}
                commandProps={{
                    label: "Selecciona horas"
                }}
                options={categories}
                placeholder="Selecciona horas"
                emptyIndicator={<p className='text-center text-sm'>Se seleccionaron todas las horas.</p>}
                className={`w-full ${props.isEmpty ? "border border-red-500" : ""}`}
            />
        </div>
    )
};

export default MultiSelect;