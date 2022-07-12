import { getRequestHeaders } from "./config";
import axios from "axios"

export function resolveUrl(_url, _pathparams, _queryparams) {
  if (_pathparams) {
    Object.keys(_pathparams).forEach((param) => {
      _url = _url.replace("{".concat(param).concat("}"), _pathparams[param]);
    });
  }
  if (_queryparams) {
    var queryPath = "";
    Object.keys(_queryparams).forEach((query) => {
      let value = _queryparams[query];

      if (value != null && value != undefined) {
        queryPath = queryPath
          .concat("&")
          .concat(query)
          .concat("=")
          .concat(value);
      }
    });
    _url = _url.concat("?").concat(queryPath.substring(1, queryPath.length));
  }

  return _url;
}

export async function post(_url, _data, _callback, _pathparams, _headers) {
  try {
    let headers = getRequestHeaders();

    if (_headers) {
      Object.keys(_headers).forEach((h) => {
        headers[h] = _headers[h];
      });
    }

    let url = resolveUrl(_url, _pathparams);
    let config = {
      headers: headers,
    };
    const { data } = await axios.post(url, _data, config);
    if (_callback) {
      _callback(data);
    } else {
      return data;
    }
  } catch (error) {
    handleError(error, _callback);
  }
}

export async function get(
  _url,
  _callback,
  _pathparams,
  _queryparams,
  _headers
) {
  try {
    let headers = getRequestHeaders();
    if (_headers) {
      Object.keys(_headers).forEach((h) => {
        headers[h] = _headers[h];
      });
    }

    let config = {
      headers: headers,
    };
    let url = resolveUrl(_url, _pathparams, _queryparams);
    const { data } = await axios.get(url, config);
    if (_callback) {
      _callback(data);
    } else {
      return data;
    }
  } catch (error) {
    handleError(error, _callback);
  }
}

export function getErrorMessage(error, status) {
  if (error) {
    let response = error.response;
    if (response) {
      let msg = response.Message;
      if (!msg && response.error) {
        msg = response.error.message;
      }
      if (!msg) {
        if (status == 401) {
          msg = "Authorization Error.";
        }
        if (status == 403) {
          msg = "Forbidden Access.";
        }
      }

      return msg;
    }
  }

  return "Service Error";
}

export function handleError(error, _callback) {

  let status = 401;
  if (error && error.response && error.response.status) {
    status = error.response.status;
  }

  if (status == 401) {
    // let msg = getErrorMessage(error, status);
    // Where is this MsgBox coming from ??
    // MsgBox.alert({ message: msg, title: "Error" });
  } else if (status == 403) {
    // let msg = getErrorMessage(error, status);
    // MsgBox.alert({ message: msg, title: "Error" });
  } else {
    if (_callback) {
      _callback(error.response.data);
    } else {
      return error.response.data;
    }
  }
}
