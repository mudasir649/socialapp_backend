export const successResponse = async (res, message, success, data) => {
  return res.status(200).json({
    message: message, 
    success: success, 
    data: data });zvc 
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


export const unexpectedResponse = async (res, message, status, success) => {
    return res.status(status).json({
      message: message,
      success: success,
    });
  };