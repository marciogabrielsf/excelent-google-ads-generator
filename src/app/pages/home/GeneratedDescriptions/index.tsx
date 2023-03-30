import { carDescriptionType } from '@/app/hooks/parseDescription/models';
import React from 'react'

import './styles.css'

type GeneratedDescriptionProps = {
    carInfo: carDescriptionType[] | null;
}

export default function GeneratedDescriptions(props: GeneratedDescriptionProps) {
    return (
        <div className="content">
            <h1 className='tile_headline'>Descrições Geradas:</h1>
            <div className='generated_descriptions'>
                {props.carInfo?.map(({ description }, index) =>
                    <div key={index}>
                        <label className='item_label'>Descrição {index + 1}:</label>
                        <h2>{description}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
