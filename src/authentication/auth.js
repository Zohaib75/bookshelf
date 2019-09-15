"use strict";


// let iss_emp_apis = ["/issuer/create_schema", "/issuer/create_cred_def", "/issuer/send_credential_offer",
//                     "/proofs/send_request", "/proofs/validate", "/#proofs",
//                     "/#issuing", "/"];

// let std_apis = ["/credentials/accept_offer", "/credentials/reject_offer", "/"];

// let all_apis = ["/send_message", "/send_connection_request", "/connections/request",
//                 "/messages/delete", "/#relationships", "/#credentials", "/#messages", "/", "/proofs/accept"]

const expressJwt = require('express-jwt');
const {secret} = require("../config");

exports.isLoggedIn = function (roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
      roles = [roles];
  }

  return [
      // authenticate JWT token and attach user to request object (req.user)
      expressJwt({ secret }),

      // authorize based on user role
      (req, res, next) => {
          console.log("request: ", req.headers.authorization);
          if (roles.length && !roles.includes(req.user.role)) {
              // user's role is not authorized
              return res.status(401).json({ message: 'Unauthorized Access' });
          }

          // authentication and authorization successful
          next();
      }
  ];
}
