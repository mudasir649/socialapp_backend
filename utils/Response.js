export const successResponse = async (res, message, success, data) => {
  return res
    .statsu(201)
    .json({ message: message, success: success, data: data });
};

export const failedResponse = async (res, message, success) => {
  return res.status(400).json({
    message: message,
    success: success,
  });
};

export const deniedResponse = async () => {
  return res.status(403).send("Access Denied")
}


export const unexpectedResponse = async (res, message, success) => {
    return res.status(500).json({
      message: message,
      success: success,
    });
  };