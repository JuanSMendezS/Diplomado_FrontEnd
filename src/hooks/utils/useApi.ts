import { useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import Cookies from "universal-cookie";

interface IHeaderPropsAPI {
  "access-token": string | undefined;
  "Content-Type": string | undefined;
}

interface IRequestProp extends AxiosRequestConfig {
  headers: IHeaderPropsAPI | any;
}

interface ILoadApiProps {
  endpoint: string;
  token?: boolean;
  type: Method;
  body?: any;
  file?: boolean;
}

/**
 * Summary: 
 *    This code defines a custom hook called `useApi` that can be used to make API requests. It handles loading states, error handling, and authentication using tokens.
 * 
 * Example Usage: 
 *    import { useApi } from "./useApi";
 * 
 *    const MyComponent = () => {
 *      const { loadApi, loadingApi, errorApi, loggedApi, loadedApi } = useApi();
 * 
 *      const fetchData = async () => {
 *        try {
 *          const response = await loadApi({
 *            type: "GET",
 *            endpoint: "/data",
 *            token: true,
 *          });
 *          console.log(response.data);
 *        } catch (error) {
 *          console.error(error);
 *        }
 *      };
 * 
 *      return (
 *        <div>
 *          {loadingApi.includes("GET__/data") && <p>Loading...</p>}
 *          {errorApi && <p>Error: {errorApi}</p>}
 *          {loggedApi && <button onClick={fetchData}>Fetch Data</button>}
 *          {loadedApi.includes("GET__/data") && <p>Data Loaded</p>}
 *        </div>
 *      );
 *    };
 * 
 * Inputs: 
 *    - `type` (optional): The HTTP method for the API request (default is "GET").
 *    - `endpoint`: The endpoint URL for the API request.
 *    - `token` (optional): A boolean flag indicating whether authentication token should be included in the request headers.
 *    - `body` (optional): The request body data.
 *    - `file` (optional): A boolean flag indicating whether the request is a file upload.
 * 
 * Flow: 
 *    1. The `loadApi` function is called with the specified inputs.
 *    2. The loading state is updated to include the current request.
 *    3. The loaded state is updated to remove the current request.
 *    4. If authentication token is required, it is retrieved from cookies and added to the request headers.
 *    5. If the request includes a file, the request headers are set to "multipart/form-data".
 *    6. The request is made using the `axios` library.
 *    7. If the response contains an error, the error state is updated and an error is thrown.
 *    8. The loading and loaded states are updated to reflect the completion of the request.
 *    9. The response is returned.
 * 
 * Outputs: 
 *    - `loadApi`: A function that makes an API request and returns the response.
 *    - `loadingApi`: An array of strings representing the currently loading requests.
 *    - `errorApi`: A string representing the error message, if any.
 *    - `loggedApi`: A boolean indicating whether the user is logged in.
 *    - `loadedApi`: An array of strings representing the successfully loaded requests.
 */
export const useApi = () => {
  const [loadingApi, setLoading] = useState<string[]>([]);
  const [loadedApi, setLoadedApi] = useState<string[]>([]);
  const [errorApi, setErrorApi] = useState<string>("");
  const cookie = new Cookies();

  const loggedApi = Boolean(
    cookie.get("token") && localStorage.getItem("user")
  );

  function setError(error: string) {
    setErrorApi(error);
  }

  const loadApi = async ({
    type = "GET",
    endpoint,
    token,
    body,
    file,
  }: ILoadApiProps) => {
    setErrorApi("");
    setLoading([...loadingApi, `${type}__${endpoint}`]);
    setLoadedApi((prevState) =>
      prevState.filter((item) => item !== `${type}__${endpoint}`)
    );

    try {
      let headers: IHeaderPropsAPI = {
        "access-token": undefined,
        "Content-Type": undefined,
      };

      if (token) {
        const token2 = cookie.get("token") as string;
        if (!token2) {
          setError("No has iniciado sesión.");
          console.error("Token no encontrado en las cookie");
          throw new Error("Token no encontrado en las cookie.");
        }
        headers["access-token"] = token2;
        if (file) {
          headers["Content-Type"] = "multipart/form-data";
        }
      }

      const config: IRequestProp = {
        method: type,
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`,

        headers: headers,
      };

      if (body) {
        if (file) {
          const formData = new FormData();
          Object.keys(body).forEach((key) => {
            formData.append(key, JSON.stringify(body[key]));
            // if (typeof value === "object" && value !== null) {
            //   try {
            //     value.forEach((value2: any) => {
            //       formData.append(key, value2);
            //     });
            //   } catch (e) {
            //     formData.append(key, value);
            //   }
            // } else {
            //   formData.append(key, value);
            // }
          });
          config.data = formData;
        } else {
          config.data = body;
        }
      }

      const response = await axios(config);
      if (response.data.error) {
        setError(response.data.error);
        throw new Error(response.data.error);
      }
      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      setLoadedApi((value) => [...value, `${type}__${endpoint}`]);
      return response;
    } catch (error: any) {
      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      if (error.response) {
        if (error.response.data.msg) {
          if (
            error.response.data.msg === "INVALID_TOKEN" ||
            error.response.data.msg === "MISSING_TOKEN"
          ) {
            cookie.remove("token");
            localStorage.clear();
            window.location.replace("/login");
          }
          setError(error.response.data.msg);
          throw new Error(error.response.data.msg);
        } else {
          setError(
            "Error interno del servidor, actualiza la página e intente nuevamente."
          );
          throw new Error(
            "Error interno del servidor, actualiza la página e intente nuevamente."
          );
        }
      } else {
        setError(
          "Error de conexión, actualiza la página e intente nuevamente."
        );
        throw new Error(
          "Error de conexión, actualiza la página e intente nuevamente."
        );
      }
    }
  };

  return {
    loadApi,
    loadingApi,
    errorApi,
    loggedApi,
    loadedApi,
  };
};
