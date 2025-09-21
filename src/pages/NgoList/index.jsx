import React, { useState, useEffect } from 'react';
import NgoCard from './NgoCard';
import './NgoList.css';

const NgoList = () => {
    const [ngos, setNgos] = useState([]);

    useEffect(() => {
        // Mock data for now, replace with API call later
        const mockNgos = [
            {
                id: 1,
                name: 'Greenpeace',
                history: 'Greenpeace is a non-governmental environmental organization with offices in over 55 countries and an international coordinating body in Amsterdam, the Netherlands. Greenpeace was founded in 1971 by Irving Stowe and Dorothy Stowe, Canadian and US ex-pat environmental activists from Vancouver, British Columbia.',
                activities: 'Deforestation, Climate Change, Oceans, Whaling, Nuclear Issues',
                logo: 'https://www.greenpeace.org/static/planet4-international-stateless/2021/07/51c4a268-gpi_logo_2019_black.svg'
            },
            {
                id: 2,
                name: 'WWF',
                history: 'The World Wide Fund for Nature is an international non-governmental organization founded in 1961 that works in the field of wilderness preservation and the reduction of human impact on the environment. It was formerly named the World Wildlife Fund, which remains its official name in Canada and the United States.',
                activities: 'Forests, Marine, Freshwater, Wildlife, Food, Climate',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/World_Wide_Fund_for_Nature_logo.svg/1200px-World_Wide_Fund_for_Nature_logo.svg.png'
            }
        ];
        setNgos(mockNgos);
    }, []);

    const handleJoin = (ngoId) => {
        console.log(`Joining NGO with id: ${ngoId}`);
        // Add logic to join the NGO
    };

    return (
        <div className="ngo-list-page">
            <h1 className="page-title">NGOs</h1>
            <div className="ngo-list">
                {ngos.map(ngo => (
                    <NgoCard key={ngo.id} ngo={ngo} onJoin={handleJoin} />
                ))}
            </div>
        </div>
    );
};

export default NgoList;