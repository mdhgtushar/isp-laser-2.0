const Olt = require('./olt.model');


const createOlt = async (req, res) => {
    const {name, userId} = req.body;
    const olt = await Olt.create({name, userId});
    res.status(201).json(olt);
}

const updateOlt = async (req, res) => {
    const {id} = req.params;
    const {name, userId} = req.body;
    const olt = await Olt.findByIdAndUpdate(id, {name, userId}, {new: true});
    res.status(200).json(olt);
}

const deleteOlt = async (req, res) => {
    const {id} = req.params;
    const olt = await Olt.findByIdAndDelete(id);
    res.status(200).json(olt);
}

const getOltById = async (req, res) => {
    const {id} = req.params;
    const olt = await Olt.findById(id);
    res.status(200).json(olt);
}

const getOltByUserId = async (req, res) => {
    const {userId} = req.params;
    const olt = await Olt.find({userId});
    res.status(200).json(olt);
}

const getOlt = async (req, res) => {
    const olt = await Olt.find();
    res.status(200).json(olt);
}

module.exports = {
    getOlt,
    createOlt,
    updateOlt,
    deleteOlt,
    getOltById,
    getOltByUserId
}
