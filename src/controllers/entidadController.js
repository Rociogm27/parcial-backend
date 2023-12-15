import Entidad from "../models/modelEntidad.js"
import axios from 'axios'

export const getAllEntidades = async (req, res) => {
    try {
        const data = await Entidad.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Entidades a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los Entidades' });
    }
};

export const getEntidadID = async (req, res) => {
    try {
        const { id } = req.params;
        const entidad = await Entidad.findById(id);
        res.json(entidad);

    } catch (error) {
        console.log('Error en la consulta de Entidades a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}

export const createEntidad = async (req, res) => {
    try {
        const { nombre, lugar, lon, lat, organizador, foto, } = req.body


        const newEntidad = new Entidad({
            nombre,
            timestamp,
            lugar,
            lon,
            lat,
            organizador,
            foto
        })

        await newEntidad.save()

        res.send(newEntidad._id)

    } catch (error) {
        console.log('Error en la consulta de Entidades a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Entidad' });
    }
}

//MAPA
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


export const editEntidad = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedEntidad = await Entidad.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedEntidad){
            return res.status(404).json({message : 'Entidad no encontrada' });
        }
        res.json(updatedUser);

    } catch (error) {
        console.log('Error en la consulta de Entidades a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}


export const deleteEntidad = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedEntidad = await Entidad.findByIdAndDelete(id);

        if(!searchedEntidad){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de Entidades a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Entidad' });
    }
}

export const getEventosCercanos = async (req, res) => {
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
        

        const maxDifference = 0.2;

        
        const eventosCercanos = await Entidad.find({
            lat: { $gte: parseFloat(lat) - maxDifference, $lte: parseFloat(lat) + maxDifference },
            lon: { $gte: parseFloat(lon) - maxDifference, $lte: parseFloat(lon) + maxDifference },
        })

        console.log("getParadasCercanas: " + paradasCercanas)
        res.json(eventosCercanos)
    } catch (error) {
        console.log("Error getParadasCercanas")
    }
}