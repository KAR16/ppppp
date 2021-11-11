export const fetchQuery = (
    url: string,
    method: string,
    body: any,
    auth: boolean = false
  ) => {
    return new Promise(async (solve, reject) => {
      let Content_Type =
        body instanceof FormData ? 'X-Content-Type' : 'Content-Type';
  
      if (typeof body == 'object' && !(body instanceof FormData)) {
        body = JSON.stringify(body);
      }
  
      const headers = {
        Accept: 'application/json, text/javascript, */*;',
        [Content_Type]: 'application/json',
      };
  
      //if (auth && DB.userInfo)
        //headers['Authorization'] = 'Bearer ' + DB.accessToken;
  
        fetch(url, {
        method: method,
        body: body,
        //eliminar
        //mode: 'cors',
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            reject(response);
          }
          solve(response.json());
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };