"use client";
import { generateTitles } from '@/app/hooks/generateTitles';
import { AdTitleType } from '@/app/hooks/generateTitles/models';
import React, { useState } from 'react'

import './index.css'

type PageContentType = {
    carTitle: string
}

export default function HomeSection() {

    const [storeURL, setStoreURL] = useState('')
    const [pageContent, setPageContent] = useState<PageContentType | null>(null)
    const [generatedTitles, setGeneratedTitles] = useState<AdTitleType[] | null>()

    const getTitle = async () => {
        function getPageContent(): Promise<PageContentType> {
            return fetch('/api/getTitle', {
                method: 'POST',
                body: JSON.stringify({ storeURL })
            })
                .then(response => response.json())
                .catch(() => alert('URL Inválido'))
        }
        const response = await getPageContent()
        if (!!response) {
            setPageContent(response)
            const titles = generateTitles(response.carTitle)
            setGeneratedTitles(titles)
        }
    }

    function clearGeneratedTitles() {
        setPageContent(null)
    }




    return (
        <section className='home_section'>

            {!!pageContent ?

                <div className="generated_content">
                    <h1 className='tile_content_headline'>Títulos Gerados:</h1>
                    <div className='generated_titles'>
                        {generatedTitles?.map(({ description }, index) =>
                            <div key={index} className='title_item'>
                                <label>Título {index + 1}:</label>
                                <h2>{description}</h2>
                            </div>
                        )}
                        <button onClick={clearGeneratedTitles} className='generate_button'>
                            <h1>Voltar</h1>
                        </button>
                    </div>
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
                    <button onClick={getTitle} className='generate_button'>
                        <h1>Gerar</h1>
                    </button>
                </div>}
        </section>
    )
}
