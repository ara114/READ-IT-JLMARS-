import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } 
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; //sub could be google auth based 1:48
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;