import { carTitleType } from '@/app/hooks/parseTitle/models';
import React from 'react'

interface GeneratedTitlesProps {
    carInfo: carTitleType[] | null;
}

export default function GeneratedTitles(props: GeneratedTitlesProps) {
    return (
        <div className="content">
            <h1 className='tile_headline'>Títulos Gerados:</h1>
            <div className='generated_titles'>
                {props.carInfo?.map(({ title }, index) =>
                    <div key={index}>
                        <label className='item_label'>Título {index + 1}:</label>
                        <h2>{title}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
