import Parada from "../models/ParadaModel.js"
import axios from 'axios'


export const getUbicacion = async (req, res) => {
    try {
        //const { direccion } = req.params
        const direccion = "Malaga"
        
        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${direccion}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const firstResult = response.data[0];
        if (!firstResult) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const { lat, lon } = firstResult;

        console.log("Latitud: " + lat + " | Longitud: " + lon)
        res.json({lat, lon})
    } catch (error) {
        console.log("Error al obtener ubicacion")
    }
}


//Obtengo una ubicacion dada por una direccion 
//busco todas las paradas cuya lat y lon son menos de 0.003 de diferencia respecto a la ubicacion dada
export const getParadasCercanas = async (req, res) => {
    try {
        const { direccion } = req.body

        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${direccion}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const firstResult = response.data[0];
        if (!firstResult) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const { lat, lon } = firstResult;
        

        const maxDifference = 0.003;

        
        const paradasCercanas = await Parada.find({
            lat: { $gte: parseFloat(lat) - maxDifference, $lte: parseFloat(lat) + maxDifference },
            lon: { $gte: parseFloat(lon) - maxDifference, $lte: parseFloat(lon) + maxDifference },
        })

        console.log("getParadasCercanas: " + paradasCercanas)
        res.json(paradasCercanas)
    } catch (error) {
        console.log("Error getParadasCercanas")
    }
}