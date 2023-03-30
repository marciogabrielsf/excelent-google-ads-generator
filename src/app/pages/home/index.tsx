"use client";
import { parseDescription } from '@/app/hooks/parseDescription';
import { carDescriptionType } from '@/app/hooks/parseDescription/models';
import { parseTitle } from '@/app/hooks/parseTitle';
import { carTitleType } from '@/app/hooks/parseTitle/models';
import React, { useState } from 'react'
import GeneratedDescriptions from './GeneratedDescriptions';
import GeneratedTitles from './GeneratedTitles';

import './styles.css'

type carData = {
    title: string,
    description: string
}

export default function HomeSection() {

    const [storeURL, setStoreURL] = useState('')
    const [generatedTitle, setGeneratedTitle] = useState<carTitleType[] | null>(null)
    const [generatedDescription, setGeneratedDescription] = useState<carDescriptionType[] | null>(null)

    const getCarData = async () => {
        function getPageContent(): Promise<carData> {
            return fetch('/api/getTitle', {
                method: 'POST',
                body: JSON.stringify({ storeURL })
            })
                .then(response => response.json())
                .catch(() => alert('URL Inválido'))
        }

        const carProps = await getPageContent()

        if (!!carProps) {
            const titles = parseTitle(carProps.title)
            const description = parseDescription(carProps.title)

            setGeneratedTitle(titles)
            setGeneratedDescription(description)
        }
    }

    function clearGeneratedData() {
        setGeneratedTitle(null)
        setGeneratedDescription(null)
    }

    console.log('renderizou')


    return (
        <section className='home_section'>

            {!!generatedTitle ?

                <div className="generated_content">
                    <GeneratedTitles carInfo={generatedTitle} />
                    <GeneratedDescriptions carInfo={generatedDescription} />
                    <button onClick={clearGeneratedData} className='generate_button'>
                        <h1>Voltar</h1>
                    </button>
                </div>

                :

                <div className="home_div">
                    <h1 className='headline'>Gerador de anúncios Excelentes para Google ads.</h1>
                    <div className="car_input_div">
                        <label>Digite o Link do veículo:</label>
                        <input
                            onChange={(e) => setStoreURL(e.target.value)}
                            value={storeURL}
                            type="text" className='car_input' />
                    </div>
                    <button onClick={getCarData} className='generate_button'>
                        <h1>Gerar</h1>
                    </button>
                </div>}
        </section>
    )
}
