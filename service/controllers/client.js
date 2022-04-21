const HttpError = require("../models/http-error");
const Clients = require("../models/Clients");

const createClient = async (req, res, next) => {
  const { fullName, email, clientType, address, contact, city } = req.body;

  let createdClient;

  try {
    createdClient = await Clients.create({
      full_name: fullName,
      email: email,
      client_type: clientType,
      address: address,
      contact: contact,
      created_date: Date.now(),
      city: city,
    });
  } catch (err) {
    const error = new HttpError(
      "Could not create Client, please try again.",
      500
    );
    console.log("createdddd error", err);
    return next(error);
  }
  res.json({ Client: createdClient });
};

const getPrivateClients = async (req, res, next) => {
  let privateClients;

  try {
    privateClients = await Clients.findAll({
      where: {
        client_type: 0,
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching privateClients failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!privateClients || privateClients.length === 0) {
    return next(new HttpError("Could not find privateClients", 404));
  }

  res.json({
    privateClients: privateClients,
  });
};

const getEnterpriseClients = async (req, res, next) => {
  let enterpriseClients;

  try {
    enterpriseClients = await Clients.findAll({
      where: {
        client_type: 1,
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching enterpriseClients failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!enterpriseClients || enterpriseClients.length === 0) {
    return next(new HttpError("Could not find privateClients", 404));
  }

  res.json({
    enterpriseClients: enterpriseClients,
  });
};

const getClientById = async (req, res, next) => {
  const clientId = req.params.cid;

  let client;
  try {
    client = await Clients.findOne({ where: { id: clientId } });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }
  if (!client || client.length === 0) {
    return next(
      new HttpError("Could not find client for the provided id.", 404)
    );
  }

  res.json({
    client: client,
  });
};

exports.createClient = createClient;
exports.getPrivateClients = getPrivateClients;
exports.getEnterpriseClients = getEnterpriseClients;
exports.getClientById = getClientById;
